import Link from "next/link";
import Image from "next/image";
import { courses } from "./data/courses";

export default function Home() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-6 rounded-3xl bg-white/80 p-8 shadow-lg ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">For curious makers</p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              BrightPath LMS: tiny lessons for big imaginations
            </h1>
            <p className="text-lg text-slate-700">
              Explore short courses, open kid-friendly lessons, and practice homework directly on the page.
              Everything lives in-memory, so you can focus on learning how web apps work.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
                href="/courses"
              >
                View courses
              </Link>
              <Link
                className="rounded-xl border border-blue-200 px-5 py-3 text-sm font-semibold text-blue-700 bg-blue-50"
                href="#how-it-works"
              >
                How it works
              </Link>
            </div>
          </div>
          <Image
            src="/next.svg"
            alt="BrightPath mascot"
            width={180}
            height={140}
            className="self-start drop-shadow"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3" id="how-it-works">
          {["Mock login with your name", "Read lessons like stories", "Submit homework to see the flow"].map(
            (item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </section>

      <section className="grid gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Featured courses</h2>
          <p className="text-sm text-slate-700">A couple of starter tracks are ready below.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-slate-900">{course.title}</h3>
                  <p className="text-sm text-slate-700">{course.description}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {course.lessons.length} lessons
                </span>
              </div>
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Start this course
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
