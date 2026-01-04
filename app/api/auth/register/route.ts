export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createSession, isValidEmail, registerUser, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ ok: false, error: "Password must be 6+ chars" }, { status: 400 });

  try {
    const user = await registerUser(email, password);
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
    return NextResponse.json({ ok: false, error: e.message ?? "Register failed" }, { status: 400 });
  }
}
