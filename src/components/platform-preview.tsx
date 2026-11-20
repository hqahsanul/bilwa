"use client";

import { useMemo, useState } from "react";
import {
  Inbox,
  MessageCircle,
  Phone,
  Ticket,
  Megaphone,
  Search,
  MoreHorizontal,
  Send,
  Bot,
  Clock3,
  CheckCheck,
  UserRound,
  Headphones,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const ACCENT = "rgb(53, 86, 250)";

type Channel = "whatsapp" | "webchat" | "voice" | "ticket";

type Conversation = {
  id: string;
  name: string;
  initials: string;
  channel: Channel;
  preview: string;
  time: string;
  unread?: number;
  status: "open" | "waiting" | "resolved";
  tag?: string;
  messages: { from: "customer" | "agent" | "ai"; text: string; time: string }[];
};

const CHANNEL_META: Record<
  Channel,
  { label: string; icon: typeof MessageCircle; className: string }
> = {
  whatsapp: {
    label: "WhatsApp",
    icon: MessageCircle,
    className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  webchat: {
    label: "Webchat",
    icon: Inbox,
    className: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  voice: {
    label: "Voice",
    icon: Phone,
    className: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  },
  ticket: {
    label: "Ticket",
    icon: Ticket,
    className: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
};

const CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Riya Sharma",
    initials: "RS",
    channel: "whatsapp",
    preview: "Can I reschedule my delivery to tomorrow evening?",
    time: "2m",
    unread: 2,
    status: "open",
    tag: "Priority",
    messages: [
      {
        from: "customer",
        text: "Hi — my order #48291 was supposed to arrive today. Can I move it to tomorrow evening?",
        time: "10:12",
      },
      {
        from: "ai",
        text: "Sure, Riya. I can offer 6–8 PM tomorrow. Want me to confirm that slot?",
        time: "10:12",
      },
      {
        from: "customer",
        text: "Can I reschedule my delivery to tomorrow evening?",
        time: "10:14",
      },
    ],
  },
  {
    id: "2",
    name: "Aarav Mehta",
    initials: "AM",
    channel: "voice",
    preview: "Inbound call · billing clarification · AI handling",
    time: "5m",
    status: "waiting",
    tag: "AI voice",
    messages: [
      {
        from: "ai",
        text: "Thanks for calling NineBeam support. I can help with billing. Are you asking about invoice INV-2044?",
        time: "10:09",
      },
      {
        from: "customer",
        text: "Yes — the tax line looks higher than last month.",
        time: "10:10",
      },
      {
        from: "ai",
        text: "I see a GST adjustment from your upgraded plan. I can email a breakdown or connect you to billing.",
        time: "10:11",
      },
    ],
  },
  {
    id: "3",
    name: "Nova Labs",
    initials: "NL",
    channel: "ticket",
    preview: "Webhook retries failing after 3 attempts",
    time: "18m",
    unread: 1,
    status: "open",
    tag: "Tech",
    messages: [
      {
        from: "customer",
        text: "Our campaign webhooks are retrying and failing after 3 attempts. Status 502 from our endpoint.",
        time: "09:56",
      },
      {
        from: "agent",
        text: "Got it — checking delivery logs for tenant nova-labs. Opening a fix path now.",
        time: "10:01",
      },
    ],
  },
  {
    id: "4",
    name: "Priya Nair",
    initials: "PN",
    channel: "webchat",
    preview: "Need help connecting WhatsApp Business API",
    time: "41m",
    status: "open",
    messages: [
      {
        from: "customer",
        text: "We're stuck on WhatsApp Business API verification. Meta says business green but NineBeam still shows pending.",
        time: "09:30",
      },
      {
        from: "agent",
        text: "Usually a webhook URL mismatch. Share your Meta app ID and I'll verify the callback.",
        time: "09:34",
      },
    ],
  },
  {
    id: "5",
    name: "Orbit Retail",
    initials: "OR",
    channel: "whatsapp",
    preview: "Campaign replies synced · 128 new leads",
    time: "1h",
    status: "resolved",
    tag: "Campaign",
    messages: [
      {
        from: "ai",
        text: "Weekend sale campaign is live. 128 replies captured and routed to sales.",
        time: "09:02",
      },
      {
        from: "agent",
        text: "Nice — assigning high-intent replies to the morning shift.",
        time: "09:08",
      },
    ],
  },
];

const NAV = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 24 },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, count: 11 },
  { id: "voice", label: "AI Voice", icon: Phone, count: 3 },
  { id: "tickets", label: "Tickets", icon: Ticket, count: 7 },
  { id: "campaigns", label: "Campaigns", icon: Megaphone, count: 2 },
] as const;

export function PlatformPreview({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState(CONVERSATIONS[0].id);
  const [nav, setNav] = useState<(typeof NAV)[number]["id"]>("inbox");

  const selected = useMemo(
    () => CONVERSATIONS.find((c) => c.id === selectedId) ?? CONVERSATIONS[0],
    [selectedId],
  );

  const ChannelIcon = CHANNEL_META[selected.channel].icon;

  return (
    <section id="demo" className={cn("relative z-10 w-full px-6 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-medium tracking-tight text-foreground">
              Live Platform Preview
            </span>
          </div>

          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            One inbox for every customer conversation.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            WhatsApp, voice, webchat, and tickets in a single agent workspace — with AI assist,
            clear ownership, and SLA visibility.
          </p>
        </div>

        {/* Dashboard shell */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/5">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 hidden text-xs text-muted-foreground sm:inline">
                ninebeam.com / inbox
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5">
                <span className="size-1.5 rounded-full bg-red-500" />
                Live
              </span>
              <span className="hidden sm:inline">Tenant · Acme Support</span>
            </div>
          </div>

          <div className="grid min-h-[560px] lg:grid-cols-[200px_minmax(0,280px)_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="hidden border-r border-border bg-muted/20 p-3 lg:block">
              <div className="mb-4 flex items-center gap-2 px-2 pt-1">
                <div className="flex size-8 items-center justify-center rounded-lg bg-foreground text-sm font-bold text-background">
                  N
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none">NineBeam</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Ops workspace</p>
                </div>
              </div>

              <nav className="space-y-0.5">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const active = nav === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setNav(item.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      style={active ? { backgroundColor: ACCENT } : undefined}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                      <span className="flex-1 text-left">{item.label}</span>
                      <span
                        className={cn(
                          "rounded-sm px-1.5 text-[10px] font-medium tabular-nums",
                          active ? "bg-white/20" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 rounded-xl border border-border bg-background p-3">
                <div className="flex items-center gap-2">
                  <Headphones className="size-4 text-foreground" />
                  <p className="text-xs font-semibold">Shift · Morning</p>
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  6 agents online · 2 on break · AI covering overflow
                </p>
              </div>
            </aside>

            {/* Conversation list */}
            <div className="border-r border-border">
              <div className="flex items-center gap-2 border-b border-border px-3 py-3">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    readOnly
                    value="Search conversations"
                    className="h-8 w-full rounded-lg border border-border bg-muted/40 pl-8 pr-3 text-xs text-muted-foreground outline-none"
                  />
                </div>
              </div>

              <ScrollArea className="h-[480px] lg:h-[508px]">
                <div className="p-2">
                  {CONVERSATIONS.map((c) => {
                    const meta = CHANNEL_META[c.channel];
                    const Icon = meta.icon;
                    const active = c.id === selected.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedId(c.id)}
                        className={cn(
                          "mb-1 w-full rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors",
                          active
                            ? "border-border bg-muted/60"
                            : "hover:bg-muted/40",
                        )}
                      >
                        <div className="flex items-start gap-2.5">
                          <Avatar className="size-9">
                            <AvatarFallback className="bg-foreground text-[11px] font-semibold text-background">
                              {c.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {c.name}
                              </p>
                              <span className="shrink-0 text-[10px] text-muted-foreground">
                                {c.time}
                              </span>
                            </div>
                            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                              {c.preview}
                            </p>
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                                  meta.className,
                                )}
                              >
                                <Icon className="size-2.5" />
                                {meta.label}
                              </span>
                              {c.tag ? (
                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                                  {c.tag}
                                </Badge>
                              ) : null}
                              {c.unread ? (
                                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold text-background">
                                  {c.unread}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Conversation detail */}
            <div className="flex min-h-[520px] flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-foreground text-[11px] font-semibold text-background">
                      {selected.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold">{selected.name}</p>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                          CHANNEL_META[selected.channel].className,
                        )}
                      >
                        <ChannelIcon className="size-2.5" />
                        {CHANNEL_META[selected.channel].label}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Assigned to you · {selected.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="size-8" type="button" tabIndex={-1}>
                    <UserRound className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8" type="button" tabIndex={-1}>
                    <MoreHorizontal className="size-4" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 px-4 py-4">
                <div className="mx-auto flex max-w-xl flex-col gap-3">
                  {selected.messages.map((m, i) => {
                    const mine = m.from !== "customer";
                    return (
                      <div
                        key={`${selected.id}-${i}`}
                        className={cn("flex", mine ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                            m.from === "customer" &&
                              "rounded-bl-md border border-border bg-muted/50 text-foreground",
                            m.from === "agent" &&
                              "rounded-br-md bg-foreground text-background",
                            m.from === "ai" &&
                              "rounded-br-md border border-border bg-background text-foreground shadow-sm",
                          )}
                        >
                          {m.from === "ai" ? (
                            <p className="mb-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                              <Bot className="size-3" /> AI assist
                            </p>
                          ) : null}
                          <p>{m.text}</p>
                          <p
                            className={cn(
                              "mt-1 flex items-center gap-1 text-[10px]",
                              m.from === "agent" ? "text-background/70" : "text-muted-foreground",
                            )}
                          >
                            {m.time}
                            {m.from === "agent" ? <CheckCheck className="size-3" /> : null}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Composer + AI suggestion */}
              <div className="border-t border-border bg-muted/20 p-3 sm:p-4">
                <div className="mb-2 flex items-start gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-2.5">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-foreground">Suggested reply</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {selected.channel === "voice"
                        ? "Offer to email the GST breakdown and keep the call open for human takeover if needed."
                        : "Confirm the 6–8 PM slot, send a calendar update, and note the preference on the lead."}
                    </p>
                  </div>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="inline-flex h-7 shrink-0 items-center justify-center rounded-sm border bg-white px-3 text-xs font-medium transition-colors hover:bg-slate-50"
                    style={{ borderColor: ACCENT, color: ACCENT }}
                  >
                    Use
                  </button>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-1.5 pl-3">
                  <Clock3 className="size-3.5 shrink-0 text-muted-foreground" />
                  <input
                    readOnly
                    value="Type a reply…"
                    className="h-8 flex-1 bg-transparent text-sm text-muted-foreground outline-none"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-sm px-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Send className="size-3.5" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Interactive preview — click conversations to explore the NineBeam agent workspace.
        </p>
      </div>
    </section>
  );
}

export default PlatformPreview;
