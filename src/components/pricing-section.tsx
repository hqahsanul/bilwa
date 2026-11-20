"use client";

import { Check, PlusIcon, ShieldCheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BorderTrail } from "@/components/ui/border-trail";
import { cn } from "@/lib/utils";

/** Produktly CTA palette */
const CTA_BLUE = "rgb(53, 86, 250)";
const CTA_BORDER = "#E2E8F0";

const FEATURES = [
  "Unified inbox for WhatsApp, webchat, and tickets",
  "AI voice for inbound and outbound journeys",
  "WhatsApp campaigns with reply tracking",
  "Workflow automation and escalation rules",
  "Knowledge-backed answers with safety checks",
  "Team roles, shifts, and capacity-aware assignment",
  "Live dashboards for ops and growth metrics",
  "Multi-tenant ready for brands and teams",
  "Dedicated onboarding with your NineBeam specialist",
];

function CornerPlus({ className }: { className?: string }) {
  return (
    <PlusIcon
      className={cn(
        "pointer-events-none absolute z-20 size-5.5 -translate-x-1/2 -translate-y-1/2 text-foreground",
        className,
      )}
      strokeWidth={1.5}
      aria-hidden
    />
  );
}

export function PricingSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("relative min-h-screen border-t border-border py-24", className)}
    >
      <div id="pricing" className="mx-auto w-full max-w-7xl space-y-8 px-4 scroll-mt-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl space-y-5"
        >
          <div className="flex justify-center">
            <div className="rounded-lg border px-4 py-1 font-mono text-sm">Pricing</div>
          </div>
          <h2 className="mt-5 text-center text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl">
            Pricing Built Around Your Team
          </h2>
          <p className="mt-5 text-center text-sm text-muted-foreground md:text-base">
            We don&apos;t publish a fixed price list. Every NineBeam rollout depends on channels,
            volume, and how your teams operate — so we map a package with you first.
          </p>
        </motion.div>

        <div className="relative isolate py-10 sm:py-14">
          {/* Efferd-style grid — isolate keeps it above the page bg */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 z-0",
              "bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_18%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_18%,transparent)_1px,transparent_1px)]",
              "bg-[size:32px_32px]",
              "[mask-image:radial-gradient(ellipse_at_center,black,transparent)]",
              "[-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent)]",
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative z-10 mx-auto w-full max-w-5xl space-y-2"
          >
            <div className="relative grid border bg-background p-4 md:grid-cols-2">
              {/* Center of each + sits exactly on the border corner */}
              <CornerPlus className="left-0 top-0" />
              <CornerPlus className="left-full top-0" />
              <CornerPlus className="left-0 top-full" />
              <CornerPlus className="left-full top-full" />

              {/* Features */}
              <div className="w-full px-4 pb-4 pt-5 md:px-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold leading-none">Everything included</h3>
                    <Badge variant="secondary">Full platform</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    One engagement platform — channels, AI, and ops in a single tenant.
                  </p>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-snug text-foreground"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact for pricing */}
              <div className="relative w-full rounded-lg border px-4 pb-4 pt-5 md:px-6">
                <BorderTrail
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                  }}
                  size={100}
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold leading-none">Custom pricing</h3>
                    <Badge>Talk with us</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Tell us your channels and team size — we&apos;ll share a clear quote.
                  </p>
                </div>
                <div className="mt-10 space-y-4">
                  <div className="flex items-end gap-1 text-xl text-muted-foreground">
                    <span className="-mb-0.5 text-4xl font-extrabold tracking-tighter text-foreground md:text-5xl">
                      Contact
                    </span>
                    <span className="pb-1 text-sm">for pricing</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    30-minute walkthrough · No login required · Calendar invite after booking
                  </p>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href="/request-demo"
                      className="inline-flex h-11 flex-1 items-center justify-center rounded px-5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: CTA_BLUE }}
                    >
                      Try for free
                    </a>
                    <a
                      href="/request-demo"
                      className="inline-flex h-11 flex-1 items-center justify-center rounded border bg-white px-5 text-[15px] font-medium transition-colors hover:bg-slate-50"
                      style={{ borderColor: CTA_BORDER, color: CTA_BLUE }}
                    >
                      See live demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-2 text-sm text-muted-foreground">
              <ShieldCheckIcon className="size-4" />
              <span>Access to all features with no hidden fees</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
