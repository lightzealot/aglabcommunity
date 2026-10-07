"use client";

import { useActionState } from "react";
import { useEffect, useRef } from "react";
import { addLessonFile, saveCourse, saveLesson, type CourseState } from "./actions";

type Course = {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  published: boolean;
  position: number;
  coverUrl: string | null;
};

export function CourseForm({ course }: { course: Course }) {
  const [state, action, pending] = useActionState<CourseState, FormData>(saveCourse, {});
  return (
    <form action={action} className="card space-y-3 p-5">
      <input type="hidden" name="id" value={course.id} />
      <input name="title" required defaultValue={course.title} placeholder="Título" className="input font-semibold" />
      <textarea name="description" rows={3} defaultValue={course.description} placeholder="Descripción del curso" className="input" />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={course.published} className="accent-[#1961d5]" />
          Publicado
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPaid" defaultChecked={course.isPaid} className="accent-[#1961d5]" />
          De pago (acceso manual)
        </label>
        <label className="flex items-center gap-2">
          Orden
          <input name="position" type="number" min={0} defaultValue={course.position} className="input !w-20 !py-1.5" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {course.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.coverUrl} alt="" className="h-12 w-20 rounded object-cover" />
        )}
        <input name="cover" type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5" />
        {course.coverUrl && (
          <label className="flex items-center gap-2 text-ash">
            <input type="checkbox" name="removeCover" /> Quitar portada
          </label>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Guardando…" : "Guardar curso"}
        </button>
        {state.ok && <span className="text-sm text-ash">Guardado ✓</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}

type Lesson = {
  id: string;
  title: string;
  videoUrl: string | null;
  body: string;
  position: number;
  resources: { label: string; url: string }[];
};

export function LessonForm({ lesson }: { lesson: Lesson }) {
  const [state, action, pending] = useActionState<CourseState, FormData>(saveLesson, {});
  return (
    <form action={action} className="card space-y-3 p-5">
      <input type="hidden" name="id" value={lesson.id} />
      <input name="title" required defaultValue={lesson.title} placeholder="Título de la lección" className="input font-semibold" />
      <input name="videoUrl" defaultValue={lesson.videoUrl ?? ""} placeholder="Video: enlace de YouTube, Vimeo o Loom" className="input" />
      <textarea name="body" rows={8} defaultValue={lesson.body} placeholder="Texto de la lección (opcional)" className="input" />
      <textarea
        name="resources"
        rows={3}
        defaultValue={lesson.resources.map((r) => `${r.label} | ${r.url}`).join("\n")}
        placeholder={"Recursos, uno por línea:\nPlantilla de n8n | https://..."}
        className="input"
      />
      <label className="flex items-center gap-2 text-sm">
        Orden
        <input name="position" type="number" min={0} defaultValue={lesson.position} className="input !w-20 !py-1.5" />
      </label>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary !py-2" disabled={pending}>
          {pending ? "Guardando…" : "Guardar lección"}
        </button>
        {state.ok && <span className="text-sm text-ash">Guardado ✓</span>}
        {state.error && <span className="text-sm text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}

export function FileUploader({ lessonId }: { lessonId: string }) {
  const [state, action, pending] = useActionState<CourseState, FormData>(addLessonFile, {});
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) ref.current?.reset();
  }, [state]);
  return (
    <form ref={ref} action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input name="file" type="file" required className="text-sm text-ash file:mr-3 file:rounded file:border file:border-hairline file:bg-paper file:px-3 file:py-1.5" />
      <button className="btn btn-ghost !py-1.5" disabled={pending}>
        {pending ? "Subiendo…" : "Subir archivo"}
      </button>
      {state.error && <span className="w-full text-sm text-red-600">{state.error}</span>}
    </form>
  );
}
