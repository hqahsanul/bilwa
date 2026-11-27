"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Landmark,
  Lock,
  MapPin,
  Pencil,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CHECKOUT_PAYMENT_PENDING_PATH } from "@/lib/bilva-collection-routes";
import {
  CHECKOUT_REVIEW_DATA,
  type CheckoutPaymentMethod,
} from "@/data/bilva/checkout-review";
import styles from "./bilva-checkout-review-page.module.css";
import { USE_CASE_PAN_REVIEW } from "@/data/bilva/use-cases";
import {
  BilvaPanReviewBlock,
  BilvaRatesBanner,
} from "@/components/bilva/use-cases/bilva-use-case-states";
import { isValidPan } from "@/data/bilva/use-cases";

function PaymentMethodIcon({ id }: { id: CheckoutPaymentMethod["id"] }) {
  switch (id) {
    case "upi":
      return <Smartphone size={18} strokeWidth={1.7} />;
    case "netbanking":
      return <Landmark size={18} strokeWidth={1.7} />;
    case "card":
      return <CreditCard size={18} strokeWidth={1.7} />;
  }
}

export function BilvaCheckoutReviewPage() {
  const {
    steps,
    heading,
    subtitle,
    verifiedBadge,
    deliveryAddress,
    items,
    paymentSectionTitle,
    paymentMethods,
    securityNote,
    termsPrefix,
    termsLinkLabel,
    termsHref,
    termsRequiredError,
    payButtonLabel,
    redirectNote,
    summary,
  } = CHECKOUT_REVIEW_DATA;

  const router = useRouter();
  const headingId = useId();
  const termsId = useId();
  const termsErrorId = useId();
  const termsInputRef = useRef<HTMLInputElement>(null);

  const [selectedMethod, setSelectedMethod] =
    useState<CheckoutPaymentMethod["id"]>("upi");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [panValue, setPanValue] = useState("ABCDE1234");
  const [panError, setPanError] = useState<string | null>(USE_CASE_PAN_REVIEW.error);
  const [panMasked, setPanMasked] = useState(false);

  const handlePanContinue = () => {
    if (!isValidPan(panValue)) {
      setPanError(USE_CASE_PAN_REVIEW.error);
      return;
    }
    setPanError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidPan(panValue)) {
      setPanError(USE_CASE_PAN_REVIEW.error);
      return;
    }
    setPanError(null);
    if (!termsAccepted) {
      setShowTermsError(true);
      termsInputRef.current?.focus();
      return;
    }
    setShowTermsError(false);
    setIsSubmitting(true);
    router.push(CHECKOUT_PAYMENT_PENDING_PATH);
  };

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Checkout progress stepper */}
        <nav className={styles["steps"]} aria-label="Checkout progress">
          {steps.map((step, index) => {
            const isActive = step.state === "done" || step.state === "current";
            const isLast = index === steps.length - 1;
            return (
              <div key={step.id} className="contents">
                <div
                  className={styles["step"]}
                  aria-current={step.state === "current" ? "step" : undefined}
                >
                  <span
                    className={`${styles["dot"]} ${isActive ? styles["dotActive"] : ""}`}
                    aria-hidden="true"
                  >
                    {step.state === "done" ? (
                      <Check size={14} strokeWidth={2.6} />
                    ) : (
                      step.number
                    )}
                  </span>
                  <div>
                    <span className={styles["stepTitle"]}>{step.label}</span>
                    <small className={styles["stepSub"]}>{step.statusText}</small>
                  </div>
                </div>
                {!isLast && (
                  <span
                    className={`${styles["stepLine"]} ${
                      step.state === "current" ? styles["stepLineFaint"] : ""
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles["grid"]}>
          {/* Left column: order review and payment selection */}
          <form onSubmit={handleSubmit} aria-labelledby={headingId} noValidate>
            <h1 id={headingId} className={styles["heading"]}>
              {heading}
            </h1>
            <p className={styles["sub"]}>{subtitle}</p>

            <div className={styles["verifiedWrap"]}>
              <span className={styles["pill"]}>
                <CheckCircle2 size={15} strokeWidth={2} aria-hidden="true" />
                {verifiedBadge}
              </span>
            </div>

            {/* Delivery address */}
            <section
              className={`${styles["card"]} ${styles["deliver"]}`}
              aria-label="Delivery address"
            >
              <span className={styles["pin"]} aria-hidden="true">
                <MapPin size={18} strokeWidth={1.8} />
              </span>
              <span className={styles["deliverLabel"]}>
                {deliveryAddress.label}
              </span>
              <span className={styles["sepVertical"]} aria-hidden="true" />
              <div className={styles["who"]}>
                <strong className={styles["whoName"]}>
                  {deliveryAddress.recipient}
                </strong>
                {deliveryAddress.cityPin}
                <br />
                {deliveryAddress.phone}
              </div>
              <Link href={deliveryAddress.editHref} className={styles["editLink"]}>
                <Pencil size={14} strokeWidth={1.8} aria-hidden="true" />
                {deliveryAddress.editLabel}
              </Link>
            </section>

            {/* Items */}
            <section
              className={`${styles["card"]} ${styles["itemsCard"]}`}
              aria-label="Order items"
            >
              {items.map((item) => (
                <div key={item.id} className={styles["itemRow"]}>
                  <div className={styles["thumbWrap"]}>
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="104px"
                      className="object-cover"
                    />
                  </div>
                  <div className={styles["itemInfo"]}>
                    <strong className={styles["itemTitle"]}>{item.title}</strong>
                    <span className={styles["itemMeta"]}>
                      {item.purity}
                      <em className={styles["itemDivider"]}>|</em>
                      {item.qtyLabel}
                    </span>
                  </div>
                  <div className={styles["itemPrice"]}>{item.priceFormatted}</div>
                </div>
              ))}
            </section>

            <BilvaPanReviewBlock
              panValue={panValue}
              error={panError}
              showMasked={panMasked}
              onChange={(value) => {
                setPanValue(value);
                if (panError && value.length === 10 && isValidPan(value)) {
                  setPanError(null);
                }
              }}
              onContinue={handlePanContinue}
              onToggleMasked={() => setPanMasked((m) => !m)}
            />

            <div className={styles["ratesBannerWrap"]}>
              <BilvaRatesBanner />
            </div>

            {/* Payment method */}
            <fieldset className={styles["pmFieldset"]}>
              <legend className={styles["pmLegend"]}>
                {paymentSectionTitle}
              </legend>
              <div className={`${styles["card"]} ${styles["methods"]}`}>
                {paymentMethods.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`${styles["methodRow"]} ${
                        isSelected ? styles["methodRowSelected"] : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={isSelected}
                        onChange={() => setSelectedMethod(method.id)}
                        className={styles["radioInput"]}
                      />
                      <span className={styles["methodIcon"]} aria-hidden="true">
                        <PaymentMethodIcon id={method.id} />
                      </span>
                      <div>
                        <span className={styles["methodTitle"]}>
                          {method.label}
                        </span>
                        <span className={styles["methodDesc"]}>
                          {method.description}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles["secureNote"]}>
              <Lock size={12} strokeWidth={2} aria-hidden="true" />
              <span>{securityNote}</span>
            </div>

            <label htmlFor={termsId} className={styles["termsLabel"]}>
              <input
                ref={termsInputRef}
                id={termsId}
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                aria-invalid={showTermsError || undefined}
                aria-describedby={showTermsError ? termsErrorId : undefined}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (e.target.checked) setShowTermsError(false);
                }}
                className={styles["checkboxInput"]}
                required
              />
              <span>
                {termsPrefix}{" "}
                <Link href={termsHref} className={styles["termsLink"]}>
                  {termsLinkLabel}
                </Link>
                .
              </span>
            </label>

            {showTermsError ? (
              <p
                id={termsErrorId}
                className={styles["termsError"]}
                role="alert"
                aria-live="polite"
              >
                {termsRequiredError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles["payBtn"]}
            >
              {payButtonLabel}
            </button>
            <p className={styles["redirNote"]}>{redirectNote}</p>
          </form>

          {/* Right column: Final price review */}
          <aside className={styles["aside"]} aria-label="Final price review">
            <div className={styles["panel"]}>
              <div className={styles["panelBody"]}>
                <h2 className={styles["panelTitle"]}>{summary.title}</h2>

                {summary.rows.map((row) => (
                  <div key={row.id} className={styles["summaryRow"]}>
                    <span className={styles["summaryLabelWrap"]}>
                      {row.hasShield ? (
                        <ShieldCheck
                          size={17}
                          strokeWidth={1.9}
                          className="shrink-0 text-[#17402b]"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span>{row.label}</span>
                    </span>
                    <span
                      className={
                        row.isMutedValue
                          ? styles["summaryMutedValue"]
                          : styles["summaryValue"]
                      }
                    >
                      {row.value}
                    </span>
                  </div>
                ))}

                <div className={styles["totalRow"]}>
                  <span className={styles["totalLabel"]}>
                    {summary.totalLabel}
                  </span>
                  <span className={styles["totalAmount"]}>
                    {summary.totalValue}
                  </span>
                </div>

                <p className={styles["panelNote"]}>{summary.illustrativeNote}</p>

                <div className={styles["confirmedCard"]}>
                  <Clock
                    size={28}
                    strokeWidth={1.7}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <strong className={styles["confirmedTitle"]}>
                      {summary.priceConfirmedTitle}
                    </strong>
                    <span className={styles["confirmedSub"]}>
                      {summary.priceConfirmedSubtitle}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles["insuranceFooter"]}>
                <ShieldCheck
                  size={28}
                  strokeWidth={1.7}
                  className="shrink-0"
                  aria-hidden="true"
                />
                <span className={styles["insuranceSep"]} aria-hidden="true" />
                <span>{summary.insuranceFooter}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
