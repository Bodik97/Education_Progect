// Shared helpers for the mock authentication flow with a simple password gate.
// Everything stays in localStorage so the LMS remains fully in-browser.

export type StudentSession = {
  name: string;
  password: string;
};

export const STORAGE_KEY = "lms-student-session";

// Cache the latest snapshot so useSyncExternalStore receives a stable reference
// and avoids an infinite update loop. The cache only refreshes when the raw
// storage value actually changes.
let cachedRaw: string | null = null;
let cachedSession: StudentSession | null = null;

// Read the saved student session (if any) from localStorage and keep a stable
// reference unless the stored string changes. This keeps getSnapshot pure for
// useSyncExternalStore.
export function getStoredStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return cachedSession;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSession;

  cachedRaw = raw;

  if (!raw) {
    cachedSession = null;
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StudentSession;
    // Basic shape validation to guard against corrupted data.
    if (parsed?.name && parsed?.password) {
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

// Save a trimmed student session.
export function saveStudentSession(name: string, password: string) {
  if (typeof window === "undefined") return;
  const session: StudentSession = {
    name: name.trim(),
    password: password.trim(),
  };
  const raw = JSON.stringify(session);
  cachedSession = session;
  cachedRaw = raw;
  localStorage.setItem(STORAGE_KEY, raw);
  notifyAuthChange();
}

// Remove the saved student session.
export function clearStudentSession() {
  if (typeof window === "undefined") return;
  cachedSession = null;
  cachedRaw = null;
  localStorage.removeItem(STORAGE_KEY);
  notifyAuthChange();
}

// Quick helper to verify credentials against what is saved locally.
export function verifyStudentSession(name: string, password: string): boolean {
  const stored = getStoredStudentSession();
  if (!stored) return false;

  return stored.name === name.trim() && stored.password === password.trim();
}

// Broadcast a simple event so different components stay in sync.
function notifyAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("lms-auth-change"));
}

// Allow subscribers (like the header) to react when the student logs in or out.
export function subscribeToAuthChanges(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("lms-auth-change", callback);
  return () => window.removeEventListener("lms-auth-change", callback);
}
