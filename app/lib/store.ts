import fs from "fs/promises";
import path from "path";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type Session = {
  token: string;
  userId: string;
  expiresAt: number;
};

const dataDir = path.join(process.cwd(), ".data");
const usersPath = path.join(dataDir, "users.json");
const sessionsPath = path.join(dataDir, "sessions.json");

async function ensureFiles() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(usersPath);
  } catch {
    await fs.writeFile(usersPath, "[]", "utf8");
  }

  try {
    await fs.access(sessionsPath);
  } catch {
    await fs.writeFile(sessionsPath, "[]", "utf8");
  }
}

export async function readUsers(): Promise<User[]> {
  await ensureFiles();
  return JSON.parse(await fs.readFile(usersPath, "utf8"));
}

export async function writeUsers(users: User[]) {
  await ensureFiles();
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2), "utf8");
}

export async function readSessions(): Promise<Session[]> {
  await ensureFiles();
  return JSON.parse(await fs.readFile(sessionsPath, "utf8"));
}

export async function writeSessions(sessions: Session[]) {
  await ensureFiles();
  await fs.writeFile(sessionsPath, JSON.stringify(sessions, null, 2), "utf8");
}
