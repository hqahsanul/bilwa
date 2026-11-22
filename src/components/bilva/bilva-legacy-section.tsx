"use client";

import Image from "next/image";
import Link from "next/link";

import { LEGACY_STATS } from "@/data/bilva/legacy";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

import styles from "./bilva-legacy-section.module.css";

const STORY_GOLD = "var(--story-gold, #e0b252)";
const STORY_GOLD_LINE = "var(--story-gold-line, #c9a04a)";
const FRAME_RIGHT_GRADIENT =
  "linear-gradient(180deg, var(--story-gold) 0, var(--story-gold) 52%, rgba(224,178,82,0) 100%)";

/** Frame on the photo column (bilwa-story-section.html .fl-* on .media) */
function StoryGoldFrameOnPhoto({
  className = "",
  topSeam = "into-copy",
}: {
  className?: string;
  /** Desktop: top ends at photo edge; seam continues on .copy */
  topSeam?: "into-copy" | "photo-edge";
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-visible ${className}`} aria-hidden>
      <span
        style={{
          position: "absolute",
          left: "6%",
          top: "5.3%",
          bottom: "3.8%",
          width: 1,
          background: STORY_GOLD,
        }}
      />
      <span
        className={topSeam === "into-copy" ? "max-md:!right-0" : undefined}
        style={{
          position: "absolute",
          left: "6%",
          top: "5.3%",
          right: topSeam === "into-copy" ? "-4.1%" : "0",
          height: 1,
          background: STORY_GOLD,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "6%",
          right: 0,
          bottom: "3.8%",
          height: 1,
          background: `linear-gradient(90deg, ${STORY_GOLD} 0, ${STORY_GOLD} 39%, rgba(224,178,82,0) 62%)`,
        }}
      />
      {topSeam === "into-copy" ? (
        <span
          className="max-md:hidden"
          style={{
            position: "absolute",
            left: "104.1%",
            marginLeft: -1,
            top: "5.3%",
            height: "28.2%",
            width: 1,
            background: FRAME_RIGHT_GRADIENT,
          }}
        />
      ) : null}
    </div>
  );
}

/** Top + right segments on the green panel (4.1% of photo width past the seam) */
function StoryGoldFrameOnCopy() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] overflow-visible max-md:hidden"
      aria-hidden
    >
      <span
        style={{
          position: "absolute",
          left: 0,
          top: "5.3%",
          height: 1,
          width: "calc(100% * 4.1 * 44.7 / 55.3 / 100)",
          background: STORY_GOLD,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          marginLeft: -1,
          top: "5.3%",
          height: "28.2%",
          width: 1,
          background: FRAME_RIGHT_GRADIENT,
        }}
      />
    </div>
  );
}

function StoryOrnament() {
  return (
    <svg
      viewBox="0 0 40 28"
      fill="none"
      stroke={STORY_GOLD}
      strokeWidth={1.4}
      strokeLinejoin="round"
      aria-hidden
      className="h-auto w-[3.4cqw] min-w-6"
    >
      <path d="M20 3C14 9 14 18 20 24C26 18 26 9 20 3Z" />
      <path d="M19 24C12 24 6 19 5 11C12 11 18 16 19 24Z" />
      <path d="M21 24C28 24 34 19 35 11C28 11 22 16 21 24Z" />
      <path d="M12 25H28" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Port of bilwa-story-section.html — photo + copy top band, clarity bottom band.
 */
export function BilvaLegacySection() {
  return (
    <section
      id="legacy-trust"
      className={cn(styles['root'], "px-[2vw] py-[2vw] max-md:px-0 max-md:py-0")}
      aria-labelledby="legacy-trust-heading"
    >
      <div
        className={cn(BILVA_SITE_FRAME_CLASS, styles['story'], styles['sans'])}
        style={{ containerType: "inline-size" }}
      >
        <div className="top relative grid grid-cols-1 items-stretch overflow-visible md:grid-cols-[minmax(0,44.7fr)_minmax(0,55.3fr)]">
          {/* Photo panel — full bleed, no wash */}
          <div className="story-media relative z-[2] min-h-0 min-w-0 bg-[#3a2412] max-md:aspect-[4/3.4] md:min-h-full">
            <div className="photo absolute inset-0 overflow-hidden">
              <Image
                src="/images/bilva/legacy-story-workshop.png"
                alt="Master jeweler examining a gold coin with a loupe at a workshop bench"
                fill
                className="block h-full w-full object-cover"
                sizes="(max-width: 760px) 100vw, 536px"
                priority
              />
            </div>

            <StoryGoldFrameOnPhoto className="z-[2] md:hidden" topSeam="into-copy" />
            <StoryGoldFrameOnPhoto className="z-[2] hidden md:block" topSeam="photo-edge" />

            <div
              className="absolute z-[3] italic leading-[1.12] text-white"
              style={{
                left: "3.8%",
                top: "9.5%",
                fontFamily: "var(--bilva-font-serif)",
                fontSize: "clamp(1rem, 2.45cqw, 1.9rem)",
                padding: "max(1.7cqw, 12px) max(4cqw, 40px) max(1.7cqw, 12px) max(2.3cqw, 16px)",
                background:
                  "linear-gradient(90deg, rgba(8,58,44,.96) 0%, rgba(8,58,44,.9) 65%, rgba(8,58,44,0) 100%)",
              }}
            >
              A century in
              <br />
              precious metals
            </div>
          </div>

          {/* Copy panel */}
          <div
            className="copy relative z-[1] flex min-w-0 flex-col justify-center md:min-h-full"
            style={{
              padding: "max(4.4cqw, 28px) max(3cqw, 22px) max(3cqw, 32px) max(6cqw, 22px)",
              background: `
                radial-gradient(60cqw 40cqw at 100% 0, rgba(30,110,84,.55), transparent 60%),
                linear-gradient(160deg, #06382b 0%, #03261d 100%)
              `,
            }}
          >
            <StoryGoldFrameOnCopy />
            <p
              className="uppercase font-normal tracking-[0.26em] text-[#e0b252]"
              style={{
                fontFamily: "var(--bilva-font-serif)",
                fontSize: "clamp(0.7rem, 1.5cqw, 1.1rem)",
              }}
            >
              Rooted in experience
            </p>

            <h2
              id="legacy-trust-heading"
              className="font-normal leading-[1.04] tracking-[-0.01em]"
              style={{
                fontFamily: "var(--bilva-font-serif)",
                fontSize: "clamp(2rem, 4.7cqw, 3.7rem)",
                margin: "2.2cqw 0",
              }}
            >
              A legacy of trust.
              <br />A new way to treasure.
            </h2>

            <p
              className="max-w-[29em] leading-[1.55] text-[#f1f4f1]"
              style={{ fontSize: "clamp(0.85rem, 1.72cqw, 1.25rem)" }}
            >
              Bilwa brings generations of bullion experience into a thoughtful online experience —
              combining trusted sourcing with more expressive coins, bars and gifts.
            </p>

            <div
              className="stats grid items-start max-md:gap-[18px] md:grid-cols-[0.9fr_0.95fr_1.25fr]"
              style={{ margin: "3.2cqw 0 3.4cqw" }}
            >
              {LEGACY_STATS.map((stat, index) => (
                <div
                  key={stat.title}
                  className={[
                    "stat",
                    index === 0 && "max-md:border-l-[1.5px] max-md:border-[#c9a04a] max-md:pl-3.5 md:pl-0",
                    index > 0 &&
                      "border-l-[1.5px] border-[#c9a04a] pl-3.5 md:px-[1.5cqw] md:pb-[0.3cqw]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <b
                    className="block min-h-[2.2em] whitespace-normal font-normal leading-[1.1] max-md:min-h-0"
                    style={{
                      fontFamily: "var(--bilva-font-serif)",
                      fontSize: "clamp(1.1rem, 2.75cqw, 2rem)",
                    }}
                  >
                    {stat.title}
                  </b>
                  <span
                    className="mt-[0.3cqw] block text-balance leading-[1.4] text-[#eef2ee] max-md:mt-1.5"
                    style={{ fontSize: "clamp(0.68rem, 1.38cqw, 1rem)" }}
                  >
                    {stat.body}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="#our-story"
              className="btn inline-block self-start border-0 transition-[filter] hover:brightness-[1.06]"
              style={{
                padding: "max(1.5cqw, 14px) max(2.2cqw, 22px)",
                borderRadius: "max(0.7cqw, 6px)",
                background: "linear-gradient(180deg, #f2d686 0%, #d9a845 100%)",
                color: "#162318",
                fontFamily: "var(--bilva-font-serif)",
                fontWeight: 500,
                fontSize: "clamp(1rem, 2.1cqw, 1.5rem)",
                boxShadow:
                  "0 0.6cqw 1.8cqw rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.5)",
              }}
            >
              Discover our story →
            </Link>
          </div>
        </div>

        <div
          className="bottom border-t border-black/25 text-center"
          style={{
            background: "linear-gradient(180deg, #0a4636 0%, #083c2f 100%)",
            padding: "2.2cqw 3cqw 2.5cqw",
          }}
        >
          <div className="orn flex items-center justify-center gap-[1.6cqw]">
            <span
              className="h-px max-md:w-[18%] md:w-[14cqw]"
              style={{ background: STORY_GOLD_LINE }}
              aria-hidden
            />
            <StoryOrnament />
            <span
              className="h-px max-md:w-[18%] md:w-[14cqw]"
              style={{ background: STORY_GOLD_LINE }}
              aria-hidden
            />
          </div>
          <h3
            className="mt-[0.6cqw] font-normal"
            style={{
              fontFamily: "var(--bilva-font-serif)",
              fontSize: "clamp(1.5rem, 3.6cqw, 2.8rem)",
            }}
          >
            Every purchase deserves clarity.
          </h3>
          <p
            className="mt-[0.4cqw] text-[#f1f4f1]"
            style={{ fontSize: "clamp(0.78rem, 1.5cqw, 1.1rem)" }}
          >
            Product details and purchase documents should be easy to find, understand and revisit.
          </p>
        </div>
      </div>
    </section>
  );
}