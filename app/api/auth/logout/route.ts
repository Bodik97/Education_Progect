import { NextResponse } from "next/server";

export async function POST() {
  // Client removes session from localStorage; server just confirms the action.
  return NextResponse.json({ ok: true });
}
