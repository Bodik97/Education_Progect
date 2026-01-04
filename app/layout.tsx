import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "EduPlatform LMS",
  description: "A simple learning space for kids to explore coding basics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">{children}</main>
        <footer className="mt-8 border-t border-slate-200 bg-white/80 py-6 text-center text-sm text-slate-600">
          Built for learning: this LMS runs fully in-memory and is easy to extend.
        </footer>
      </body>
    </html>
  );
}
