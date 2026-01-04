import "server-only";

// A tiny data helper that supports a free Upstash/Vercel KV database when
// environment variables are present. If no KV credentials are configured, the
// code gracefully falls back to an in-memory store so the LMS still works
// locally and in sandboxes.

export type StudentStatus = "pending" | "confirmed" | "rejected";
export type StudentRecord = { email: string; password: string; status: StudentStatus };

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_KEY = "lms:students";

let inMemoryStudents: StudentRecord[] = [];

function hasKvConfig() {
  return Boolean(KV_URL && KV_TOKEN);
}

async function fetchFromKv<T>(path: string, options?: RequestInit): Promise<T> {
  if (!hasKvConfig()) {
    throw new Error("KV is not configured");
  }

  const response = await fetch(`${KV_URL}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`KV request failed (${response.status}): ${errorText}`);
  }

  return (await response.json()) as T;
}

async function getStudents(): Promise<StudentRecord[]> {
  if (!hasKvConfig()) {
    return [...inMemoryStudents];
  }

  const data = await fetchFromKv<{ result?: string }>(`get/${encodeURIComponent(KV_KEY)}`);
  if (!data?.result) return [];

  try {
    const parsed = JSON.parse(data.result) as StudentRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveStudents(students: StudentRecord[]): Promise<void> {
  if (!hasKvConfig()) {
    inMemoryStudents = [...students];
    return;
  }

  await fetchFromKv(`set/${encodeURIComponent(KV_KEY)}`, {
    method: "POST",
    body: JSON.stringify(JSON.stringify(students)),
  });
}

export async function registerStudent(email: string, password: string): Promise<StudentRecord> {
  const students = await getStudents();
  const existing = students.find((student) => student.email === email);
  if (existing) {
    // Update password but keep status as-is.
    existing.password = password;
  } else {
    students.push({ email, password, status: "pending" });
  }
  await saveStudents(students);
  return students.find((student) => student.email === email)!;
}

export async function listStudents(): Promise<StudentRecord[]> {
  return getStudents();
}

export async function updateStudentStatus(email: string, status: StudentStatus): Promise<StudentRecord | null> {
  const students = await getStudents();
  const target = students.find((student) => student.email === email);
  if (!target) return null;

  target.status = status;
  await saveStudents(students);
  return target;
}

export async function authenticateStudent(
  email: string,
  password: string,
): Promise<{ success: true; student: StudentRecord } | { success: false; error: string }> {
  const students = await getStudents();
  const target = students.find((student) => student.email === email);
  if (!target) {
    return { success: false, error: "Користувача не знайдено. Спершу зареєструйтеся." };
  }

  if (target.status === "pending") {
    return {
      success: false,
      error: "Ваш акаунт очікує перевірки адміністратором. Вхід поки що заблоковано.",
    };
  }

  if (target.status === "rejected") {
    return {
      success: false,
      error: "На жаль, заявку відхилено. Зв’яжіться з адміністратором для деталей.",
    };
  }

  if (target.password !== password) {
    return { success: false, error: "Пароль не збігається. Спробуйте ще раз." };
  }

  return { success: true, student: target };
}
