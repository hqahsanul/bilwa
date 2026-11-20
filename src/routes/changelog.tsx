import Link from "next/link";

function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-semibold">← PostPuls</Link>
        <div className="mt-20">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Changelog</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">What’s new in PostPuls.</h1>
          <article className="mt-10 border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">May 2024</p>
            <h2 className="mt-2 text-xl font-semibold">Command radar preview</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Added breakout conversation scoring, reply headroom, and voice-matched draft angles.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}

export default ChangelogPage;
