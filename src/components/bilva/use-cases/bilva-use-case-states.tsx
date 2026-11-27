"use client";

import Link from "next/link";
import {
  AlertCircle,
  Info,
  Lock,
  Loader2,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import {
  USE_CASE_BAG_ATTENTION,
  USE_CASE_CHOOSE_ADDRESS,
  USE_CASE_DELIVERY_PIN,
  USE_CASE_EMPTY_BAG,
  USE_CASE_INSURED_BANNER,
  USE_CASE_PAN_REVIEW,
  USE_CASE_PAYMENT_PENDING_CARD,
  USE_CASE_PAYMENT_UNSUCCESSFUL,
  USE_CASE_RATES_BANNER,
  type SavedAddressOption,
} from "@/data/bilva/use-cases";
import styles from "./bilva-use-case-states.module.css";

const s = styles;

export function BilvaEmptyBagState() {
  const copy = USE_CASE_EMPTY_BAG;
  return (
    <div className={`${s["root"]} ${s["card"]} ${s["emptyState"]}`}>
      <div className={s["emptyIcon"]} aria-hidden="true">
        <ShoppingBag size={28} strokeWidth={1.6} />
      </div>
      <h2 className={s["serifTitle"]}>{copy.title}</h2>
      <p className={s["body"]}>{copy.body}</p>
      <div className={`${s["btnRow"]} justify-center`}>
        <Link href={copy.primaryHref} className={s["btnPrimary"]}>
          {copy.primaryCta}
        </Link>
        <Link href={copy.secondaryHref} className={s["btnSecondary"]}>
          {copy.secondaryCta}
        </Link>
      </div>
    </div>
  );
}

type PaymentUnsuccessfulProps = {
  onCheckStatus?: () => void;
};

export function BilvaPaymentUnsuccessfulCard({
  onCheckStatus,
}: PaymentUnsuccessfulProps) {
  const copy = USE_CASE_PAYMENT_UNSUCCESSFUL;
  return (
    <div className={`${s["root"]} ${s["card"]}`}>
      <h2 className={s["serifTitle"]}>{copy.title}</h2>
      <p className={s["body"]}>{copy.body}</p>
      <NoteText className={s["notice"]}>{copy.notice}</NoteText>
      <div className={s["btnRow"]}>
        <button type="button" className={s["btnPrimary"]} onClick={onCheckStatus}>
          {copy.primaryCta}
        </button>
        <Link href={copy.secondaryHref} className={s["btnSecondary"]}>
          {copy.secondaryCta}
        </Link>
      </div>
    </div>
  );
}

function NoteText({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={className} role="note">
      {children}
    </p>
  );
}

type BagAttentionProps = {
  onReviewTotal?: () => void;
};

export function BilvaBagAttentionCard({ onReviewTotal }: BagAttentionProps) {
  const copy = USE_CASE_BAG_ATTENTION;
  return (
    <div className={`${s["root"]} ${s["cardSage"]}`}>
      <h2 className={s["serifTitle"]}>{copy.title}</h2>
      <p className={s["body"]}>{copy.subtitle}</p>
      <ul className={s["alertList"]}>
        {copy.alerts.map((alert) => (
          <li key={alert.id} className={s["alertItem"]}>
            <AlertCircle size={16} className="shrink-0 text-[#a67c44]" aria-hidden />
            <div>
              <span className={s["alertLabel"]}>{alert.label}</span>
              <span className={s["alertDetail"]}>{alert.detail}</span>
            </div>
          </li>
        ))}
      </ul>
      <NoteText className={s["note"]}>{copy.note}</NoteText>
      <div className={s["btnRow"]}>
        <button type="button" className={s["btnPrimary"]} onClick={onReviewTotal}>
          {copy.primaryCta}
        </button>
      </div>
    </div>
  );
}

export function BilvaRatesBanner() {
  return (
    <div className={`${s["root"]} ${s["bannerRates"]}`} role="note">
      <Info size={17} className={s["bannerIcon"]} aria-hidden="true" />
      <span>{USE_CASE_RATES_BANNER.text}</span>
    </div>
  );
}

export function BilvaInsuredBanner() {
  return (
    <div className={`${s["root"]} ${s["bannerInsured"]}`} role="note">
      <ShieldCheck size={18} className={s["bannerIcon"]} aria-hidden="true" />
      <span>{USE_CASE_INSURED_BANNER.text}</span>
    </div>
  );
}

type ChooseAddressListProps = {
  addresses: SavedAddressOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
};

export function BilvaChooseAddressList({
  addresses,
  selectedId,
  onSelect,
  onAddNew,
}: ChooseAddressListProps) {
  const copy = USE_CASE_CHOOSE_ADDRESS;
  return (
    <div className={`${s["root"]} ${s["card"]}`}>
      <h2 className={s["serifTitle"]}>{copy.title}</h2>
      <p className={s["body"]}>{copy.subtitle}</p>
      <ul className={s["addressList"]} role="listbox" aria-label={copy.title}>
        {addresses.map((addr) => {
          const selected = selectedId === addr.id;
          return (
            <li key={addr.id}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                className={`${s["addressOption"]} ${
                  selected ? s["addressOptionSelected"] : ""
                }`}
                onClick={() => onSelect(addr.id)}
              >
                <span className={s["addressLabel"]}>{addr.label}</span>
                <p className={s["addressLines"]}>
                  {addr.lines.join(" · ")} · {addr.pin}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className={s["addNewBtn"]} onClick={onAddNew}>
        {copy.addNewLabel}
      </button>
    </div>
  );
}

type PanReviewBlockProps = {
  panValue: string;
  error?: string | null;
  onChange: (value: string) => void;
  onContinue: () => void;
  showMasked: boolean;
  onToggleMasked: () => void;
};

export function BilvaPanReviewBlock({
  panValue,
  error,
  onChange,
  onContinue,
  showMasked,
  onToggleMasked,
}: PanReviewBlockProps) {
  const copy = USE_CASE_PAN_REVIEW;
  return (
    <div className={`${s["root"]} ${s["card"]}`}>
      <h2 className={s["serifTitle"]}>{copy.title}</h2>
      <p className={s["body"]}>{copy.subtitle}</p>
      <div className={s["panField"]}>
        <label className={s["panLabel"]} htmlFor="bilva-pan-input">
          {copy.panLabel}
        </label>
        <div className={s["panInputWrap"]}>
          <input
            id="bilva-pan-input"
            type={showMasked ? "password" : "text"}
            maxLength={10}
            value={panValue}
            onChange={(e) => {
              onChange(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase());
            }}
            placeholder={copy.panPlaceholder}
            className={error ? s["panInputError"] : s["panInput"]}
            aria-invalid={error ? true : undefined}
            autoComplete="off"
          />
          <button type="button" className={s["maskToggle"]} onClick={onToggleMasked}>
            {showMasked ? copy.hideMaskedLabel : copy.showMaskedLabel}
          </button>
        </div>
        {error ? (
          <p className={s["errorText"]} role="alert">
            {error}
          </p>
        ) : null}
      </div>
      <p className={s["lockNote"]}>
        <Lock size={13} aria-hidden="true" className="shrink-0" />
        <span>{copy.lockNote}</span>
      </p>
      <div className={s["btnRow"]}>
        <button type="button" className={s["btnPrimary"]} onClick={onContinue}>
          {copy.continueCta}
        </button>
      </div>
    </div>
  );
}

type DeliveryPinErrorProps = {
  message?: string;
  visible?: boolean;
  onTryAnother?: () => void;
};

export function BilvaDeliveryPinError({
  message = USE_CASE_DELIVERY_PIN.error,
  visible = true,
  onTryAnother,
}: DeliveryPinErrorProps) {
  if (!visible) return null;
  return (
    <div className={`${s["root"]} ${s["pinErrorWrap"]}`}>
      <p className={s["errorText"]} role="alert">
        {message}
      </p>
      <p className={s["body"]} style={{ marginTop: "0.35rem", fontSize: "0.8125rem" }}>
        <button type="button" className={s["linkQuiet"]} onClick={onTryAnother}>
          {USE_CASE_DELIVERY_PIN.tryAnother}
        </button>
        {" · "}
        <Link href={USE_CASE_DELIVERY_PIN.askBilwaHref} className={s["linkQuiet"]}>
          {USE_CASE_DELIVERY_PIN.askBilwa}
        </Link>
      </p>
    </div>
  );
}

type PaymentPendingCardProps = {
  onCheckStatus?: () => void;
  isChecking?: boolean;
};

export function BilvaPaymentPendingStatusCard({
  onCheckStatus,
  isChecking = false,
}: PaymentPendingCardProps) {
  const copy = USE_CASE_PAYMENT_PENDING_CARD;
  return (
    <div className={`${s["root"]} ${s["cardSage"]}`}>
      <h2 className={s["serifTitle"]}>{copy.title}</h2>
      <p className={s["body"]}>{copy.subtitle}</p>
      <span className={s["pendingStatus"]}>
        {isChecking ? (
          <Loader2 size={14} className="animate-spin" aria-hidden />
        ) : null}
        {copy.status}
      </span>
      <div className={s["btnRow"]}>
        <button
          type="button"
          className={s["btnPrimary"]}
          disabled={isChecking}
          onClick={onCheckStatus}
        >
          {copy.checkStatus}
        </button>
        <Link href={copy.contactSupportHref} className={s["btnSecondary"]}>
          {copy.contactSupport}
        </Link>
      </div>
    </div>
  );
}