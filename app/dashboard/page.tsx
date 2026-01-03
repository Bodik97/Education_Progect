"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { courses } from "../data/courses";

const STORAGE_KEY = "lms-student-name";

// Dashboard only shows after the student logs in.
export default function DashboardPage() {
  const router = useRouter();
  const [studentName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    if (!studentName) {
      router.replace("/");
    }
  }, [router, studentName]);

  const newsItems = [
    "This week: build a colorful button and share a screenshot!",
    "Roblox tip: test your obby after each new obstacle.",
    "Minecraft idea: create a secret base using redstone doors.",
  ];

  return (
    <div className="grid gap-8">
      <section className="grid gap-3 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-500 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.2em]">Dashboard</p>
        <h1 className="text-3xl font-bold">
          {studentName ? `Welcome back, ${studentName}!` : "Welcome to your dashboard"}
        </h1>
        <p className="max-w-2xl text-base">
          Pick a course, read the news, and explore topics that make you curious. Everything stays in your browser.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/courses"
            className="rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-[1px]"
          >
            View courses
          </Link>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">School news</p>
            <h2 className="text-xl font-bold text-slate-900">Quick updates</h2>
          </div>
        </div>
        <ul className="grid gap-3">
          {newsItems.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Courses</p>
            <h2 className="text-xl font-bold text-slate-900">Available adventures</h2>
          </div>
          <Link className="text-sm font-semibold text-blue-700 underline" href="/courses">
            See all
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                  <p className="text-sm text-slate-700">{course.description}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {course.topics.length} topics
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                {course.topics.slice(0, 2).map((topic) => (
                  <span key={topic} className="rounded-full bg-white px-3 py-1 font-semibold">
                    {topic}
                  </span>
                ))}
              </div>
              <Link
                href={`/courses/${course.id}`}
                className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                Open course
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
