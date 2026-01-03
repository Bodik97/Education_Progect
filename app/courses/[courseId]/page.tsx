import Link from "next/link";
import { LessonList } from "../../components/LessonList";
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
        <Link className="inline-flex text-sm font-semibold text-emerald-700 underline" href="/courses">
          ← Back to all courses
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Lessons</h2>
        <p className="text-sm text-slate-700">Open a lesson to read the content and practice the homework.</p>
        <div className="mt-4">
          <LessonList courseId={course.id} lessons={course.lessons} />
        </div>
      </div>
    </div>
  );
}
