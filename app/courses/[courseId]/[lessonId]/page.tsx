import Link from "next/link";
import { HomeworkForm } from "../../../components/HomeworkForm";
import { findCourse, findLesson } from "../../../data/courses";

// Dynamic route for each lesson inside a course (Next.js 16 compatible).
export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;

  const course = findCourse(courseId);
  const lesson = findLesson(courseId, lessonId);

  if (!course || !lesson) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        <p className="text-lg font-semibold">Lesson not found</p>
        <p className="text-sm">Double-check the link or go back to the course page.</p>
        <Link
          className="mt-3 inline-flex text-sm font-semibold text-rose-700 underline"
          href={`/courses/${courseId}`}
        >
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Lesson
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{lesson.title}</h1>
        <p className="text-slate-700">Course: {course.title}</p>

        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="text-emerald-700 underline" href={`/courses/${course.id}`}>
            ← Back to course
          </Link>
          <Link className="text-blue-700 underline" href="/courses">
            Browse all courses
          </Link>
        </div>
      </div>

      <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Story time</h2>
        <p className="text-base leading-relaxed text-slate-800">{lesson.content}</p>
      </article>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Homework</h2>
        <p className="text-base text-slate-800">{lesson.homework}</p>
        <HomeworkForm lessonTitle={lesson.title} />
      </section>
    </div>
  );
}
