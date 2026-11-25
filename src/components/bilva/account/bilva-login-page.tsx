"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { LOGIN_DATA } from "@/data/bilva/login";
import styles from "./bilva-login-page.module.css";

export function BilvaLoginPage() {
  const { hero, card } = LOGIN_DATA;

  const router = useRouter();
  const cardHeadingId = useId();
  const inputId = useId();
  const errorId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<"mobile" | "email">("mobile");
  const [mobileValue, setMobileValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isMobile = mode === "mobile";

  const handleToggleMode = () => {
    setMode((prev) => (prev === "mobile" ? "email" : "mobile"));
    setErrorMessage("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isMobile) {
      const digits = mobileValue.replace(/\D/g, "");
      if (digits.length < 10) {
        setErrorMessage(card.mobileError);
        inputRef.current?.focus();
        return;
      }
    } else {
      const trimmed = emailValue.trim();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setErrorMessage(card.emailError);
        inputRef.current?.focus();
        return;
      }
    }

    setErrorMessage("");
    router.push(card.successRedirectHref);
  };

  return (
    <section className={styles["page"]} aria-labelledby={cardHeadingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        <div className={styles["split"]}>
          {/* Left hero panel */}
          <div className={styles["hero"]}>
            <div className={styles["heroImgWrap"]} aria-hidden="true">
              <Image
                src={hero.imageSrc}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 47vw"
                className="object-cover"
              />
            </div>
            <div className={styles["heroScrim"]} aria-hidden="true" />
            <div className={styles["heroContent"]}>
              <h2 className={styles["heroTitle"]}>{hero.heading}</h2>
              <div className={styles["heroRule"]} aria-hidden="true" />
              <p className={styles["heroSub"]}>{hero.subtitle}</p>
            </div>
          </div>

          {/* Right sign-in panel */}
          <div className={styles["panel"]}>
            <div className={styles["card"]}>
              <h1 id={cardHeadingId} className={styles["cardTitle"]}>
                {card.heading}
              </h1>
              <div className={styles["cardRule"]} aria-hidden="true" />
              <p className={styles["sub"]}>
                {isMobile ? card.subtitle : card.emailSubtitle}
              </p>

              <form onSubmit={handleSubmit} aria-labelledby={cardHeadingId} noValidate>
                <label htmlFor={inputId} className={styles["label"]}>
                  {isMobile ? card.mobileLabel : card.emailLabel}
                </label>

                <div className={styles["field"]}>
                  {isMobile ? (
                    <span className={styles["countryCode"]}>
                      {card.countryCode}
                    </span>
                  ) : null}
                  <input
                    ref={inputRef}
                    id={inputId}
                    name={isMobile ? "mobile" : "email"}
                    type={isMobile ? "tel" : "email"}
                    inputMode={isMobile ? "numeric" : "email"}
                    autoComplete={isMobile ? "tel-national" : "email"}
                    autoCapitalize={isMobile ? undefined : "none"}
                    spellCheck={isMobile ? undefined : false}
                    placeholder={
                      isMobile ? card.mobilePlaceholder : card.emailPlaceholder
                    }
                    value={isMobile ? mobileValue : emailValue}
                    onChange={(e) => {
                      if (isMobile) {
                        setMobileValue(e.target.value);
                      } else {
                        setEmailValue(e.target.value);
                      }
                      if (errorMessage) setErrorMessage("");
                    }}
                    aria-invalid={errorMessage ? true : undefined}
                    aria-describedby={errorMessage ? errorId : undefined}
                    className={styles["input"]}
                    required
                  />
                </div>

                {errorMessage ? (
                  <p
                    id={errorId}
                    className={styles["errorText"]}
                    role="alert"
                    aria-live="polite"
                  >
                    {errorMessage}
                  </p>
                ) : null}

                <button type="submit" className={styles["submitBtn"]}>
                  <span>{card.submitLabel}</span>
                  <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
                </button>
              </form>

              <div className={styles["orRow"]}>{card.dividerLabel}</div>

              <button
                type="button"
                onClick={handleToggleMode}
                className={styles["switchBtn"]}
              >
                {isMobile ? card.switchToEmailLabel : card.switchToMobileLabel}
              </button>

              <div className={styles["notice"]}>
                <ShieldCheck
                  size={34}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#0b6f6c]"
                  aria-hidden="true"
                />
                <span className={styles["noticeSep"]} aria-hidden="true" />
                <span>{card.noticeText}</span>
              </div>

              <p className={styles["legal"]}>
                {card.legalPrefix}{" "}
                <Link href={card.termsHref} className={styles["inlineLink"]}>
                  {card.termsLabel}
                </Link>{" "}
                {card.legalConjunction}{" "}
                <Link href={card.privacyHref} className={styles["inlineLink"]}>
                  {card.privacyLabel}
                </Link>
                .
              </p>

              <Link href={card.helpHref} className={styles["helpLink"]}>
                {card.helpLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
