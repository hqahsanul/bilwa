import Link from "next/link";
import type { ReactNode } from "react";
import { DitheredFooter } from "@/components/dithered-footer";

type LegalSection = {
  title: string;
  body: ReactNode;
};

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 sm:px-8">
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            NineBeam
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Legal navigation">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/refund" className="hover:text-foreground">Refunds</Link>
            <Link href="/" className="hidden hover:text-foreground sm:inline">Back to home</Link>
          </nav>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">NineBeam legal</p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">{intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: October 14, 2026</p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              <div className="mt-3 space-y-3 leading-7 text-muted-foreground">{section.body}</div>
            </section>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-6 text-sm text-muted-foreground">
          Questions? Contact us at{" "}
          <a className="text-foreground underline underline-offset-4" href="mailto:legal@postpuls.com">
            legal@postpuls.com
          </a>
          .
        </div>
      </article>
      <DitheredFooter
        legal={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
          { label: "Refund Policy", href: "/refund" },
        ]}
      />
    </main>
  );
}
