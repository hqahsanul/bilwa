"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

/** Exact Produktly accent */
const ACCENT = "rgb(53, 86, 250)";
const SECTION_BG = "#F7F8FA";
const HEADING = "#0A1128";
const BODY = "#6B7280";
const META = "#4B5563";
const BORDER = "#E5E7EB";
const BTN_TEXT = "#111827";

function IconRocket({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 16.5c1.2-.15 3.1-.05 4.35 1.2 1.2 1.2 1.35 3.1 1.2 4.3M9.5 14.5l-2.2 2.2M14.5 9.5l2.2-2.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 14.8c-1.9-1.9-2.5-5.6-1.2-9.3 3.7-1.3 7.4-.7 9.3 1.2 1.9 1.9 2.5 5.6 1.2 9.3-3.7 1.3-7.4.7-9.3-1.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="14.2" cy="9.8" r="1.35" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M5.2 18.8c.35.9.95 1.55 1.85 1.95M5.2 18.8c.9-.35 1.55-.95 1.95-1.85"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShieldCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.25 5.75 5.6v5.05c0 4.05 2.65 7.75 6.25 8.9 3.6-1.15 6.25-4.85 6.25-8.9V5.6L12 3.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9.1 12.05 1.9 1.9 3.9-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBolt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13.2 3.5 7 13.25h4.35L10.8 20.5 17 10.75h-4.35L13.2 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const FEATURES = [
  {
    icon: IconRocket,
    title: "Visual no-code flow builder",
    description:
      "Build WhatsApp journeys, AI voice scripts, and escalation rules with our visual editor. Ship flow updates on your own schedule, no developer needed.",
  },
  {
    icon: IconShieldCheck,
    title: "Test with guardrails before launch",
    description:
      "Preview prompts, knowledge-base answers, and agent handoffs before customers see them. Publish confidently knowing every step behaves as intended.",
  },
  {
    icon: IconBolt,
    title: "Connect channels in minutes",
    description:
      "Connect WhatsApp, voice numbers, or drop a single NineBeam webchat snippet onto your site to go live in under 5 minutes.",
  },
] as const;

function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{
        backgroundImage: "radial-gradient(circle, #D1D5DB 1px, transparent 1px)",
        backgroundSize: "14px 14px",
        opacity: 0.55,
      }}
    />
  );
}

function OutlineButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-md border bg-white px-3 text-[13px] font-medium whitespace-nowrap shadow-none",
        className,
      )}
      style={{ borderColor: BORDER, color: BTN_TEXT }}
    >
      {children}
    </button>
  );
}

function BuilderMock() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border bg-white"
      style={{
        borderColor: BORDER,
        boxShadow: "0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px rgb(15 23 42 / 0.06)",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
        style={{ borderColor: BORDER }}
      >
        <p className="text-[15px] font-semibold" style={{ color: HEADING }}>
          NineBeam lead qualification
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-emerald-50 px-3 text-[13px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Published
          </span>
          <OutlineButton>Unpublish</OutlineButton>
          <OutlineButton>Save as Template</OutlineButton>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 sm:px-5"
        style={{ borderColor: BORDER }}
      >
        <OutlineButton className="gap-1.5">
          <Pencil className="size-3.5" strokeWidth={2} />
          Edit flow settings
        </OutlineButton>
        <div
          className="inline-flex h-8 overflow-hidden rounded-md border bg-white"
          style={{ borderColor: BORDER }}
        >
          <span
            className="inline-flex h-full items-center px-3 text-[13px] font-medium text-white"
            style={{ backgroundColor: ACCENT }}
          >
            English
          </span>
          <span
            className="inline-flex h-full items-center border-l px-3 text-[13px] font-medium"
            style={{ borderColor: BORDER, color: BODY }}
          >
            Hindi
          </span>
        </div>
      </div>

      <div className="grid min-h-[300px] grid-cols-1 md:grid-cols-[220px_1fr]">
        {/* Steps sidebar timeline */}
        <div
          className="border-b px-4 py-4 md:border-r md:border-b-0 sm:px-5"
          style={{ borderColor: BORDER }}
        >
          <p className="mb-5 text-[15px] font-bold" style={{ color: HEADING }}>
            Steps
          </p>
          <div className="relative">
            {/* Line centered on 18px nodes (left = (18-3)/2 = 7.5px) */}
            <div
              aria-hidden
              className="absolute top-[8px] bottom-0 left-[7.5px] w-[3px]"
              style={{ backgroundColor: ACCENT }}
            />
            <ol className="relative m-0 list-none p-0">
              {[
                {
                  label: "Greet & capture intent",
                  meta: "ai_message",
                  filled: true,
                },
                {
                  label: "Verify FAQ & policy",
                  meta: "knowledge_rag",
                  filled: false,
                },
                {
                  label: "Book slot or handoff",
                  meta: "transfer_agent",
                  filled: false,
                },
              ].map((step, index, all) => (
                <li
                  key={step.label}
                  className={cn("relative flex gap-3", index < all.length - 1 ? "pb-6" : "pb-4")}
                >
                  <span
                    className="relative z-10 mt-0.5 size-[18px] shrink-0 rounded-full"
                    style={
                      step.filled
                        ? { backgroundColor: ACCENT }
                        : {
                            backgroundColor: "#ffffff",
                            boxShadow: `inset 0 0 0 3px ${ACCENT}`,
                          }
                    }
                  />
                  <div className="min-w-0">
                    <p className="text-[14px] leading-snug font-semibold" style={{ color: HEADING }}>
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug" style={{ color: META }}>
                      {step.meta}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
          <label className="block space-y-1.5">
            <span className="text-[13px] font-medium" style={{ color: BODY }}>
              Title
            </span>
            <div
              className="flex h-10 items-center rounded-md border bg-white px-3 text-[14px]"
              style={{ borderColor: BORDER, color: HEADING }}
            >
              Greet &amp; capture intent
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-[13px] font-medium" style={{ color: BODY }}>
              Type
            </span>
            <div
              className="flex h-10 items-center justify-between rounded-md border bg-white px-3 text-[14px]"
              style={{ borderColor: BORDER, color: HEADING }}
            >
              <span>AI Message (WhatsApp &amp; Voice)</span>
              <ChevronDown className="size-4" style={{ color: BODY }} />
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-[13px] font-medium" style={{ color: BODY }}>
              Content
            </span>
            <div
              className="min-h-[96px] rounded-md border bg-white px-3 py-2.5 text-[14px] leading-relaxed"
              style={{ borderColor: BORDER, color: HEADING }}
            >
              Hi! Welcome to NineBeam. Are you looking to book a demo, check an update, or speak
              with our support team?
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export function NoCodeSection({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="no-code"
      className={cn("relative overflow-hidden pt-6 pb-20 sm:pt-8 sm:pb-24", className)}
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Continues the roadmaps dotted field, fading out toward the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #D1D5DB 1.25px, transparent 1.25px)",
          backgroundSize: "18px 18px",
          opacity: 0.35,
          maskImage: "linear-gradient(to right, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 55%, transparent 92%)",
        }}
      />
      <DotGrid className="top-6 left-6 h-40 w-44 opacity-40 sm:h-52 sm:w-56" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-14 lg:items-center sm:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <h2
            className="text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem]"
            style={{ color: HEADING }}
          >
            No coding skills needed
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed sm:text-[17px]" style={{ color: BODY }}>
            Create, test, and publish AI conversation and voice flows without writing any code.
            Connect your channels and go live in 5 minutes.
          </p>

          <ul className="mt-10 space-y-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.li
                  key={feature.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.4,
                    delay: reduceMotion ? 0 : 0.06 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex gap-3.5"
                >
                  <span
                    className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-md text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold" style={{ color: HEADING }}>
                      {feature.title}
                    </p>
                    <p className="mt-1 text-[14px] leading-relaxed sm:text-[15px]" style={{ color: BODY }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <BuilderMock />
        </motion.div>
      </div>
    </section>
  );
}
