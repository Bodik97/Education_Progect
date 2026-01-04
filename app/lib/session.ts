import { cookies } from "next/headers";
import { getUserBySession, SESSION_COOKIE } from "./auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return getUserBySession(token);
}
