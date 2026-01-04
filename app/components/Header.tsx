"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  clearStudentSession,
  getStoredStudentSession,
  subscribeToAuthChanges,
} from "../utils/auth";

// Simple header with navigation and a friendly greeting when the student is logged in.
export function Header() {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeToAuthChanges, getStoredStudentSession, () => null);

  function handleSignOut() {
    clearStudentSession();
    router.replace("/");
  }

  return (
    <header className="flex flex-col gap-4 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          BrightPath LMS
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link className="hover:text-blue-700" href="/">
            Login
          </Link>
          <Link className="hover:text-blue-700" href="/register">
            Register
          </Link>
          <Link className="hover:text-blue-700" href="/dashboard">
            Dashboard
          </Link>
          <Link className="hover:text-blue-700" href="/courses">
            Courses
          </Link>
        </nav>
      </div>
      <div className="border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-700">
            This LMS keeps data in your browser only. Log in with your name and password to unlock the dashboard.
          </p>
          {session ? (
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <span>Hello, {session.name}!</span>
              <button
                onClick={handleSignOut}
                className="rounded-lg border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Sign out
              </button>
            </div>
          ) : (
            <span className="text-xs font-semibold text-slate-600">Not logged in</span>
          )}
        </div>
      </div>
    </header>
  );
}
