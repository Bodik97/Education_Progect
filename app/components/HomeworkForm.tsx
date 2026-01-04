"use client";

import { FormEvent, useState } from "react";

const STORAGE_KEY = "lms-student-name";

// Handles the tiny homework workflow. No backend is involved.
export function HomeworkForm({ lessonTitle }: { lessonTitle: string }) {
  const [answer, setAnswer] = useState("");
  const [submittedText, setSubmittedText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [studentName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) ?? "";
    }
    return "";
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Save the homework text in component state to show the result immediately.
    setSubmittedText(answer);
    setStatus("submitted");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-inner">
      <h3 className="text-lg font-semibold text-slate-900">Submit your homework</h3>
      <p className="text-sm text-slate-600">
        We save this only in the browser. Refreshing clears the submission because there is no database yet.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
          Your answer for {lessonTitle}
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Write your thoughts here..."
            required
            rows={5}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Send homework
        </button>
      </form>

      {status === "submitted" && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-slate-900">
          <p className="text-sm font-semibold text-emerald-700">Submission saved!</p>
          <p className="mt-1 text-sm text-slate-700">
            Student: {studentName || "Anonymous explorer"}
          </p>
          <p className="mt-1 text-sm text-slate-700">Status: Submitted</p>
          <p className="mt-2 whitespace-pre-line rounded-md bg-white p-3 text-sm text-slate-900 shadow-inner">
            {submittedText}
          </p>
        </div>
      )}
    </div>
  );
}
