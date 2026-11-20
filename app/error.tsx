"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-6 text-white">
      <div className="w-full max-w-[696px] rounded-[22px] border border-white/10 bg-[#111111] px-9 py-9 shadow-2xl sm:px-9 sm:py-10">
        <h1 className="text-[27px] font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-5 max-w-[560px] text-[21px] leading-8 text-white/80">
          The page failed to render. Try again, or reload if the problem persists.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-2xl bg-white px-5 py-3 text-[18px] font-medium text-black transition hover:bg-white/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-2xl border border-white/15 px-5 py-3 text-[18px] font-medium text-white transition hover:bg-white/10"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
