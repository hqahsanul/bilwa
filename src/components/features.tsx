import {
  Radar,
  Gauge,
  Users2,
  BellRing,
  ExternalLink,
  BarChart3,
  ShieldCheck,
  MessageCircle,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "rgb(53, 86, 250)";

type Feature = {
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Radar,
    label: "Unified Inbox",
    description: "Bring WhatsApp, webchat, and tickets into one agent workspace with clear ownership.",
  },
  {
    icon: Gauge,
    label: "AI Voice",
    description: "Run inbound and outbound voice journeys with fair routing and human takeover.",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Campaigns",
    description: "Launch templated outreach, track replies, and keep every conversation tied to the lead.",
  },
  {
    icon: Users2,
    label: "Team Operations",
    description: "Roles, shifts, breaks, and assignment rules so capacity stays visible all day.",
  },
  {
    icon: BellRing,
    label: "Automation Flows",
    description: "Escalate, assign, and notify across channels without losing conversation context.",
  },
  {
    icon: ExternalLink,
    label: "Knowledge-backed AI",
    description: "Answer with grounded documents and safety checks before anything reaches a customer.",
  },
  {
    icon: BarChart3,
    label: "Live Dashboards",
    description: "Track leads, tickets, voice volume, and campaign health in one tenant view.",
  },
  {
    icon: ShieldCheck,
    label: "Multi-tenant Ready",
    description: "Isolate brands and data while keeping a consistent operating model for every team.",
  },
];

function Cross({ className }: { className?: string }) {
  return (
    <Plus
      className={cn(
        "absolute z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/50 sm:block",
        className
      )}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

export function Features({ className }: { className?: string }) {
  return (
    <section
      id="features"
      className={cn("relative z-10 w-full overflow-hidden px-6 py-24 sm:py-32", className)}
    >
      {/* Dotted field — matches roadmaps / how-it-works bands */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #D1D5DB 1.25px, transparent 1.25px)",
          backgroundSize: "18px 18px",
          opacity: 0.45,
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/60 bg-neutral-50/50 px-4 py-1.5 dark:border-neutral-700/50 dark:bg-neutral-900/40">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs font-medium tracking-tight text-primary">
            Built for modern support and growth teams
          </span>
        </div>

        <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Everything you need to engage customers end to end.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Channels, AI, campaigns, and team operations in one platform — without a disconnected tool stack.
        </p>
      </div>

      <div className="relative z-[1] mx-auto mt-16 max-w-5xl">
        {/* Plus crosshairs at grid intersections (4 cols x 2 rows) */}
        <Cross className="left-1/4 top-1/2" />
        <Cross className="left-2/4 top-1/2" />
        <Cross className="left-3/4 top-1/2" />

        <div className="grid grid-cols-2 grid-rows-2 gap-px border border-border bg-border sm:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="group flex flex-col items-start gap-4 bg-background p-7 transition-colors hover:bg-muted/50 sm:p-8"
            >
              {feature.icon && (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: ACCENT }}
                >
                  <feature.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              )}
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  {feature.label}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
