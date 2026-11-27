"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CloudUpload,
  Leaf,
  Mail,
  Phone,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CORPORATE_ENQUIRY_SUBMITTED_PATH } from "@/lib/bilva-collection-routes";
import { CORPORATE_ENQUIRY_DATA } from "@/data/bilva/corporate-enquiry";
import styles from "./bilva-corporate-enquiry-page.module.css";

interface FormErrors {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
  budget?: string;
  req?: string;
  consent?: string;
}

export function BilvaCorporateEnquiryPage({
  submittedHref = CORPORATE_ENQUIRY_SUBMITTED_PATH,
}: {
  submittedHref?: string;
} = {}) {
  const {
    visual,
    heading,
    lead,
    quantityOptions,
    budgetOptions,
    deliveryLocations,
    requirementsPlaceholder,
    upload,
    consentText,
    submitLabel,
    caption,
    done,
  } = CORPORATE_ENQUIRY_DATA;

  const router = useRouter();
  const headingId = useId();
  const companyId = useId();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const reqId = useId();
  const budgetListId = useId();
  const fileInputId = useId();

  const companyRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const budgetBtnRef = useRef<HTMLButtonElement>(null);
  const reqRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const budgetWrapRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState<string>(quantityOptions[0]);
  const [budget, setBudget] = useState("");
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [requirements, setRequirements] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState<string>(
    deliveryLocations[0].value
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isBudgetOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (
        budgetWrapRef.current &&
        !budgetWrapRef.current.contains(e.target as Node)
      ) {
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

  const handleFileSelection = (file: File | undefined) => {
    if (!file) return;
    const isValid =
      /\.(pdf|png|jpe?g|zip)$/i.test(file.name) &&
      file.size <= 10 * 1024 * 1024;
    if (!isValid) {
      setFileError(upload.errorMessage);
      return;
    }
    setFileError("");
    setUploadedFile(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (company.trim().length <= 1) {
      nextErrors.company = "Please enter your company name.";
    }
    if (name.trim().length <= 1) {
      nextErrors.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = "Enter a valid work email.";
    }
    if (phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid mobile number.";
    }
    if (!budget) {
      nextErrors.budget = "Please select a budget range.";
    }
    if (requirements.trim().length < 5) {
      nextErrors.req = "Please tell us a little about your requirements.";
    }
    if (!consent) {
      nextErrors.consent = "Please confirm your consent to continue.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.company) companyRef.current?.focus();
      else if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.phone) phoneRef.current?.focus();
      else if (nextErrors.budget) budgetBtnRef.current?.focus();
      else if (nextErrors.req) reqRef.current?.focus();
      else if (nextErrors.consent) consentRef.current?.focus();
      return;
    }

    const code = String(Math.floor(1000 + Math.random() * 9000));
    setSubmittedRef(`BLW-CG-${code}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      router.push(submittedHref);
    }, 700);
  };

  const handleReset = () => {
    setCompany("");
    setName("");
    setEmail("");
    setPhone("");
    setQuantity(quantityOptions[0]);
    setBudget("");
    setRequirements("");
    setDeliveryLocation(deliveryLocations[0].value);
    setUploadedFile(null);
    setFileError("");
    setConsent(false);
    setErrors({});
    setSubmittedRef(null);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        <div className={styles["shell"]}>
          {/* Left visual panel */}
          <aside className={styles["vis"]}>
            <div className={styles["visBgWrap"]} aria-hidden="true">
              <Image
                src={visual.imageSrc}
                alt={visual.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 384px"
                className="object-cover"
              />
            </div>
            <div className={styles["visScrim"]} aria-hidden="true" />
            <div className={styles["visText"]}>
              <h2 className={styles["visHeading"]}>{visual.heading}</h2>
              <span className={styles["visRule"]} aria-hidden="true" />
              <p className={styles["visSub"]}>{visual.subtitle}</p>
            </div>
          </aside>

          {/* Right form pane */}
          <section className={styles["pane"]}>
            <Leaf
              size={128}
              strokeWidth={1.1}
              className={styles["leafA"]}
              aria-hidden="true"
            />
            <Leaf
              size={128}
              strokeWidth={1.1}
              className={styles["leafB"]}
              aria-hidden="true"
            />

            <div className={styles["paneInner"]}>
              {submittedRef ? (
                <div className={styles["done"]} role="status">
                  <div className={styles["doneBadge"]} aria-hidden="true">
                    <Check size={26} strokeWidth={2} />
                  </div>
                  <h1 id={headingId} className={styles["doneHeading"]}>
                    {done.heading}
                  </h1>
                  <p className={styles["doneSub"]}>
                    Enquiry reference: {submittedRef}. Our team will respond
                    with options and timelines.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`${styles["submitBtn"]} ${styles["doneBtn"]}`}
                  >
                    {done.againLabel}
                  </button>
                </div>
              ) : (
                <div>
                  <h1 id={headingId} className={styles["heading"]}>
                    {heading}
                  </h1>
                  <span className={styles["rule"]} aria-hidden="true" />
                  <p className={styles["lead"]}>{lead}</p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className={`${styles["row"]} ${styles["rowFirst"]}`}>
                      <div>
                        <label htmlFor={companyId} className={styles["label"]}>
                          Company name <span className={styles["req"]}>*</span>
                        </label>
                        <input
                          ref={companyRef}
                          id={companyId}
                          type="text"
                          autoComplete="organization"
                          placeholder="Enter your company name"
                          value={company}
                          onChange={(e) => {
                            setCompany(e.target.value);
                            if (errors.company)
                              setErrors((prev) => ({ ...prev, company: undefined }));
                          }}
                          className={`${styles["input"]} ${
                            errors.company ? styles["badControl"] : ""
                          }`}
                        />
                        {errors.company ? (
                          <div className={styles["err"]}>{errors.company}</div>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor={nameId} className={styles["label"]}>
                          Contact name <span className={styles["req"]}>*</span>
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
                    </div>

                    <div className={styles["row"]}>
                      <div>
                        <label htmlFor={emailId} className={styles["label"]}>
                          Work email <span className={styles["req"]}>*</span>
                        </label>
                        <div className={styles["fld"]}>
                          <Mail
                            size={14}
                            strokeWidth={1.7}
                            className={styles["fieldIcon"]}
                            aria-hidden="true"
                          />
                          <input
                            ref={emailRef}
                            id={emailId}
                            type="email"
                            autoComplete="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email)
                                setErrors((prev) => ({ ...prev, email: undefined }));
                            }}
                            className={`${styles["input"]} ${styles["inputWithIcon"]} ${
                              errors.email ? styles["badControl"] : ""
                            }`}
                          />
                        </div>
                        {errors.email ? (
                          <div className={styles["err"]}>{errors.email}</div>
                        ) : null}
                      </div>

                      <div>
                        <label htmlFor={phoneId} className={styles["label"]}>
                          Mobile <span className={styles["req"]}>*</span>
                        </label>
                        <div className={styles["fld"]}>
                          <Phone
                            size={14}
                            strokeWidth={1.7}
                            className={styles["fieldIcon"]}
                            aria-hidden="true"
                          />
                          <input
                            ref={phoneRef}
                            id={phoneId}
                            type="tel"
                            autoComplete="tel"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (errors.phone)
                                setErrors((prev) => ({ ...prev, phone: undefined }));
                            }}
                            className={`${styles["input"]} ${styles["inputWithIcon"]} ${
                              errors.phone ? styles["badControl"] : ""
                            }`}
                          />
                        </div>
                        {errors.phone ? (
                          <div className={styles["err"]}>{errors.phone}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className={styles["row"]}>
                      <div>
                        <div className={styles["label"]}>
                          Estimated quantity{" "}
                          <span className={styles["req"]}>*</span>
                        </div>
                        <div
                          className={styles["chips"]}
                          role="radiogroup"
                          aria-label="Estimated quantity"
                        >
                          {quantityOptions.map((opt) => {
                            const selected = quantity === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                role="radio"
                                aria-checked={selected}
                                onClick={() => setQuantity(opt)}
                                className={`${styles["chip"]} ${
                                  selected ? styles["chipSelected"] : ""
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <div className={styles["label"]}>
                          Budget range per gift{" "}
                          <span className={styles["req"]}>*</span>
                        </div>
                        <div ref={budgetWrapRef} className={styles["dd"]}>
                          <button
                            ref={budgetBtnRef}
                            type="button"
                            aria-label="Budget range per gift"
                            aria-haspopup="listbox"
                            aria-expanded={isBudgetOpen}
                            aria-controls={budgetListId}
                            onClick={() => setIsBudgetOpen((open) => !open)}
                            className={`${styles["ddBtn"]} ${
                              !budget ? styles["ddBtnPlaceholder"] : ""
                            } ${errors.budget ? styles["badControl"] : ""}`}
                          >
                            <span>{budget || "Select a budget range"}</span>
                            <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                          {isBudgetOpen ? (
                            <ul
                              id={budgetListId}
                              role="listbox"
                              className={styles["ddList"]}
                            >
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
                                      if (errors.budget) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          budget: undefined,
                                        }));
                                      }
                                    }}
                                    className={`${styles["ddOption"]} ${
                                      selected ? styles["ddOptionSelected"] : ""
                                    }`}
                                  >
                                    {opt}
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                        </div>
                        {errors.budget ? (
                          <div className={styles["err"]}>{errors.budget}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className={`${styles["row"]} ${styles["rowOne"]}`}>
                      <div>
                        <label htmlFor={reqId} className={styles["label"]}>
                          Occasion / requirements{" "}
                          <span className={styles["req"]}>*</span>
                        </label>
                        <textarea
                          ref={reqRef}
                          id={reqId}
                          placeholder={requirementsPlaceholder}
                          value={requirements}
                          onChange={(e) => {
                            setRequirements(e.target.value);
                            if (errors.req)
                              setErrors((prev) => ({ ...prev, req: undefined }));
                          }}
                          className={`${styles["textarea"]} ${
                            errors.req ? styles["badControl"] : ""
                          }`}
                        />
                        {errors.req ? (
                          <div className={styles["err"]}>{errors.req}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className={styles["radios"]}>
                      <span
                        className={`${styles["label"]} ${styles["radiosLabel"]}`}
                      >
                        Delivery locations{" "}
                        <span className={styles["req"]}>*</span>
                      </span>
                      {deliveryLocations.map((loc) => (
                        <label key={loc.value} className={styles["radioItem"]}>
                          <input
                            type="radio"
                            name="deliveryLocation"
                            value={loc.value}
                            checked={deliveryLocation === loc.value}
                            onChange={() => setDeliveryLocation(loc.value)}
                            className={styles["radioInput"]}
                          />
                          <span>{loc.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className={`${styles["row"]} ${styles["rowOne"]}`}>
                      <div>
                        <label htmlFor={fileInputId} className={styles["label"]}>
                          {upload.label}{" "}
                          <em className={styles["labelOptional"]}>
                            {upload.optionalTag}
                          </em>
                        </label>
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label="Upload a file"
                          onClick={() => fileInputRef.current?.click()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              fileInputRef.current?.click();
                            }
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragOver(true);
                          }}
                          onDragLeave={() => setIsDragOver(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDragOver(false);
                            handleFileSelection(e.dataTransfer.files[0]);
                          }}
                          className={`${styles["drop"]} ${
                            isDragOver ? styles["dropOver"] : ""
                          } ${fileError ? styles["badControl"] : ""}`}
                        >
                          <CloudUpload
                            size={22}
                            strokeWidth={1.6}
                            className="text-[#1f3a28]"
                            aria-hidden="true"
                          />
                          <p className={styles["dropText"]}>
                            {upload.dragPrompt}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                              className={styles["browseBtn"]}
                            >
                              {upload.browseLabel}
                            </button>
                          </p>
                          <small className={styles["dropHint"]}>
                            {upload.hint}
                          </small>
                        </div>

                        <input
                          ref={fileInputRef}
                          id={fileInputId}
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg,.zip"
                          hidden
                          onChange={(e) =>
                            handleFileSelection(e.target.files?.[0])
                          }
                        />

                        {uploadedFile ? (
                          <div className={styles["fileBar"]}>
                            <span>
                              {uploadedFile.name} (
                              {Math.max(1, Math.round(uploadedFile.size / 1024))}{" "}
                              KB)
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setUploadedFile(null);
                                if (fileInputRef.current)
                                  fileInputRef.current.value = "";
                              }}
                              className={styles["fileRemove"]}
                            >
                              Remove
                            </button>
                          </div>
                        ) : null}

                        {fileError ? (
                          <div className={styles["err"]}>{fileError}</div>
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
                        <span className={styles["consentText"]}>
                          {consentText}{" "}
                          <span className={styles["req"]}>*</span>
                        </span>
                      </label>
                      {errors.consent ? (
                        <div className={styles["err"]}>{errors.consent}</div>
                      ) : null}
                    </div>

                    <button type="submit" className={styles["submitBtn"]}>
                      <span>{submitLabel}</span>
                      <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                    <p className={styles["caption"]}>{caption}</p>
                  </form>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
