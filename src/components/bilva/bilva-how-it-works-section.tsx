"use client";

import Image from "next/image";

import { HOW_IT_WORKS_STEPS, HOW_IT_WORKS_TRUST_POINTS } from "@/data/bilva/how-it-works";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Check } from "lucide-react";

import styles from "./bilva-how-it-works-section.module.css";

/** Connector coordinate space — matches bilwa-how-it-works.html */
const DIAGRAM_VIEWBOX = { w: 1487, h: 550 };

const CONNECTOR_PATHS = {
  leftTop: "M312 97 H335 Q355 97 355 120 V190 Q355 210 375 210 H397",
  leftBottom: "M397 342 H377 Q357 342 357 362 V408 Q357 428 337 428 H312",
  rightTop: "M1170 97 H1145 Q1125 97 1125 120 V190 Q1125 210 1105 210 H1083",
  rightBottom: "M1083 342 H1103 Q1125 342 1125 362 V408 Q1125 428 1145 428 H1170",
};

const CONNECTOR_DOTS = [
  { cx: 397, cy: 210 },
  { cx: 397, cy: 342 },
  { cx: 1083, cy: 210 },
  { cx: 1083, cy: 342 },
];

type StepLayout = {
  left: string;
  width: string;
  textAlign: "left" | "right";
  top?: string;
  bottom?: string;
};

/** Diagram step copy uses a 17% text measure (same as HTML .s3 / .s4) so headlines wrap like the reference. */
const STEP_TEXT_COLUMN = "17%";

const STEP_LAYOUT: Record<(typeof HOW_IT_WORKS_STEPS)[number]["placement"], StepLayout> = {
  s1: { left: "4.03%", top: "0.44%", width: STEP_TEXT_COLUMN, textAlign: "left" },
  s2: { left: "4.03%", bottom: "4.5%", width: STEP_TEXT_COLUMN, textAlign: "left" },
  s3: { left: "80%", top: "0.44%", width: STEP_TEXT_COLUMN, textAlign: "left" },
  s4: { left: "80%", bottom: "4.5%", width: STEP_TEXT_COLUMN, textAlign: "left" },
};

function StepBlock({
  num,
  title,
  description,
  align,
  diagram = false,
}: {
  num: string;
  title: string;
  description: string;
  align: "left" | "right";
  diagram?: boolean;
}) {
  const isRight = align === "right";
  const useHtmlStepLayout = diagram;
  return (
    <div
      className={!useHtmlStepLayout && isRight ? "text-right" : "text-left"}
      style={{
        color: "#555555",
        fontFamily: useHtmlStepLayout
          ? "var(--bilva-font-serif)"
          : "var(--bilva-font-serif, Georgia, serif)",
        width: useHtmlStepLayout ? "100%" : undefined,
      }}
    >
      <p
        className="m-0 font-normal leading-none"
        style={
          useHtmlStepLayout
            ? { fontSize: "calc(var(--u) * 3.85)", color: "#c29b47", fontWeight: 400 }
            : { fontSize: "clamp(2rem, 3.85cqw, 3.6rem)", color: "#c29b47" }
        }
        aria-hidden
      >
        {num}
      </p>
      <h3
        className="m-0 max-w-full font-medium leading-[1.12]"
        style={{
          fontSize: useHtmlStepLayout ? "calc(var(--u) * 2.55)" : "clamp(1.15rem, 2.55cqw, 2.4rem)",
          color: "#0f3d33",
          margin: useHtmlStepLayout
            ? "calc(var(--u) * 0.5) 0 calc(var(--u) * 0.7)"
            : "0.35em 0 0.45em",
          marginLeft: !useHtmlStepLayout && isRight ? "auto" : undefined,
          width: useHtmlStepLayout ? "100%" : "fit-content",
        }}
      >
        {title}
      </h3>
      <p
        className="m-0 max-w-full font-normal leading-[1.32]"
        style={{
          fontSize: useHtmlStepLayout ? "calc(var(--u) * 1.5)" : "clamp(0.9rem, 1.5cqw, 1.05rem)",
          color: "#555555",
        }}
      >
        {description}
      </p>
    </div>
  );
}

function ProductShowcaseCard({
  className = "",
  layout = "desktop",
}: {
  className?: string;
  layout?: "desktop" | "mobile";
}) {
  const isDesktop = layout === "desktop";

  return (
    <article
      className={`flex overflow-hidden bg-[#f8f3ea] ${className}`}
      style={{
        borderRadius: isDesktop ? "calc(var(--u) * 1.8)" : "1rem",
        boxShadow: isDesktop
          ? "0 0 0 1px rgba(184,137,58,.12), 0 calc(var(--u) * 1) calc(var(--u) * 3) rgba(80,60,20,.12)"
          : "0 0 0 1px rgba(184,137,58,.12), 0 4px 12px rgba(80,60,20,.12)",
        flexDirection: isDesktop ? "row" : "column",
        height: isDesktop ? "100%" : "auto",
        width: "100%",
      }}
    >
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          flex: isDesktop ? "0 0 49.7%" : "none",
          aspectRatio: isDesktop ? undefined : "4 / 3",
          width: isDesktop ? undefined : "100%",
          height: isDesktop ? "100%" : undefined,
          background: "linear-gradient(135deg, #e4d6c6 0%, #f0e7db 55%, #ece2d5 100%)",
        }}
      >
        <Image
          src="/images/bilva/how-it-works-coin.png"
          alt="Bilwa 1g gold coin on travertine pedestal"
          fill
          className="object-cover object-[center_40%]"
          sizes={isDesktop ? "335px" : "100vw"}
          priority
        />
      </div>

      <div
        className="flex h-full min-h-0 min-w-0 flex-1 flex-col"
        style={{
          fontFamily: isDesktop ? "var(--bilva-font-serif)" : undefined,
          padding: isDesktop
            ? "calc(var(--u) * 2.35) calc(var(--u) * 2.3) calc(var(--u) * 2.4)"
            : "1.4rem",
        }}
      >
        <p
          className="font-medium text-[#0f3d33]"
          style={
            isDesktop
              ? {
                  fontSize: "calc(var(--u) * 1.45)",
                  letterSpacing: "0.28em",
                  marginTop: "calc(var(--u) * 0.5)",
                }
              : { fontSize: "0.8rem", letterSpacing: "0.28em" }
          }
        >
          BILWA
        </p>
        <h4
          className="font-medium text-[#0f3d33]"
          style={
            isDesktop
              ? {
                  fontSize: "calc(var(--u) * 2.75)",
                  lineHeight: 1.15,
                  margin: "calc(var(--u) * 0.3) 0 calc(var(--u) * 1.6)",
                  whiteSpace: "nowrap",
                }
              : { fontSize: "1.6rem", margin: "0.2em 0 0.85em" }
          }
        >
          Gold Coin – 1g
        </h4>

        <div
          className="flex border-b border-[rgba(15,61,51,0.15)]"
          style={isDesktop ? { paddingBottom: "calc(var(--u) * 1.5)" } : { paddingBottom: "12px" }}
        >
          <div
            className="text-[#555555]"
            style={isDesktop ? { fontSize: "calc(var(--u) * 1.3)" } : { fontSize: "0.8rem" }}
          >
            Purity
            <b
              className="block font-medium text-[#0f3d33]"
              style={
                isDesktop
                  ? {
                      fontSize: "calc(var(--u) * 1.65)",
                      marginTop: "calc(var(--u) * 0.35)",
                    }
                  : { fontSize: "1rem", marginTop: "0.25rem" }
              }
            >
              24K (999)
            </b>
          </div>
          <div
            className="border-l border-[rgba(15,61,51,0.2)] text-[#555555]"
            style={
              isDesktop
                ? {
                    marginLeft: "calc(var(--u) * 1.9)",
                    paddingLeft: "calc(var(--u) * 1.9)",
                    fontSize: "calc(var(--u) * 1.3)",
                  }
                : { marginLeft: "16px", paddingLeft: "16px", fontSize: "0.8rem" }
            }
          >
            Weight
            <b
              className="block font-medium text-[#0f3d33]"
              style={
                isDesktop
                  ? {
                      fontSize: "calc(var(--u) * 1.65)",
                      marginTop: "calc(var(--u) * 0.35)",
                    }
                  : { fontSize: "1rem", marginTop: "0.25rem" }
              }
            >
              1g
            </b>
          </div>
        </div>

        <p
          className="text-[#555555]"
          style={
            isDesktop
              ? {
                  fontSize: "calc(var(--u) * 1.3)",
                  marginTop: "calc(var(--u) * 1.5)",
                }
              : { fontSize: "0.8rem", marginTop: "12px" }
          }
        >
          Price (sample)
        </p>
        <p
          className="font-medium text-[#0f3d33]"
          style={
            isDesktop
              ? {
                  fontSize: "calc(var(--u) * 3.4)",
                  lineHeight: 1.15,
                  marginTop: "calc(var(--u) * 0.2)",
                }
              : { fontSize: "2.1rem", marginTop: "0.15em" }
          }
        >
          ₹12,450
        </p>
        <p
          className="text-[#555555]"
          style={
            isDesktop
              ? {
                  fontSize: "calc(var(--u) * 1.1)",
                  marginTop: "calc(var(--u) * 0.5)",
                }
              : { fontSize: "0.7rem", marginTop: "0.35em" }
          }
        >
          (Illustrative sample price for clarity)
        </p>

        <button
          type="button"
          className="mt-auto w-full shrink-0 cursor-pointer border-0 font-medium text-white transition-colors hover:bg-[#164d3a]"
          style={
            isDesktop
              ? {
                  padding: "calc(var(--u) * 1.25) 0",
                  background: "#1b5e48",
                  borderRadius: "calc(var(--u) * 0.4)",
                  font: "500 calc(var(--u) * 1.55) var(--bilva-font-serif)",
                }
              : {
                  marginTop: "1.4rem",
                  padding: "0.9rem 0",
                  background: "#1b5e48",
                  borderRadius: "4px",
                  fontSize: "1rem",
                }
          }
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

function DiagramDesktop() {
  return (
    <div
      className="relative mx-auto hidden w-full md:block"
      style={{
        aspectRatio: `${DIAGRAM_VIEWBOX.w} / ${DIAGRAM_VIEWBOX.h}`,
        containerType: "inline-size",
        // Same scale token as bilwa-how-it-works.html (--u = 1% of diagram width)
        ["--u" as string]: "1cqw",
      }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${DIAGRAM_VIEWBOX.w} ${DIAGRAM_VIEWBOX.h}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={CONNECTOR_PATHS.leftTop} fill="none" stroke="#b8893a" strokeWidth={1.8} />
        <path d={CONNECTOR_PATHS.leftBottom} fill="none" stroke="#b8893a" strokeWidth={1.8} />
        <path d={CONNECTOR_PATHS.rightTop} fill="none" stroke="#b8893a" strokeWidth={1.8} />
        <path d={CONNECTOR_PATHS.rightBottom} fill="none" stroke="#b8893a" strokeWidth={1.8} />
        {CONNECTOR_DOTS.map((dot) => (
          <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={4.5} fill="#b8893a" />
        ))}
      </svg>

      {HOW_IT_WORKS_STEPS.map((step) => {
        const layout = STEP_LAYOUT[step.placement];
        return (
          <section
            key={step.id}
            className="absolute"
            style={{
              left: layout.left,
              width: layout.width,
              ...(layout.top != null ? { top: layout.top } : {}),
              ...(layout.bottom != null ? { bottom: layout.bottom } : {}),
            }}
          >
            <StepBlock
              num={step.num}
              title={step.title}
              description={step.description}
              align={layout.textAlign}
              diagram
            />
          </section>
        );
      })}

      <div
        className="absolute"
        style={{
          left: "27.24%",
          top: "5.83%",
          width: "45.07%",
          height: "90.2%",
        }}
      >
        <ProductShowcaseCard layout="desktop" className="h-full w-full" />
      </div>
    </div>
  );
}

export function BilvaHowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className={cn(styles['root'], "relative text-[#0f3d33]")}
      aria-labelledby="how-it-works-heading"
    >
      <div
        className={cn(BILVA_SITE_SHELL_CLASS, styles['shell'])}
        style={{ containerType: "inline-size" }}
      >
        <div className="relative mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-start sm:justify-between lg:mb-14">
          <div className="min-w-0 flex-1">
            <p
              className="mb-3 font-medium uppercase tracking-[0.14em] text-[#b8893a]"
              style={{ fontSize: "clamp(0.7rem, 1.5cqw, 0.85rem)" }}
            >
              Confidence at every step
            </p>
            <h2
              id="how-it-works-heading"
              className="font-medium leading-[1.1] tracking-[-0.01em] text-[#0f3d33]"
              style={{ fontSize: "clamp(2rem, 4.55cqw, 4.25rem)" }}
            >
              A considered way to buy precious.
            </h2>
            <p
              className="mt-3 max-w-2xl font-normal leading-[1.45] text-[#555555]"
              style={{ fontSize: "clamp(0.95rem, 1.9cqw, 1.15rem)" }}
            >
              Understand the piece, know the price, and stay informed after purchase.
            </p>
          </div>
          <Link
            href="#how-it-works"
            className="group inline-flex shrink-0 items-center gap-1 border-b border-[#b8893a] pb-1 font-medium text-[#0f3d33] transition-colors hover:text-[#1b5e48]"
            style={{ fontSize: "clamp(0.95rem, 2cqw, 1.15rem)", borderBottomWidth: "2px" }}
          >
            <span>How it works</span>
            <span className="leading-none transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <DiagramDesktop />

        <div className="mb-8 md:hidden">
          <ProductShowcaseCard layout="mobile" />
          <ol className="mt-8 list-none space-y-8">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <li key={step.id}>
                <StepBlock
                  num={step.num}
                  title={step.title}
                  description={step.description}
                  align={step.placement === "s3" || step.placement === "s4" ? "right" : "left"}
                />
              </li>
            ))}
          </ol>
        </div>

        <div
          className="relative z-30 mt-8 flex flex-col gap-5 sm:mt-10 lg:flex-row lg:items-center lg:justify-between"
          style={{
            background: "#e3efe8",
            borderRadius: "clamp(12px, 1.9cqw, 20px)",
            padding: "clamp(1.25rem, 2.2cqw, 1.75rem) clamp(1.25rem, 3.6cqw, 2.25rem)",
          }}
          aria-label="Purchase confidence highlights"
        >
          <ul className="flex list-none flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
            {HOW_IT_WORKS_TRUST_POINTS.map((point, index) => (
              <li
                key={point.lines.join(" ")}
                className={`flex min-w-0 items-center gap-3 font-medium leading-[1.18] text-[#0f3d33] ${
                  index > 0 ? "sm:border-l sm:border-[rgba(15,61,51,0.22)] sm:pl-6 sm:ml-6" : ""
                }`}
                style={{ fontSize: "clamp(0.9rem, 1.72cqw, 1.05rem)" }}
              >
                <Check className="h-[1.45rem] w-[1.45rem] shrink-0 text-[#1b5e48] sm:h-[1.6rem] sm:w-[1.6rem]" strokeWidth={1.8} aria-hidden />
                <span>
                  {point.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="#catalog"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-[#b8893a] bg-transparent font-medium text-[#0f3d33] transition-colors hover:bg-[rgba(184,137,58,0.08)]"
            style={{
              fontSize: "clamp(0.95rem, 1.85cqw, 1.1rem)",
              padding: "clamp(0.65rem, 1.35cqw, 0.85rem) clamp(1rem, 2cqw, 1.25rem)",
            }}
          >
            <span>Explore products</span>
            <span className="leading-none transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}