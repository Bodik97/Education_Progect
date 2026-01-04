import { NextResponse } from "next/server";
import { authenticateStudent } from "@/app/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Вкажіть email/логін та пароль." }, { status: 400 });
  }

  const result = await authenticateStudent(email, password);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  return NextResponse.json({ ok: true, student: result.student });
}
