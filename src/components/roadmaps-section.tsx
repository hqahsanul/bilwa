"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Bot,
  Clock,
  Megaphone,
  MessageSquare,
  Paperclip,
  PhoneCall,
  Rocket,
  Send,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "rgb(53, 86, 250)";
const SECTION_BG = "#F7F8FA";
const HEADING = "#0A1128";
const BODY = "#6B7280";
const BORDER = "#E5E7EB";

const FEATURES = [
  {
    icon: Megaphone,
    title: "Launch across every channel",
    description:
      "Run templated WhatsApp broadcasts, AI Voice dialers, and SMS reminders from one campaign board — without juggling separate tools.",
  },
  {
    icon: Bot,
    title: "AI handles replies, humans close",
    description:
      "Every response lands in your unified inbox with full campaign context. Let AI qualify intent and escalate ready buyers to your team.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in pacing, retries, and DNC",
    description:
      "Control batch sizes, quiet hours, and retry logic per tenant so every campaign stays compliant and keeps delivery rates high.",
  },
] as const;

type CampaignItem = {
  audience: number;
  title: string;
  description: string;
  tag: "WhatsApp" | "AI Voice";
  replies?: number;
};

const SCHEDULED: CampaignItem[] = [
  {
    audience: 480,
    title: "Q4 Renewal Follow-up",
    description: "Automated WhatsApp templates with AI reply routing for expiring plans.",
    tag: "WhatsApp",
    replies: 42,
  },
  {
    audience: 210,
    title: "Missed-Call Callback Flow",
    description: "AI Voice outbound retries within 5 minutes with instant human takeover.",
    tag: "AI Voice",
    replies: 18,
  },
  {
    audience: 145,
    title: "Appointment Reminders",
    description: "24-hour WhatsApp and SMS confirmations tied to round-robin hosts.",
    tag: "WhatsApp",
    replies: 11,
  },
];

const LIVE_NOW: CampaignItem[] = [
  {
    audience: 320,
    title: "Inbound Lead Qualification",
    description: "Instant AI Voice & WhatsApp outreach for every new demo request.",
    tag: "AI Voice",
    replies: 64,
  },
  {
    audience: 184,
    title: "Win-Back Re-engagement",
    description: "Segmented multi-step sequence for dormant leads across WhatsApp and SMS.",
    tag: "WhatsApp",
    replies: 29,
  },
];

function Tag({ type }: { type: CampaignItem["tag"] }) {
  const styles =
    type === "WhatsApp"
      ? { backgroundColor: "#D1FAE5", color: "#059669" }
      : { backgroundColor: "#DBEAFE", color: ACCENT };
  return (
    <span
      className="inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium"
      style={styles}
    >
      {type}
    </span>
  );
}

function CampaignCard({ item }: { item: CampaignItem }) {
  const ChannelIcon = item.tag === "AI Voice" ? PhoneCall : Send;

  return (
    <div
      className="rounded-md border bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0_/_0.04)]"
      style={{ borderColor: BORDER }}
    >
      <div className="flex gap-2.5">
        <div
          className="flex w-9 shrink-0 flex-col items-center rounded-md border bg-white py-1.5"
          style={{ borderColor: BORDER }}
        >
          <ChannelIcon className="size-3.5" style={{ color: BODY }} />
          <span className="mt-0.5 text-[12px] font-semibold" style={{ color: HEADING }}>
            {item.audience}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold" style={{ color: HEADING }}>
            {item.title}
          </p>
          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed" style={{ color: BODY }}>
            {item.description}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Tag type={item.tag} />
            <span className="ml-auto inline-flex items-center gap-2 text-[11px]" style={{ color: BODY }}>
              <span className="inline-flex items-center gap-0.5">
                <MessageSquare className="size-3" />
                {item.replies ?? 0}
              </span>
              <Paperclip className="size-3 opacity-70" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignsBoardMock() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border bg-white"
      style={{
        borderColor: BORDER,
        boxShadow: "0 1px 2px rgb(0 0 0 / 0.04), 0 10px 28px rgb(15 23 42 / 0.07)",
      }}
    >
      <div className="px-4 pt-4 sm:px-5">
        <p className="text-[15px] font-semibold">
          <span style={{ color: ACCENT }}>NineBeam</span>{" "}
          <span style={{ color: BODY }}>Campaigns</span>
        </p>
        <div className="mt-3 flex gap-5 border-b text-[13px]" style={{ borderColor: BORDER }}>
          {[
            { label: "Campaigns", active: true },
            { label: "Templates", active: false },
            { label: "Analytics", active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              tabIndex={-1}
              className="relative pb-2.5 font-medium"
              style={{ color: tab.active ? HEADING : BODY }}
            >
              {tab.label}
              {tab.active ? (
                <span
                  className="absolute inset-x-0 -bottom-px h-0.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4">
        <div className="rounded-t-lg bg-[#F9FAFB] p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: HEADING }}>
              <Clock className="size-3.5 text-amber-500" />
              Scheduled / Queued
            </p>
            <span className="text-[12px]" style={{ color: BODY }}>
              12 queued
            </span>
          </div>
          <div className="max-h-[320px] space-y-2.5 overflow-hidden pr-1">
            {SCHEDULED.map((item) => (
              <CampaignCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="rounded-t-lg bg-[#F9FAFB] p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: HEADING }}>
              <Rocket className="size-3.5 text-red-500" />
              Live Now
            </p>
            <span className="text-[12px]" style={{ color: BODY }}>
              2 active
            </span>
          </div>
          <div className="space-y-2.5">
            {LIVE_NOW.map((item) => (
              <CampaignCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoadmapsSection({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="campaigns"
      className={cn("relative overflow-hidden pt-20 sm:pt-24", className)}
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Left dotted field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[62%]"
        style={{
          backgroundImage: "radial-gradient(circle, #D1D5DB 1.25px, transparent 1.25px)",
          backgroundSize: "18px 18px",
          opacity: 0.55,
        }}
      />
      {/* Right white panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] bg-white lg:block"
      />
      {/* Soft fade into No coding section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${SECTION_BG} 88%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 z-[1] hidden h-36 w-[38%] lg:block"
        style={{
          background: "linear-gradient(to bottom, rgb(255 255 255) 0%, rgb(255 255 255 / 0) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto grid max-w-7xl items-center gap-12 px-6 pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 sm:px-10 sm:pb-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <CampaignsBoardMock />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="max-w-xl lg:justify-self-start"
        >
          <h2
            className="text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem]"
            style={{ color: HEADING }}
          >
            Campaigns that reach every customer on time
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed sm:text-[17px]" style={{ color: BODY }}>
            Coordinate outbound WhatsApp, AI Voice, SMS, and IVR outreach from one board. Schedule
            batches, respect calling windows, and hand warm replies straight to your agents.
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
                    <Icon className="size-6" strokeWidth={1.7} />
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
      </div>
    </section>
  );
}
