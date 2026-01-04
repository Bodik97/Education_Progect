"use client";

import { useSyncExternalStore } from "react";
import { getStoredStudentAccount, subscribeToAuthChanges, updateStudentStatus } from "../utils/auth";

// Very simple mock admin screen to approve or reject a single stored account.
export default function AdminPage() {
  const account = useSyncExternalStore(subscribeToAuthChanges, getStoredStudentAccount, () => null);

  function handleStatusChange(status: "pending" | "confirmed" | "rejected") {
    updateStudentStatus(status);
  }

  return (
    <div className="grid gap-6 rounded-3xl bg-white/90 p-8 shadow-lg ring-1 ring-slate-200">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Admin</p>
        <h1 className="text-3xl font-bold text-slate-900">Review new student</h1>
        <p className="text-slate-700">
          Ця сторінка імітує перевірку адміністратором. Тут можна підтвердити або відхилити останнього зареєстрованого учня.
        </p>
      </div>

      {!account ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
          Немає зареєстрованого акаунта. Учень повинен спершу заповнити форму реєстрації.
        </div>
      ) : (
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">Учень</p>
              <p className="text-lg font-bold text-slate-900">{account.name}</p>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700">{account.status}</span>
          </div>
          <p className="text-sm text-slate-700">Статус: «Очікує перевірки» блокує вхід. Лише після підтвердження учень зможе увійти.</p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <button
              onClick={() => handleStatusChange("confirmed")}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              Підтвердити
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              className="rounded-lg bg-rose-600 px-4 py-2 text-white transition hover:bg-rose-700"
            >
              Відхилити
            </button>
            <button
              onClick={() => handleStatusChange("pending")}
              className="rounded-lg bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600"
            >
              Повернути в очікування
            </button>
          </div>
          <p className="text-xs text-slate-600">Кнопки змінюють статус лише в цьому браузері (локальне сховище).</p>
        </div>
      )}
    </div>
  );
}
