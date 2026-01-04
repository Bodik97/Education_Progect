"use client";

import { useEffect, useState } from "react";
import type { StudentStatus } from "../utils/auth";

// Simple mock admin screen that reads from the database and updates statuses.
type AdminStudent = { email: string; password: string; status: StudentStatus };

export default function AdminPage() {
  const [students, setStudents] = useState<AdminStudent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadStudents() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Не вдалося завантажити учнів.");
        return;
      }
      setStudents(data.students ?? []);
    } catch (err) {
      console.error(err);
      setError("Помилка зʼєднання з базою даних.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function handleStatusChange(email: string, status: StudentStatus) {
    setError(null);
    try {
      const response = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, status }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error ?? "Не вдалося оновити статус.");
        return;
      }
      setStudents((current) =>
        current.map((student) => (student.email === email ? { ...student, status } : student)),
      );
    } catch (err) {
      console.error(err);
      setError("Помилка зʼєднання з базою даних.");
    }
  }

  return (
    <div className="grid gap-6 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Admin</p>
        <h1 className="text-3xl font-bold text-slate-900">Review  students</h1>
        <p className="text-slate-700">
          Ця сторінка звертається до безкоштовної бази (Vercel KV). Тут можна підтвердити або відхилити зареєстрованих учнів.
        </p>
      </div>

      {error ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>
      ) : null}

      <button
        onClick={loadStudents}
        className="w-fit rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
      >
        {loading ? "Refreshing..." : "Reload list"}
      </button>

      {students.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
          Немає зареєстрованих акаунтів. Учні повинні спершу заповнити форму реєстрації.
        </div>
      ) : (
        <div className="grid gap-4">
          {students.map((account) => (
            <div key={account.email} className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">Учень</p>
                  <p className="text-lg font-bold text-slate-900">{account.email}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700">{account.status}</span>
              </div>
              <p className="text-sm text-slate-700">Статус: «Очікує перевірки» блокує вхід. Лише після підтвердження учень зможе увійти.</p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <button
                  onClick={() => handleStatusChange(account.email, "confirmed")}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
                >
                  Підтвердити
                </button>
                <button
                  onClick={() => handleStatusChange(account.email, "rejected")}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700"
                >
                  Відхилити
                </button>
                <button
                  onClick={() => handleStatusChange(account.email, "pending")}
                  className="rounded-lg bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
                >
                  Повернути в очікування
                </button>
              </div>
              <p className="text-xs text-slate-600">Кнопки змінюють статус у вибраній безкоштовній базі (Upstash KV) або локальній памʼяті.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
