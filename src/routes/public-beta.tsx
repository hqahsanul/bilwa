import Link from "next/link";

function PublicBetaPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-semibold">← PostPuls</Link>
        <div className="mt-20">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Public beta</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Get early access to PostPuls.</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Find breakout conversations, draft sharper replies, and join the conversation at the right time.
          </p>
          <a href="/signup" className="mt-8 inline-flex rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background">
            Create an account
          </a>
        </div>
      </div>
    </main>
  );
}

export default PublicBetaPage;
