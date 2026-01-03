// Shared helpers for the mock authentication flow with a simple password gate.
// Everything stays in localStorage so the LMS remains fully in-browser.

export type StudentSession = {
  name: string;
  password: string;
};

export const STORAGE_KEY = "lms-student-session";

// Read the saved student session (if any) from localStorage.
export function getStoredStudentSession(): StudentSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as StudentSession;
    // Basic shape validation to guard against corrupted data.
    if (parsed?.name && parsed?.password) {
      return parsed;
    }
    return null;
  } catch {
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  notifyAuthChange();
}

// Remove the saved student session.
export function clearStudentSession() {
  if (typeof window === "undefined") return;
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
