"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { attemptLogin, getStoredStudentAccount } from "./utils/auth";

// Landing page acts strictly as the login gate.
// Students must provide a confirmed account (approved by an admin) before accessing the LMS.
export default function Home() {
  const router = useRouter();
  const [studentName, setStudentName] = useState(() => getStoredStudentAccount()?.name ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedName = studentName.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedPassword) {
      setError("Будь ласка, введіть ім’я/емейл та пароль.");
      return;
    }

    const result = attemptLogin(trimmedName, trimmedPassword);
    if (!result.success) {
      setError(result.error ?? "Вхід заборонено. Перевірте дані.");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Welcome</p>
        <h1 className="text-3xl font-bold text-slate-900">Login to LMS</h1>
        <p className="text-base text-slate-700">
          Спершу увійдіть за своїм логіном та паролем. Доступ відкриється лише після підтвердження адміністратором.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Student email or name
          <input
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
            placeholder="kid@example.com"
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
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
        <p className="text-xs text-slate-600">Пароль обов’язковий. Поки акаунт не підтверджено, вхід заборонений.</p>
        <p className="text-sm text-slate-700">
          Ще не зареєстровані?{" "}
          <Link href="/register" className="font-semibold text-blue-700 hover:underline">
            Створіть акаунт
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
