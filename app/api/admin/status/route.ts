import { NextResponse } from "next/server";
import { StudentStatus, updateStudentStatus } from "@/app/lib/db";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const status = String(body.status ?? "") as StudentStatus;

  if (!email || !status) {
    return NextResponse.json({ error: "Вкажіть email та статус." }, { status: 400 });
  }

  const updated = await updateStudentStatus(email, status);
  if (!updated) {
    return NextResponse.json({ error: "Учня не знайдено." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, student: updated });
}
