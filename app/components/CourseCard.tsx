import Link from "next/link";
import type { Course } from "../data/courses";

// Small reusable card to show course details on the list page.
export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
          <p className="text-sm text-slate-600">{course.description}</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {course.lessons.length} lessons
        </span>
      </div>
      <Link
        href={`/courses/${course.id}`}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View lessons
      </Link>
    </article>
  );
}
