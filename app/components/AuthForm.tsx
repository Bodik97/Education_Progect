"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "login" | "register";
type ApiResponse = { ok: true } | { ok: false; error?: string };

async function safeJson(res: Response): Promise<ApiResponse | null> {
  try {
    return (await res.json()) as ApiResponse;
  } catch {
    return null;
  }
}

export default function AuthForm() {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError(null);

    const cleanEmail = email.trim();

    if (!cleanEmail.includes("@")) {
      setError("Вкажи нормальний email 🙂");
      return;
    }
    if (password.length < 6) {
      setError("Пароль мінімум 6 символів.");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: cleanEmail, password }),
    }).catch(() => null);

    if (!res) {
      setLoading(false);
      setError("Немає відповіді від сервера. Перевір інтернет/сервер.");
      return;
    }

    const data = await safeJson(res);
    setLoading(false);

    if (!res.ok || !data?.ok) {
      setError((data && "error" in data && data.error) ? data.error : "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  function toggleMode() {
    setError(null);
    setMode((m) => (m === "login" ? "register" : "login"));
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 grid gap-5"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          LMS Access
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {mode === "login" ? "Вхід" : "Реєстрація"}
        </h1>
        <p className="text-slate-700 text-sm">
          Після входу відкриється Dashboard.
        </p>
      </div>

      <div className="grid gap-3">
        <input
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
          placeholder="email@example.com"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          className="rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
          placeholder="password (min 6 chars)"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error ? (
          <p className="text-sm font-semibold text-rose-600">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-fit rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "..." : mode === "login" ? "Увійти" : "Створити акаунт"}
        </button>

        <button
          type="button"
          onClick={toggleMode}
          disabled={loading}
          className="text-sm font-semibold text-slate-700 underline hover:text-blue-700 w-fit disabled:opacity-60"
        >
          {mode === "login" ? "Нема акаунта? Реєстрація" : "Вже є акаунт? Вхід"}
        </button>
      </div>
    </form>
  );
}
