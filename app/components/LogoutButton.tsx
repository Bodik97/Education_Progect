"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-md bg-white/20 px-10 py-4 text-sm font-semibold text-white hover:bg-white/30"
    >
      Sign out
    </button>
  );
}
