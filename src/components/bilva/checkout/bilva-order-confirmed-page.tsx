"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, FileText, ShieldCheck } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { ORDER_CONFIRMED_DATA } from "@/data/bilva/order-confirmed";
import styles from "./bilva-order-confirmed-page.module.css";

export function BilvaOrderConfirmedPage() {
  const {
    eyebrow,
    headline,
    lead,
    meta,
    timelineTitle,
    timeline,
    insurance,
    actions,
    summary,
    hero,
  } = ORDER_CONFIRMED_DATA;

  const [secondsLeft, setSecondsLeft] = useState<number>(actions.initialSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [showDashboardNote, setShowDashboardNote] = useState(false);

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPaused, secondsLeft]);

  const countdownLabel = isPaused
    ? actions.pausedLabel
    : `${secondsLeft} ${secondsLeft === 1 ? "second" : "seconds"}`;

  const handleStay = () => {
    setIsPaused(true);
  };

  const handleViewOrder = () => {
    setIsPaused(true);
    setShowDashboardNote(true);
    document.getElementById("order-summary")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section className={styles["page"]} aria-labelledby="order-confirmed-heading">
      <div className={`${BILVA_SITE_FRAME_CLASS} ${styles["frame"]}`}>
        <div className={styles["layout"]}>
          {/* Left Side: Top band + Main Order Confirmed content */}
          <div className={styles["leftSide"]}>
            <div className={styles["topBand"]} aria-hidden="true" />
            <div className={styles["leftCol"]}>
              <div className={styles["head"]}>
                <div className={styles["badge"]} aria-hidden="true">
                  <Check size={28} strokeWidth={2.6} />
                </div>
                <div>
                  <p className={styles["eyebrow"]}>{eyebrow}</p>
                  <h1 id="order-confirmed-heading" className={styles["headline"]}>
                    {headline}
                  </h1>
                </div>
              </div>

              <p className={styles["lead"]}>{lead}</p>

              {/* Metadata strip */}
              <div className={styles["meta"]}>
                {meta.map((item) => (
                  <div key={item.id} className={styles["metaItem"]}>
                    <small className={styles["metaLabel"]}>{item.label}</small>
                    <strong
                      className={`${styles["metaValue"]} ${item.isTotal ? styles["metaTotal"] : ""}`}
                    >
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* What happens next timeline */}
              <h2 className={styles["sectionTitle"]}>{timelineTitle}</h2>
              <div className={styles["timeline"]}>
                {timeline.map((step) => {
                  const stateClass =
                    step.state === "done"
                      ? styles["stepDone"]
                      : step.state === "current"
                        ? styles["stepCurrent"]
                        : "";

                  return (
                    <div key={step.id} className={`${styles["step"]} ${stateClass}`}>
                      <div className={styles["stepTrack"]}>
                        <span className={styles["stepCircle"]} aria-hidden="true">
                          {step.state === "done" ? <Check size={13} strokeWidth={3} /> : null}
                        </span>
                      </div>
                      <div className={styles["stepBody"]}>
                        <strong className={styles["stepTitle"]}>{step.title}</strong>
                        <span className={styles["stepSub"]}>{step.subtitle}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery insurance banner */}
              <div className={styles["insurance"]}>
                <ShieldCheck size={30} strokeWidth={1.5} className="shrink-0" aria-hidden="true" />
                <span className={styles["insuranceSep"]} aria-hidden="true" />
                <div>
                  <strong className={styles["insuranceTitle"]}>{insurance.title}</strong>
                  <span className={styles["insuranceSub"]}>{insurance.subtitle}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className={styles["ctaRow"]}>
                <button
                  type="button"
                  onClick={handleViewOrder}
                  className={styles["btnPrimary"]}
                >
                  {actions.primaryLabel}
                </button>
                <Link href={actions.secondaryHref} className={styles["btnSecondary"]}>
                  {actions.secondaryLabel}
                </Link>
              </div>

              <p className={styles["redirectLine"]}>
                <span>
                  {actions.redirectPrefix}{" "}
                  <strong>{countdownLabel}</strong>
                </span>
                <span className={styles["redirectBar"]} aria-hidden="true" />
                <button
                  type="button"
                  onClick={handleStay}
                  className={styles["stayBtn"]}
                >
                  {actions.stayLabel}
                </button>
              </p>

              {showDashboardNote ? (
                <p className={styles["previewNote"]} role="status">
                  {actions.primaryNotice}
                </p>
              ) : null}

              {/* Order Summary & Receipt */}
              <section id="order-summary" className={styles["summary"]} aria-labelledby="order-summary-heading">
                <h3 id="order-summary-heading" className={styles["summaryHeader"]}>
                  <span>{summary.title}</span>
                  <span className={styles["summaryCount"]}>{summary.countLabel}</span>
                </h3>

                <div className={styles["summaryGrid"]}>
                  <div className={styles["productsList"]}>
                    {summary.products.map((product) => (
                      <div key={product.id} className={styles["productRow"]}>
                        <div className={styles["thumbWrap"]}>
                          <Image
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            fill
                            sizes="64px"
                            className="object-cover scale-[1.12]"
                          />
                        </div>
                        <strong className={styles["productTitle"]}>{product.title}</strong>
                      </div>
                    ))}
                  </div>

                  <span className={styles["vSep"]} aria-hidden="true" />

                  <div className={styles["receiptCol"]}>
                    <FileText size={20} strokeWidth={1.5} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <strong className={styles["receiptTitle"]}>{summary.receipt.title}</strong>
                      <span className={styles["receiptChip"]}>{summary.receipt.badge}</span>
                      <p className={styles["receiptDesc"]}>{summary.receipt.description}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Side: Bilwa Gold Coin Hero Photograph flushed to frame right */}
          <div className={styles["heroSide"]}>
            <div className={styles["heroFrame"]}>
              <Image
                src={hero.imageSrc}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-[74%_50%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
