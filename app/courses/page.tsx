"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "../components/CourseCard";
import { courses } from "../data/courses";
import { getActiveStudentSession, subscribeToAuthChanges } from "../utils/auth";

// Courses list page. Great place for kids to browse topics.
export default function CoursesPage() {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeToAuthChanges, getActiveStudentSession, () => null);

  useEffect(() => {
    if (!session || session.status !== "confirmed") {
      router.replace("/");
    }
  }, [router, session]);

  if (!session || session.status !== "confirmed") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
        Checking login...
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Courses</p>
        <h1 className="text-3xl font-bold text-slate-900">Pick a track to get started</h1>
        <p className="text-slate-700">Each course lists quick topics. Open one to read what you will explore.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
