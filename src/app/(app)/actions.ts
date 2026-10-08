"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { notify } from "@/lib/notify";
import { award, revoke } from "@/lib/points";
import { requireAdmin, requireMember } from "@/lib/session";
import { saveImage } from "@/lib/uploads";

export type FormState = { error?: string; ok?: boolean };

const postSchema = z.object({
  boardId: z.string().min(1, "Elige un board."),
  title: z.string().trim().max(120, "El título es muy largo (máx. 120).").optional(),
  body: z.string().trim().min(1, "Escribe algo para publicar.").max(5000, "Máximo 5000 caracteres."),
});

export async function createPost(_prev: FormState, formData: FormData): Promise<FormState> {
  const { user } = await requireMember();
  const parsed = postSchema.safeParse({
    boardId: formData.get("boardId"),
    title: formData.get("title") || undefined,
    body: formData.get("body"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const [board] = await db
    .select({ id: schema.board.id })
    .from(schema.board)
    .where(eq(schema.board.id, parsed.data.boardId));
  if (!board) return { error: "Ese board no existe." };

  let imageUrl: string | null = null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      imageUrl = await saveImage(file);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "No pudimos subir la imagen." };
    }
  }

  await db.transaction(async (tx) => {
    const [created] = await tx
      .insert(schema.post)
      .values({
        authorId: user.id,
        boardId: board.id,
        title: parsed.data.title ?? null,
        body: parsed.data.body,
        imageUrl,
      })
      .returning({ id: schema.post.id });
    await award(tx, user.id, "post", created.id);
  });

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function addComment(_prev: FormState, formData: FormData): Promise<FormState> {
  const { user } = await requireMember();
  const parsed = z
    .object({
      postId: z.uuid(),
      body: z.string().trim().min(1, "Escribe un comentario.").max(2000, "Máximo 2000 caracteres."),
    })
    .safeParse({ postId: formData.get("postId"), body: formData.get("body") });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const [post] = await db
    .select({ id: schema.post.id, authorId: schema.post.authorId })
    .from(schema.post)
    .where(and(eq(schema.post.id, parsed.data.postId), eq(schema.post.status, "published")));
  if (!post) return { error: "Ese post ya no existe." };

  await db.transaction(async (tx) => {
    const [c] = await tx
      .insert(schema.comment)
      .values({ postId: post.id, authorId: user.id, body: parsed.data.body })
      .returning({ id: schema.comment.id });
    await award(tx, user.id, "comment", c.id);
    if (post.authorId !== user.id) {
      await notify(
        post.authorId,
        {
          type: "comment",
          title: `${user.name} comentó tu publicación`,
          body: parsed.data.body.slice(0, 120),
          href: `/post/${post.id}`,
        },
        tx,
      );
    }
  });

  revalidatePath(`/post/${post.id}`);
  revalidatePath("/");
  return { ok: true };
}

export async function togglePostLike(formData: FormData) {
  const { user } = await requireMember();
  const postId = z.uuid().safeParse(formData.get("postId"));
  if (!postId.success) return;

  const [post] = await db
    .select({ authorId: schema.post.authorId })
    .from(schema.post)
    .where(and(eq(schema.post.id, postId.data), eq(schema.post.status, "published")));
  if (!post) return;

  await db.transaction(async (tx) => {
    const removed = await tx
      .delete(schema.postLike)
      .where(and(eq(schema.postLike.postId, postId.data), eq(schema.postLike.userId, user.id)))
      .returning();
    const ref = `p:${postId.data}:${user.id}`;
    if (removed.length) {
      await revoke(tx, "like", { refId: ref });
    } else {
      await tx.insert(schema.postLike).values({ postId: postId.data, userId: user.id });
      if (post.authorId !== user.id) await award(tx, post.authorId, "like", ref);
    }
  });
  revalidatePath("/", "layout");
}

export async function toggleCommentLike(formData: FormData) {
  const { user } = await requireMember();
  const commentId = z.uuid().safeParse(formData.get("commentId"));
  if (!commentId.success) return;

  const [c] = await db
    .select({ authorId: schema.comment.authorId, postId: schema.comment.postId })
    .from(schema.comment)
    .where(eq(schema.comment.id, commentId.data));
  if (!c) return;

  await db.transaction(async (tx) => {
    const removed = await tx
      .delete(schema.commentLike)
      .where(
        and(eq(schema.commentLike.commentId, commentId.data), eq(schema.commentLike.userId, user.id)),
      )
      .returning();
    const ref = `c:${commentId.data}:${user.id}`;
    if (removed.length) {
      await revoke(tx, "like", { refId: ref });
    } else {
      await tx.insert(schema.commentLike).values({ commentId: commentId.data, userId: user.id });
      if (c.authorId !== user.id) await award(tx, c.authorId, "like", ref);
    }
  });
  revalidatePath(`/post/${c.postId}`);
}

export async function deletePost(formData: FormData) {
  const { user } = await requireMember();
  const id = z.uuid().safeParse(formData.get("postId"));
  if (!id.success) return;

  const [post] = await db.select().from(schema.post).where(eq(schema.post.id, id.data));
  if (!post || (post.authorId !== user.id && user.role !== "admin")) return;

  await db.transaction(async (tx) => {
    const comments = await tx
      .select({ id: schema.comment.id })
      .from(schema.comment)
      .where(eq(schema.comment.postId, post.id));
    await revoke(tx, "post", { refId: post.id });
    await revoke(tx, "like", { prefix: `p:${post.id}:` });
    await revoke(tx, "comment", { refIds: comments.map((c) => c.id) });
    for (const c of comments) await revoke(tx, "like", { prefix: `c:${c.id}:` });
    await tx.delete(schema.post).where(eq(schema.post.id, post.id));
  });
  revalidatePath("/", "layout");
  redirect("/");
}

export async function deleteComment(formData: FormData) {
  const { user } = await requireMember();
  const id = z.uuid().safeParse(formData.get("commentId"));
  if (!id.success) return;

  const [c] = await db.select().from(schema.comment).where(eq(schema.comment.id, id.data));
  if (!c || (c.authorId !== user.id && user.role !== "admin")) return;

  await db.transaction(async (tx) => {
    await revoke(tx, "comment", { refId: c.id });
    await revoke(tx, "like", { prefix: `c:${c.id}:` });
    await tx.delete(schema.comment).where(eq(schema.comment.id, c.id));
  });
  revalidatePath(`/post/${c.postId}`);
  revalidatePath("/");
}

export async function togglePin(formData: FormData) {
  await requireAdmin();
  const id = z.uuid().safeParse(formData.get("postId"));
  if (!id.success) return;
  const [post] = await db.select().from(schema.post).where(eq(schema.post.id, id.data));
  if (!post) return;
  await db.update(schema.post).set({ pinned: !post.pinned }).where(eq(schema.post.id, post.id));
  revalidatePath("/", "layout");
}

export async function updateProfile(_prev: FormState, formData: FormData): Promise<FormState> {
  const { user } = await requireMember();
  const parsed = z
    .object({
      name: z.string().trim().min(2, "Tu nombre es muy corto.").max(60),
      bio: z.string().trim().max(300, "La bio admite máx. 300 caracteres.").optional(),
    })
    .safeParse({ name: formData.get("name"), bio: formData.get("bio") || undefined });
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  let image: string | null | undefined;
  const avatar = formData.get("avatar");
  if (avatar instanceof File && avatar.size > 0) {
    try {
      image = await saveImage(avatar);
    } catch (e) {
      return { error: e instanceof Error ? e.message : "No pudimos subir la foto." };
    }
  } else if (formData.get("removeAvatar") === "on") {
    image = null;
  }

  await db
    .update(schema.user)
    .set({
      ...(image !== undefined ? { image } : {}),
      name: parsed.data.name,
      bio: parsed.data.bio ?? null,
      emailNotifications: formData.get("emailNotifications") === "on",
      updatedAt: new Date(),
    })
    .where(eq(schema.user.id, user.id));
  revalidatePath("/", "layout");
  return { ok: true };
}
