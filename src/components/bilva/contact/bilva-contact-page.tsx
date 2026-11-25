"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  Gift,
  HelpCircle,
  Package,
  ScrollText,
  Users,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CONTACT_DATA } from "@/data/bilva/contact";
import styles from "./bilva-contact-page.module.css";

interface ContactErrors {
  name?: string;
  email?: string;
  phone?: string;
  topic?: string;
  msg?: string;
  consent?: string;
}

function EnquiryIcon({ id }: { id: string }) {
  const props = { size: 24, strokeWidth: 1.4, "aria-hidden": true as const };
  switch (id) {
    case "guidance":
      return <Package {...props} />;
    case "order":
      return <ScrollText {...props} />;
    case "certification":
      return <Award {...props} />;
    default:
      return <Gift {...props} />;
  }
}

function StripIcon({ id }: { id: string }) {
  const props = { size: 24, strokeWidth: 1.4, "aria-hidden": true as const };
  switch (id) {
    case "track":
      return <Package {...props} />;
    case "corporate":
      return <Users {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
}

export function BilvaContactPage() {
  const {
    hero,
    sidebarTitle,
    enquiryOptions,
    topics,
    consentText,
    submitLabel,
    done,
    quickStrip,
    faqTitle,
    faqs,
  } = CONTACT_DATA;

  const headingId = useId();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const orderId = useId();
  const msgId = useId();
  const topicListId = useId();

  const mainRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const topicWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const topicBtnRef = useRef<HTMLButtonElement>(null);
  const orderRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);

  useEffect(() => {
    if (!isTopicOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        topicWrapRef.current &&
        !topicWrapRef.current.contains(e.target as Node)
      ) {
        setIsTopicOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsTopicOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isTopicOpen]);

  const selectTopic = (nextTopic: string) => {
    setTopic(nextTopic);
    if (errors.topic) {
      setErrors((prev) => ({ ...prev, topic: undefined }));
    }
  };

  const handleStripAction = (id: (typeof quickStrip)[number]["id"]) => {
    if (id === "faqs") {
      setShowFaq((prev) => {
        const next = !prev;
        if (next) {
          window.setTimeout(
            () => faqRef.current?.scrollIntoView({ behavior: "smooth" }),
            50
          );
        }
        return next;
      });
      return;
    }

    const targetTopic =
      id === "track" ? "Order status & changes" : "Gifting & bulk needs";
    selectTopic(targetTopic);
    setSubmittedRef(null);
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => {
      if (id === "track") orderRef.current?.focus({ preventScroll: true });
      else nameRef.current?.focus({ preventScroll: true });
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: ContactErrors = {};

    if (name.trim().length <= 1) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (phone.trim() && phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid mobile number.";
    }
    if (!topic) {
      nextErrors.topic = "Please select a topic.";
    }
    if (message.trim().length < 5) {
      nextErrors.msg = "Please tell us how we can help.";
    }
    if (!consent) {
      nextErrors.consent = "Please confirm your consent to continue.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.phone) phoneRef.current?.focus();
      else if (nextErrors.topic) topicBtnRef.current?.focus();
      else if (nextErrors.msg) msgRef.current?.focus();
      else if (nextErrors.consent) consentRef.current?.focus();
      return;
    }

    const code = Math.floor(1000 + Math.random() * 9000);
    setSubmittedRef(`BLW-SP-${code}`);
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setTopic("");
    setOrderNumber("");
    setMessage("");
    setConsent(false);
    setErrors({});
    setSubmittedRef(null);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        <div className={styles["shell"]}>
          {/* Hero */}
          <header className={styles["hero"]}>
            <div className={styles["heroImgWrap"]} aria-hidden="true">
              <Image
                src={hero.imageSrc}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 820px) 60vw, 44vw"
                className="object-cover"
              />
            </div>
            <h1 id={headingId} className={styles["heroHeading"]}>
              {hero.heading}
            </h1>
            <p className={styles["heroSub"]}>{hero.subtitle}</p>
            <span className={styles["heroRule"]} aria-hidden="true" />
          </header>

          {/* Main 2-column enquiry */}
          <div ref={mainRef} className={styles["main"]}>
            <aside className={styles["left"]}>
              <h2 className={styles["leftTitle"]}>{sidebarTitle}</h2>
              <div
                className={styles["opts"]}
                role="radiogroup"
                aria-label={sidebarTitle}
              >
                {enquiryOptions.map((option) => {
                  const isSelected = topic === option.topic;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        selectTopic(option.topic);
                        nameRef.current?.focus({
                          preventScroll: window.innerWidth > 860,
                        });
                      }}
                      className={`${styles["opt"]} ${
                        isSelected ? styles["optSelected"] : ""
                      }`}
                    >
                      <EnquiryIcon id={option.id} />
                      <span className={styles["optText"]}>
                        <strong className={styles["optTitle"]}>
                          {option.title}
                        </strong>
                        <small className={styles["optSub"]}>
                          {option.subtitle}
                        </small>
                      </span>
                      <ChevronRight
                        size={14}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </aside>

            <section className={styles["right"]} aria-label="Contact form">
              {submittedRef ? (
                <div className={styles["done"]} role="status">
                  <div className={styles["doneBadge"]} aria-hidden="true">
                    <Check size={26} strokeWidth={2} />
                  </div>
                  <h2 className={styles["doneHeading"]}>{done.heading}</h2>
                  <p className={styles["doneSub"]}>
                    Reference: {submittedRef}. Our team will get back to you
                    shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`${styles["sendBtn"]} ${styles["doneBtn"]}`}
                  >
                    {done.againLabel}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={styles["row"]}>
                    <div className={styles["fld"]}>
                      <label htmlFor={nameId} className={styles["label"]}>
                        Full name <span className={styles["req"]}>*</span>
                      </label>
                      <input
                        ref={nameRef}
                        id={nameId}
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name)
                            setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        className={`${styles["input"]} ${
                          errors.name ? styles["badControl"] : ""
                        }`}
                      />
                      {errors.name ? (
                        <div className={styles["err"]}>{errors.name}</div>
                      ) : null}
                    </div>

                    <div className={styles["fld"]}>
                      <label htmlFor={emailId} className={styles["label"]}>
                        Email address <span className={styles["req"]}>*</span>
                      </label>
                      <input
                        ref={emailRef}
                        id={emailId}
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email)
                            setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`${styles["input"]} ${
                          errors.email ? styles["badControl"] : ""
                        }`}
                      />
                      {errors.email ? (
                        <div className={styles["err"]}>{errors.email}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles["row"]}>
                    <div className={styles["fld"]}>
                      <label htmlFor={phoneId} className={styles["label"]}>
                        Mobile <em className={styles["labelOpt"]}>(optional)</em>
                      </label>
                      <input
                        ref={phoneRef}
                        id={phoneId}
                        type="tel"
                        autoComplete="tel"
                        placeholder="Enter your mobile number"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone)
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        className={`${styles["input"]} ${
                          errors.phone ? styles["badControl"] : ""
                        }`}
                      />
                      {errors.phone ? (
                        <div className={styles["err"]}>{errors.phone}</div>
                      ) : null}
                    </div>

                    <div className={styles["fld"]}>
                      <div className={styles["label"]}>
                        Topic <span className={styles["req"]}>*</span>
                      </div>
                      <div ref={topicWrapRef} className={styles["dd"]}>
                        <button
                          ref={topicBtnRef}
                          type="button"
                          aria-label="Topic"
                          aria-haspopup="listbox"
                          aria-expanded={isTopicOpen}
                          aria-controls={topicListId}
                          onClick={() => setIsTopicOpen((open) => !open)}
                          className={`${styles["ddBtn"]} ${
                            !topic ? styles["ddBtnPlaceholder"] : ""
                          } ${errors.topic ? styles["badControl"] : ""}`}
                        >
                          <span>{topic || "Select a topic"}</span>
                          <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                        {isTopicOpen ? (
                          <ul
                            id={topicListId}
                            role="listbox"
                            className={styles["ddList"]}
                          >
                            {topics.map((item) => {
                              const selected = topic === item;
                              return (
                                <li
                                  key={item}
                                  role="option"
                                  aria-selected={selected}
                                  onClick={() => {
                                    selectTopic(item);
                                    setIsTopicOpen(false);
                                  }}
                                  className={`${styles["ddOption"]} ${
                                    selected ? styles["ddOptionSelected"] : ""
                                  }`}
                                >
                                  {item}
                                </li>
                              );
                            })}
                          </ul>
                        ) : null}
                      </div>
                      {errors.topic ? (
                        <div className={styles["err"]}>{errors.topic}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles["row"]}>
                    <div className={`${styles["fld"]} ${styles["fldWide"]}`}>
                      <label htmlFor={orderId} className={styles["label"]}>
                        Order number{" "}
                        <em className={styles["labelOpt"]}>(optional)</em>
                      </label>
                      <input
                        ref={orderRef}
                        id={orderId}
                        type="text"
                        placeholder="Enter your order number, if any"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className={styles["input"]}
                      />
                    </div>
                  </div>

                  <div className={styles["row"]}>
                    <div className={`${styles["fld"]} ${styles["fldWide"]}`}>
                      <label htmlFor={msgId} className={styles["label"]}>
                        Your message <span className={styles["req"]}>*</span>
                      </label>
                      <textarea
                        ref={msgRef}
                        id={msgId}
                        placeholder="Tell us how we can help you…"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.msg)
                            setErrors((prev) => ({ ...prev, msg: undefined }));
                        }}
                        className={`${styles["textarea"]} ${
                          errors.msg ? styles["badControl"] : ""
                        }`}
                      />
                      {errors.msg ? (
                        <div className={styles["err"]}>{errors.msg}</div>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className={styles["consent"]}>
                      <input
                        ref={consentRef}
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (e.target.checked && errors.consent) {
                            setErrors((prev) => ({
                              ...prev,
                              consent: undefined,
                            }));
                          }
                        }}
                        className={styles["consentInput"]}
                      />
                      <span>{consentText}</span>
                    </label>
                    {errors.consent ? (
                      <div className={styles["err"]}>{errors.consent}</div>
                    ) : null}
                  </div>

                  <button type="submit" className={styles["sendBtn"]}>
                    <span>{submitLabel}</span>
                    <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                </form>
              )}
            </section>
          </div>

          {/* Quick links strip */}
          <nav className={styles["strip"]} aria-label="Quick links">
            {quickStrip.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleStripAction(item.id)}
                className={styles["stripBtn"]}
              >
                <StripIcon id={item.id} />
                <span className={styles["stripText"]}>
                  <strong className={styles["stripTitle"]}>{item.title}</strong>
                  <small className={styles["stripSub"]}>{item.subtitle}</small>
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={1.6}
                  className="text-[#b5653a] shrink-0"
                  aria-hidden="true"
                />
              </button>
            ))}
          </nav>

          {/* Collapsible FAQ */}
          {showFaq ? (
            <section ref={faqRef} className={styles["faq"]} aria-label={faqTitle}>
              <h3 className={styles["faqTitle"]}>{faqTitle}</h3>
              {faqs.map((item) => (
                <details key={item.id} className={styles["faqItem"]}>
                  <summary className={styles["faqSummary"]}>
                    {item.question}
                  </summary>
                  <p className={styles["faqAnswer"]}>{item.answer}</p>
                </details>
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </section>
  );
}
