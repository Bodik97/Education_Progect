"use client";

import { useState } from "react";
import Link from "next/link";

// Registration page to create a student account in the free KV database.
export default function RegisterPage() {
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmedName = studentName.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedName || !trimmedPassword || !trimmedConfirm) {
      setError("Заповніть усі поля, щоб створити акаунт.");
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setError("Паролі не співпадають. Перевірте ще раз.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedName, password: trimmedPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Не вдалося зберегти акаунт.");
        return;
      }

      setSuccess(data?.message ?? "Дані збережені. Чекайте на підтвердження адміністратора.");
      setStudentName("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setError("Не вдалося підключитися до бази. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Create account</p>
        <h1 className="text-3xl font-bold text-slate-900">Registration to EduPlatform</h1>
        <p className="text-base text-slate-700">
          Заповніть дані учня, придумайте простий пароль і відправте заявку. Спочатку статус буде «Очікує перевірки».
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
            placeholder="Enter a simple password"
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat the password"
            className="rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </label>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>
        ) : null}

        {success ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{success}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Зареєструватися"}
        </button>
        <p className="text-sm text-slate-700">
          Уже є підтверджений акаунт?{" "}
          <Link href="/" className="font-semibold text-blue-700 hover:underline">
            Повернутися до входу
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
