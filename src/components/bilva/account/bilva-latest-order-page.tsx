"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  FileText,
  Headset,
  Heart,
  Info,
  Loader2,
  MapPin,
  MessageSquare,
  Package,
  Receipt,
  Settings,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LATEST_ORDER_DATA } from "@/data/bilva/latest-order";
import styles from "./bilva-latest-order-page.module.css";

function HelpIcon({ id }: { id: string }) {
  return id === "contact" ? (
    <MessageSquare size={18} strokeWidth={1.6} aria-hidden="true" />
  ) : (
    <Package size={18} strokeWidth={1.6} aria-hidden="true" />
  );
}

function BottomCardIcon({ id }: { id: string }) {
  switch (id) {
    case "addresses":
      return <MapPin size={26} strokeWidth={1.5} aria-hidden="true" />;
    case "wishlist":
      return <Heart size={26} strokeWidth={1.5} aria-hidden="true" />;
    default:
      return <Settings size={26} strokeWidth={1.5} aria-hidden="true" />;
  }
}

export function BilvaLatestOrderPage() {
  const {
    navPills,
    heading,
    subtitle,
    leafImageSrc,
    latestOrder,
    documents,
    help,
    bottomCards,
  } = LATEST_ORDER_DATA;

  const headingId = useId();
  const [activePill, setActivePill] = useState<string>("overview");

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Top pill navigation */}
        <nav className={styles["pillNav"]} aria-label="My Bilwa sections">
          {navPills.map((pill) => {
            const isActive = activePill === pill.id;
            return (
              <Link
                key={pill.id}
                href={pill.href}
                onClick={() => setActivePill(pill.id)}
                className={`${styles["pillLink"]} ${
                  isActive ? styles["pillLinkActive"] : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {pill.label}
              </Link>
            );
          })}
        </nav>

        {/* Page heading + decorative leaf */}
        <header className={styles["head"]}>
          <div className={styles["leafDecor"]} aria-hidden="true">
            <Image
              src={leafImageSrc}
              alt=""
              fill
              sizes="184px"
              className="object-contain"
            />
          </div>
          <h1 id={headingId} className={styles["heading"]}>
            {heading}
          </h1>
          <p className={styles["subtitle"]}>{subtitle}</p>
        </header>

        {/* Main 2-column dashboard grid */}
        <div className={styles["grid"]}>
          {/* Left column: Latest order */}
          <section
            id="latest-order"
            className={`${styles["card"]} ${styles["orderCard"]}`}
            aria-label={latestOrder.title}
          >
            <h2 className={styles["orderTitle"]}>{latestOrder.title}</h2>

            <div className={styles["meta"]}>
              <span>
                {latestOrder.orderIdLabel}{" "}
                <strong>{latestOrder.orderIdValue}</strong>
              </span>
              <span className={styles["metaSep"]} aria-hidden="true" />
              <span>{latestOrder.dateLabel}</span>
              <span className={styles["metaSep"]} aria-hidden="true" />
              <span>
                {latestOrder.amountLabel}{" "}
                <strong>{latestOrder.amountValue}</strong>
              </span>
              <span className={styles["statusPill"]}>
                <Loader2 size={16} strokeWidth={2} aria-hidden="true" />
                {latestOrder.statusLabel}
              </span>
            </div>

            <div className={styles["itemsList"]}>
              {latestOrder.items.map((item) => (
                <div key={item.id} className={styles["itemRow"]}>
                  <div className={styles["thumbWrap"]}>
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="92px"
                      className="object-cover"
                    />
                  </div>
                  <strong className={styles["itemName"]}>{item.title}</strong>
                </div>
              ))}
            </div>

            <div className={styles["steps"]}>
              {latestOrder.steps.map((step) => {
                const stateClass =
                  step.state === "done"
                    ? styles["stepDone"]
                    : step.state === "current"
                      ? styles["stepCurrent"]
                      : "";
                return (
                  <div
                    key={step.id}
                    className={`${styles["step"]} ${stateClass}`}
                    aria-current={step.state === "current" ? "step" : undefined}
                  >
                    <div className={styles["dot"]} aria-hidden="true">
                      {step.state === "done" ? (
                        <Check size={14} strokeWidth={3} />
                      ) : null}
                    </div>
                    <span>{step.title}</span>
                    <small className={styles["stepSub"]}>{step.subtitle}</small>
                  </div>
                );
              })}
            </div>

            <div className={styles["ctaRow"]}>
              <Link
                href={latestOrder.primaryCtaHref}
                className={`${styles["btn"]} ${styles["btnPrimary"]}`}
              >
                <span>{latestOrder.primaryCtaLabel}</span>
                <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
              </Link>

              <button
                type="button"
                disabled
                aria-disabled="true"
                className={`${styles["btn"]} ${styles["btnDisabled"]}`}
              >
                <Truck size={17} strokeWidth={1.8} aria-hidden="true" />
                <span>{latestOrder.trackLabel}</span>
              </button>

              <span className={styles["hint"]}>
                <Info size={15} strokeWidth={1.8} aria-hidden="true" />
                <span>{latestOrder.trackHint}</span>
              </span>
            </div>

            <div className={styles["insure"]}>
              <ShieldCheck
                size={22}
                strokeWidth={1.8}
                className="shrink-0 text-[#2c6a3e]"
                aria-hidden="true"
              />
              <strong>{latestOrder.insuranceTitle}</strong>
              <span className={styles["insureSep"]} aria-hidden="true" />
              <em className={styles["insureNote"]}>
                {latestOrder.insuranceNote}
              </em>
            </div>
          </section>

          {/* Right column: Documents & Help */}
          <aside className={styles["side"]}>
            <section
              id="documents"
              className={`${styles["card"]} ${styles["docsCard"]}`}
              aria-label={documents.title}
            >
              <div className={styles["cardHeader"]}>
                <FileText size={25} strokeWidth={1.5} aria-hidden="true" />
                <h3 className={styles["cardHeaderTitle"]}>{documents.title}</h3>
              </div>

              <ul className={styles["docsList"]}>
                {documents.items.map((doc) => (
                  <li key={doc.id} className={styles["docsItem"]}>
                    {doc.id === "receipt" ? (
                      <Receipt
                        size={20}
                        strokeWidth={1.5}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Award
                        size={20}
                        strokeWidth={1.5}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span>
                      {doc.label} —{" "}
                      <span
                        className={
                          doc.tone === "amber"
                            ? styles["amberText"]
                            : styles["softText"]
                        }
                      >
                        {doc.status}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={documents.ctaHref} className={styles["libraryLink"]}>
                <span>{documents.ctaLabel}</span>
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </section>

            <section
              id="need-help"
              className={`${styles["card"]} ${styles["helpCard"]}`}
              aria-label={help.title}
            >
              <div className={styles["cardHeader"]}>
                <Headset size={25} strokeWidth={1.5} aria-hidden="true" />
                <h3 className={styles["cardHeaderTitle"]}>{help.title}</h3>
              </div>
              <p className={styles["helpDesc"]}>{help.description}</p>

              {help.links.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={styles["helpRow"]}
                >
                  <HelpIcon id={item.id} />
                  <span>{item.label}</span>
                  <ChevronRight
                    size={17}
                    strokeWidth={1.8}
                    className={styles["chevron"]}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </section>
          </aside>
        </div>

        {/* Bottom quick-link cards */}
        <div id="quick-links" className={styles["bottomGrid"]}>
          {bottomCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={styles["bottomLink"]}
            >
              <BottomCardIcon id={card.id} />
              <div>
                <strong className={styles["bottomTitle"]}>{card.title}</strong>
                <small className={styles["bottomSub"]}>{card.subtitle}</small>
              </div>
              <ChevronRight
                size={18}
                strokeWidth={1.8}
                className={styles["chevron"]}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
