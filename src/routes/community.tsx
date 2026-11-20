import Link from "next/link";

function CommunityPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-semibold">← PostPuls</Link>
        <div className="mt-20">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Community</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Build in public with PostPuls.</h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Share signal, learn from other creators, and improve your timing together.
          </p>
          <a href="/signup" className="mt-8 inline-flex rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background">
            Join PostPuls
          </a>
        </div>
      </div>
    </main>
  );
}

export default CommunityPage;
