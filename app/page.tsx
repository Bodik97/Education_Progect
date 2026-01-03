"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "lms-student-name";

export default function Home() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) router.replace("/dashboard");
  }, [router]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = studentName.trim();

    if (trimmed.length < 2) {
      setError("Введи імʼя (мінімум 2 символи)");
      return;
    }

    setError("");
    localStorage.setItem(STORAGE_KEY, trimmed);
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg grid gap-8 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Welcome
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Вхід в LMS / Реєстрація
          </h1>
          <p className="text-base text-slate-700">
            Введи імʼя (або email) — і ти потрапиш на сторінку учня.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
        >
          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            Імʼя учня або email
            <input
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              placeholder="Bohdan або bohdan@email.com"
              className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </label>

          {error ? (
            <p className="text-sm font-semibold text-rose-600">{error}</p>
          ) : null}

          <button
            type="submit"
            className="w-fit rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Увійти
          </button>

          <p className="text-xs text-slate-600">
            Без паролів — це навчальний MVP.
          </p>
        </form>
      </div>
    </main>
  );
}
