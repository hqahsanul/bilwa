"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CalendarClock,
  ShieldCheck,
  UserCog,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "rgb(53, 86, 250)";
const SECTION_BG = "#FFFFFF";
const HEADING = "#0A1128";
const BODY = "#6B7280";
const BORDER = "#E5E7EB";

const STEPS = [
  {
    step: "01",
    icon: UsersRound,
    title: "Build your roster",
    description:
      "Invite agents and supervisors once, then keep profiles, skills, and channel access in a single team directory.",
  },
  {
    step: "02",
    icon: ShieldCheck,
    title: "Assign roles safely",
    description:
      "Control who can manage leads, campaigns, and settings with clear roles — so operations stay fast without oversharing.",
  },
  {
    step: "03",
    icon: CalendarClock,
    title: "See who’s available",
    description:
      "Track online, on break, and off-shift status so routing and handoffs match real capacity, not guesswork.",
  },
  {
    step: "04",
    icon: UserCog,
    title: "Balance the load",
    description:
      "Watch open chats, tickets, and lead ownership per agent so managers can redistribute work before queues spike.",
  },
] as const;

const MEMBERS = [
  {
    name: "Riya Sharma",
    role: "Supervisor",
    status: "Online",
    load: "6 open",
    channels: "WA · Voice",
  },
  {
    name: "Aman Verma",
    role: "Agent",
    status: "On break",
    load: "2 open",
    channels: "Inbox",
  },
  {
    name: "Neha Kapoor",
    role: "Agent",
    status: "Online",
    load: "9 open",
    channels: "WA · Tickets",
  },
  {
    name: "Karthik Iyer",
    role: "Agent",
    status: "Offline",
    load: "0 open",
    channels: "Voice",
  },
] as const;

const ROLE_CARDS = [
  { label: "Supervisors", count: 4 },
  { label: "Agents", count: 28 },
  { label: "Online now", count: 17 },
] as const;

function statusStyles(status: string) {
  if (status === "Online") {
    return { bg: "rgb(220 252 231)", color: "rgb(22 101 52)" };
  }
  if (status === "On break") {
    return { bg: "rgb(254 243 199)", color: "rgb(146 64 14)" };
  }
  return { bg: "rgb(241 245 249)", color: "rgb(71 85 105)" };
}

function TeamDashboardVisual() {
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
      <div
        className="flex items-center justify-between gap-3 border-b px-4 py-3"
        style={{ borderColor: BORDER }}
      >
        <div>
          <p
            className="text-[13px] font-semibold sm:text-[14px]"
            style={{ color: HEADING }}
          >
            Team Management
          </p>
          <p className="text-[11px]" style={{ color: BODY }}>
            Roster · Roles · Availability
          </p>
        </div>
        <span
          className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-semibold text-white"
          style={{ backgroundColor: ACCENT }}
        >
          Invite member
        </span>
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-3 grid grid-cols-3 gap-2">
          {ROLE_CARDS.map((card) => (
            <div
              key={card.label}
              className="rounded-md border bg-slate-50/70 px-2.5 py-2"
              style={{ borderColor: BORDER }}
            >
              <p className="text-[10px]" style={{ color: BODY }}>
                {card.label}
              </p>
              <p
                className="mt-0.5 text-[15px] font-semibold tabular-nums"
                style={{ color: HEADING }}
              >
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {/* Shift strip */}
        <div
          className="mb-3 rounded-md border px-3 py-2.5"
          style={{ borderColor: BORDER }}
        >
          <div className="mb-2 flex items-center justify-between">
            <p
              className="text-[11px] font-semibold"
              style={{ color: HEADING }}
            >
              Today’s coverage
            </p>
            <p className="text-[10px]" style={{ color: BODY }}>
              09:00 – 21:00 IST
            </p>
          </div>
          <div className="flex h-8 overflow-hidden rounded-sm bg-slate-100">
            <div className="w-[28%]" style={{ backgroundColor: ACCENT, opacity: 0.85 }} />
            <div className="w-[22%]" style={{ backgroundColor: ACCENT, opacity: 0.55 }} />
            <div className="w-[18%] bg-amber-300/80" />
            <div className="w-[20%]" style={{ backgroundColor: ACCENT, opacity: 0.4 }} />
            <div className="w-[12%] bg-slate-200" />
          </div>
          <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm" style={{ backgroundColor: ACCENT }} />
              Staffed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-amber-300" />
              Breaks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-slate-200" />
              Uncovered
            </span>
          </div>
        </div>

        {/* Member list */}
        <div
          className="overflow-hidden rounded-md border"
          style={{ borderColor: BORDER }}
        >
          <div
            className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.7fr] gap-2 border-b bg-slate-50 px-2.5 py-1.5 text-[9px] font-semibold tracking-wide text-slate-400 uppercase sm:grid-cols-[1.5fr_0.9fr_0.85fr_0.7fr_0.85fr] sm:text-[10px]"
            style={{ borderColor: BORDER }}
          >
            <span>Member</span>
            <span>Role</span>
            <span>Status</span>
            <span>Load</span>
            <span className="hidden sm:inline">Channels</span>
          </div>
          <ul>
            {MEMBERS.map((member, index) => {
              const tone = statusStyles(member.status);
              return (
                <li
                  key={member.name}
                  className="grid grid-cols-[1.4fr_0.9fr_0.8fr_0.7fr] gap-2 px-2.5 py-2 text-[10px] sm:grid-cols-[1.5fr_0.9fr_0.85fr_0.7fr_0.85fr] sm:text-[11px]"
                  style={{
                    borderTop: index === 0 ? undefined : `1px solid ${BORDER}`,
                    color: HEADING,
                  }}
                >
                  <span className="flex min-w-0 items-center gap-2 truncate font-medium">
                    <span
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span className="truncate">{member.name}</span>
                  </span>
                  <span className="truncate text-slate-500">{member.role}</span>
                  <span className="truncate">
                    <span
                      className="inline-flex rounded px-1.5 py-0.5 text-[9px] font-medium sm:text-[10px]"
                      style={{ backgroundColor: tone.bg, color: tone.color }}
                    >
                      {member.status}
                    </span>
                  </span>
                  <span className="truncate tabular-nums text-slate-500">
                    {member.load}
                  </span>
                  <span className="hidden truncate text-slate-500 sm:inline">
                    {member.channels}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TeamManagementSection({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="team-management"
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
          opacity: 0.22,
          maskImage:
            "linear-gradient(to left, black 0%, black 50%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 50%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-16 sm:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 max-w-xl"
        >
          <p
            className="text-[13px] font-semibold tracking-wide uppercase"
            style={{ color: ACCENT }}
          >
            Team Management
          </p>
          <h2
            className="mt-3 text-[2rem] leading-[1.15] font-bold tracking-tight sm:text-[2.5rem]"
            style={{ color: HEADING }}
          >
            Keep roles, shifts, and capacity in sync.
          </h2>
          <p
            className="mt-4 text-[16px] leading-relaxed sm:text-[17px]"
            style={{ color: BODY }}
          >
            Give every agent a clear seat — with roles, availability, and
            workload visible so customer work lands with the right person.
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

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.06,
          }}
          className="order-2"
        >
          <TeamDashboardVisual />
        </motion.div>
      </div>
    </section>
  );
}

export default TeamManagementSection;
