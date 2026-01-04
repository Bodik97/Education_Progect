// Client-side session helpers for the mock LMS.
// Sessions are saved in localStorage so the UI can gate routes after server-side checks.

export type StudentStatus = "pending" | "confirmed" | "rejected";

export type StudentSession = {
  name: string;
  status: StudentStatus;
};

export const SESSION_KEY = "lms-student-session";

// Cache the session string/value to keep useSyncExternalStore stable.
let cachedSessionRaw: string | null = null;
let cachedSession: StudentSession | null = null;

export function getActiveStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return cachedSession;

  const raw = localStorage.getItem(SESSION_KEY);
  if (raw === cachedSessionRaw) return cachedSession;

  cachedSessionRaw = raw;

  if (!raw) {
    cachedSession = null;
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StudentSession;
    if (parsed?.name && parsed?.status) {
      cachedSession = parsed;
      return cachedSession;
    }
    cachedSession = null;
    return null;
  } catch {
    cachedSession = null;
    return null;
  }
}

export function saveStudentSession(name: string, status: StudentStatus) {
  if (typeof window === "undefined") return;
  const session: StudentSession = { name: name.trim(), status };
  const raw = JSON.stringify(session);
  cachedSession = session;
  cachedSessionRaw = raw;
  localStorage.setItem(SESSION_KEY, raw);
  notifyAuthChange();
}

export function clearStudentSession() {
  if (typeof window === "undefined") return;
  cachedSession = null;
  cachedSessionRaw = null;
  localStorage.removeItem(SESSION_KEY);
  notifyAuthChange();
}

function notifyAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("lms-auth-change"));
}

export function subscribeToAuthChanges(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("lms-auth-change", callback);
  return () => window.removeEventListener("lms-auth-change", callback);
}
