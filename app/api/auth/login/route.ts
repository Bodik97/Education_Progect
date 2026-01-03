export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createSession, isValidEmail, loginUser, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  if (!password) return NextResponse.json({ ok: false, error: "Password required" }, { status: 400 });

  try {
    const user = await loginUser(email, password);
    const { token } = await createSession(user.id);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message ?? "Login failed" }, { status: 401 });
  }
}
