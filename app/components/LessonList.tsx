import Link from "next/link";
import type { Lesson } from "../data/courses";

export function LessonList({
  courseId,
  lessons,
}: {
  courseId: string;
  lessons: Lesson[];
}) {
  if (!lessons?.length) {
    return (
      <p className="text-sm text-slate-600">
        Lessons coming soon.
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {lessons.map((lesson) => (
        <li
          key={lesson.id}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div>
            <p className="text-base font-semibold text-slate-900">
              {lesson.title}
            </p>
            <p className="text-sm text-slate-600">
              Homework: {lesson.homework}
            </p>
          </div>

          <Link
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            href={`/courses/${courseId}/${lesson.id}`}
          >
            Open lesson
          </Link>
        </li>
      ))}
    </ul>
  );
}
