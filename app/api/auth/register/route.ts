import { NextResponse } from "next/server";
import { registerStudent } from "@/app/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Вкажіть email/логін та пароль." }, { status: 400 });
  }

  const student = await registerStudent(email, password);
  return NextResponse.json({
    ok: true,
    student,
    message: "Акаунт створено зі статусом 'Очікує перевірки'. Чекайте рішення адміністратора.",
  });
}
