"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  CreditCard,
  Headset,
  Info,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { PAYMENT_PENDING_DATA } from "@/data/bilva/payment-pending";
import styles from "./bilva-payment-pending-page.module.css";

export function BilvaPaymentPendingPage() {
  const {
    heading,
    subtitle,
    statusCard,
    troubleCard,
    orderSummary,
    notice,
    leafDecor,
  } = PAYMENT_PENDING_DATA;

  const headingId = useId();
  const [isRechecking, setIsRechecking] = useState(false);
  const [hasRechecked, setHasRechecked] = useState(false);

  const handleCheckAgain = () => {
    if (isRechecking) return;
    setIsRechecking(true);
    window.setTimeout(() => {
      setIsRechecking(false);
      setHasRechecked(true);
    }, 900);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      {/* Decorative Bilwa leaf accents */}
      <div className={styles["leafLeft"]} aria-hidden="true">
        <Image
          src={leafDecor.imageSrc}
          alt=""
          fill
          sizes="160px"
          className="object-contain"
        />
      </div>
      <div className={styles["leafRight"]} aria-hidden="true">
        <Image
          src={leafDecor.imageSrc}
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>

      <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["inner"]}`}>
        {/* Heading */}
        <header className={styles["title"]}>
          <h1 id={headingId} className={styles["heading"]}>
            {heading}
          </h1>
          <p className={styles["subtitle"]}>{subtitle}</p>
          <div className={styles["rule"]} aria-hidden="true" />
        </header>

        {/* Status + Troubleshooting grid */}
        <div className={styles["topGrid"]}>
          <div className={`${styles["card"]} ${styles["statusCard"]}`}>
            <div className={styles["clockBadge"]} aria-hidden="true">
              <Clock size={26} strokeWidth={1.6} />
            </div>
            <h2 className={styles["statusTitle"]}>{statusCard.title}</h2>
            <div
              className={styles["bar"]}
              role="progressbar"
              aria-label={statusCard.progressbarLabel}
              aria-valuetext={
                isRechecking
                  ? statusCard.recheckingSubtitle
                  : statusCard.subtitle
              }
            >
              <span className={styles["barFill"]} />
            </div>
            <p className={styles["statusSub"]}>
              {isRechecking
                ? statusCard.recheckingSubtitle
                : statusCard.subtitle}
            </p>
            <span className={styles["statusPill"]}>
              <Loader2
                size={14}
                strokeWidth={2}
                className={styles["spinIcon"]}
                aria-hidden="true"
              />
              {statusCard.badge}
            </span>
            {hasRechecked ? (
              <p
                className={styles["recheckNote"]}
                role="status"
                aria-live="polite"
              >
                {statusCard.recheckResultNote}
              </p>
            ) : null}
          </div>

          <div className={`${styles["card"]} ${styles["troubleCard"]}`}>
            <h3 className={styles["troubleTitle"]}>{troubleCard.title}</h3>
            <button
              type="button"
              onClick={handleCheckAgain}
              disabled={isRechecking}
              className={`${styles["actionBtn"]} ${styles["actionBtnPrimary"]}`}
            >
              <RefreshCw size={17} strokeWidth={1.8} aria-hidden="true" />
              <span>
                {isRechecking
                  ? troubleCard.checkingLabel
                  : troubleCard.checkAgainLabel}
              </span>
              <ChevronRight
                size={16}
                strokeWidth={1.8}
                className={styles["actionChevron"]}
                aria-hidden="true"
              />
            </button>

            <Link
              href={troubleCard.tryAnotherHref}
              className={styles["actionBtn"]}
            >
              <CreditCard size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>{troubleCard.tryAnotherLabel}</span>
              <ChevronRight
                size={16}
                strokeWidth={1.8}
                className={styles["actionChevron"]}
                aria-hidden="true"
              />
            </Link>

            <Link href={troubleCard.supportHref} className={styles["actionBtn"]}>
              <Headset size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>{troubleCard.supportLabel}</span>
              <ChevronRight
                size={16}
                strokeWidth={1.8}
                className={styles["actionChevron"]}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Order summary card */}
        <section
          className={`${styles["card"]} ${styles["orderCard"]}`}
          aria-label="Saved order summary"
        >
          <div className={styles["refBar"]}>
            <span>{orderSummary.referenceLabel}</span>
            <span className={styles["refSep"]} aria-hidden="true" />
            <strong className={styles["refCode"]}>
              {orderSummary.referenceValue}
            </strong>
          </div>

          {orderSummary.items.map((item) => (
            <div key={item.id} className={styles["itemLine"]}>
              <div className={styles["thumbWrap"]}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="50px"
                  className="object-cover"
                />
              </div>
              <span className={styles["itemName"]}>{item.title}</span>
              <span className={styles["itemAmt"]}>{item.priceFormatted}</span>
            </div>
          ))}

          <div className={styles["orderFoot"]}>
            <div className={styles["insured"]}>
              <ShieldCheck
                size={17}
                strokeWidth={1.8}
                className="shrink-0 text-[#2c6a3e]"
                aria-hidden="true"
              />
              <span>{orderSummary.insuredNote}</span>
            </div>
            <div className={styles["totalBox"]}>
              <span className={styles["totalLabel"]}>
                {orderSummary.totalLabel}
              </span>
              <span className={styles["totalSep"]} aria-hidden="true" />
              <strong className={styles["totalAmt"]}>
                {orderSummary.totalFormatted}
              </strong>
            </div>
          </div>
          <div className={styles["orderTail"]} aria-hidden="true" />
        </section>

        {/* Bottom notice */}
        <div className={styles["notice"]} role="note">
          <Info size={17} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
          <span>{notice}</span>
        </div>
      </div>
    </section>
  );
}
