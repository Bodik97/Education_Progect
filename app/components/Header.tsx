"use client";

import Link from "next/link";
import { useState } from "react";

const STORAGE_KEY = "lms-student-name";

// Simple header with navigation and a mock login input.
// The goal is to show kids how state can store their name locally.
export function Header() {
  // Initialize with localStorage when available (browser only).
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) ?? "";
    }
    return "";
  });

  function handleNameChange(newName: string) {
    setName(newName);
    // For a real app this would be a secure login. Here we just keep it in localStorage.
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newName);
    }
  }

  return (
    <header className="flex flex-col gap-4 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          BrightPath LMS
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-700">
          <Link className="hover:text-blue-700" href="/">
            Home
          </Link>
          <Link className="hover:text-blue-700" href="/courses">
            Courses
          </Link>
        </nav>
      </div>
      <div className="border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-700">
            Mock login: type your first name to be greeted around the site.
          </p>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <span className="font-semibold">Your name</span>
            <input
              value={name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="Ava"
              className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
      </div>
    </header>
  );
}
