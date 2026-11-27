"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Smartphone,
  Check,
  User,
  MapPin,
  Home,
  Building2,
  Building,
  Map,
  ChevronDown,
  ShieldCheck,
  Info,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { BAG_PATH, CHECKOUT_REVIEW_PATH, LOGIN_PATH } from "@/lib/bilva-collection-routes";
import { CHECKOUT_DELIVERY_DATA } from "@/data/bilva/checkout-delivery";
import {
  DEMO_UNSERVICEABLE_PIN,
  USE_CASE_SAVED_ADDRESSES,
} from "@/data/bilva/use-cases";
import {
  BilvaChooseAddressList,
  BilvaDeliveryPinError,
} from "@/components/bilva/use-cases/bilva-use-case-states";

export function BilvaCheckoutDeliveryPage() {
  const {
    steps,
    title,
    subtitle,
    alreadyAccount,
    signIn,
    contact,
    delivery,
    indianStates,
    summary,
    returnToBag,
    continueToReview,
  } = CHECKOUT_DELIVERY_DATA;

  // Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(contact.defaultPhone);
  const [countryCode, setCountryCode] = useState(contact.defaultCountryCode);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [sendUpdates, setSendUpdates] = useState(true);

  const [fullName, setFullName] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [landmark, setLandmark] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [billingSame, setBillingSame] = useState(true);

  const router = useRouter();
  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    USE_CASE_SAVED_ADDRESSES[0]?.id ?? null,
  );
  const [pinServiceError, setPinServiceError] = useState(false);

  const verifyPincode = (value: string) => {
    const unserviceable =
      value.length === 6 && value === DEMO_UNSERVICEABLE_PIN;
    setPinServiceError(unserviceable);
    return !unserviceable;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyPincode(pincode)) return;
    setCurrentStep(2);
    router.push(CHECKOUT_REVIEW_PATH);
  };

  return (
    <div className="flex-1 w-full bg-[#FAF7F2] select-none pb-16">
      {/* ============================================================= */}
      {/* TOP HEADER: Brand + Secure Checkout + 3-Step Stepper           */}
      {/* ============================================================= */}
      <header className="w-full bg-[#FAF7F2] border-b border-[#EAE4D8] py-4 sm:py-5">
        <div className={`${BILVA_SITE_SHELL_CLASS} flex flex-wrap items-center justify-between gap-4`}>
          {/* Left: Bilwa Brand & Secure Checkout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2 group cursor-pointer" aria-label="Bilwa Home">
              {/* Bilwa Branch / Leaves Icon */}
              <svg
                width="34"
                height="28"
                viewBox="0 0 44 34"
                fill="none"
                className="transition-transform duration-300 group-hover:scale-105"
                aria-hidden
              >
                <path d="M22 2C20.8 8.5 17.5 14.2 22 21.5C26.5 14.2 23.2 8.5 22 2Z" fill="#13382C" />
                <path d="M21 20.5C14.5 18.2 10.2 13 12.2 6.5C18.8 9.8 19.8 15.2 21 20.5Z" fill="#1F4D3E" />
                <path d="M23 20.5C29.5 18.2 33.8 13 31.8 6.5C25.2 9.8 24.2 15.2 23 20.5Z" fill="#2E6B57" />
              </svg>
              <span className="font-serif text-[22px] sm:text-[24px] tracking-[0.2em] font-medium text-[#13382C]">
                BILWA
              </span>
            </Link>

            <span className="h-5 w-[1px] bg-[#D8D0C2]" aria-hidden />

            <div className="flex items-center gap-1.5 text-[#8B6F3E]">
              <Lock size={15} strokeWidth={1.8} className="text-[#B58E3F]" />
              <span className="font-sans text-[12.5px] sm:text-[13px] font-medium text-[#1E3B30]">
                Secure checkout
              </span>
            </div>
          </div>

          {/* Right: 3-Step Stepper (Details -> Review -> Payment) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {steps.map((step, idx) => {
              const isCurrent = currentStep === step.number;
              const isPassed = currentStep > step.number;
              const isLast = idx === steps.length - 1;

              return (
                <div key={step.number} className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.number)}
                    className="flex items-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center font-sans text-[12px] font-semibold transition-all ${
                        isCurrent || isPassed
                          ? "bg-[#13382C] text-white"
                          : "border border-[#CCD5C5] text-[#5C6B62] bg-transparent"
                      }`}
                    >
                      {isPassed ? <Check size={12} strokeWidth={2.5} /> : step.number}
                    </span>
                    <span
                      className={`font-sans text-[13px] ${
                        isCurrent
                          ? "font-semibold text-[#13382C]"
                          : "font-medium text-[#5C6B62]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>

                  {!isLast && (
                    <span className="h-[1px] w-6 sm:w-10 bg-[#CCD5C5]" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ============================================================= */}
      {/* MAIN CONTENT AREA: Left Form + Right Order Summary            */}
      {/* ============================================================= */}
      <div className={`${BILVA_SITE_SHELL_CLASS} pt-8 sm:pt-10`}>
        {/* Page Title & Account Prompt */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-[clamp(2rem,3.2vw,2.75rem)] font-medium text-[#12352A] leading-tight">
              {title}
            </h1>
            {/* Gold accent bar */}
            <div className="w-10 h-[2.5px] bg-[#C4A66B] mt-2 mb-2" aria-hidden />
            <p className="font-sans text-[14px] text-[#556961]">
              {subtitle}
            </p>
          </div>

          <div className="font-sans text-[13.5px] text-[#556961]">
            <span>{alreadyAccount} </span>
            <Link
              href={LOGIN_PATH}
              className="font-medium text-[#12352A] underline underline-offset-2 hover:text-[#1F6B45] cursor-pointer"
            >
              {signIn}
            </Link>
          </div>
        </div>

        {/* 2-Column Grid */}
        <form onSubmit={handleContinue} className="grid grid-cols-1 lg:grid-cols-[1.58fr_1fr] gap-8 lg:gap-10 items-start">
          {/* =========================================================== */}
          {/* LEFT COLUMN: Contact Card + Delivery Details Card           */}
          {/* =========================================================== */}
          <div className="flex flex-col gap-6">
            <BilvaChooseAddressList
              addresses={USE_CASE_SAVED_ADDRESSES}
              selectedId={selectedAddressId}
              onSelect={setSelectedAddressId}
              onAddNew={() => {
                setSelectedAddressId(null);
              }}
            />
            {/* --------------------------------------------------------- */}
            {/* 1. Contact Card                                           */}
            {/* --------------------------------------------------------- */}
            <div className="rounded-[14px] bg-[#FAF8F3] border border-[#E2DDD2] p-6 sm:p-7 shadow-[0_2px_12px_rgba(20,40,30,0.02)]">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-7 w-7 rounded-[6px] bg-[#E2EDE0] border border-[#CCD8CA] flex items-center justify-center text-[#2C4A3E]">
                  <Mail size={15} strokeWidth={1.8} />
                </div>
                <h2 className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#12352A]">
                  {contact.title}
                </h2>
              </div>

              {/* 2 Fields: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Email Field */}
                <div>
                  <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                    {contact.emailLabel}
                  </label>
                  <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                    <Mail size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={contact.emailPlaceholder}
                      className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                    {contact.phoneLabel}
                  </label>
                  <div className="flex h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] overflow-hidden focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all">
                    {/* Country Code Picker */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCountryOpen(!isCountryOpen)}
                        className="h-full px-3 flex items-center gap-1.5 font-sans text-[13px] font-medium text-[#1E3B30] border-r border-[#DAD5C9] hover:bg-[#F2F0E8] cursor-pointer"
                      >
                        <span>{countryCode}</span>
                        <ChevronDown size={13} className="text-[#5C6B62]" />
                      </button>
                      {isCountryOpen && (
                        <div className="absolute left-0 top-full mt-1 z-30 w-28 rounded-[8px] bg-white border border-[#DAD5C9] shadow-lg py-1 text-[13px] font-sans">
                          {["+91", "+1", "+44", "+971", "+65"].map((code) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => {
                                setCountryCode(code);
                                setIsCountryOpen(false);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-[#F0F5ED] cursor-pointer text-[#1E3B30]"
                            >
                              {code}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="flex-1 h-full px-3 bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Updates Checkbox */}
              <label className="mt-4 flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendUpdates}
                  onChange={(e) => setSendUpdates(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`h-4.5 w-4.5 rounded-[4px] flex items-center justify-center transition-colors ${
                    sendUpdates
                      ? "bg-[#183B2B] text-white"
                      : "border border-[#CAD4C6] bg-white"
                  }`}
                >
                  {sendUpdates && <Check size={12} strokeWidth={3} />}
                </div>
                <span className="font-sans text-[12.5px] text-[#3E4E46]">
                  {contact.updatesCheckbox}
                </span>
              </label>
            </div>

            {/* --------------------------------------------------------- */}
            {/* 2. Delivery Details Card                                  */}
            {/* --------------------------------------------------------- */}
            <div className="rounded-[14px] bg-[#FAF8F3] border border-[#E2DDD2] p-6 sm:p-7 shadow-[0_2px_12px_rgba(20,40,30,0.02)]">
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-7 w-7 rounded-[6px] bg-[#E2EDE0] border border-[#CCD8CA] flex items-center justify-center text-[#2C4A3E]">
                  <MapPin size={15} strokeWidth={1.8} />
                </div>
                <h2 className="font-serif text-[18px] sm:text-[19px] font-semibold text-[#12352A]">
                  {delivery.title}
                </h2>
              </div>

              {/* Fields Grid */}
              <div className="space-y-4">
                {/* Row 1: Full name & PIN code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                      {delivery.fullNameLabel}
                    </label>
                    <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                      <User size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={delivery.fullNamePlaceholder}
                        className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                      {delivery.pincodeLabel}
                    </label>
                    <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                      <MapPin size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => {
                          const next = e.target.value.replace(/\D/g, "");
                          setPincode(next);
                          if (pinServiceError && next !== DEMO_UNSERVICEABLE_PIN) {
                            setPinServiceError(false);
                          }
                        }}
                        onBlur={() => {
                          if (pincode.length === 6) verifyPincode(pincode);
                        }}
                        placeholder={delivery.pincodePlaceholder}
                        aria-invalid={pinServiceError || undefined}
                        className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                      />
                    </div>
                    <BilvaDeliveryPinError
                      visible={pinServiceError}
                      onTryAnother={() => {
                        setPincode("");
                        setPinServiceError(false);
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Address line 1 & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                      {delivery.addressLine1Label}
                    </label>
                    <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                      <Home size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                      <input
                        type="text"
                        required
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder={delivery.addressLine1Placeholder}
                        className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                      {delivery.cityLabel}
                    </label>
                    <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                      <Building2 size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={delivery.cityPlaceholder}
                        className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Address line 2 & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                      {delivery.addressLine2Label}
                    </label>
                    <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                      <Building size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                      <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder={delivery.addressLine2Placeholder}
                        className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                      {delivery.stateLabel}
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsStateOpen(!isStateOpen)}
                      className="flex items-center justify-between h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] px-3.5 font-sans text-[13.5px] text-left hover:bg-[#F2F0E8] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Map size={16} className="text-[#8A978E] shrink-0" />
                        <span className={selectedState ? "text-[#1E3B30]" : "text-[#8A978E]"}>
                          {selectedState || delivery.statePlaceholder}
                        </span>
                      </div>
                      <ChevronDown size={14} className="text-[#5C6B62] shrink-0" />
                    </button>

                    {isStateOpen && (
                      <div className="absolute left-0 top-full mt-1 z-30 max-h-56 w-full overflow-y-auto rounded-[8px] bg-white border border-[#DAD5C9] shadow-lg py-1 text-[13px] font-sans">
                        {indianStates.map((st) => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              setSelectedState(st);
                              setIsStateOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-1.5 hover:bg-[#F0F5ED] cursor-pointer ${
                              selectedState === st
                                ? "font-semibold text-[#13382C] bg-[#EBF2E8]"
                                : "text-[#1E3B30]"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 4: Landmark */}
                <div>
                  <label className="block font-sans text-[12.5px] font-semibold text-[#1E3B30] mb-1.5">
                    {delivery.landmarkLabel}
                  </label>
                  <div className="relative flex items-center h-11 w-full rounded-[8px] bg-[#FAF9F6] border border-[#DAD5C9] focus-within:border-[#13382C] focus-within:ring-1 focus-within:ring-[#13382C] transition-all px-3.5">
                    <MapPin size={16} className="text-[#8A978E] shrink-0 mr-2.5" />
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder={delivery.landmarkPlaceholder}
                      className="flex-1 h-full bg-transparent font-sans text-[13.5px] text-[#1E3B30] placeholder-[#8A978E] outline-none"
                    />
                  </div>
                </div>

                {/* Save Address Checkbox */}
                <label className="pt-2 flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`h-4.5 w-4.5 rounded-[4px] flex items-center justify-center transition-colors ${
                      saveAddress
                        ? "bg-[#183B2B] text-white"
                        : "border border-[#CAD4C6] bg-white"
                    }`}
                  >
                    {saveAddress && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="font-sans text-[12.5px] text-[#3E4E46]">
                    {delivery.saveAddressCheckbox}
                  </span>
                </label>

                {/* Billing Address Toggle Pill */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={billingSame}
                    onClick={() => setBillingSame(!billingSame)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                      billingSame ? "bg-[#183B2B]" : "bg-[#CCD5C5]"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out mt-0.5 ml-0.5 flex items-center justify-center ${
                        billingSame ? "translate-x-5" : "translate-x-0"
                      }`}
                    >
                      {billingSame && <Check size={10} className="text-[#183B2B]" strokeWidth={3} />}
                    </span>
                  </button>
                  <span className="font-sans text-[13px] font-medium text-[#1E3B30]">
                    {delivery.billingSameToggle}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <Link
                href={BAG_PATH}
                className="inline-flex items-center gap-2 font-sans text-[13.5px] font-semibold text-[#1E3B30] hover:text-[#1F6B45] transition-colors"
              >
                <ArrowLeft size={16} />
                <span>{returnToBag}</span>
              </Link>

              <button
                type="submit"
                disabled={pinServiceError}
                className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-[8px] bg-[#183B2B] hover:bg-[#122F22] active:scale-[0.99] text-white font-sans text-[14.5px] font-medium transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{continueToReview}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* =========================================================== */}
          {/* RIGHT COLUMN: Order Summary Card with Leaves Accent         */}
          {/* =========================================================== */}
          <aside className="relative rounded-[16px] bg-[#E7EFE3] border border-[#CFDCD0] p-6 sm:p-7 shadow-[0_4px_24px_rgba(20,40,30,0.03)] overflow-hidden">
            <h2 className="font-serif text-[24px] sm:text-[26px] font-semibold text-[#12352A] mb-5">
              {summary.title}
            </h2>

            {/* Order Items List */}
            <div className="space-y-4">
              {summary.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  {/* Thumbnail in light square */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#FAF8F2] border border-[#CCD8CA] flex items-center justify-center shadow-2xs">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details & Price */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-[15px] font-semibold text-[#12352A] leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 font-sans text-[12px] text-[#556961]">
                          {item.specs}
                        </p>
                        <p className="mt-1 font-sans text-[11.5px] text-[#6A7B72]">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <span className="font-serif text-[16px] sm:text-[17px] font-semibold text-[#12352A] shrink-0">
                        {item.formattedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal & Taxes Breakdown */}
            <div className="mt-6 pt-5 border-t border-[#CCD8CA] space-y-2.5 font-sans text-[13.5px] text-[#3E4E46]">
              <div className="flex justify-between items-center">
                <span>{summary.itemsCountLabel}</span>
                <span className="font-semibold text-[#12352A]">{summary.itemsTotalFormatted}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span>{summary.deliveryLabel}</span>
                <span className="text-[#556961]">{summary.deliveryValue}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span>{summary.taxesLabel}</span>
                <span className="text-[#556961]">{summary.taxesValue}</span>
              </div>
            </div>

            {/* Delivery Insurance Inset Card */}
            <div className="mt-5 rounded-[12px] bg-[#EEF4EC] border border-[#CCD8CA] p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-[#E2EDE0] flex items-center justify-center text-[#2C6B57] shrink-0 mt-0.5">
                  <ShieldCheck size={18} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-[15px] font-semibold text-[#12352A]">
                      {summary.insurance.title}
                    </h4>
                    <span className="font-serif text-[16px] font-semibold text-[#12352A]">
                      {summary.insurance.amountFormatted}
                    </span>
                  </div>
                  <p className="font-sans text-[12px] font-semibold text-[#2C6B57] mt-0.5">
                    {summary.insurance.coveredText}
                  </p>
                  <p className="font-sans text-[11.5px] text-[#556961] mt-1 leading-snug">
                    {summary.insurance.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Row */}
            <div className="mt-6 pt-5 border-t border-[#CCD8CA]">
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-[22px] font-semibold text-[#12352A]">
                  {summary.totalLabel}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-[24px] sm:text-[26px] font-bold text-[#12352A]">
                    {summary.totalFormatted}
                  </span>
                  <span className="font-sans text-[12px] text-[#556961]">
                    {summary.indicativeTag}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[#556961]">
                <Info size={14} className="shrink-0" />
                <span className="font-sans text-[11.5px]">
                  {summary.finalPayableNote}
                </span>
              </div>
            </div>

            {/* Botanical Leaf Watermark Accent (Bottom Right Corner) */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 w-36 h-36 opacity-35 select-none" aria-hidden>
              <Image
                src="/images/bilva/checkout/summary-leaf-accent.png"
                alt=""
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
