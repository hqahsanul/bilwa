"use client";

import { useId } from "react";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { ENQUIRY_SUBMITTED_DATA } from "@/data/bilva/enquiry-submitted";
import styles from "./bilva-enquiry-submitted-page.module.css";

export function BilvaEnquirySubmittedPage() {
  const { breadcrumbs, heading, referenceLabel, lead, details, actions, note } =
    ENQUIRY_SUBMITTED_DATA;

  const headingId = useId();

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        <nav className={styles["crumbs"]} aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              {index > 0 ? (
                <span className={styles["sep"]} aria-hidden="true">
                  &gt;
                </span>
              ) : null}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span className={styles["cur"]}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className={styles["wrap"]}>
          <div className={styles["card"]}>
            <div className={styles["checkBadge"]} aria-hidden="true">
              <Check size={32} strokeWidth={2} />
            </div>

            <h1 id={headingId} className={styles["heading"]}>
              {heading}
            </h1>

            <div className={styles["refPill"]}>{referenceLabel}</div>

            <p className={styles["lead"]}>{lead}</p>

            <div className={styles["details"]}>
              {details.map((row) => (
                <div key={row.id} className={styles["row"]}>
                  <span className={styles["key"]}>{row.label}</span>
                  <span aria-hidden="true">:</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>

            <div className={styles["actions"]}>
              <Link
                href={actions.backHref}
                className={`${styles["btn"]} ${styles["btnOutline"]}`}
              >
                {actions.backLabel}
              </Link>
              <Link
                href={actions.exploreHref}
                className={`${styles["btn"]} ${styles["btnFill"]}`}
              >
                {actions.exploreLabel}
              </Link>
            </div>

            <div className={styles["note"]}>
              <Info size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{note}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
