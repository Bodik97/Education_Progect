import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { readSessions, readUsers, writeSessions, writeUsers, type User } from "./store";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 днів

export const SESSION_COOKIE = "lms_session";

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function registerUser(email: string, password: string): Promise<User> {
  const users = await readUsers();

  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(password, 10);

  const user: User = {
    id: randomUUID(),
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeUsers(users);
  return user;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const users = await readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("Invalid email or password");

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new Error("Invalid email or password");

  return user;
}

export async function createSession(userId: string) {
  const sessions = await readSessions();

  const token = randomUUID();
  const expiresAt = Date.now() + SESSION_TTL_MS;

  sessions.push({ token, userId, expiresAt });
  await writeSessions(sessions);

  return { token, expiresAt };
}

export async function deleteSession(token: string) {
  const sessions = await readSessions();
  const next = sessions.filter((s) => s.token !== token);
  await writeSessions(next);
}

export async function getUserBySession(token: string | undefined | null) {
  if (!token) return null;

  const sessions = await readSessions();
  const session = sessions.find((s) => s.token === token);
  if (!session) return null;

  if (session.expiresAt < Date.now()) {
    await deleteSession(token);
    return null;
  }

  const users = await readUsers();
  return users.find((u) => u.id === session.userId) ?? null;
}
