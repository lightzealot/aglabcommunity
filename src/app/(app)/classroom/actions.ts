"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { hasCourseAccess } from "@/lib/courses";
import { award, revoke } from "@/lib/points";
import { requireMember } from "@/lib/session";

export async function toggleLesson(formData: FormData) {
  const { user } = await requireMember();
  const lessonId = z.uuid().safeParse(formData.get("lessonId"));
  if (!lessonId.success) return;

  const [row] = await db
    .select({ course: schema.course })
    .from(schema.lesson)
    .innerJoin(schema.courseModule, eq(schema.courseModule.id, schema.lesson.moduleId))
    .innerJoin(schema.course, eq(schema.course.id, schema.courseModule.courseId))
    .where(eq(schema.lesson.id, lessonId.data));
  if (!row) return;
  if (!row.course.published && user.role !== "admin") return;
  if (!(await hasCourseAccess(user, row.course))) return;

  await db.transaction(async (tx) => {
    const removed = await tx
      .delete(schema.lessonProgress)
      .where(and(eq(schema.lessonProgress.lessonId, lessonId.data), eq(schema.lessonProgress.userId, user.id)))
      .returning();
    if (removed.length) {
      await revoke(tx, "lesson", { refId: `${lessonId.data}:${user.id}` });
    } else {
      await tx.insert(schema.lessonProgress).values({ userId: user.id, lessonId: lessonId.data });
      await award(tx, user.id, "lesson", `${lessonId.data}:${user.id}`);
    }
  });
  revalidatePath("/classroom", "layout");
  revalidatePath("/");
}
