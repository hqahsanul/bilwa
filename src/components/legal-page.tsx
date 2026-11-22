import Link from "next/link";
import type { ReactNode } from "react";

import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

type LegalSection = {
  title: string;
  body: ReactNode;
};

export function LegalPage({
  title,
  intro,
  sections,
  lastUpdated = "November 2026",
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  lastUpdated?: string;
}) {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <article className={cn(BILVA_SITE_SHELL_CLASS, "py-12 sm:py-16")}>
        <div className="mx-auto max-w-3xl">
        <p className="bilva-eyebrow mb-3">
          Sri Bilva Jewels
        </p>
        <h1 className="bilva-headline text-3xl sm:text-4xl">
          {title}
        </h1>
        <p className="mt-5 font-sans text-base leading-relaxed text-[#4B5754]">{intro}</p>
        <p className="mt-3 font-sans text-sm text-[#6A736F]">Last updated: {lastUpdated}</p>
        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-xl font-semibold text-[#0A2D23]">{section.title}</h2>
              <div className="mt-2 space-y-3 font-sans text-[15px] leading-relaxed text-[#4B5754]">
                {section.body}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-12 border-t border-[#EAE3D6] pt-6 font-sans text-sm text-[#4B5754]">
          Questions? Contact{" "}
          <a className="text-[#0B6B5C] underline underline-offset-2" href="mailto:care@sribilva.com">
            care@sribilva.com
          </a>{" "}
          or write to our store team at the address listed on your invoice.
        </p>
        <p className="mt-4 font-sans text-sm">
          <Link href="/" className="text-[#0B6B5C] hover:underline">
            ← Back to home
          </Link>
        </p>
        </div>
      </article>
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}