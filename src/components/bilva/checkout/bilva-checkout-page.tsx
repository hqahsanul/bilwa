"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  Mail,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CHECKOUT_DELIVERY_PATH } from "@/lib/bilva-collection-routes";
import { CHECKOUT_DATA } from "@/data/bilva/checkout";
import { DEMO_VALID_OTP, USE_CASE_OTP_INVALID } from "@/data/bilva/use-cases";
import styles from "./bilva-checkout-page.module.css";

const COUNTRY_CODES = ["+91", "+1", "+44", "+971", "+65"];

export function BilvaCheckoutPage() {
  const { title, mobileOtp, guest, guestNote, bag, insuredBanner } =
    CHECKOUT_DATA;

  const router = useRouter();
  const headingId = useId();
  const mobileInputId = useId();
  const emailInputId = useId();
  const otpFirstId = useId();
  const ccListId = useId();

  const [countryCode, setCountryCode] = useState(mobileOtp.defaultCountryCode);
  const [isCcOpen, setIsCcOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpMessage, setOtpMessage] = useState<{
    text: string;
    tone: "neutral" | "ok" | "err";
  }>({ text: "", tone: "neutral" });
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const [guestEmail, setGuestEmail] = useState("");
  const [guestMessage, setGuestMessage] = useState<{
    text: string;
    tone: "neutral" | "ok" | "err";
  }>({ text: "", tone: "neutral" });

  const mobileRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const ccWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setCooldownSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldownSeconds]);

  useEffect(() => {
    if (!isCcOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (ccWrapRef.current && !ccWrapRef.current.contains(e.target as Node)) {
        setIsCcOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isCcOpen]);

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otpDigits];
    next[index] = cleaned;
    setOtpDigits(next);
    if (cleaned && index < otpDigits.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpDigits.length);
    if (!pasted) return;
    e.preventDefault();
    const next = [...otpDigits];
    pasted.split("").forEach((ch, idx) => {
      next[idx] = ch;
    });
    setOtpDigits(next);
    otpRefs.current[Math.min(pasted.length, otpDigits.length - 1)]?.focus();
  };

  const handleResendOtp = () => {
    if (phoneNumber.length !== 10) {
      setOtpMessage({
        text: "Enter a valid 10-digit mobile number first.",
        tone: "err",
      });
      mobileRef.current?.focus();
      return;
    }
    setOtpMessage({
      text: `A new OTP will be sent to ${countryCode} ${phoneNumber}.`,
      tone: "ok",
    });
    setCooldownSeconds(30);
  };

  const handleMobileContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setOtpMessage({
        text: "Enter a valid 10-digit mobile number.",
        tone: "err",
      });
      mobileRef.current?.focus();
      return;
    }
    const code = otpDigits.join("");
    if (code.length < otpDigits.length) {
      setOtpMessage({
        text: `Enter the ${otpDigits.length}-digit OTP to continue.`,
        tone: "err",
      });
      const firstEmpty = otpDigits.findIndex((d) => !d);
      otpRefs.current[firstEmpty > -1 ? firstEmpty : 0]?.focus();
      return;
    }
    if (code !== DEMO_VALID_OTP) {
      setOtpMessage({
        text: USE_CASE_OTP_INVALID.message,
        tone: "err",
      });
      otpRefs.current[0]?.focus();
      return;
    }
    setOtpMessage({
      text: "Verified. Continuing to delivery…",
      tone: "ok",
    });
    router.push(CHECKOUT_DELIVERY_PATH);
  };

  const handleGuestContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = guestEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setGuestMessage({
        text: "Enter a valid email address.",
        tone: "err",
      });
      emailRef.current?.focus();
      return;
    }
    setGuestMessage({
      text: `Continuing as guest with ${trimmed}…`,
      tone: "ok",
    });
    router.push(CHECKOUT_DELIVERY_PATH);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        <div className={styles["grid"]}>
          {/* Left: Sign-in options */}
          <div aria-label="Sign-in options">
            <h1 id={headingId} className={styles["heading"]}>
              {title}
            </h1>

            <div className={styles["opts"]}>
              {/* Mobile OTP card */}
              <form
                onSubmit={handleMobileContinue}
                className={styles["opt"]}
                noValidate
              >
                <div className={styles["optHeader"]}>
                  <div className={styles["iconBox"]} aria-hidden="true">
                    <Smartphone size={24} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h2 className={styles["optTitle"]}>{mobileOtp.title}</h2>
                    <p className={styles["optSub"]}>{mobileOtp.subtitle}</p>
                  </div>
                </div>

                <label htmlFor={mobileInputId} className={styles["label"]}>
                  {mobileOtp.mobileLabel}
                </label>
                <div className={styles["field"]}>
                  <div ref={ccWrapRef} className={styles["ccWrap"]}>
                    <button
                      type="button"
                      className={styles["ccBtn"]}
                      aria-haspopup="listbox"
                      aria-expanded={isCcOpen}
                      aria-controls={ccListId}
                      aria-label="Country code"
                      onClick={() => setIsCcOpen((open) => !open)}
                    >
                      <span>{countryCode}</span>
                      <ChevronDown
                        size={13}
                        strokeWidth={2}
                        className={`${styles["ccChevron"]} ${
                          isCcOpen ? styles["ccChevronOpen"] : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isCcOpen ? (
                      <ul
                        id={ccListId}
                        className={styles["ccList"]}
                        role="listbox"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((code) => {
                          const selected = code === countryCode;
                          return (
                            <li
                              key={code}
                              role="option"
                              aria-selected={selected}
                              onClick={() => {
                                setCountryCode(code);
                                setIsCcOpen(false);
                              }}
                              className={`${styles["ccOption"]} ${
                                selected ? styles["ccOptionSelected"] : ""
                              }`}
                            >
                              <span>{code}</span>
                              {selected ? (
                                <Check size={14} strokeWidth={2.2} aria-hidden="true" />
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                  <span className={styles["fieldSep"]} aria-hidden="true" />
                  <input
                    ref={mobileRef}
                    id={mobileInputId}
                    name="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    placeholder={mobileOtp.defaultPhone}
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    className={styles["input"]}
                  />
                </div>

                <label
                  htmlFor={otpFirstId}
                  className={`${styles["label"]} ${styles["otpLabel"]}`}
                >
                  {mobileOtp.otpLabel}
                </label>
                <div className={styles["otpRow"]}>
                  <div className={styles["otpGroup"]}>
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        id={index === 0 ? otpFirstId : undefined}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        autoComplete={index === 0 ? "one-time-code" : undefined}
                        aria-label={`OTP digit ${index + 1}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className={styles["otpInput"]}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    disabled={cooldownSeconds > 0}
                    onClick={handleResendOtp}
                    className={styles["resendBtn"]}
                  >
                    {cooldownSeconds > 0
                      ? `Resend in ${cooldownSeconds}s`
                      : mobileOtp.resendLabel}
                  </button>
                </div>

                <div className={styles["spacer"]} />

                <button type="submit" className={styles["btn"]}>
                  <span>{mobileOtp.cta}</span>
                  <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <p
                  className={`${styles["msg"]} ${
                    otpMessage.tone === "err"
                      ? styles["msgErr"]
                      : otpMessage.tone === "ok"
                        ? styles["msgOk"]
                        : ""
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {otpMessage.text}
                </p>
              </form>

              {/* Guest card */}
              <form
                onSubmit={handleGuestContinue}
                className={styles["opt"]}
                noValidate
              >
                <div className={styles["optHeader"]}>
                  <div className={styles["iconBox"]} aria-hidden="true">
                    <Mail size={24} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h2 className={styles["optTitle"]}>{guest.title}</h2>
                    <p className={styles["optSub"]}>{guest.subtitle}</p>
                  </div>
                </div>

                <label htmlFor={emailInputId} className={styles["label"]}>
                  {guest.emailLabel}
                </label>
                <div className={styles["field"]}>
                  <input
                    ref={emailRef}
                    id={emailInputId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder={guest.placeholder}
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className={styles["input"]}
                  />
                </div>

                <div className={styles["spacer"]} />

                <button type="submit" className={styles["btn"]}>
                  <span>{guest.cta}</span>
                  <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                </button>
                <p
                  className={`${styles["msg"]} ${
                    guestMessage.tone === "err"
                      ? styles["msgErr"]
                      : guestMessage.tone === "ok"
                        ? styles["msgOk"]
                        : ""
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {guestMessage.text}
                </p>
              </form>
            </div>

            <div className={styles["infoRow"]}>
              <Info size={18} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
              <span>{guestNote}</span>
            </div>
          </div>

          {/* Right: Your bag */}
          <aside className={styles["bag"]} aria-label={bag.title}>
            <h2 className={styles["bagTitle"]}>{bag.title}</h2>

            {bag.items.map((item) => (
              <div key={item.id} className={styles["bagItem"]}>
                <div className={styles["picWrap"]}>
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>
                <div className={styles["bagItemMeta"]}>
                  <strong className={styles["bagItemName"]}>{item.title}</strong>
                  <span className={styles["bagItemPrice"]}>
                    {item.formattedPrice}
                  </span>
                </div>
              </div>
            ))}

            <div className={styles["totalBox"]}>
              <span>{bag.totalLabel}</span>
              <strong className={styles["totalAmount"]}>
                {bag.formattedTotal}
              </strong>
            </div>
          </aside>
        </div>

        <div className={styles["insBanner"]}>
          <ShieldCheck
            size={26}
            strokeWidth={1.6}
            className="shrink-0"
            aria-hidden="true"
          />
          <span className={styles["insSep"]} aria-hidden="true" />
          <span>{insuredBanner.text}</span>
        </div>
      </div>
    </section>
  );
}
