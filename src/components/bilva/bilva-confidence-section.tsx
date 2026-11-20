"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

const GOLD = "#f0d160";
const SERIF = '"Newsreader", Georgia, "Times New Roman", serif';
const SANS = '"Inter", system-ui, -apple-system, "Segoe UI", sans-serif';

const DETAIL_ITEMS = [
  {
    num: "01",
    title: "Know your piece",
    body: "Purity and weight are clearly shown for every coin, bar, gemstone or rudraksh.",
    icon: (
      <svg viewBox="0 0 80 80" aria-hidden fill="none" stroke={GOLD} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 12C30 22 30 38 40 50C50 38 50 22 40 12Z" />
        <path d="M38 52C26 52 14 44 12 30C26 30 36 38 38 52Z" />
        <path d="M42 52C54 52 66 44 68 30C54 30 44 38 42 52Z" />
        <path d="M26 56C32 62 48 62 54 56" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Understand your total",
    body: "See a clear price breakdown, with the final amount and any applicable charges, before you place your order.",
    icon: (
      <svg viewBox="0 0 80 80" aria-hidden fill="none" stroke={GOLD} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="40" cy="22" rx="11" ry="15" />
        <ellipse cx="40" cy="58" rx="11" ry="15" />
        <ellipse cx="22" cy="40" rx="15" ry="11" />
        <ellipse cx="58" cy="40" rx="15" ry="11" />
        <circle cx="40" cy="40" r="4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Keep your records",
    body: "Your order details and relevant documents are available in your account, whenever you need them.",
    icon: (
      <svg viewBox="0 0 80 80" aria-hidden fill="none" stroke={GOLD} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="12" r="1.6" fill={GOLD} stroke="none" />
        <path d="M40 24C32 32 32 46 40 56C48 46 48 32 40 24Z" />
        <path d="M38 58C28 58 20 52 16 44C26 44 34 48 38 58Z" />
        <path d="M42 58C52 58 60 52 64 44C54 44 46 48 42 58Z" />
        <path d="M34 52C24 54 12 52 4 46" />
        <path d="M46 52C56 54 68 52 76 46" />
      </svg>
    ),
  },
] as const;

const REVIEW_CARDS = [
  {
    quote: "Sample review text. Replace with verified offline customer feedback.",
    who: "Offline customer · Name pending approval",
  },
  {
    quote: "Sample review text. Replace with verified offline customer feedback.",
    who: "Offline customer · Name pending approval",
  },
  {
    quote: "Sample review text. Replace with verified offline customer feedback.",
    who: "Offline customer · Name pending approval",
  },
] as const;

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

/** Port of bilwa-confidence-section.html */
export function BilvaConfidenceSection() {
  const [activeReview, setActiveReview] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  const showReview = useCallback(
    (index: number) => {
      const next = ((index % REVIEW_CARDS.length) + REVIEW_CARDS.length) % REVIEW_CARDS.length;
      setActiveReview(next);
      const wrap = cardsRef.current;
      const card = wrap?.children[next] as HTMLElement | undefined;
      if (wrap && card && window.matchMedia("(max-width: 820px)").matches) {
        wrap.scrollTo({ left: card.offsetLeft - wrap.offsetLeft - 4, behavior: "smooth" });
      }
    },
    []
  );

  return (
    <section
      id="confidence-details"
      className="w-full bg-[#FAF7F2]"
      aria-labelledby="confidence-details-heading"
    >
      <div
        className="sec mx-auto w-full max-w-7xl px-4 text-white sm:px-8 lg:px-12"
        style={{
          fontFamily: SANS,
          containerType: "inline-size",
          ["--u" as string]: "1cqw",
          paddingTop: "calc(var(--u) * 1)",
          paddingBottom: "calc(var(--u) * 1.6)",
          background: `
            radial-gradient(60cqw 30cqw at 15% 0, rgba(20,110,84,.35), transparent 70%),
            radial-gradient(50cqw 35cqw at 95% 40%, rgba(14,90,68,.35), transparent 70%),
            linear-gradient(180deg, #04271f 0%, #07382b 45%, #052d23 100%)
          `,
        }}
      >
        <header className="head text-center">
          <p
            className="eyebrow flex items-center justify-center font-medium uppercase tracking-[0.28em] text-[#f0d160]"
            style={{
              gap: "calc(var(--u) * 2)",
              fontSize: "calc(var(--u) * 1.45)",
            }}
          >
            <span
              className="h-px"
              style={{ width: "calc(var(--u) * 5.8)", background: GOLD }}
              aria-hidden
            />
            The confidence to choose
            <span
              className="h-px"
              style={{ width: "calc(var(--u) * 5.8)", background: GOLD }}
              aria-hidden
            />
          </p>
          <h2
            id="confidence-details-heading"
            className="font-medium leading-[1.1]"
            style={{
              fontFamily: SERIF,
              fontSize: "calc(var(--u) * 3.85)",
              marginTop: "calc(var(--u) * 0.45)",
              textShadow: "0 2px 6px rgba(0,0,0,.35)",
            }}
          >
            Confidence is in the details.
          </h2>
          <p
            className="text-[#f3f6f3]"
            style={{
              fontSize: "calc(var(--u) * 1.75)",
              marginTop: "calc(var(--u) * 0.35)",
            }}
          >
            The information you deserve before you choose something precious.
          </p>
        </header>

        <div
          className="feat grid max-lg:grid-cols-1 lg:grid-cols-[54.3fr_37.8fr]"
          style={{
            gap: "calc(var(--u) * 2.6)",
            marginTop: "calc(var(--u) * 2.2)",
          }}
        >
          <div
            className="photo relative overflow-hidden bg-[#d9c3a0] shadow-[0_0.8cqw_2cqw_rgba(0,0,0,.35)]"
            style={{ aspectRatio: "807 / 407" }}
          >
            <Image
              src="/images/bilva/confidence-details.png"
              alt="Gloved hand holding a Bilwa gold coin beside a purity certificate"
              fill
              className="block object-cover"
              sizes="(max-width: 820px) 100vw, 807px"
            />
            <span
              className="tag absolute text-[#1b2a22] shadow-[0_2px_8px_rgba(0,0,0,.2)]"
              style={{
                left: "3.1%",
                bottom: "7.6%",
                padding: "calc(var(--u) * 0.8) calc(var(--u) * 1.3)",
                background: "#fbf4e6",
                fontSize: "calc(var(--u) * 1.5)",
              }}
            >
              See what matters before you buy
            </span>
          </div>

          <div
            className="items grid max-lg:[grid-template-rows:none] lg:[grid-template-rows:112fr_144fr_151fr]"
          >
            {DETAIL_ITEMS.map((item, index) => (
              <article
                key={item.num}
                className="item grid grid-cols-[64px_1fr] items-start py-4 max-lg:py-4 lg:grid-cols-[calc(var(--u)*8.4)_1fr] lg:py-0"
                style={{
                  paddingTop: "calc(var(--u) * 0.05)",
                  ...(index > 0 ? { borderTop: `1.5px solid ${GOLD}` } : {}),
                }}
              >
                <div
                  className="ico [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-[#f0d160] [&_svg]:fill-none"
                  style={{
                    width: "calc(var(--u) * 5.8)",
                    height: "calc(var(--u) * 5.8)",
                    marginTop: "calc(var(--u) * 1.2)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    className="n font-semibold leading-none text-[#f0d160]"
                    style={{
                      fontSize: "calc(var(--u) * 1.3)",
                      paddingTop: "calc(var(--u) * 0.35)",
                    }}
                  >
                    {item.num}
                  </div>
                  <h3
                    className="font-medium leading-[1.1]"
                    style={{
                      fontFamily: SERIF,
                      fontSize: "calc(var(--u) * 2.1)",
                      margin: "calc(var(--u) * 0.1) 0 calc(var(--u) * 0.35)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-[26em] leading-[1.12] text-[#f1f5f1]"
                    style={{ fontSize: "calc(var(--u) * 1.42)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="voices"
          style={{
            marginTop: "calc(var(--u) * 1.7)",
            padding: "calc(var(--u) * 1.9) calc(var(--u) * 1.95) calc(var(--u) * 1.5)",
            border: "1px solid #2f9477",
            borderRadius: "calc(var(--u) * 1.6)",
            background: "linear-gradient(180deg, rgba(14,96,72,.55), rgba(8,70,52,.55))",
            boxShadow: "inset 0 0 4cqw rgba(0,0,0,.15)",
          }}
        >
          <div className="v-head grid max-lg:grid-cols-1 lg:grid-cols-[1fr_auto] lg:items-end" style={{ paddingLeft: "calc(var(--u) * 1.15)" }}>
            <div>
              <p
                className="v-eyebrow flex items-center font-medium uppercase tracking-[0.2em] text-[#f0d160] max-lg:w-full lg:w-[49cqw]"
                style={{ gap: "calc(var(--u) * 2)", fontSize: "calc(var(--u) * 1.35)" }}
              >
                From our family&apos;s offline store
                <span className="h-px flex-1 bg-[#f0d160]" aria-hidden />
              </p>
              <h2
                className="font-medium leading-[1.1]"
                style={{
                  fontFamily: SERIF,
                  fontSize: "calc(var(--u) * 3.15)",
                  marginTop: "calc(var(--u) * 0.4)",
                }}
              >
                Words built on years of trust.
              </h2>
              <p style={{ fontSize: "calc(var(--u) * 1.5)", marginTop: "calc(var(--u) * 0.25)" }}>
                Experiences shared by customers of our longstanding traditional business.
              </p>
            </div>
            <ReviewNav
              activeReview={activeReview}
              total={REVIEW_CARDS.length}
              onPrev={() => showReview(activeReview - 1)}
              onNext={() => showReview(activeReview + 1)}
            />
          </div>

          <div
            ref={cardsRef}
            className="cards flex gap-3 overflow-x-auto scroll-smooth max-lg:-mx-1 max-lg:scroll-px-1 max-lg:px-1 max-lg:scrollbar-none lg:grid lg:grid-cols-3"
            style={{
              gap: "calc(var(--u) * 1.6)",
              marginTop: "calc(var(--u) * 1.9)",
              scrollSnapType: "x mandatory",
            }}
            onScroll={(e) => {
              if (!window.matchMedia("(max-width: 820px)").matches) return;
              const el = e.currentTarget;
              const first = el.children[0] as HTMLElement | undefined;
              if (!first) return;
              const idx = Math.round(el.scrollLeft / (first.offsetWidth + 12));
              if (idx >= 0 && idx < REVIEW_CARDS.length && idx !== activeReview) {
                setActiveReview(idx);
              }
            }}
          >
            {REVIEW_CARDS.map((card, index) => (
              <figure
                key={index}
                className="card m-0 shrink-0 snap-start border-2 border-[#f0d160] transition-[box-shadow,background] duration-200 max-lg:basis-[86%] lg:shrink"
                style={{
                  padding: "calc(var(--u) * 1.9) calc(var(--u) * 1.95) calc(var(--u) * 1.5)",
                  borderRadius: "calc(var(--u) * 1)",
                  background: index === activeReview ? "rgba(4,48,36,.7)" : "rgba(4,48,36,.45)",
                  boxShadow:
                    index === activeReview
                      ? "0 0 calc(var(--u) * 1.8) rgba(240,209,96,.28)"
                      : "0 0 calc(var(--u) * 1.2) rgba(240,209,96,.08)",
                }}
              >
                <blockquote
                  className="m-0 leading-[1.22]"
                  style={{ fontSize: "calc(var(--u) * 1.55)" }}
                >
                  {card.quote}
                </blockquote>
                <figcaption
                  className="who flex items-center text-[#f1f5f1] before:h-[1.5px] before:w-[calc(var(--u)*1.9)] before:shrink-0 before:bg-[#f0d160] before:content-['']"
                  style={{
                    gap: "calc(var(--u) * 1.2)",
                    marginTop: "calc(var(--u) * 1.5)",
                    fontSize: "calc(var(--u) * 1.2)",
                  }}
                >
                  {card.who}
                </figcaption>
              </figure>
            ))}
          </div>

          <div
            className="v-foot flex max-lg:flex-col max-lg:items-stretch lg:items-center lg:justify-between"
            style={{
              gap: "calc(var(--u) * 2)",
              marginTop: "calc(var(--u) * 2.3)",
              paddingLeft: "calc(var(--u) * 0.3)",
            }}
          >
            <p
              className="note flex items-center text-[#f1f5f1]"
              style={{ gap: "calc(var(--u) * 1)", fontSize: "calc(var(--u) * 1.22)" }}
            >
              <svg
                viewBox="0 0 24 24"
                className="shrink-0"
                style={{ width: "calc(var(--u) * 2.1)", height: "calc(var(--u) * 2.1)" }}
                fill="none"
                stroke={GOLD}
                strokeWidth={1.6}
                strokeLinecap="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 11v6" />
                <circle cx="12" cy="7.4" r=".6" fill={GOLD} />
              </svg>
              Review copy shown for layout preview only. Publish only verified, permissioned offline
              feedback.
            </p>
            <Link
              href="#customer-experiences"
              className="read inline-flex items-center whitespace-nowrap border-2 border-[#f0d160] font-medium transition-colors hover:bg-[rgba(240,209,96,.1)] max-lg:justify-center"
              style={{
                gap: "calc(var(--u) * 1)",
                padding: "calc(var(--u) * 1.15) calc(var(--u) * 2.2)",
                borderRadius: "calc(var(--u) * 0.6)",
                fontSize: "calc(var(--u) * 1.5)",
              }}
            >
              Read customer experiences
              <svg
                viewBox="0 0 24 24"
                className="h-auto w-[calc(var(--u)*1.8)]"
                fill="none"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewNav({
  activeReview,
  total,
  onPrev,
  onNext,
}: {
  activeReview: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="nav flex items-center max-lg:gap-3.5"
      style={{
        gap: "calc(var(--u) * 1.5)",
        padding: "0 calc(var(--u) * 0.6) calc(var(--u) * 0.9) 0",
      }}
    >
      <button
        type="button"
        aria-label="Previous review"
        onClick={onPrev}
        className="grid place-items-center rounded-full border-[1.5px] border-[#f0d160] bg-transparent hover:bg-[rgba(240,209,96,.12)]"
        style={{ width: "calc(var(--u) * 3.3)", height: "calc(var(--u) * 3.3)" }}
      >
        <ChevronLeft />
      </button>
      <span
        className="count min-w-[5.5em] text-center"
        style={{ fontSize: "calc(var(--u) * 1.5)" }}
        aria-live="polite"
      >
        {String(activeReview + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <button
        type="button"
        aria-label="Next review"
        onClick={onNext}
        className="grid place-items-center rounded-full border-[1.5px] border-[#f0d160] bg-transparent hover:bg-[rgba(240,209,96,.12)]"
        style={{ width: "calc(var(--u) * 3.3)", height: "calc(var(--u) * 3.3)" }}
      >
        <ChevronRight />
      </button>
    </div>
  );
}