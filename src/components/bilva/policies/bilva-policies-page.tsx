"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Clock,
  FileText,
  Headset,
  Info,
  Leaf,
  Lock,
  MessageSquare,
  Package,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  POLICIES_DATA,
  type PolicyIconName,
  type PolicyKey,
} from "@/data/bilva/policies";
import styles from "./bilva-policies-page.module.css";

function PolicyIcon({
  name,
  size = 20,
}: {
  name: PolicyIconName;
  size?: number;
}) {
  const props = { size, strokeWidth: 1.5, "aria-hidden": true as const };
  switch (name) {
    case "box":
      return <Package {...props} />;
    case "ret":
      return <RotateCcw {...props} />;
    case "lock":
      return <Lock {...props} />;
    case "doc":
      return <FileText {...props} />;
    case "chat":
      return <MessageSquare {...props} />;
    case "truck":
      return <Truck {...props} />;
    case "shield":
      return <ShieldCheck {...props} />;
    case "warn":
      return <AlertTriangle {...props} />;
    case "head":
      return <Headset {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "info":
      return <Info {...props} />;
  }
}

export function BilvaPoliciesPage() {
  const {
    heroTitle,
    heroSubtitle,
    heroLeafImageSrc,
    sidebarHeading,
    draftPill,
    cta,
    policies,
  } = POLICIES_DATA;

  const headingId = useId();
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<PolicyKey>("shipping");

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, "") as PolicyKey;
      if (policies.some((p) => p.key === hash)) {
        setActiveKey(hash);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [policies]);

  const selectPolicy = (key: PolicyKey, shouldScroll = false) => {
    setActiveKey(key);
    try {
      window.history.replaceState(null, "", `#${key}`);
    } catch {
      // ignore history errors in sandboxed frames
    }
    if (shouldScroll) {
      if (window.innerWidth <= 860) {
        mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const activePolicy =
    policies.find((p) => p.key === activeKey) ?? policies[0];

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Hero */}
        <header className={styles["hero"]}>
          <h1 id={headingId} className={styles["heroTitle"]}>
            {heroTitle}
          </h1>
          <p className={styles["heroSub"]}>{heroSubtitle}</p>
          <div className={styles["leafWrap"]} aria-hidden="true">
            <Image
              src={heroLeafImageSrc}
              alt=""
              fill
              sizes="288px"
              className="object-contain object-right"
            />
          </div>
        </header>

        {/* Body */}
        <div className={styles["body"]}>
          <div className={styles["topGrid"]}>
            <aside className={styles["side"]} aria-label="Bilwa policies navigation">
              <h2 className={styles["sideHeading"]}>{sidebarHeading}</h2>
              <ul className={styles["navList"]}>
                {policies.map((policy) => {
                  const isActive = policy.key === activePolicy.key;
                  return (
                    <li key={policy.key}>
                      <button
                        type="button"
                        onClick={() => selectPolicy(policy.key, true)}
                        aria-current={isActive ? "page" : undefined}
                        className={`${styles["navBtn"]} ${
                          isActive ? styles["navBtnActive"] : ""
                        }`}
                      >
                        <PolicyIcon name={policy.navIcon} size={19} />
                        <span className={styles["navLabel"]}>
                          {policy.title}
                        </span>
                        <ChevronRight size={14} strokeWidth={1.8} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            <div ref={mainRef} className={styles["main"]}>
              <div className={styles["head"]}>
                <h2 className={styles["policyTitle"]}>{activePolicy.title}</h2>
                <span className={styles["pill"]}>
                  <Clock size={16} strokeWidth={1.6} aria-hidden="true" />
                  <span>{draftPill}</span>
                </span>
              </div>

              {activePolicy.sections.map((section) => (
                <section key={section.title} className={styles["sec"]}>
                  <div className={styles["ico"]}>
                    <PolicyIcon name={section.icon} size={22} />
                  </div>
                  <div>
                    <h3 className={styles["secTitle"]}>{section.title}</h3>
                    <p className={styles["secBody"]}>{section.body}</p>
                  </div>
                </section>
              ))}

              <div className={styles["note"]}>
                <Info
                  size={20}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#12301f]"
                  aria-hidden="true"
                />
                <span>{activePolicy.note}</span>
              </div>
            </div>
          </div>

          <div className={styles["cta"]}>
            <Leaf
              size={36}
              strokeWidth={1.3}
              className="shrink-0 text-[#12301f]"
              aria-hidden="true"
            />
            <span className={styles["ctaVr"]} aria-hidden="true" />
            <h2 className={styles["ctaHeading"]}>{cta.heading}</h2>
            <p className={styles["ctaDesc"]}>{cta.description}</p>
            <button
              type="button"
              onClick={() => selectPolicy("contact", true)}
              className={styles["ctaBtn"]}
            >
              <span>{cta.buttonLabel}</span>
              <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
