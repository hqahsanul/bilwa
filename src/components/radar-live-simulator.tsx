"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  Copy,
  Check,
  ExternalLink,
  Radio,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getFeedOpportunities, type FeedOpportunity } from "@/lib/auth";

interface Opportunity {
  id: string;
  category: string;
  author: string;
  handle: string;
  avatar: string;
  avatarUrl?: string;
  age: string;
  postedAtLabel: string;
  text: string;
  composeUrl?: string;
  angles: {
    label: string;
    description: string;
    text: string;
  }[];
}

const DEMO_OPPORTUNITIES: Opportunity[] = [
  {
    id: "1",
    category: "Founders & SaaS",
    author: "Maya Chen",
    handle: "@mayabuilds",
    avatar: "MC",
    age: "4m ago",
    postedAtLabel: "Demo",
    text: "Unpopular opinion: distribution is now a primary product feature. The best builders I know are designing the launch loop before they ever touch the onboarding flow.",
    angles: [
      {
        label: "Extend & Elevate",
        description: "Add a compounding framework",
        text: "Distribution isn't the layer after product anymore. It's the core loop. If the interaction itself doesn't inherently attract or invite the next user, no amount of post-launch marketing will save retention.",
      },
      {
        label: "Counter-Intuitive Take",
        description: "Challenge the premise with nuance",
        text: "Launch loops create spikes; onboarding loops decide whether they compound. Starting with distribution is great for vanity metrics, but if day-7 retention drops off a cliff, you're filling a leaky bucket.",
      },
      {
        label: "Data & Case-Study",
        description: "Back it up with concrete evidence",
        text: "This matches what we saw analyzing early viral SaaS products: teams that reduced time-to-share under 90 seconds grew organically 4.6× faster than teams obsessed solely with sign-up forms.",
      },
    ],
  },
  {
    id: "2",
    category: "AI & Devs",
    author: "Jon Bell",
    handle: "@jononproduct",
    avatar: "JB",
    age: "7m ago",
    postedAtLabel: "Demo",
    text: "AI models aren't replacing taste. They're commoditizing generic execution so rapidly that having an authentic point of view is the only moat left.",
    angles: [
      {
        label: "Extend & Elevate",
        description: "Build upon the moat concept",
        text: "Exactly this. When generation cost drops to zero, curation and perspective become 100x more valuable. The future belongs to editors with strong conviction, not raw prompt producers.",
      },
      {
        label: "Counter-Intuitive Take",
        description: "Add a technical perspective",
        text: "Taste matters, but workflow integration is what locks users in. A product with 7/10 taste embedded deeply into daily developer muscle memory beats 10/10 taste in a disconnected silo every time.",
      },
      {
        label: "Data & Case-Study",
        description: "Real-world benchmark",
        text: "We tracked 50 AI wrapper launches last quarter: the ones built around a specific creator's workflow had 3× the retention of generic 'all-in-one AI copilot' tools.",
      },
    ],
  },
  {
    id: "3",
    category: "Growth & Creators",
    author: "Leila Ortiz",
    handle: "@leilaonline",
    avatar: "LO",
    age: "11m ago",
    postedAtLabel: "Demo",
    text: "Creators don't need another generic scheduling tool. They need better timing intelligence and a clear signal of where the high-leverage conversations are happening right now.",
    angles: [
      {
        label: "Extend & Elevate",
        description: "Highlight timing asymmetric upside",
        text: "100%. Replying to the right thread in minute 15 produces more qualified profile impressions than sending 5 scheduled standalone posts into an empty algorithm void.",
      },
      {
        label: "Counter-Intuitive Take",
        description: "Alternative viewpoint",
        text: "Timing gets you discovered, but your back-catalog profile is what converts visits into followers. If your pinned thread and bio aren't dialed in, the breakout moment goes to waste.",
      },
      {
        label: "Data & Case-Study",
        description: "Metrics breakdown",
        text: "Data shows that comments placed within the top 5 replies of a breakout tweet average 22× higher reach than replies submitted after 2 hours.",
      },
    ],
  },
];

const DEMO_CATEGORIES = ["All Signals", "Founders & SaaS", "AI & Devs", "Growth & Creators"];

const DEFAULT_ANGLE_META = [
  { label: "Extend & Elevate", description: "Build on the point" },
  { label: "Counter-Intuitive Take", description: "Challenge with nuance" },
  { label: "Data & Case-Study", description: "Ground it in evidence" },
];

function formatRelativeTime(iso: string | null | undefined) {
  if (!iso) return "just now";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "just now";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAbsoluteTime(iso: string | null | undefined) {
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

function TweetBody({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <p className={cn("whitespace-pre-wrap break-words", className)}>
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
          <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>
        ),
      )}
    </p>
  );
}

function mapFeedOpportunity(item: FeedOpportunity): Opportunity {
  const handle = item.author_handle
    ? item.author_handle.startsWith("@")
      ? item.author_handle
      : `@${item.author_handle}`
    : "@unknown";
  const author = item.author_name || handle.replace(/^@/, "");
  const drafts = Array.isArray(item.drafts) ? item.drafts : [];
  const angles =
    drafts.length > 0
      ? drafts.map((draft, index) => ({
          label: draft.angle || DEFAULT_ANGLE_META[index]?.label || `Angle ${index + 1}`,
          description:
            draft.description ||
            DEFAULT_ANGLE_META[index]?.description ||
            "Reply suggestion",
          text: draft.text || "",
        }))
      : DEFAULT_ANGLE_META.map((meta) => ({
          ...meta,
          text: "No draft generated yet for this post.",
        }));

  const postedAt = item.post_created_at || item.scored_at;
  return {
    id: item.id,
    category: item.match_source || "Watchlist",
    author,
    handle,
    avatar: author.slice(0, 2).toUpperCase(),
    avatarUrl: item.author_avatar || undefined,
    age: formatRelativeTime(postedAt),
    postedAtLabel: formatAbsoluteTime(postedAt),
    text: (item.post_text || "").trim(),
    composeUrl: item.compose_url || undefined,
    angles,
  };
}

function AvatarBadge({
  label,
  imageUrl,
  className,
}: {
  label: string;
  imageUrl?: string;
  className?: string;
}) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className={cn("shrink-0 rounded-full object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-neutral-800 text-xs font-bold text-white",
        className,
      )}
    >
      {label}
    </div>
  );
}

export function RadarLiveSimulator({ dashboardMode = false }: { dashboardMode?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All Signals");
  const [selectedId, setSelectedId] = useState<string | null>(dashboardMode ? null : "1");
  const [selectedAngleIdx, setSelectedAngleIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [liveOpportunities, setLiveOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(dashboardMode);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!dashboardMode) return;

    let cancelled = false;

    const load = async () => {
      try {
        const items = await getFeedOpportunities("open");
        if (cancelled) return;
        const mapped = items.map(mapFeedOpportunity);
        setLiveOpportunities(mapped);
        setSelectedId((current) => {
          if (current && mapped.some((item) => item.id === current)) return current;
          return mapped[0]?.id ?? null;
        });
        setUpdatedAt(new Date());
        setError("");
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load live opportunities.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    const timer = window.setInterval(() => {
      void load();
    }, 30_000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [dashboardMode]);

  const sourceOpportunities = dashboardMode ? liveOpportunities : DEMO_OPPORTUNITIES;
  const categories = useMemo(() => {
    if (!dashboardMode) return DEMO_CATEGORIES;
    const sources = Array.from(
      new Set(liveOpportunities.map((item) => item.category).filter(Boolean)),
    );
    return ["All Signals", ...sources];
  }, [dashboardMode, liveOpportunities]);

  const filteredOpportunities =
    activeCategory === "All Signals"
      ? sourceOpportunities
      : sourceOpportunities.filter((opp) => opp.category === activeCategory);

  const activeOpp =
    filteredOpportunities.find((opp) => opp.id === selectedId) ||
    filteredOpportunities[0] ||
    null;

  const currentAngle = activeOpp?.angles[selectedAngleIdx] || activeOpp?.angles[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Draft reply copied to clipboard!", {
      description: "Ready to paste directly into X or customize in your voice.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const updatedLabel = updatedAt
    ? `Updated ${Math.max(0, Math.floor((Date.now() - updatedAt.getTime()) / 1000))}s ago`
    : loading
      ? "Loading…"
      : "Waiting for signals";

  return (
    <section
      id="demo"
      className={cn(
        "relative z-10 w-full px-6 py-20 sm:py-28",
        dashboardMode && "px-6 py-8 sm:px-10 sm:py-10",
      )}
    >
      <div className={cn("mx-auto", dashboardMode ? "max-w-none" : "max-w-5xl")}>
        {!dashboardMode && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 bg-neutral-50/50 px-4 py-1.5 dark:border-neutral-700/50 dark:bg-neutral-900/40">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-xs font-medium tracking-tight text-primary">
                Live Platform Preview
              </span>
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              See conversations as they move.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              NineBeam keeps channel activity visible so agents and AI can respond before SLAs slip.
            </p>
          </div>
        )}

        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-2",
            dashboardMode ? "mb-6" : "mt-10",
          )}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                const first =
                  cat === "All Signals"
                    ? sourceOpportunities[0]
                    : sourceOpportunities.find((o) => o.category === cat);
                if (first) setSelectedId(first.id);
              }}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-[0.875rem] border px-4 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]",
                activeCategory === cat
                  ? "border-black bg-black text-white shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:bg-muted hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          className={cn(
            "mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 transition-all",
            dashboardMode && "min-h-[calc(100vh-150px)]",
          )}
        >
          <div className="flex flex-wrap items-center justify-between border-b border-border bg-muted/30 px-5 py-3 text-xs sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Radio className="h-3.5 w-3.5 animate-pulse text-primary" />
                Live Post Monitor
              </span>
              <span className="hidden text-muted-foreground sm:inline">•</span>
              <span className="hidden text-muted-foreground sm:inline">
                {dashboardMode
                  ? `${sourceOpportunities.length} open opportunit${sourceOpportunities.length === 1 ? "y" : "ies"}`
                  : "Monitoring 247 accounts"}
              </span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="h-3 w-3" /> {dashboardMode ? updatedLabel : "Updated 4s ago"}
              </span>
            </div>
          </div>

          {dashboardMode && loading && sourceOpportunities.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">Loading live radar…</div>
          ) : dashboardMode && error && sourceOpportunities.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-semibold">Unable to load opportunities</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            </div>
          ) : dashboardMode && sourceOpportunities.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-semibold">No live opportunities yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Add a watchlist account and wait for the next poll cycle. New posts will appear here
                with reply angles.
              </p>
            </div>
          ) : (
            <div
              className={cn(
                "grid lg:grid-cols-[360px_minmax(0,1fr)]",
                dashboardMode && "lg:min-h-[calc(100vh-210px)]",
              )}
            >
              <div className="min-h-0 border-b border-border bg-muted/10 lg:border-b-0 lg:border-r">
                <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Posts ({filteredOpportunities.length})
                </div>
                <div className="max-h-[420px] divide-y divide-border overflow-y-auto lg:max-h-[calc(100vh-280px)]">
                  {filteredOpportunities.map((opp) => {
                    const isSelected = opp.id === activeOpp?.id;
                    return (
                      <button
                        key={opp.id}
                        type="button"
                        onClick={() => {
                          setSelectedId(opp.id);
                          setSelectedAngleIdx(0);
                        }}
                        className={cn(
                          "w-full p-4 text-left transition-all",
                          isSelected
                            ? "border-l-4 border-l-primary bg-background shadow-inner"
                            : "hover:bg-muted/40",
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <AvatarBadge
                            label={opp.avatar}
                            imageUrl={opp.avatarUrl}
                            className="h-9 w-9"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {opp.author}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {opp.handle} · {opp.age}
                              {opp.postedAtLabel ? ` · ${opp.postedAtLabel}` : ""}
                            </p>
                          </div>
                          <span
                            className="ml-auto text-xl font-light leading-none text-muted-foreground"
                            aria-hidden="true"
                          >
                            𝕏
                          </span>
                        </div>

                        <TweetBody
                          text={opp.text}
                          className="mt-4 line-clamp-4 text-sm leading-6 text-foreground"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeOpp && currentAngle ? (
                <div className="flex max-w-5xl flex-col justify-between p-6 sm:p-8 lg:pr-12">
                  <div>
                    <article className="rounded-2xl border border-border bg-background p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)] sm:p-5">
                      <div className="flex items-center gap-3">
                        <AvatarBadge
                          label={activeOpp.avatar}
                          imageUrl={activeOpp.avatarUrl}
                          className="h-10 w-10"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-bold text-foreground">{activeOpp.author}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{activeOpp.handle}</p>
                        </div>
                        <span
                          className="ml-auto text-2xl font-light leading-none text-muted-foreground"
                          aria-label="X"
                        >
                          𝕏
                        </span>
                      </div>
                      <TweetBody
                        text={activeOpp.text}
                        className="mt-4 text-base leading-7 text-foreground sm:text-lg"
                      />
                      <p className="mt-4 text-xs text-muted-foreground">
                        {activeOpp.age}
                        {activeOpp.postedAtLabel ? ` · ${activeOpp.postedAtLabel}` : ""}
                      </p>
                    </article>

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1.5 text-xs font-semibold tracking-tight text-foreground">
                          Select AI Voice Angle
                        </p>
                        <span className="text-[11px] text-muted-foreground">
                          {dashboardMode ? "From your opportunity drafts" : "Demo angles"}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {activeOpp.angles.map((angle, idx) => {
                          const isActive = selectedAngleIdx === idx;
                          return (
                            <button
                              key={`${angle.label}-${idx}`}
                              type="button"
                              onClick={() => setSelectedAngleIdx(idx)}
                              className={cn(
                                "rounded-xl border p-3 text-left transition-all",
                                isActive
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-border bg-background hover:bg-muted/40",
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={cn(
                                    "text-xs font-semibold",
                                    isActive ? "text-primary" : "text-foreground",
                                  )}
                                >
                                  {angle.label}
                                </span>
                                {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
                              </div>
                              <span className="mt-1 block text-[11px] text-muted-foreground">
                                {angle.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-neutral-200/80 bg-neutral-50/40 p-4 dark:border-neutral-700/60 dark:bg-neutral-900/20">
                      <div className="flex items-center justify-between border-b border-neutral-200/50 pb-2 dark:border-neutral-700/50">
                        <span className="text-[11px] font-medium text-primary">
                          Generated Response Draft ({currentAngle.label})
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Character count: {currentAngle.text.length} / 280
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-foreground sm:text-sm">
                        {currentAngle.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() => handleCopy(currentAngle.text)}
                      className="inline-flex w-fit items-center justify-center gap-2 rounded-md border border-foreground bg-foreground px-6 py-2.5 text-xs font-semibold text-background transition-all hover:bg-foreground/85 active:scale-[0.98] sm:text-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Draft
                        </>
                      )}
                    </button>
                    {activeOpp.composeUrl ? (
                      <a
                        href={activeOpp.composeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-md border border-border px-6 py-2.5 text-xs font-semibold transition-all hover:bg-muted sm:text-sm"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open in X
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RadarLiveSimulator;
