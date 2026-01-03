"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getStoredStudentSession,
  saveStudentSession,
  verifyStudentSession,
} from "./utils/auth";

// Landing page acts as a combined login/registration step.
// Students must enter a name/email and password. Without valid data, access is blocked.
export default function Home() {
  const router = useRouter();
  const [studentName, setStudentName] = useState(() => getStoredStudentSession()?.name ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedName = studentName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedPassword) {
      setError("Будь ласка, введіть ім’я та пароль, щоб увійти.");
      return;
    }

    // If a session exists, require matching credentials to enter again.
    const existingSession = getStoredStudentSession();
    if (existingSession) {
      const isValid = verifyStudentSession(trimmedName, trimmedPassword);
      if (!isValid) {
        setError("Дані не збігаються з поточним користувачем. Спробуйте ще раз.");
        return;
      }
    }

    // Save the session locally (acts as registration the first time, login afterward).
    saveStudentSession(trimmedName, trimmedPassword);
    router.push("/dashboard");
  }

  return (
    <div className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Welcome</p>
        <h1 className="text-3xl font-bold text-slate-900">Login to LMS / Registration</h1>
        <p className="text-base text-slate-700">
          Це навчальна платформа. Спочатку увійдіть за іменем та паролем. Дані зберігаються тільки у вашому браузері.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Student name or email
          <input
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="SkyCoder or sky@example.com"
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter a simple password"
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </label>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>
        ) : null}

        <button
          type="submit"
          className="w-fit rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Enter dashboard
        </button>
        <p className="text-xs text-slate-600">Пароль обов’язковий. Без перевірки доступ заборонений.</p>
      </form>
    </div>
  );
}
