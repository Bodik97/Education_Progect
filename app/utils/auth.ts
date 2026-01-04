// Shared helpers for the mock authentication flow with a simple password gate and admin review.
// Everything stays in localStorage so the LMS remains fully in-browser.

export type StudentStatus = "pending" | "confirmed" | "rejected";

export type StudentAccount = {
  name: string;
  password: string;
  status: StudentStatus;
};

export type StudentSession = {
  name: string;
  status: StudentStatus;
};

export const ACCOUNT_KEY = "lms-student-account";
export const SESSION_KEY = "lms-student-session";

// Cache snapshots separately for the stored account and active session
// so useSyncExternalStore sees stable references and avoids render loops.
let cachedAccountRaw: string | null = null;
let cachedAccount: StudentAccount | null = null;

let cachedSessionRaw: string | null = null;
let cachedSession: StudentSession | null = null;

// Read the saved student account (if any) from localStorage and keep a stable
// reference unless the stored string changes.
export function getStoredStudentAccount(): StudentAccount | null {
  if (typeof window === "undefined") return cachedAccount;

  const raw = localStorage.getItem(ACCOUNT_KEY);
  if (raw === cachedAccountRaw) return cachedAccount;

  cachedAccountRaw = raw;

  if (!raw) {
    cachedAccount = null;
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as StudentAccount;
    if (parsed?.name && parsed?.password && parsed?.status) {
      cachedAccount = parsed;
      return cachedAccount;
    }
    cachedAccount = null;
    return null;
  } catch {
    cachedAccount = null;
    return null;
  }
}

// Read the active login session (only set when a confirmed student signs in).
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

// Save or update the student account. A new account always starts as pending.
export function saveStudentAccount(name: string, password: string) {
  if (typeof window === "undefined") return;
  const account: StudentAccount = {
    name: name.trim(),
    password: password.trim(),
    status: "pending",
  };
  const raw = JSON.stringify(account);
  cachedAccount = account;
  cachedAccountRaw = raw;
  localStorage.setItem(ACCOUNT_KEY, raw);
  // Clear any previous login session because the student must wait for approval.
  clearStudentSession();
  notifyAuthChange();
}

// Update only the account status (used by the mock admin).
export function updateStudentStatus(status: StudentStatus) {
  if (typeof window === "undefined") return;
  const account = getStoredStudentAccount();
  if (!account) return;
  const updated = { ...account, status } as StudentAccount;
  const raw = JSON.stringify(updated);
  cachedAccount = updated;
  cachedAccountRaw = raw;
  localStorage.setItem(ACCOUNT_KEY, raw);

  // If the status is not confirmed, end any active session.
  if (status !== "confirmed") {
    clearStudentSession();
  } else if (cachedSession) {
    // Keep the session status in sync for confirmed users.
    saveStudentSession(updated.name, status);
  }
  notifyAuthChange();
}

// Internal helper to save a confirmed session.
function saveStudentSession(name: string, status: StudentStatus) {
  if (typeof window === "undefined") return;
  const session: StudentSession = {
    name: name.trim(),
    status,
  };
  const raw = JSON.stringify(session);
  cachedSession = session;
  cachedSessionRaw = raw;
  localStorage.setItem(SESSION_KEY, raw);
}

// Remove the saved student session.
export function clearStudentSession() {
  if (typeof window === "undefined") return;
  cachedSession = null;
  cachedSessionRaw = null;
  localStorage.removeItem(SESSION_KEY);
}

// Attempt a login using the stored account. Only confirmed accounts can sign in.
export function attemptLogin(name: string, password: string): {
  success: boolean;
  error?: string;
} {
  const account = getStoredStudentAccount();
  if (!account) {
    return { success: false, error: "Немає збереженого акаунта. Спершу зареєструйтеся." };
  }

  if (account.status === "pending") {
    return { success: false, error: "Ваш акаунт очікує перевірки адміністратором. Вхід поки заблоковано." };
  }

  if (account.status === "rejected") {
    return { success: false, error: "На жаль, акаунт відхилено. Зв’яжіться з адміністратором для деталей." };
  }

  const isValid =
    account.name === name.trim() && account.password === password.trim() && account.status === "confirmed";

  if (!isValid) {
    return { success: false, error: "Дані не збігаються з підтвердженим акаунтом." };
  }

  saveStudentSession(account.name, account.status);
  notifyAuthChange();
  return { success: true };
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
