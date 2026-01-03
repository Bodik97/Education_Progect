import Link from "next/link";
import type { Course } from "../data/courses";

// Small reusable card to show course details on the list page.
export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
          <p className="text-sm text-slate-600">{course.description}</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {course.topics.length} topics
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        {course.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 font-semibold">
            {topic}
          </span>
        ))}
      </div>
      <Link
        href={`/courses/${course.id}`}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        View topics
      </Link>
    </article>
  );
}
