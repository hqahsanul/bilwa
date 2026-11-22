"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6 text-[#0A2D23]">
      <div className="w-full max-w-md text-center">
        <p className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#B07A24]">
          Sri Bilva Jewels
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-4 font-sans text-[15px] leading-relaxed text-[#4B5754]">
          This page failed to load. Try again, or return home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-[3px] bg-[#025342] px-6 py-3 font-sans text-sm font-medium text-white transition hover:bg-[#014134]"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-[3px] border border-[#C9DAD4] bg-white px-6 py-3 font-sans text-sm font-medium text-[#0A2D23] transition hover:border-[#387C71]"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}