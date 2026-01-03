import Link from "next/link";
import { findCourse } from "../../data/courses";

// Dynamic route for each course.
export default function CourseDetail({ params }: { params: { courseId: string } }) {
  const course = findCourse(params.courseId);

  if (!course) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        <p className="text-lg font-semibold">Course not found</p>
        <p className="text-sm">Double-check the URL or pick a course from the list.</p>
        <Link className="mt-3 inline-flex text-sm font-semibold text-rose-700 underline" href="/courses">
          Back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Course</p>
        <h1 className="text-3xl font-bold text-slate-900">{course.title}</h1>
        <p className="text-slate-700">{course.description}</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="text-emerald-700 underline" href="/dashboard">
            ← Back to dashboard
          </Link>
          <Link className="text-blue-700 underline" href="/courses">
            Browse all courses
          </Link>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Topics inside this course</h2>
        <p className="text-sm text-slate-700">Read through the list to see what you will explore.</p>
        <ul className="mt-4 grid gap-3">
          {course.topics.map((topic, index) => (
            <li
              key={topic}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
            >
              <span className="mt-0.5 rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">{index + 1}</span>
              <span className="font-semibold">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
