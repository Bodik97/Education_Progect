"use client";

import { useState } from "react";
import Link from "next/link";
import { saveStudentAccount } from "../utils/auth";

// Registration page to create a simple mock student account.
// Data is stored in localStorage and awaits admin review before login is allowed.
export default function RegisterPage() {
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    // Save the new account as pending; login stays blocked until admin approval.
    saveStudentAccount(trimmedName, trimmedPassword);
    setSuccess("Дякуємо! Ваш акаунт створено зі статусом «Очікує перевірки». Чекайте підтвердження від адміністратора.");
    setStudentName("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="grid gap-8 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Create account</p>
        <h1 className="text-3xl font-bold text-slate-900">Registration</h1>
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
          className="w-fit rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          Зареєструватися
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
