"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Camera, ChevronLeft, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackSiteEvent } from "@/lib/site-analytics";

const ACCENT = "rgb(55, 90, 255)";
const BORDER = "#E5E7EB";
const HEADING = "#0A1128";
const BODY = "#6B7280";

type FeedbackCategory =
  | "issue"
  | "idea"
  | "happy"
  | "angry"
  | "praise"
  | "question"
  | "feature"
  | "confusing"
  | "other";

const CATEGORIES: {
  id: FeedbackCategory;
  label: string;
  emoji: string;
}[] = [
  { id: "issue", label: "Issue", emoji: "🐛" },
  { id: "idea", label: "Idea", emoji: "💡" },
  { id: "happy", label: "Happy", emoji: "😀" },
  { id: "angry", label: "Angry", emoji: "😠" },
  { id: "praise", label: "Praise", emoji: "🙌" },
  { id: "question", label: "Question", emoji: "❓" },
  { id: "feature", label: "Feature", emoji: "✨" },
  { id: "confusing", label: "Confusing", emoji: "😕" },
  { id: "other", label: "Other", emoji: "💬" },
];

type Step = "closed" | "categories" | "form" | "thanks";

export function FeedbackWidget() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("closed");
  const [category, setCategory] = useState<FeedbackCategory | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState(false);
  const [sending, setSending] = useState(false);

  const open = step !== "closed";
  const selected = CATEGORIES.find((c) => c.id === category);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setStep("closed");
    setSending(false);
  }

  function resetForm() {
    setCategory(null);
    setEmail("");
    setMessage("");
    setScreenshot(false);
  }

  function openWidget() {
    resetForm();
    setStep("categories");
    trackSiteEvent({ event_name: "cta_click", target: "feedback", location: "feedback_tab" });
  }

  function pickCategory(id: FeedbackCategory) {
    setCategory(id);
    setStep("form");
  }

  async function submit() {
    if (!category || !message.trim()) return;
    setSending(true);
    trackSiteEvent({
      event_name: "cta_click",
      target: `feedback_${category}`,
      location: "feedback_form",
    });
    try {
      const payload = {
        category,
        email: email.trim() || undefined,
        message: message.trim(),
        screenshot,
        href: typeof window !== "undefined" ? window.location.href : undefined,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("ninebeam_feedback") || "[]") as unknown[];
      localStorage.setItem("ninebeam_feedback", JSON.stringify([payload, ...existing].slice(0, 50)));
      await new Promise((r) => setTimeout(r, 450));
      setStep("thanks");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {/* Right-edge Feedback tab — matches Produktly-style vertical dock */}
      {!open ? (
        <button
          type="button"
          onClick={openWidget}
          aria-label="Open feedback"
          className="pointer-events-auto absolute top-[38%] right-0 z-[81] flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-l-[10px] rounded-r-none px-2.5 py-3.5 text-white transition-opacity hover:opacity-90"
          style={{
            backgroundColor: ACCENT,
            boxShadow: "0 10px 28px rgb(55 90 255 / 0.45)",
          }}
        >
          <MessageSquare className="size-4 shrink-0" strokeWidth={2.25} />
          <span
            className="text-[13px] font-semibold tracking-[0.04em]"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Feedback
          </span>
        </button>
      ) : null}

      {/* Panel */}
      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="pointer-events-auto absolute top-[18%] right-4 w-[min(100vw-2rem,400px)] overflow-hidden rounded-xl border bg-white shadow-[0_16px_48px_rgb(15_23_42_/_0.18)] sm:right-6 sm:top-[14%]"
          style={{ borderColor: BORDER }}
        >
          {step === "categories" ? (
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <h2
                  id={titleId}
                  className="pr-2 text-[16px] leading-snug font-semibold"
                  style={{ color: HEADING }}
                >
                  We would love to hear your feedback
                </h2>
                <IconButton label="Close feedback" onClick={close}>
                  <X className="size-4" />
                </IconButton>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-3">
                {CATEGORIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => pickCategory(item.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg border px-1.5 py-3 transition-colors",
                      "hover:border-[rgb(55,90,255)] hover:bg-[rgb(55,90,255)]/5",
                      category === item.id &&
                        "border-[rgb(55,90,255)] bg-[rgb(55,90,255)]/5",
                    )}
                    style={{ borderColor: category === item.id ? ACCENT : BORDER, color: HEADING }}
                  >
                    <span className="text-[22px] leading-none" aria-hidden>
                      {item.emoji}
                    </span>
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              <PoweredBy />
            </div>
          ) : null}

          {step === "form" && selected ? (
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <IconButton label="Back" onClick={() => setStep("categories")}>
                  <ChevronLeft className="size-4" />
                </IconButton>
                <div className="flex items-center gap-1.5 text-[15px] font-semibold" style={{ color: HEADING }}>
                  <span aria-hidden>{selected.emoji}</span>
                  <span>{selected.label}</span>
                </div>
                <IconButton label="Close feedback" onClick={close}>
                  <X className="size-4" />
                </IconButton>
              </div>

              <div className="mt-4 space-y-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="h-10 w-full rounded-md border bg-white px-3 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-[rgb(55,90,255)]/25"
                  style={{ borderColor: BORDER, color: HEADING }}
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your feedback"
                  rows={4}
                  required
                  className="min-h-[96px] w-full resize-y rounded-md border bg-white px-3 py-2.5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-[rgb(55,90,255)]/25"
                  style={{ borderColor: BORDER, color: HEADING }}
                />
              </div>

              <button
                type="button"
                onClick={() => setScreenshot((v) => !v)}
                className={cn(
                  "mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-md border text-[13px] font-medium transition-colors",
                  screenshot
                    ? "border-[rgb(55,90,255)] bg-[rgb(55,90,255)]/5 text-[rgb(55,90,255)]"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                )}
                style={!screenshot ? { borderColor: BORDER } : undefined}
              >
                <Camera className="size-4" />
                {screenshot ? "Screenshot attached" : "Take a screenshot of the page"}
              </button>

              <button
                type="button"
                disabled={sending || !message.trim()}
                onClick={submit}
                className="mt-2.5 flex h-11 w-full items-center justify-center rounded-md text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
                style={{ backgroundColor: ACCENT }}
              >
                {sending ? "Sending…" : "Send"}
              </button>

              <PoweredBy />
            </div>
          ) : null}

          {step === "thanks" ? (
            <div className="p-5 text-center sm:p-6">
              <div className="flex justify-end">
                <IconButton label="Close feedback" onClick={close}>
                  <X className="size-4" />
                </IconButton>
              </div>
              <p className="mt-2 text-[28px]" aria-hidden>
                🙏
              </p>
              <h2 id={titleId} className="mt-2 text-[17px] font-semibold" style={{ color: HEADING }}>
                Thanks for your feedback
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: BODY }}>
                We read every message and use it to improve NineBeam.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-md px-5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Done
              </button>
              <PoweredBy />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border text-slate-600 transition-colors hover:bg-slate-50"
      style={{ borderColor: BORDER }}
    >
      {children}
    </button>
  );
}

function PoweredBy() {
  return (
    <p className="mt-4 text-center text-[12px]" style={{ color: BODY }}>
      Powered by{" "}
      <a href="/" className="font-medium underline-offset-2 hover:underline" style={{ color: ACCENT }}>
        NineBeam
      </a>
    </p>
  );
}

export default FeedbackWidget;
