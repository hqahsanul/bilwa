"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AtSign,
  BarChart3,
  CircleUserRound,
  LayoutDashboard,
  CreditCard,
  Download,
  Eye,
  ExternalLink,
  Heart,
  LogOut,
  Menu,
  MessageCircle,
  Plus,
  Radar,
  Receipt,
  Settings,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { RadarLiveSimulator } from "@/components/radar-live-simulator";
import { DraftsPanel } from "@/components/drafts-panel";
import {
  addWatchlistAccounts,
  createSessionWithDashboard,
  hasUsableAccessToken,
  setAccessToken,
  getDashboardAlerts,
  getDashboardAnalytics,
  getDashboardDrafts,
  getDashboardProfiles,
  getDashboardSignals,
  getDashboardSubscription,
  getDashboardTransactions,
  getDashboardWatchlists,
  getDashboardOverview,
  logout,
  removeWatchlistAccount,
  updateWatchlistEntry,
} from "@/lib/auth";
import type { DashboardAlertsResponse, DashboardOverview } from "@/lib/auth";
import {
  disableBrowserPushNotifications,
  enableBrowserPushNotifications,
  isBrowserPushEnabled,
} from "@/components/pwa-register";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export function dashboardSectionSlug(label: string) {
  return label.toLowerCase().replace(/\s+/g, "-");
}

const DASHBOARD_SECTION_BY_SLUG: Record<string, string> = {
  dashboard: "Dashboard",
  "command-radar": "Command Radar",
  radar: "Command Radar",
  "signal-intelligence": "Command Radar",
  "live-radar": "Command Radar",
  watchlists: "Watchlists",
  visibility: "Visibility",
  "draft-angles": "Draft angles",
  drafts: "Draft angles",
  settings: "Settings",
  subscription: "Subscription",
  transactions: "Transactions",
  profile: "Profile",
};

export function dashboardSectionFromSlug(slug: string | undefined) {
  return slug ? DASHBOARD_SECTION_BY_SLUG[slug] : undefined;
}

export function dashboardRadarViewFromSlug(slug: string | undefined): "intelligence" | "live" {
  return slug === "live-radar" ? "live" : "intelligence";
}

function DashboardOverviewPage({ data }: { data?: Partial<DashboardOverview> | null }) {
  const cards = [
    ["Open opportunities", data?.signals?.length ?? 0],
    ["Watched accounts", data?.watchlists?.length ?? 0],
    ["Drafts ready", data?.drafts?.length ?? 0],
  ];
  return (
    <section className="mx-4 mt-4 space-y-5 sm:mx-6 sm:mt-6 lg:mx-10">
      <div>
        <p className="text-sm text-muted-foreground">Your workspace</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Review new opportunities, drafts, and the accounts you are monitoring.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <TopToday />
      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold">Latest opportunities</h3>
        {data?.signals?.length ? (
          <div className="mt-4 space-y-3">
            {data.signals.slice(0, 3).map((signal) => (
              <div key={signal.id} className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">{signal.author}</p>
                <p className="mt-1 text-sm text-muted-foreground">{signal.post}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            No opportunities yet. Add a watchlist account or discovery rule to begin.
          </p>
        )}
      </div>
    </section>
  );
}

type WatchlistUser = {
  id?: string;
  entryId?: string;
  name: string;
  username: string;
  avatar: string;
  followers: string;
  following: string;
  bio: string;
  muted?: boolean;
};

const PROFILE_ALERTS = [
  { post: "The future of focused work is smaller teams.", postTime: "12 min ago", alertTime: "11 min ago", impressions: "24.6K", likes: "1.8K", comments: "86", activity: "Commented", userEngagement: "12 likes · 3 replies", engagement: "8.6%" },
  { post: "A simple product lesson I keep coming back to.", postTime: "Yesterday, 4:20 PM", alertTime: "Yesterday, 4:21 PM", impressions: "15.2K", likes: "942", comments: "41", activity: "Liked", userEngagement: "1 like", engagement: "6.4%" },
  { post: "What we learned shipping our latest update.", postTime: "3 days ago", alertTime: "3 days ago", impressions: "31.8K", likes: "2.4K", comments: "124", activity: "Commented", userEngagement: "8 likes · 1 reply", engagement: "9.2%" },
  { post: "The best ideas usually start as rough notes.", postTime: "6 days ago", alertTime: "6 days ago", impressions: "9.7K", likes: "716", comments: "28", activity: "No activity", userEngagement: "None", engagement: "7.7%" },
  { post: "What makes a product feel inevitable?", postTime: "8 days ago", alertTime: "8 days ago", impressions: "18.3K", likes: "1.2K", comments: "63", activity: "Commented", userEngagement: "4 likes · 2 replies", engagement: "8.1%" },
  { post: "A practical guide to better team rituals.", postTime: "11 days ago", alertTime: "11 days ago", impressions: "12.4K", likes: "804", comments: "37", activity: "Liked", userEngagement: "1 like", engagement: "7.2%" },
  { post: "The tools we use to stay close to customers.", postTime: "14 days ago", alertTime: "14 days ago", impressions: "21.1K", likes: "1.5K", comments: "79", activity: "Commented", userEngagement: "6 likes · 1 reply", engagement: "8.9%" },
  { post: "Shipping less can sometimes create more value.", postTime: "18 days ago", alertTime: "18 days ago", impressions: "7.8K", likes: "512", comments: "19", activity: "No activity", userEngagement: "None", engagement: "6.8%" },
];

const TRANSACTIONS = [
  ["Jun 01, 2026", "Pro Radar Access", "$10.00", "Paid"],
  ["May 01, 2026", "Pro Radar Access", "$10.00", "Paid"],
  ["Apr 01, 2026", "Pro Radar Access", "$10.00", "Paid"],
  ["Mar 01, 2026", "Pro Radar Access", "$10.00", "Paid"],
  ["Feb 01, 2026", "Pro Radar Access", "$10.00", "Paid"],
  ["Jan 01, 2026", "Pro Radar Access", "$10.00", "Paid"],
];

const INITIAL_OWN_PROFILES = [
  { id: "primary", name: "PostPuls member", username: "@your_username", avatar: "", followers: "1,248", following: "386", owner: true },
];

const TOTAL_GROWTH = [
  { month: "Jan", posts: 42, impressions: 18.4, engagement: 5.2 },
  { month: "Feb", posts: 58, impressions: 24.1, engagement: 6.1 },
  { month: "Mar", posts: 71, impressions: 31.8, engagement: 7.4 },
  { month: "Apr", posts: 86, impressions: 43.6, engagement: 8.2 },
  { month: "May", posts: 104, impressions: 58.2, engagement: 9.1 },
  { month: "Jun", posts: 128, impressions: 76.4, engagement: 10.3 },
];

const PROFILE_GROWTH = [
  { month: "Jan", impressions: 12.4, engagement: 4.8, followers: 118 },
  { month: "Feb", impressions: 16.8, engagement: 5.6, followers: 120 },
  { month: "Mar", impressions: 19.3, engagement: 6.2, followers: 122 },
  { month: "Apr", impressions: 24.8, engagement: 7.1, followers: 124 },
  { month: "May", impressions: 29.6, engagement: 7.8, followers: 126 },
  { month: "Jun", impressions: 36.2, engagement: 8.6, followers: 128 },
];

type RadarSignal = {
  id?: string;
  author: string;
  post: string;
  time: string;
  postedAt?: string | null;
  likes?: number;
  replies?: number;
  reposts?: number;
  url: string;
  suggestions: string[];
};

function formatSignalRelativeTime(iso: string | null | undefined, fallback = "") {
  if (!iso) return fallback || "just now";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return fallback || "just now";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatSignalAbsoluteTime(iso: string | null | undefined) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function SignalTweetBody({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <p
      className={`whitespace-pre-wrap break-words [font-family:inherit,Segoe_UI_Emoji,Apple_Color_Emoji,Noto_Color_Emoji] ${className ?? ""}`}
    >
      {parts.map((part, index) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline"
            onClick={(event) => event.stopPropagation()}
          >
            {part}
          </a>
        ) : (
          <span key={`${index}-${part.slice(0, 8)}`}>{part}</span>
        ),
      )}
    </p>
  );
}

function SignalIntelligencePanel({ signals = [] }: { signals?: RadarSignal[] }) {
  const [selectedSignal, setSelectedSignal] = useState(0);
  const [query, setQuery] = useState("");
  const filtered = signals.filter((item) => {
    if (!query.trim()) return true;
    const haystack = `${item.author} ${item.post}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });
  const signal = filtered[selectedSignal] ?? filtered[0] ?? signals[0];
  const relative = formatSignalRelativeTime(signal?.postedAt, signal?.time);
  const absolute = formatSignalAbsoluteTime(signal?.postedAt);

  if (!signal) {
    return (
      <section className="mx-4 mt-4 rounded-2xl border border-border bg-card p-8 text-center sm:mx-6 lg:mx-10">
        <p className="font-semibold">No opportunities yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add an account or discovery rule to see posts and reply suggestions here.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-2xl border border-border bg-card sm:mx-6 sm:mt-6 lg:mx-10">
      <div className="grid lg:grid-cols-[320px_1fr] lg:items-stretch">
        <div className="flex min-h-0 flex-col border-b border-border lg:max-h-[calc(100vh-8rem)] lg:border-b-0 lg:border-r">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3.5 sm:px-5 sm:py-4">
            <span className="font-semibold">Signal feed</span>
            <span className="text-xs text-muted-foreground">{filtered.length} open</span>
          </div>
          <div className="shrink-0 border-b border-border p-3.5 sm:p-4">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedSignal(0);
              }}
              placeholder="Search conversations"
              className="h-9 w-full rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10"
            />
          </div>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain p-3.5 sm:p-4 lg:max-h-[calc(100vh-14rem)]">
            {filtered.map((item, index) => {
              const itemRelative = formatSignalRelativeTime(item.postedAt, item.time);
              const itemAbsolute = formatSignalAbsoluteTime(item.postedAt);
              return (
              <button
                key={item.id ?? `${item.author}-${item.postedAt}-${index}`}
                type="button"
                onClick={() => setSelectedSignal(index)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selectedSignal === index ? "border-foreground bg-muted/40" : "border-border hover:border-foreground/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-800 text-[10px] font-semibold text-white">
                    {item.author.replace("@", "").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-semibold">{item.author.replace("@", "")}</p>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.author} · {itemRelative}
                      {itemAbsolute ? ` · ${itemAbsolute}` : ""}
                    </p>
                  </div>
                  <span className="ml-auto text-xl font-light leading-none text-muted-foreground" aria-hidden="true">𝕏</span>
                </div>
                <SignalTweetBody text={item.post} className="mt-4 line-clamp-4 text-sm leading-6" />
              </button>
              );
            })}
          </div>
        </div>
        <div className="min-w-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3.5 sm:px-5 sm:py-4">
            <div>
              <p className="font-semibold">Conversation intelligence</p>
              <p className="mt-1 text-xs text-muted-foreground">Post suggestions</p>
            </div>
            <a
              href={signal.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-medium text-background"
            >
              Open on X <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="p-5 sm:p-6 lg:p-8">
            <article className="rounded-2xl border border-border bg-background p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)] sm:p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-neutral-800 text-xs font-semibold text-white">
                  {signal.author.replace("@", "").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold">{signal.author.replace("@", "")}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{signal.author}</p>
                </div>
                <span className="ml-auto text-2xl font-light leading-none text-muted-foreground" aria-label="X">𝕏</span>
              </div>
              <SignalTweetBody text={signal.post} className="mt-4 max-w-3xl text-base leading-7 sm:text-lg" />
              <p className="mt-4 text-xs text-muted-foreground">
                {relative}
                {absolute ? ` · ${absolute}` : ""}
              </p>
            </article>
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 sm:mt-8 sm:p-5">
              <p className="text-sm font-semibold">Suggested replies</p>
              <div className="mt-3 space-y-2">
                {signal.suggestions.length === 0 ? (
                  <p className="rounded-lg border border-border bg-background p-3 text-sm text-muted-foreground">
                    No drafts yet for this post.
                  </p>
                ) : (
                  signal.suggestions.map((suggestion) => (
                    <p key={suggestion} className="rounded-lg border border-border bg-background p-3 text-sm leading-relaxed text-muted-foreground">
                      {suggestion}
                    </p>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileCommandRadar({
  signals = [],
  watchedAccounts = 0,
}: {
  signals?: RadarSignal[];
  watchedAccounts?: number;
}) {
  const suggestionCount = signals.reduce((sum, signal) => sum + (signal.suggestions?.length ?? 0), 0);
  return (
    <section className="px-4 py-5 sm:px-6 lg:hidden">
      <div className="grid grid-cols-2 gap-3">
        {[
          [String(signals.length), "Posts delivered"],
          [String(suggestionCount), "Suggestions ready"],
          [String(watchedAccounts), "Watched accounts"],
          ["24/7", "Monitoring"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xl font-semibold">{value}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div>
            <p className="font-semibold">Latest posts</p>
            <p className="mt-1 text-xs text-muted-foreground">Posts and suggestions from your watchlist</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">LIVE</span>
        </div>
        <div className="divide-y divide-border">
          {signals.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">
              No opportunities yet. Add a watchlist account to start monitoring.
            </p>
          ) : null}
          {signals.map((signal) => (
            <article key={signal.post} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{signal.author}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{signal.time}</p>
                </div>
                <a
                  href={signal.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${signal.author} post on X`}
                  className="shrink-0 rounded-full border border-border p-2 text-muted-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="line-clamp-3 text-sm leading-6">{signal.post}</p>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Suggestions</p>
                {signal.suggestions.slice(0, 2).map((suggestion) => (
                  <p key={suggestion} className="rounded-lg bg-muted/50 p-2.5 text-xs leading-5 text-muted-foreground">
                    {suggestion}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopToday() {
  const items = [
    { title: "Liquid Sculpture Hero", author: "PostPuls design", tone: "from-rose-950 via-red-900 to-orange-950", mark: "2" },
    { title: "Signal interface study", author: "PostPuls lab", tone: "from-slate-950 via-neutral-900 to-black", mark: "3" },
    { title: "Reply systems", author: "PostPuls research", tone: "from-violet-950 via-indigo-900 to-slate-950", mark: "1" },
  ];

  return (
    <section className="px-4 pb-2 pt-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Top today</h2>
            <p className="mt-1 text-sm text-muted-foreground">The most saved components of the day</p>
          </div>
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground">
            View all <span aria-hidden="true">›</span>
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-xl border border-border bg-card">
              <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${item.tone}`}>
                <span className="absolute -bottom-5 -left-1 text-[10rem] font-black leading-none text-white/10">{item.mark}</span>
                <div className="absolute inset-5 rounded-lg border border-white/15 bg-white/5 p-3 shadow-2xl backdrop-blur-sm transition-transform group-hover:scale-[1.03]">
                  <div className="h-2 w-1/2 rounded-full bg-white/50" />
                  <div className="mt-3 h-16 rounded-md border border-white/10 bg-black/25" />
                  <div className="mt-3 flex gap-2"><span className="h-2 w-10 rounded-full bg-white/40" /><span className="h-2 w-16 rounded-full bg-white/20" /></div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.author}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">♡ 265</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisibilityPage({ analytics }: { analytics?: DashboardOverview["analytics"] }) {
  const [timeframe, setTimeframe] = useState<"Daily" | "Weekly" | "Monthly">("Weekly");
  const [profilePage, setProfilePage] = useState(1);
  const trendKey = timeframe.toLowerCase() as "daily" | "weekly" | "monthly";
  const trendData = analytics?.[trendKey] ?? [];
  const profiles = analytics?.profiles ?? [];
  const summary = analytics?.summary;
  const profilePageSize = 5;
  const profileTotalPages = Math.max(1, Math.ceil(profiles.length / profilePageSize));
  const visibleProfiles = profiles.slice(
    (profilePage - 1) * profilePageSize,
    profilePage * profilePageSize,
  );

  return (
    <section className="px-4 py-6 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-muted-foreground">Measure the impact of participating in conversations</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Visibility</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            [String(summary?.comments ?? 0), "Opportunities tracked"],
            [summary?.additional_impressions ?? "0", "Additional impressions"],
            [summary?.average_impressions ?? "0", "Average impressions/profile"],
            [summary?.highest_impressions ?? "0", "Highest profile impressions"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <p className="text-2xl font-semibold">{value}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Comment-driven growth</p>
                <h3 className="mt-1 text-lg font-semibold">Visibility generated by monitored profiles</h3>
              </div>
              <div className="flex rounded-lg border border-border p-1">
                {(["Daily", "Weekly", "Monthly"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTimeframe(option)}
                    className={`rounded-md px-3 py-1.5 text-xs ${
                      timeframe === option ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Track the visibility and engagement you receive from profiles you monitor.
            </p>
          </div>
          {trendData.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              No visibility data yet. Opportunities from your watchlist will appear here as they are ingested.
            </p>
          ) : (
            <ChartContainer
              config={{
                comments: { label: "Comments made", color: "var(--color-primary)" },
                impressions: { label: "Additional impressions (K)", color: "#f97316" },
                followers: { label: "Followers gained", color: "#22c55e" },
              }}
              className="mt-5 h-72 w-full aspect-auto"
            >
              <LineChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="comments" stroke="var(--color-comments)" strokeWidth={2} dot />
                <Line type="monotone" dataKey="impressions" stroke="var(--color-impressions)" strokeWidth={2} dot />
                <Line type="monotone" dataKey="followers" stroke="var(--color-followers)" strokeWidth={2} dot />
              </LineChart>
            </ChartContainer>
          )}
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-primary" />Comments made</span>
            <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-orange-500" />Additional impressions</span>
            <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />Followers gained</span>
          </div>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <h3 className="font-semibold">Comment impression breakdown by profile</h3>
            <p className="mt-1 text-sm text-muted-foreground">Each profile includes the five comments that generated the most impressions for you.</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Profile</TableHead>
                <TableHead>Comments made</TableHead>
                <TableHead>Total impressions</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Highest</TableHead>
                <TableHead>Top 5 comment impressions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleProfiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                    No profile breakdown yet.
                  </TableCell>
                </TableRow>
              ) : (
                visibleProfiles.map((row) => (
                  <TableRow key={row.username}>
                    <TableCell className="pl-5 font-medium">{row.profile}</TableCell>
                    <TableCell>{row.comments}</TableCell>
                    <TableCell>{row.your_impressions}</TableCell>
                    <TableCell>{row.average_impressions}</TableCell>
                    <TableCell>{row.highest_impressions}</TableCell>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{row.top_five_impressions}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="flex flex-col gap-3 border-t border-border px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {profiles.length === 0 ? 0 : (profilePage - 1) * profilePageSize + 1}-{Math.min(profilePage * profilePageSize, profiles.length)} of {profiles.length} profiles
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                disabled={profilePage === 1}
                onClick={() => setProfilePage((page) => Math.max(1, page - 1))}
                className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              >
                Previous
              </button>
              <span className="min-w-12 whitespace-nowrap px-2 text-center text-xs text-muted-foreground">{profilePage} / {profileTotalPages}</span>
              <button
                type="button"
                disabled={profilePage === profileTotalPages}
                onClick={() => setProfilePage((page) => Math.min(profileTotalPages, page + 1))}
                className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrowthChart({ profileName }: { profileName?: string }) {
  const isProfile = Boolean(profileName);
  const data = isProfile ? PROFILE_GROWTH : TOTAL_GROWTH;
  const config = {
    impressions: { label: "Impressions (K)", color: "var(--color-primary)" },
    engagement: { label: "Engagement rate", color: "#f97316" },
    ...(isProfile ? { followers: { label: "Followers (K)", color: "#22c55e" } } : {}),
    ...(isProfile ? {} : { posts: { label: "Posts", color: "#22c55e" } }),
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{isProfile ? "Profile performance" : "Workspace performance"}</p>
          <h3 className="mt-1 text-lg font-semibold">{isProfile ? `${profileName} growth` : "Growth overview"}</h3>
        </div>
        <span className="text-xs text-muted-foreground">Last 6 months</span>
      </div>
      <ChartContainer config={config} className="mt-4 h-64 w-full aspect-auto">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}K`} />
          <Tooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="impressions" stroke="var(--color-impressions)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} dot={false} />
          {isProfile && <Line type="monotone" dataKey="followers" stroke="var(--color-followers)" strokeWidth={2} dot={false} />}
          {!isProfile && <Line type="monotone" dataKey="posts" stroke="var(--color-posts)" strokeWidth={2} dot={false} />}
        </LineChart>
      </ChartContainer>
      <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-primary" />Impressions</span>
        <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-orange-500" />Engagement</span>
        {isProfile && <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />Followers</span>}
        {!isProfile && <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500" />Posts</span>}
      </div>
    </div>
  );
}

export function DashboardPage({
  initialSection = "Dashboard",
  initialRadarView = "intelligence",
}: {
  initialSection?: string;
  initialRadarView?: "intelligence" | "live";
}) {
  const pathname = usePathname();
  const routeSlug = pathname.split("/")[2];
  const routeSection = dashboardSectionFromSlug(routeSlug);
  const resolvedSection = routeSection ?? initialSection;
  const resolvedRadarView = routeSection ? dashboardRadarViewFromSlug(routeSlug) : initialRadarView;
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [sessionAuthenticated, setSessionAuthenticated] = useState(false);
  const [dashboardData, setDashboardData] = useState<Partial<DashboardOverview> | null>(null);
  const [dashboardError, setDashboardError] = useState("");
  const [bootstrapLoaded, setBootstrapLoaded] = useState(false);
  const authCheckStarted = useRef(false);
  const initialRadarBootstrap = useRef(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(resolvedSection);
  const [radarView, setRadarView] = useState<"intelligence" | "live">(resolvedRadarView);
  const [watchlistPage, setWatchlistPage] = useState(1);
  const [showAddWatchlist, setShowAddWatchlist] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [watchlistBusy, setWatchlistBusy] = useState(false);
  const [watchlistError, setWatchlistError] = useState("");
  const [selectedStats, setSelectedStats] = useState<WatchlistUser | null>(null);
  const [alertPage, setAlertPage] = useState(1);
  const [profileAlerts, setProfileAlerts] = useState<DashboardAlertsResponse["items"]>([]);
  const [alertTotal, setAlertTotal] = useState(0);
  const [transactionPage, setTransactionPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("Pro Radar Access");
  const [settingsEnabled, setSettingsEnabled] = useState({
    "Browser push notifications": false,
    "Email notifications": true,
    "Daily signal digest": false,
    "Auto-save drafts": true,
  });
  const [settingsMessage, setSettingsMessage] = useState("");
  const [ownProfiles, setOwnProfiles] = useState(INITIAL_OWN_PROFILES);
  const [ownProfileInput, setOwnProfileInput] = useState("");
  const [enabledUsers, setEnabledUsers] = useState<Record<string, boolean>>({});
  const [watchlistUsers, setWatchlistUsers] = useState<WatchlistUser[]>([]);
  const [transactions, setTransactions] = useState<typeof TRANSACTIONS>([]);

  useEffect(() => {
    setActiveSection(resolvedSection);
    setRadarView(resolvedRadarView);
    setMobileMenuOpen(false);
  }, [resolvedRadarView, resolvedSection]);

  useEffect(() => {
    if (!dashboardData) return;
    if (dashboardData.watchlists) {
      const users = dashboardData.watchlists.map((profile) => ({
        id: profile.id,
        entryId: profile.entry_id,
        name: profile.name,
        username: profile.username,
        avatar: profile.avatar || "",
        followers: profile.followers,
        following: profile.following,
        bio: "Monitored profile from the dashboard API.",
        muted: Boolean(profile.muted),
      }));
      setWatchlistUsers(users);
      setEnabledUsers(
        Object.fromEntries(users.map(({ username, muted }) => [username, !muted])),
      );
    }
    if (dashboardData.transactions) {
      setTransactions(
        dashboardData.transactions.map((transaction) => [
          transaction.date,
          transaction.description,
          `$${transaction.amount.toFixed(2)}`,
          transaction.status === "paid" ? "Paid" : transaction.status,
        ]),
      );
    }
    if (dashboardData.subscription) {
      setSelectedPlan(dashboardData.subscription.plan);
    }
    if (dashboardData.profiles) {
      setOwnProfiles(dashboardData.profiles);
    }
  }, [dashboardData]);

  const apiSignals: RadarSignal[] = dashboardData?.signals?.map((signal) => ({
    id: signal.id,
    author: signal.author,
    post: signal.post,
    time: signal.time,
    postedAt: signal.posted_at,
    likes: signal.likes,
    replies: signal.replies,
    reposts: signal.reposts,
    url: signal.url,
    suggestions: signal.suggestions,
  })) ?? [];
  const watchlistPageSize = 4;
  const watchlistTotalPages = Math.max(1, Math.ceil(watchlistUsers.length / watchlistPageSize));
  const visibleWatchlistUsers = watchlistUsers.slice(
    (watchlistPage - 1) * watchlistPageSize,
    watchlistPage * watchlistPageSize,
  );
  const alertPageSize = 4;
  const alertTotalPages = Math.max(1, Math.ceil(alertTotal / alertPageSize));
  const visibleAlerts = profileAlerts;
  const transactionPageSize = 4;
  const transactionTotalPages = Math.max(1, Math.ceil(transactions.length / transactionPageSize));
  const visibleTransactions = transactions.slice(
    (transactionPage - 1) * transactionPageSize,
    transactionPage * transactionPageSize,
  );
  useEffect(() => {
    if (authCheckStarted.current) return;
    authCheckStarted.current = true;
    const session = hasUsableAccessToken()
      ? Promise.resolve()
      : createSessionWithDashboard().then(({ dashboard }) => {
          setDashboardData(dashboard);
          initialRadarBootstrap.current = true;
          setBootstrapLoaded(true);
        });
    session
      .then(() => {
        setSessionAuthenticated(true);
        setSettingsEnabled((current) => ({
          ...current,
          "Browser push notifications": isBrowserPushEnabled(),
        }));
      })
      .catch(() => {
        setSessionAuthenticated(false);
        setAccessToken(null);
        router.push("/login");
      })
      .finally(() => setCheckingSession(false));
  }, [router]);

  useEffect(() => {
    if (checkingSession || !sessionAuthenticated) return;
    if (bootstrapLoaded && activeSection === "Command Radar" && initialRadarBootstrap.current) {
      initialRadarBootstrap.current = false;
      return;
    }
    setDashboardError("");

    const loadPageData = async () => {
      let key: keyof DashboardOverview | null = null;
      let data: unknown;

      if (activeSection === "Dashboard") {
        data = await getDashboardOverview();
        setDashboardData(data as DashboardOverview);
        return;
      } else if (activeSection === "Command Radar") {
        key = "signals";
        data = await getDashboardSignals();
      } else if (activeSection === "Watchlists") {
        key = "watchlists";
        data = await getDashboardWatchlists();
      } else if (activeSection === "Visibility" || activeSection === "Profile Status") {
        key = "analytics";
        data = await getDashboardAnalytics();
      } else if (activeSection === "Draft angles") {
        key = "drafts";
        data = await getDashboardDrafts();
      } else if (activeSection === "Profile") {
        key = "profiles";
        data = await getDashboardProfiles();
      } else if (activeSection === "Subscription") {
        key = "subscription";
        data = await getDashboardSubscription();
      } else if (activeSection === "Transactions") {
        key = "transactions";
        data = await getDashboardTransactions();
      }

      if (key) {
        setDashboardData((current) => ({ ...current, [key]: data }));
      }
    };

    loadPageData().catch((error) => {
      setDashboardError(error instanceof Error ? error.message : "Unable to load dashboard data.");
    });
  }, [activeSection, bootstrapLoaded, checkingSession, sessionAuthenticated]);

  useEffect(() => {
    if (checkingSession || activeSection !== "Profile Status" || !selectedStats) return;

    getDashboardAlerts(selectedStats.username, alertPage, alertPageSize)
      .then((result) => {
        setProfileAlerts(result.items);
        setAlertTotal(result.total);
      })
      .catch((error) => {
        setDashboardError(error instanceof Error ? error.message : "Unable to load alert history.");
      });
  }, [activeSection, alertPage, checkingSession, selectedStats]);

  if (dashboardError) {
    return <div className="flex min-h-screen items-center justify-center bg-background p-6 text-sm text-destructive">{dashboardError}</div>;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <aside
        onMouseEnter={() => setSidebarCollapsed(false)}
        onMouseLeave={() => setSidebarCollapsed(true)}
        className={`fixed inset-y-0 left-0 z-20 hidden border-r border-border bg-card px-4 py-6 transition-[width] duration-200 lg:block ${
          sidebarCollapsed ? "w-20" : "w-60"
        }`}
      >
        <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
          <Link href="/" className="flex items-center gap-2 px-3 text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-xs text-background">P</span>
            {!sidebarCollapsed && "PostPuls"}
          </Link>
        </div>
        <nav className="mt-10 space-y-1">
          {[
            { label: "Dashboard", icon: LayoutDashboard },
            { label: "Command Radar", icon: Radar },
            { label: "Watchlists", icon: Users },
            { label: "Visibility", icon: BarChart3 },
            { label: "Draft angles", icon: SlidersHorizontal },
            { label: "Settings", icon: Settings },
            { label: "Subscription", icon: CreditCard },
            { label: "Transactions", icon: Receipt },
          ].map(({ label, icon: Icon }) => (
            <div key={label}>
            <Link
              href={`/dashboard/${dashboardSectionSlug(label)}`}
              title={sidebarCollapsed ? label : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                sidebarCollapsed ? "justify-center px-2" : ""
              } ${activeSection === label ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <Icon className="h-4 w-4" />
              {!sidebarCollapsed && label}
            </Link>
            {!sidebarCollapsed && label === "Command Radar" && activeSection === "Command Radar" && (
              <div className="ml-7 mt-1 space-y-1 border-l border-border pl-3">
                {[
                  ["intelligence", "Signal intelligence"],
                  ["live", "Live radar"],
                ].map(([view, viewLabel]) => (
                  <Link
                    key={view}
                    href={`/dashboard/${view === "live" ? "live-radar" : "signal-intelligence"}`}
                    className={`block w-full rounded-md px-3 py-2 text-left text-xs ${
                      radarView === view ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {viewLabel}
                  </Link>
                ))}
              </div>
            )}
            </div>
          ))}
          <Link
            href="/dashboard/assets"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Download className="h-4 w-4" />
            {!sidebarCollapsed && "Assets"}
          </Link>
        </nav>
        <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            title={sidebarCollapsed ? "Log out" : undefined}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground ${
              sidebarCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut className="h-4 w-4" />
            {!sidebarCollapsed && "Log out"}
          </button>
          <Link
            href="/dashboard/profile"
            title={sidebarCollapsed ? "Profile" : undefined}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground ${
              sidebarCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <CircleUserRound className="h-4 w-4" />
            {!sidebarCollapsed && "Profile"}
          </Link>
        </div>
      </aside>

      <main className={`min-w-0 transition-[padding] duration-200 ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-60"}`}>
        <header className="flex h-14 items-center justify-between border-b border-border px-4 sm:h-16 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div>
            <p className="text-xs text-muted-foreground">Workspace</p>
            <h1 className="font-semibold tracking-tight">{activeSection}</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="rounded-md border border-border px-3 py-2 text-xs font-medium hover:bg-muted lg:hidden"
          >
            Log out
          </button>
        </header>
        {mobileMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-background/70 lg:hidden"
            />
            <aside className="fixed inset-y-0 left-0 z-40 flex w-[min(18rem,calc(100vw-1rem))] flex-col overflow-y-auto border-r border-border bg-card p-5 shadow-xl lg:hidden">
              <div className="flex items-center gap-2 text-lg font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-xs text-background">P</span>
                PostPuls
              </div>
              <nav className="mt-8 space-y-1 pb-4">
                {[
                  { label: "Dashboard", icon: LayoutDashboard },
                  { label: "Command Radar", icon: Radar },
                  { label: "Watchlists", icon: Users },
                  { label: "Visibility", icon: BarChart3 },
                  { label: "Draft angles", icon: SlidersHorizontal },
                  { label: "Settings", icon: Settings },
                  { label: "Subscription", icon: CreditCard },
                  { label: "Transactions", icon: Receipt },
                ].map(({ label, icon: Icon }) => (
                  <div key={label}>
                  <Link
                    href={`/dashboard/${dashboardSectionSlug(label)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      activeSection === label ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                  </div>
                ))}
                <Link
                  href="/dashboard/assets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                  Assets
                </Link>
              </nav>
              <div className="mt-auto border-t border-border pt-4">
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <CircleUserRound className="h-4 w-4" />
                  Profile
                </Link>
              </div>
            </aside>
          </>
        )}
        {activeSection === "Dashboard" && <DashboardOverviewPage data={dashboardData} />}
        {activeSection === "Command Radar" && (
          <>
            <div className="hidden lg:block">
              {radarView === "intelligence" ? <SignalIntelligencePanel signals={apiSignals} /> : <RadarLiveSimulator dashboardMode />}
            </div>
            <MobileCommandRadar
              signals={apiSignals.slice(0, 10)}
              watchedAccounts={dashboardData?.watchlists?.length ?? 0}
            />
          </>
        )}
        {activeSection === "Visibility" && <VisibilityPage analytics={dashboardData?.analytics} />}
        {activeSection === "Watchlists" && (
          <section className="p-6 lg:p-10">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Monitored Twitter/X profiles</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">Watchlists</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddWatchlist(true)}
                  className="shrink-0 whitespace-nowrap rounded-lg bg-foreground px-4 py-2.5 text-sm text-background hover:opacity-90"
                >
                  + Watchlist
                </button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-5">Profile</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Followers / Following</TableHead>
                      <TableHead>View Stats</TableHead>
                      <TableHead className="pr-5 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleWatchlistUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">
                          No monitored accounts yet. Add a username to start receiving alerts.
                        </TableCell>
                      </TableRow>
                    ) : (
                      visibleWatchlistUsers.map((user) => {
                        const { id, entryId, name, username, avatar, followers, following, bio } = user;
                        return (
                      <TableRow key={id ?? username}>
                        <TableCell className="pl-5">
                          {avatar ? (
                            <img src={avatar} alt={`${name} profile`} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                              {name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell className="text-muted-foreground">{username}</TableCell>
                        <TableCell>
                          <div className="flex gap-3 text-xs">
                            <span><strong className="text-foreground">{followers}</strong> followers</span>
                            <span><strong className="text-foreground">{following}</strong> following</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStats(user);
                              setActiveSection("Profile Status");
                              setAlertPage(1);
                            }}
                            className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
                          >
                            View stats
                          </button>
                        </TableCell>
                        <TableCell className="pr-5">
                          <div className="flex items-center justify-end gap-4">
                            <Switch
                              checked={enabledUsers[username] ?? true}
                              disabled={watchlistBusy || !entryId}
                              onCheckedChange={async (checked) => {
                                if (!entryId) return;
                                setWatchlistBusy(true);
                                setWatchlistError("");
                                const previous = enabledUsers[username] ?? true;
                                setEnabledUsers((current) => ({ ...current, [username]: checked }));
                                try {
                                  await updateWatchlistEntry(entryId, { muted: !checked });
                                } catch (error) {
                                  setEnabledUsers((current) => ({ ...current, [username]: previous }));
                                  setWatchlistError(error instanceof Error ? error.message : "Unable to update watchlist.");
                                } finally {
                                  setWatchlistBusy(false);
                                }
                              }}
                              aria-label={`${enabledUsers[username] ? "Disable" : "Enable"} ${name}`}
                              className="h-7 w-12 border-0 bg-destructive p-0.5 shadow-none hover:bg-destructive/90 data-[state=checked]:bg-black data-[state=checked]:hover:bg-black/90 [&>span]:h-6 [&>span]:w-6 [&>span]:bg-white [&>span[data-state=checked]]:translate-x-5 [&>span[data-state=unchecked]]:translate-x-0"
                            />
                            <button
                              type="button"
                              disabled={watchlistBusy || !id}
                              onClick={async () => {
                                if (!id) return;
                                setWatchlistBusy(true);
                                setWatchlistError("");
                                try {
                                  await removeWatchlistAccount(id);
                                  setWatchlistUsers((current) => current.filter((item) => item.id !== id));
                                  setDashboardData((current) =>
                                    current
                                      ? {
                                          ...current,
                                          watchlists: (current.watchlists ?? []).filter((item) => item.id !== id),
                                        }
                                      : current,
                                  );
                                  setWatchlistPage(1);
                                } catch (error) {
                                  setWatchlistError(error instanceof Error ? error.message : "Unable to remove account.");
                                } finally {
                                  setWatchlistBusy(false);
                                }
                              }}
                              className="text-sm font-medium text-destructive hover:underline disabled:opacity-40"
                            >
                              Delete
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
                <div className="flex flex-col gap-3 border-t border-border px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing {visibleWatchlistUsers.length} of {watchlistUsers.length} users
                  </p>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      disabled={watchlistPage === 1}
                      onClick={() => setWatchlistPage((page) => Math.max(1, page - 1))}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="px-2 text-xs text-muted-foreground">{watchlistPage} / {watchlistTotalPages}</span>
                    <button
                      type="button"
                      disabled={watchlistPage === watchlistTotalPages}
                      onClick={() => setWatchlistPage((page) => Math.min(watchlistTotalPages, page + 1))}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              {watchlistError ? (
                <p className="mt-3 text-sm text-destructive">{watchlistError}</p>
              ) : null}
              {showAddWatchlist && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      const cleanUsername = newUsername.trim().replace(/^@/, "");
                      if (!cleanUsername || watchlistBusy) return;
                      setWatchlistBusy(true);
                      setWatchlistError("");
                      try {
                        await addWatchlistAccounts([cleanUsername]);
                        const latest = await getDashboardWatchlists();
                        setDashboardData((current) => ({ ...(current ?? {}), watchlists: latest }));
                        setNewUsername("");
                        setShowAddWatchlist(false);
                        setWatchlistPage(1);
                      } catch (error) {
                        setWatchlistError(error instanceof Error ? error.message : "Unable to add account.");
                      } finally {
                        setWatchlistBusy(false);
                      }
                    }}
                    className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
                  >
                    <h3 className="text-lg font-semibold">Add to watchlist</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Enter a Twitter/X username to monitor.</p>
                    <label htmlFor="watchlist-username" className="mt-5 block text-xs font-medium">
                      Twitter/X username
                    </label>
                    <div className="relative mt-2">
                      <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="watchlist-username"
                        autoFocus
                        disabled={watchlistBusy}
                        value={newUsername.replace(/^@/, "")}
                        onChange={(event) => setNewUsername(event.target.value.replace(/^@/, ""))}
                        placeholder="username"
                        className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Enter the handle without spaces. The @ symbol is added automatically.</p>
                    {watchlistError ? <p className="mt-3 text-sm text-destructive">{watchlistError}</p> : null}
                    <div className="mt-5 flex justify-end gap-2">
                      <button type="button" onClick={() => setShowAddWatchlist(false)} className="rounded-lg px-4 py-2 text-sm hover:bg-muted">
                        Cancel
                      </button>
                      <button type="submit" disabled={watchlistBusy} className="rounded-lg bg-foreground px-4 py-2 text-sm text-background hover:opacity-90 disabled:opacity-50">
                        {watchlistBusy ? "Adding…" : "Add user"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </section>
        )}
        {activeSection === "Profile Status" && selectedStats && (
          <section className="p-6 lg:p-10">
            <div className="mx-auto max-w-6xl">
              <button
                type="button"
                onClick={() => setActiveSection("Watchlists")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to watchlists
              </button>
              <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="flex items-center gap-4">
                    {selectedStats.avatar ? (
                      <img src={selectedStats.avatar} alt="" className="h-16 w-16 rounded-full object-cover" />
                    ) : (
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                        {selectedStats.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Profile status</p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight">{selectedStats.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedStats.username}</p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">{selectedStats.bio}</p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {selectedStats.followers} followers · {selectedStats.following} following
                  </p>
                </div>
                <div className="lg:min-w-[420px]">
                  <div className="mb-3 flex justify-end">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600">
                      Monitoring active
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Posts this month", "42"],
                      ["Engagement rate", "8.6%"],
                      ["Avg. reach", "24.8K"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-border bg-card p-4">
                        <p className="text-xl font-semibold">{value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <GrowthChart profileName={selectedStats.name} />
              </div>
              <div className="mt-10">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Notifications sent for every new post</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">Alert history</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>
                <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-5">Post</TableHead>
                        <TableHead>Post time</TableHead>
                        <TableHead>Alert sent time</TableHead>
                        <TableHead title="Impressions" aria-label="Impressions"><Eye className="h-4 w-4" /></TableHead>
                        <TableHead title="Likes" aria-label="Likes"><Heart className="h-4 w-4" /></TableHead>
                        <TableHead title="Comments" aria-label="Comments"><MessageCircle className="h-4 w-4" /></TableHead>
                        <TableHead title="Your impressions" aria-label="Your impressions"><Eye className="h-4 w-4 text-muted-foreground" /></TableHead>
                        <TableHead>Your engagement</TableHead>
                        <TableHead className="pr-5 text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleAlerts.map(({ post, post_time: postTime, alert_time: alertTime, impressions, likes, comments, user_engagement: userEngagement }) => (
                        <TableRow key={post}>
                          <TableCell className="max-w-[280px] truncate pl-5 font-medium">{post}</TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">{postTime}</TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">{alertTime}</TableCell>
                          <TableCell>{impressions}</TableCell>
                          <TableCell>{likes}</TableCell>
                          <TableCell>{comments}</TableCell>
                          <TableCell>{(Number.parseFloat(impressions) * 0.17).toFixed(1)}K</TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">{userEngagement}</TableCell>
                          <TableCell className="pr-5 text-right">
                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-600">Sent</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between border-t border-border px-1 py-4">
                  <p className="text-xs text-muted-foreground">
                    Showing {(alertPage - 1) * alertPageSize + 1}-{Math.min(alertPage * alertPageSize, alertTotal)} of {alertTotal} posts
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={alertPage === 1}
                      onClick={() => setAlertPage((page) => Math.max(1, page - 1))}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="px-2 text-xs text-muted-foreground">{alertPage} / {alertTotalPages}</span>
                    <button
                      type="button"
                      disabled={alertPage === alertTotalPages}
                      onClick={() => setAlertPage((page) => Math.min(alertTotalPages, page + 1))}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === "Draft angles" && (
          <section className="p-6 lg:p-10">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm text-muted-foreground">Turn signals into publishable ideas</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Draft angles</h2>
              <DraftsPanel />
            </div>
          </section>
        )}
        {activeSection === "Settings" && (
          <section className="p-6 lg:p-10">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm text-muted-foreground">Workspace preferences</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Settings</h2>
              <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
                {Object.entries(settingsEnabled).map(([setting, enabled]) => (
                  <div key={setting} className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-medium">{setting}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {setting === "Browser push notifications"
                          ? "Get an immediate browser alert when a watched account posts."
                          : "Manage how PostPuls keeps you informed."}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-pressed={enabled}
                      onClick={async () => {
                        if (setting === "Browser push notifications") {
                          setSettingsMessage("");
                          try {
                            if (enabled) {
                              await disableBrowserPushNotifications();
                              setSettingsEnabled((current) => ({ ...current, [setting]: false }));
                              setSettingsMessage("Browser push notifications disabled.");
                            } else {
                              await enableBrowserPushNotifications();
                              setSettingsEnabled((current) => ({ ...current, [setting]: true }));
                              setSettingsMessage("Browser push notifications enabled.");
                            }
                          } catch (error) {
                            setSettingsMessage(
                              error instanceof Error ? error.message : "Unable to update browser notifications.",
                            );
                          }
                          return;
                        }
                        setSettingsEnabled((current) => ({
                          ...current,
                          [setting]: !current[setting as keyof typeof current],
                        }));
                      }}
                      className={`h-6 w-11 rounded-full p-1 transition-colors ${enabled ? "bg-foreground" : "bg-muted"}`}
                    >
                      <span className={`block h-4 w-4 rounded-full bg-background transition-transform ${enabled ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
              {settingsMessage ? (
                <p className="mt-4 text-sm text-muted-foreground">{settingsMessage}</p>
              ) : null}
            </div>
          </section>
        )}
        {activeSection === "Subscription" && (
          <section className="p-6 lg:p-10">
            <div className="mx-auto max-w-5xl">
              <p className="text-sm text-muted-foreground">Manage your PostPuls plan</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Subscription</h2>
              <div className="mt-8 max-w-md">
                {[
                  [
                    dashboardData?.subscription?.plan ?? "Pro Radar Access",
                    `$${dashboardData?.subscription?.price ?? 10}`,
                    `Up to ${dashboardData?.subscription?.monitored_profile_limit ?? 15} monitored X accounts`,
                  ],
                ].map(([plan, price, detail]) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      selectedPlan === plan ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    <p className="font-semibold">{plan}</p>
                    <p className="mt-6 text-3xl font-semibold">{price}<span className="text-sm font-normal opacity-60">/mo</span></p>
                    <p className="mt-2 text-sm opacity-70">{detail}</p>
                    <span className="mt-6 inline-block text-xs font-medium">{selectedPlan === plan ? "Current plan" : "Choose plan"}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <p className="font-medium">Selected plan: {selectedPlan}</p>
                <p className="mt-1 text-sm text-muted-foreground">Plan changes are ready to connect to billing checkout.</p>
                <button type="button" className="mt-4 rounded-lg bg-foreground px-4 py-2 text-sm text-background hover:opacity-90">
                  Continue to checkout
                </button>
              </div>
            </div>
          </section>
        )}
        {activeSection === "Transactions" && (
          <section className="px-4 py-6 sm:p-6 lg:p-10">
            <div className="mx-auto max-w-5xl">
              <p className="text-sm text-muted-foreground">Billing history</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Transactions</h2>
              <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
                <Table className="hidden sm:table">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-5">Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="pr-5 text-right">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleTransactions.map(([date, description, amount, status]) => (
                      <TableRow key={date}>
                        <TableCell className="pl-5 text-muted-foreground">{date}</TableCell>
                        <TableCell className="font-medium">{description}</TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell><span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-600">{status}</span></TableCell>
                        <TableCell className="pr-5 text-right">
                          <button type="button" className="text-sm underline underline-offset-4">Download</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="divide-y divide-border sm:hidden">
                  {visibleTransactions.map(([date, description, amount, status]) => (
                    <article key={date} className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-lg font-semibold">{description}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{date}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-lg font-semibold">{amount}</p>
                          <span className="mt-1 inline-flex rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-600">{status}</span>
                        </div>
                      </div>
                      <button type="button" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium hover:bg-muted">
                        <Download className="h-4 w-4" />
                        Download receipt
                      </button>
                    </article>
                  ))}
                </div>
                <div className="flex flex-col gap-3 border-t border-border px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing {(transactionPage - 1) * transactionPageSize + 1}-{Math.min(transactionPage * transactionPageSize, transactions.length)} of {transactions.length} transactions
                  </p>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      disabled={transactionPage === 1}
                      onClick={() => setTransactionPage((page) => Math.max(1, page - 1))}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="min-w-12 whitespace-nowrap px-2 text-center text-xs text-muted-foreground">{transactionPage} / {transactionTotalPages}</span>
                    <button
                      type="button"
                      disabled={transactionPage === transactionTotalPages}
                      onClick={() => setTransactionPage((page) => Math.min(transactionTotalPages, page + 1))}
                      className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeSection === "Profile" && (
          <section className="p-6 lg:p-10">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm text-muted-foreground">Profiles used to publish comments</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Your X profiles</h2>
              <div className="mt-8 rounded-2xl border border-border bg-card">
                <div className="p-6">
                  <h3 className="font-semibold">Add your X profile</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Choose which connected profile PostPuls should use when you comment.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Input
                      value={ownProfileInput}
                      onChange={(event) => setOwnProfileInput(event.target.value.replace(/^@/, ""))}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          const username = ownProfileInput.trim();
                          if (!username || ownProfiles.some((profile) => profile.username === `@${username}`)) return;
                          setOwnProfiles((profiles) => [
                            ...profiles,
                            {
                              id: username,
                              name: username,
                              username: `@${username}`,
                              avatar: `https://i.pravatar.cc/160?u=${username}`,
                              followers: "0",
                              following: "0",
                              owner: false,
                            },
                          ]);
                          setOwnProfileInput("");
                        }
                      }}
                      placeholder="Add by @username"
                      className="min-w-0 flex-1"
                    />
                    <Button
                      type="button"
                      size="icon"
                      aria-label="Add X profile"
                      onClick={() => {
                        const username = ownProfileInput.trim();
                        if (!username || ownProfiles.some((profile) => profile.username === `@${username}`)) return;
                        setOwnProfiles((profiles) => [
                          ...profiles,
                          {
                            id: username,
                            name: username,
                            username: `@${username}`,
                            avatar: `https://i.pravatar.cc/160?u=${username}`,
                            followers: "0",
                            following: "0",
                            owner: false,
                          },
                        ]);
                        setOwnProfileInput("");
                      }}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-3 p-6">
                  {ownProfiles.map((profile) => (
                    <div key={profile.id} className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback className="bg-foreground text-xs text-background">X</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-sm font-medium">{profile.name}</span>
                        <span className="truncate text-xs text-muted-foreground">{profile.username}</span>
                      </div>
                      <div className="whitespace-nowrap text-xs text-muted-foreground">
                        <strong className="text-foreground">{profile.followers}</strong> followers
                        <span className="mx-1.5 text-border">·</span>
                        <strong className="text-foreground">{profile.following}</strong> following
                      </div>
                      {profile.owner ? (
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Primary</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOwnProfiles((profiles) => profiles.filter((item) => item.id !== profile.id))}
                          className="text-xs font-medium text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
