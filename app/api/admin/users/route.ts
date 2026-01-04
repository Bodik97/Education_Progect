import { NextResponse } from "next/server";
import { listStudents } from "@/app/lib/db";

export async function GET() {
  const students = await listStudents();
  return NextResponse.json({ students });
}
