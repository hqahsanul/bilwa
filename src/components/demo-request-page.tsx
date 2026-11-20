"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleCheck } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { createAppointment, getAppointmentAvailability } from "@/lib/auth";

const TIME_GROUPS = [
  {
    label: "Morning",
    slots: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  },
  {
    label: "Afternoon",
    slots: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"],
  },
  {
    label: "Evening",
    slots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"],
  },
];

const ALL_SLOTS = TIME_GROUPS.flatMap((group) => group.slots);
const UNAVAILABLE_SLOTS = new Set<string>();

function formatDate(date: Date | undefined, options: Intl.DateTimeFormatOptions) {
  return date?.toLocaleDateString("en-US", options) ?? "";
}

function endTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const end = new Date(2026, 0, 1, hours, minutes + 30);
  return end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function getToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function isSlotInPast(dateKey: string, slot: string, nowMs: number): boolean {
  if (!dateKey) return false;
  const slotMs = new Date(`${dateKey}T${slot}:00+05:30`).getTime();
  return Number.isFinite(slotMs) && slotMs <= nowMs;
}

export function DemoRequestPage() {
  const [date, setDate] = useState<Date | undefined>(() => getToday());
  const [month, setMonth] = useState<Date>(() => getToday());
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [unavailableTimes, setUnavailableTimes] = useState(UNAVAILABLE_SLOTS);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedDateLabel = formatDate(date, { weekday: "long", month: "short", day: "numeric" });
  const selectedDateShort = formatDate(date, { weekday: "short", month: "short", day: "numeric" });
  const dateKey = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";
  const today = getToday();

  useEffect(() => {
    const localToday = getToday();
    setNowMs(Date.now());
    setDate((prev) => {
      if (!prev || prev.getTime() < localToday.getTime()) {
        setMonth(localToday);
        return localToday;
      }
      return prev;
    });
    const timer = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!dateKey) return;
    let active = true;
    getAppointmentAvailability(dateKey)
      .then((availability) => {
        if (active) setUnavailableTimes(new Set([...UNAVAILABLE_SLOTS, ...availability.unavailable_times]));
      })
      .catch(() => {
        if (active) setUnavailableTimes(UNAVAILABLE_SLOTS);
      });
    return () => {
      active = false;
    };
  }, [dateKey]);

  const isSlotUnavailable = (slot: string) =>
    unavailableTimes.has(slot) || isSlotInPast(dateKey, slot, nowMs);

  const hasAvailableSlot = ALL_SLOTS.some((slot) => !isSlotUnavailable(slot));

  useEffect(() => {
    if (selectedTime && !unavailableTimes.has(selectedTime) && !isSlotInPast(dateKey, selectedTime, nowMs)) {
      return;
    }
    const firstAvailable = ALL_SLOTS.find(
      (slot) => !unavailableTimes.has(slot) && !isSlotInPast(dateKey, slot, nowMs),
    );
    setSelectedTime(firstAvailable ?? null);
  }, [selectedTime, unavailableTimes, dateKey, nowMs]);

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-background p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">✓</div>
          <h1 className="mt-5 text-2xl font-semibold">Booking confirmed</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your NineBeam appointment request has been received.</p>
          <Link href="/" className="mt-6 inline-flex rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white">Return home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-5 text-[#111827] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[960px]">
        <div className="overflow-hidden rounded-[22px] border border-[#e1e5ea] bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
          <div className="grid lg:grid-cols-[245px_minmax(0,1fr)_308px]">
            <aside className="hidden border-r border-[#e5e7eb] p-7 lg:flex lg:min-h-[490px] lg:flex-col">
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#111820] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Back to NineBeam
              </Link>
              <h1 className="mt-9 text-3xl font-bold leading-[1.08] tracking-tight">Book your<br />appointment</h1>
              <p className="mt-5 max-w-[170px] text-sm leading-5 text-[#6b7280]">
                Pick a day and a time that suits you. We’ll send a calendar invite to your email.
              </p>
              <div className="mt-auto text-xs text-[#6b7280]">
                <p className="font-medium text-[#374151]">30 minutes</p>
                <p className="mt-1">Times shown in IST (UTC+5:30)</p>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="px-5 pt-6 lg:hidden">
                <Link
                  href="/"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#111820] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  NineBeam
                </Link>
                <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight">Book your<br />appointment</h1>
                <p className="mt-2 text-xs text-[#6b7280]">30 min · Times in IST</p>
                <div className="mt-5 rounded-2xl border border-[#e6e9ed] p-4">
                  <p className="text-[11px] text-[#6b7280]">Your slot</p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <p className="text-sm font-semibold" suppressHydrationWarning>{selectedDateShort}</p>
                    <p className="text-3xl font-bold text-blue-600">{selectedTime ?? "--:--"}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(nextDate) => {
                    if (nextDate) {
                      setDate(nextDate);
                      setMonth(nextDate);
                    }
                  }}
                  month={month}
                  onMonthChange={setMonth}
                  disabled={(calendarDate) => calendarDate < today}
                  showOutsideDays={false}
                  className="mx-auto w-full bg-transparent p-0 [--cell-size:--spacing(10)] [&_[data-selected-single=true]]:mx-1 [&_[data-selected-single=true]]:bg-blue-600 [&_[data-selected-single=true]]:text-white [&_[data-selected-single=true]]:hover:bg-blue-600"
                  formatters={{
                    formatWeekdayName: (calendarDate) =>
                      calendarDate.toLocaleString("en-US", { weekday: "short" }),
                  }}
                />
              </div>
            </div>

            <section className="border-t border-[#e5e7eb] p-5 sm:p-7 lg:border-l lg:border-t-0">
              <h2 className="hidden text-lg font-semibold lg:block" suppressHydrationWarning>{selectedDateLabel}</h2>
              {!hasAvailableSlot && (
                <p className="mt-1 mb-3 text-xs text-[#6b7280]" suppressHydrationWarning>
                  No slots remaining for this date. Please pick another day.
                </p>
              )}
              <div className="space-y-5">
                {TIME_GROUPS.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{group.label}</p>
                    <div className="grid grid-cols-4 gap-2 lg:grid-cols-3">
                      {group.slots.map((slot) => {
                        const unavailable = isSlotUnavailable(slot);
                        const selected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={unavailable}
                            onClick={() => setSelectedTime(slot)}
                            className={`h-10 rounded-xl border text-xs font-medium transition-colors ${
                              unavailable
                                ? "cursor-not-allowed border-transparent bg-[#eef1f5] text-[#9ca3af] line-through"
                                : selected
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-[#e1e5ea] bg-white text-[#374151] hover:border-blue-400"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <form
            className="flex flex-col gap-4 border-t border-[#e5e7eb] bg-[#fafbfc] px-5 py-4 sm:px-7 lg:flex-row lg:items-end"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              const form = new FormData(event.currentTarget);
              if (!date || !selectedTime) return;
              if (isSlotInPast(dateKey, selectedTime, Date.now())) {
                setNowMs(Date.now());
                setError("That time slot has already passed. Please pick an upcoming time.");
                return;
              }
              const datePart = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
              ].join("-");
              setSubmitting(true);
              try {
                await createAppointment({
                  name: String(form.get("name") ?? ""),
                  email: String(form.get("email") ?? ""),
                  scheduled_at: `${datePart}T${selectedTime}:00+05:30`,
                  duration_minutes: 30,
                  timezone: "Asia/Kolkata",
                });
                setSubmitted(true);
              } catch (submissionError) {
                setError(submissionError instanceof Error ? submissionError.message : "Unable to book this appointment.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="flex items-center gap-2 text-sm lg:mr-auto">
              <CircleCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>
                {selectedTime ? (
                  <>
                    {selectedDateLabel} <strong>{selectedTime}–{endTime(selectedTime)}</strong>
                  </>
                ) : (
                  "Select an available time"
                )}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[425px]">
              <div>
                <label htmlFor="demo-name" className="mb-1 block text-[11px] font-medium text-[#6b7280]">Name</label>
                <input id="demo-name" name="name" required placeholder="Your name" className="h-10 w-full rounded-lg border border-[#dfe3e8] bg-white px-3 text-sm outline-none focus:border-black" />
              </div>
              <div>
                <label htmlFor="demo-email" className="mb-1 block text-[11px] font-medium text-[#6b7280]">Email</label>
                <input id="demo-email" name="email" type="email" required placeholder="you@company.com" className="h-10 w-full rounded-lg border border-[#dfe3e8] bg-white px-3 text-sm outline-none focus:border-black" />
              </div>
            </div>
            {error && <p className="text-xs text-red-600 lg:absolute lg:mt-16">{error}</p>}
            <button disabled={submitting || !date || !selectedTime} type="submit" className="h-10 rounded-lg bg-[#111820] px-5 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 lg:min-w-[153px]">
              {submitting ? "Booking…" : "Confirm booking"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
