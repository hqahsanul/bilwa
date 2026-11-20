"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Filter,
  FolderKanban,
  ListChecks,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "rgb(53, 86, 250)";
const SECTION_BG = "#F7F8FA";
const HEADING = "#0A1128";
const BODY = "#6B7280";
const BORDER = "#E5E7EB";

const STEPS = [
  {
    step: "01",
    icon: UserPlus,
    title: "Capture every lead",
    description:
      "Pull leads from WhatsApp, voice, web forms, and campaigns into one workspace — with source, owner, and stage attached from day one.",
  },
  {
    step: "02",
    icon: FolderKanban,
    title: "Organize into groups",
    description:
      "Segment by campaign, region, product, or intent. Move leads between groups without losing history or assignment.",
  },
  {
    step: "03",
    icon: ListChecks,
    title: "Work the list",
    description:
      "Filter, assign, and follow up from a clear lead list — so agents always know who is next and what happened last.",
  },
  {
    step: "04",
    icon: Users,
    title: "Track pipeline health",
    description:
      "See conversion by stage, group volume, and owner load in one view so you know where to coach and where to staff.",
  },
] as const;

const GROUPS = [
  { name: "All leads", count: 1284, active: false },
  { name: "Hot — WhatsApp", count: 186, active: true },
  { name: "Call campaign", count: 412, active: false },
  { name: "Website forms", count: 298, active: false },
  { name: "Nurture", count: 388, active: false },
] as const;

const CHART_BARS = [
  { label: "New", value: 72 },
  { label: "Contacted", value: 58 },
  { label: "Qualified", value: 44 },
  { label: "Won", value: 28 },
] as const;

const LEADS = [
  {
    name: "Ananya Mehta",
    group: "Hot — WhatsApp",
    stage: "Qualified",
    owner: "Riya",
  },
  {
    name: "Karthik Rao",
    group: "Call campaign",
    stage: "Contacted",
    owner: "Aman",
  },
  {
    name: "Sara Khan",
    group: "Website forms",
    stage: "New",
    owner: "Neha",
  },
  {
    name: "Vikram Patel",
    group: "Hot — WhatsApp",
    stage: "Won",
    owner: "Riya",
  },
] as const;

function LeadDashboardVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-white"
      style={{
        borderColor: BORDER,
        boxShadow:
          "0 1px 2px rgb(0 0 0 / 0.04), 0 16px 40px rgb(15 23 42 / 0.08)",
      }}
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: BORDER }}
      >
        <span className="size-2.5 rounded-full bg-slate-200" />
        <span className="size-2.5 rounded-full bg-slate-200" />
        <span className="size-2.5 rounded-full bg-slate-200" />
        <div
          className="ml-3 flex flex-1 items-center gap-2 rounded-md border bg-slate-50 px-3 py-1.5 text-[11px] text-slate-400"
          style={{ borderColor: BORDER }}
        >
          <Search className="size-3.5" strokeWidth={1.8} />
          Search leads, groups, owners…
        </div>
      </div>

      <div className="grid grid-cols-[132px_minmax(0,1fr)] sm:grid-cols-[156px_minmax(0,1fr)]">
        {/* Groups rail */}
        <aside
          className="border-r bg-slate-50/80 px-2.5 py-3 sm:px-3"
          style={{ borderColor: BORDER }}
        >
          <p
            className="mb-2 px-1.5 text-[10px] font-semibold tracking-wide uppercase"
            style={{ color: BODY }}
          >
            Groups
          </p>
          <ul className="space-y-1">
            {GROUPS.map((group) => (
              <li
                key={group.name}
                className={cn(
                  "flex items-center justify-between rounded-md px-2 py-1.5 text-[11px] sm:text-[12px]",
                  group.active ? "font-semibold text-white" : "text-slate-600",
                )}
                style={
                  group.active
                    ? { backgroundColor: ACCENT }
                    : undefined
                }
              >
                <span className="truncate pr-2">{group.name}</span>
                <span
                  className={cn(
                    "tabular-nums",
                    group.active ? "text-white/80" : "text-slate-400",
                  )}
                >
                  {group.count}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main panel */}
        <div className="min-w-0 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p
                className="text-[13px] font-semibold sm:text-[14px]"
                style={{ color: HEADING }}
              >
                Lead Management
              </p>
              <p className="text-[11px]" style={{ color: BODY }}>
                Pipeline · Groups · Ownership
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-md border bg-white px-2 py-1 text-[10px] font-medium text-slate-500"
              style={{ borderColor: BORDER }}
            >
              <Filter className="size-3" strokeWidth={1.8} />
              Filters
            </span>
          </div>

          {/* KPI row */}
          <div className="mb-3 grid grid-cols-3 gap-2">
            {[
              { label: "Open leads", value: "1,284" },
              { label: "In groups", value: "5" },
              { label: "Won (7d)", value: "64" },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-md border bg-slate-50/70 px-2.5 py-2"
                style={{ borderColor: BORDER }}
              >
                <p className="text-[10px]" style={{ color: BODY }}>
                  {kpi.label}
                </p>
                <p
                  className="mt-0.5 text-[15px] font-semibold tabular-nums"
                  style={{ color: HEADING }}
                >
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className="mb-3 rounded-md border bg-white px-3 py-2.5"
            style={{ borderColor: BORDER }}
          >
            <div className="mb-2 flex items-center justify-between">
              <p
                className="text-[11px] font-semibold"
                style={{ color: HEADING }}
              >
                Pipeline by stage
              </p>
              <p className="text-[10px]" style={{ color: BODY }}>
                This week
              </p>
            </div>
            <div className="flex h-24 items-end gap-2.5 sm:gap-3">
              {CHART_BARS.map((bar) => (
                <div
                  key={bar.label}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
                >
                  <div
                    className="w-full max-w-[36px] rounded-t-sm"
                    style={{
                      height: `${bar.value}%`,
                      backgroundColor: ACCENT,
                      opacity: bar.label === "Qualified" ? 1 : 0.72,
                    }}
                  />
                  <span className="truncate text-[9px] text-slate-400 sm:text-[10px]">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead list */}
          <div
            className="overflow-hidden rounded-md border"
            style={{ borderColor: BORDER }}
          >
            <div
              className="grid grid-cols-[1.3fr_1fr_0.8fr_0.6fr] gap-2 border-b bg-slate-50 px-2.5 py-1.5 text-[9px] font-semibold tracking-wide text-slate-400 uppercase sm:text-[10px]"
              style={{ borderColor: BORDER }}
            >
              <span>Lead</span>
              <span>Group</span>
              <span>Stage</span>
              <span>Owner</span>
            </div>
            <ul>
              {LEADS.map((lead, index) => (
                <li
                  key={lead.name}
                  className="grid grid-cols-[1.3fr_1fr_0.8fr_0.6fr] gap-2 px-2.5 py-2 text-[10px] sm:text-[11px]"
                  style={{
                    borderTop: index === 0 ? undefined : `1px solid ${BORDER}`,
                    color: HEADING,
                  }}
                >
                  <span className="truncate font-medium">{lead.name}</span>
                  <span className="truncate text-slate-500">{lead.group}</span>
                  <span className="truncate">
                    <span
                      className="inline-flex rounded px-1.5 py-0.5 text-[9px] font-medium sm:text-[10px]"
                      style={{
                        backgroundColor:
                          lead.stage === "Won"
                            ? "rgb(220 252 231)"
                            : lead.stage === "Qualified"
                              ? "rgb(219 234 254)"
                              : "rgb(241 245 249)",
                        color:
                          lead.stage === "Won"
                            ? "rgb(22 101 52)"
                            : lead.stage === "Qualified"
                              ? ACCENT
                              : "rgb(71 85 105)",
                      }}
                    >
                      {lead.stage}
                    </span>
                  </span>
                  <span className="truncate text-slate-500">{lead.owner}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className={cn(
        "relative z-10 w-full overflow-hidden py-20 sm:py-28",
        className,
      )}
      style={{ backgroundColor: SECTION_BG }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D1D5DB 1.25px, transparent 1.25px)",
          backgroundSize: "18px 18px",
          opacity: 0.28,
          maskImage:
            "linear-gradient(to right, black 0%, black 50%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 50%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] lg:gap-16 sm:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <LeadDashboardVisual />
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.06,
          }}
          className="order-1 max-w-xl lg:order-2 lg:justify-self-end"
        >
          <p
            className="text-[13px] font-semibold tracking-wide uppercase"
            style={{ color: ACCENT }}
          >
            Lead Management
          </p>
          <h2
            className="mt-3 text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem]"
            style={{ color: HEADING }}
          >
            Capture, group, and convert every lead.
          </h2>
          <p
            className="mt-4 text-[16px] leading-relaxed sm:text-[17px]"
            style={{ color: BODY }}
          >
            One place for lead lists, groups, ownership, and pipeline charts —
            so growth teams move faster without losing the thread.
          </p>

          <ul className="mt-10 space-y-8">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.step}
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
                    <p
                      className="text-[16px] font-semibold"
                      style={{ color: HEADING }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-[14px] leading-relaxed sm:text-[15px]"
                      style={{ color: BODY }}
                    >
                      {item.description}
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

export default HowItWorksSection;
