"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, Phone } from "lucide-react";
import { BILVA_SITE_FRAME_CLASS, BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { GIFTING_ENQUIRY_SUBMITTED_PATH } from "@/lib/bilva-collection-routes";
import { GIFTING_ENQUIRY_DATA } from "@/data/bilva/gifting-enquiry";
import styles from "./bilva-gifting-quote-form.module.css";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  occasion?: string;
  budget?: string;
  message?: string;
  consent?: string;
}

interface BilvaGiftingQuoteFormProps {
  variant?: "embedded" | "full";
}

export function BilvaGiftingQuoteForm({ variant = "embedded" }: BilvaGiftingQuoteFormProps) {
  const {
    sectionHeading,
    lead,
    occasionOptions,
    budgetOptions,
    requirementsPlaceholder,
    consentText,
    submitLabel,
    caption,
    fullPage,
  } = GIFTING_ENQUIRY_DATA;

  const router = useRouter();
  const headingId = useId();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const recipientId = useId();
  const companyId = useId();
  const occasionId = useId();
  const messageId = useId();
  const budgetListId = useId();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const occasionRef = useRef<HTMLSelectElement>(null);
  const budgetBtnRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const budgetWrapRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [recipient, setRecipient] = useState("");
  const [company, setCompany] = useState("");
  const [occasion, setOccasion] = useState<string>(occasionOptions[0]);
  const [budget, setBudget] = useState("");
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const isFull = variant === "full";
  const displayHeading = isFull ? fullPage.heading : sectionHeading;
  const displayLead = isFull ? fullPage.lead : lead;

  useEffect(() => {
    if (!isBudgetOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (budgetWrapRef.current && !budgetWrapRef.current.contains(e.target as Node)) {
        setIsBudgetOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsBudgetOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isBudgetOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (name.trim().length <= 1) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid mobile number.";
    }
    if (occasion === occasionOptions[0]) {
      nextErrors.occasion = "Please select an occasion.";
    }
    if (!budget) {
      nextErrors.budget = "Please select a budget range.";
    }
    if (message.trim().length < 5) {
      nextErrors.message = "Please share a few details about your gift.";
    }
    if (!consent) {
      nextErrors.consent = "Please confirm your consent to continue.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.phone) phoneRef.current?.focus();
      else if (nextErrors.occasion) occasionRef.current?.focus();
      else if (nextErrors.budget) budgetBtnRef.current?.focus();
      else if (nextErrors.message) messageRef.current?.focus();
      else if (nextErrors.consent) consentRef.current?.focus();
      return;
    }

    router.push(GIFTING_ENQUIRY_SUBMITTED_PATH);
  };

  const formBody = (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`${styles["row"]} ${styles["rowFirst"]}`}>
        <div>
          <label htmlFor={nameId} className={styles["label"]}>
            Full name <span className={styles["req"]}>*</span>
          </label>
          <input
            ref={nameRef}
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            className={`${styles["input"]} ${errors.name ? styles["badControl"] : ""}`}
          />
          {errors.name ? <div className={styles["err"]}>{errors.name}</div> : null}
        </div>

        <div>
          <label htmlFor={recipientId} className={styles["label"]}>
            Recipient name <em className={styles["labelOptional"]}>(optional)</em>
          </label>
          <input
            id={recipientId}
            type="text"
            placeholder="Who is this gift for?"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className={styles["input"]}
          />
        </div>
      </div>

      <div className={styles["row"]}>
        <div>
          <label htmlFor={emailId} className={styles["label"]}>
            Email <span className={styles["req"]}>*</span>
          </label>
          <div className={styles["fld"]}>
            <Mail size={14} strokeWidth={1.7} className={styles["fieldIcon"]} aria-hidden />
            <input
              ref={emailRef}
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={`${styles["input"]} ${styles["inputWithIcon"]} ${
                errors.email ? styles["badControl"] : ""
              }`}
            />
          </div>
          {errors.email ? <div className={styles["err"]}>{errors.email}</div> : null}
        </div>

        <div>
          <label htmlFor={phoneId} className={styles["label"]}>
            Mobile <span className={styles["req"]}>*</span>
          </label>
          <div className={styles["fld"]}>
            <Phone size={14} strokeWidth={1.7} className={styles["fieldIcon"]} aria-hidden />
            <input
              ref={phoneRef}
              id={phoneId}
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              className={`${styles["input"]} ${styles["inputWithIcon"]} ${
                errors.phone ? styles["badControl"] : ""
              }`}
            />
          </div>
          {errors.phone ? <div className={styles["err"]}>{errors.phone}</div> : null}
        </div>
      </div>

      <div className={styles["row"]}>
        <div>
          <label htmlFor={companyId} className={styles["label"]}>
            Company <em className={styles["labelOptional"]}>(optional)</em>
          </label>
          <input
            id={companyId}
            type="text"
            autoComplete="organization"
            placeholder="Company name, if relevant"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={styles["input"]}
          />
        </div>

        <div>
          <label htmlFor={occasionId} className={styles["label"]}>
            Occasion <span className={styles["req"]}>*</span>
          </label>
          <select
            ref={occasionRef}
            id={occasionId}
            value={occasion}
            onChange={(e) => {
              setOccasion(e.target.value);
              if (errors.occasion) setErrors((prev) => ({ ...prev, occasion: undefined }));
            }}
            className={`${styles["select"]} ${errors.occasion ? styles["badControl"] : ""}`}
          >
            {occasionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.occasion ? <div className={styles["err"]}>{errors.occasion}</div> : null}
        </div>
      </div>

      <div className={`${styles["row"]} ${styles["rowOne"]}`}>
        <div>
          <div className={styles["label"]}>
            Budget range <span className={styles["req"]}>*</span>
          </div>
          <div ref={budgetWrapRef} className={styles["dd"]}>
            <button
              ref={budgetBtnRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isBudgetOpen}
              aria-controls={budgetListId}
              onClick={() => setIsBudgetOpen((open) => !open)}
              className={`${styles["ddBtn"]} ${!budget ? styles["ddBtnPlaceholder"] : ""} ${
                errors.budget ? styles["badControl"] : ""
              }`}
            >
              <span>{budget || "Select a budget range"}</span>
              <ChevronDown size={14} strokeWidth={1.8} aria-hidden />
            </button>
            {isBudgetOpen ? (
              <ul id={budgetListId} role="listbox" className={styles["ddList"]}>
                {budgetOptions.map((opt) => {
                  const selected = budget === opt;
                  return (
                    <li
                      key={opt}
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        setBudget(opt);
                        setIsBudgetOpen(false);
                        if (errors.budget) setErrors((prev) => ({ ...prev, budget: undefined }));
                      }}
                      className={`${styles["ddOption"]} ${selected ? styles["ddOptionSelected"] : ""}`}
                    >
                      {opt}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
          {errors.budget ? <div className={styles["err"]}>{errors.budget}</div> : null}
        </div>
      </div>

      <div className={`${styles["row"]} ${styles["rowOne"]}`}>
        <div>
          <label htmlFor={messageId} className={styles["label"]}>
            Message / requirements <span className={styles["req"]}>*</span>
          </label>
          <textarea
            ref={messageRef}
            id={messageId}
            placeholder={requirementsPlaceholder}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            className={`${styles["textarea"]} ${errors.message ? styles["badControl"] : ""}`}
          />
          {errors.message ? <div className={styles["err"]}>{errors.message}</div> : null}
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
                setErrors((prev) => ({ ...prev, consent: undefined }));
              }
            }}
            className={styles["consentInput"]}
          />
          <span className={styles["consentText"]}>
            {consentText} <span className={styles["req"]}>*</span>
          </span>
        </label>
        {errors.consent ? <div className={styles["err"]}>{errors.consent}</div> : null}
      </div>

      <button type="submit" className={styles["submitBtn"]}>
        <span>{submitLabel}</span>
        <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
      </button>
      <p className={styles["caption"]}>{caption}</p>
    </form>
  );

  if (isFull) {
    return (
      <section className={styles["page"]} aria-labelledby={headingId}>
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className={styles["pageCard"]}>
            <h1 id={headingId} className={styles["heading"]}>
              {displayHeading}
            </h1>
            <span className={styles["rule"]} aria-hidden />
            <p className={styles["lead"]}>{displayLead}</p>
            {formBody}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="quote"
      className={`${styles["section"]} ${styles["sectionEmbedded"]}`}
      aria-labelledby={headingId}
    >
      <div className={`${BILVA_SITE_FRAME_CLASS} ${styles["band"]}`}>
        <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["inner"]}`}>
          <h2 id={headingId} className={styles["heading"]}>
            {displayHeading}
          </h2>
          <span className={styles["rule"]} aria-hidden />
          <p className={styles["lead"]}>{displayLead}</p>
          {formBody}
        </div>
      </div>
    </section>
  );
}