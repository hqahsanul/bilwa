"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Info, Mail, ShieldCheck, Smartphone } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { CHECKOUT_DATA } from "@/data/bilva/checkout";

const COUNTRY_CODES = ["+91", "+1", "+44", "+971", "+65"];

export function BilvaCheckoutPage() {
  const { steps, title, mobileOtp, guest, guestNote, bag, insuredBanner, resendNote } = CHECKOUT_DATA;
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState(mobileOtp.defaultPhone);
  const [countryCode, setCountryCode] = useState(mobileOtp.defaultCountryCode);
  const [countryOpen, setCountryOpen] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", ""]);
  const [guestEmail, setGuestEmail] = useState("");
  const [resendStatus, setResendStatus] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  function setOtpDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    if (!digit && value !== "") return;
    setOtpDigits((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)));
    if (digit && index < otpDigits.length - 1) otpRefs.current[index + 1]?.focus();
  }

  function continueToDelivery(event: React.FormEvent) {
    event.preventDefault();
    router.push("/checkout/delivery");
  }

  return (
    <section className="w-full bg-[#F6F1E8] pb-10">
      <div className={`${BILVA_SITE_SHELL_CLASS} pt-5`}>
        <div className="flex flex-col items-center">
          <Link href="/" aria-label="Bilwa home" className="inline-flex">
            <Image src="/images/bilva/checkout/bilwa-checkout-logo.png" alt="" width={163} height={94} className="h-14 w-auto" />
          </Link>

          <ol className="relative mx-auto mt-5 flex w-full max-w-[28rem] justify-between">
            <span className="absolute top-[11px] right-6 left-6 h-px bg-[#D5D0C4]" aria-hidden />
            {steps.map((step) => {
              const current = step.number === 1;
              return (
                <li key={step.id} className="relative flex w-14 flex-col items-center">
                  <span
                    className={`z-[1] flex h-6 w-6 items-center justify-center rounded-full font-sans text-[12px] font-semibold ${
                      current ? "bg-[#143028] text-white" : "border border-[#C9C3B6] bg-[#F6F1E8] text-[#6A736C]"
                    }`}
                    aria-current={current ? "step" : undefined}
                  >
                    {step.number}
                  </span>
                  <span className={`mt-1.5 text-center font-sans text-[12px] ${current ? "font-semibold text-[#143028]" : "font-medium text-[#8A8478]"}`}>
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_20.75rem] lg:gap-x-4">
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="font-serif text-[1.7rem] font-medium leading-tight text-[#1A3C32] sm:text-[1.9rem]">{title}</h1>

            <div className="mt-3.5 grid items-stretch gap-3 md:grid-cols-2">
              <article className="flex flex-col rounded-[12px] border border-[#D5DECE] bg-[#E6EDD8] p-4">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[#D3DCCB] bg-[#F7F4EE] text-[#143028]">
                    <Smartphone size={16} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h2 className="font-serif text-[16px] font-semibold leading-tight text-[#143028]">{mobileOtp.title}</h2>
                    <p className="mt-0.5 font-sans text-[12px] font-medium leading-snug text-[#5C6B62]">{mobileOtp.subtitle}</p>
                  </div>
                </div>

                <form className="mt-3.5 flex flex-1 flex-col" onSubmit={continueToDelivery}>
                  <label className="font-sans text-[12.5px] font-semibold text-[#143028]" htmlFor="checkout-phone">
                    {mobileOtp.mobileLabel}
                  </label>
                  <div className="mt-1 flex h-10 rounded-[8px] border border-[#E4DDD2] bg-white focus-within:border-[#143028]">
                    <div className="relative">
                      <button
                        type="button"
                        aria-expanded={countryOpen}
                        aria-label="Country code"
                        onClick={() => setCountryOpen((open) => !open)}
                        className="flex h-10 cursor-pointer items-center gap-1 border-r border-[#E4DDD2] px-2.5 font-sans text-[13px] font-medium text-[#143028]"
                      >
                        {countryCode}
                        <ChevronDown size={14} />
                      </button>
                      {countryOpen ? (
                        <div className="absolute left-0 top-full z-20 mt-1 w-24 rounded-[8px] border border-[#E4DDD2] bg-white py-1 shadow-sm">
                          {COUNTRY_CODES.map((code) => (
                            <button
                              key={code}
                              type="button"
                              onClick={() => {
                                setCountryCode(code);
                                setCountryOpen(false);
                              }}
                              className="block w-full cursor-pointer px-3 py-1.5 text-left font-sans text-[13px] font-medium text-[#143028] hover:bg-[#F6F1E8]"
                            >
                              {code}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="h-10 min-w-0 flex-1 rounded-r-[8px] bg-transparent px-3 font-sans text-[13.5px] font-medium text-[#143028] outline-none"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <label className="font-sans text-[12.5px] font-semibold text-[#143028]">{mobileOtp.otpLabel}</label>
                    <button
                      type="button"
                      onClick={() => setResendStatus(resendNote)}
                      className="cursor-pointer font-sans text-[12px] font-medium text-[#143028] underline underline-offset-2"
                    >
                      {mobileOtp.resendLabel}
                    </button>
                  </div>
                  <div className="mt-1 flex gap-1.5">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(node) => {
                          otpRefs.current[index] = node;
                        }}
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        aria-label={`OTP digit ${index + 1}`}
                        onChange={(event) => setOtpDigit(index, event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Backspace" && !otpDigits[index] && index > 0) otpRefs.current[index - 1]?.focus();
                        }}
                        className="h-9 w-9 rounded-[6px] border border-[#E4DDD2] bg-white text-center font-sans text-[14px] font-semibold text-[#143028] outline-none focus:border-[#143028]"
                      />
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <button type="submit" className="flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-[#1A3324] font-sans text-[13.5px] font-semibold text-white">
                      {mobileOtp.cta}
                      <ArrowRight size={14} />
                    </button>
                    {resendStatus ? <p className="mt-1.5 font-sans text-[12px] font-medium text-[#3E4E46]">{resendStatus}</p> : null}
                  </div>
                </form>
              </article>

              <article className="flex flex-col rounded-[12px] border border-[#D5DECE] bg-[#E6EDD8] p-4">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[#D3DCCB] bg-[#F7F4EE] text-[#143028]">
                    <Mail size={16} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h2 className="font-serif text-[16px] font-semibold leading-tight text-[#143028]">{guest.title}</h2>
                    <p className="mt-0.5 font-sans text-[12px] font-medium leading-snug text-[#5C6B62]">{guest.subtitle}</p>
                  </div>
                </div>

                <form className="mt-3.5 flex flex-1 flex-col" onSubmit={continueToDelivery}>
                  <label className="font-sans text-[12.5px] font-semibold text-[#143028]" htmlFor="checkout-email">
                    {guest.emailLabel}
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(event) => setGuestEmail(event.target.value)}
                    placeholder={guest.placeholder}
                    className="mt-1 h-10 w-full rounded-[8px] border border-[#E4DDD2] bg-white px-3 font-sans text-[13.5px] font-medium text-[#143028] outline-none placeholder:text-[#8A8478] focus:border-[#143028]"
                  />
                  <div className="mt-auto pt-4">
                    <button type="submit" className="flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[8px] bg-[#1A3324] font-sans text-[13.5px] font-semibold text-white">
                      {guest.cta}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              </article>
            </div>

          </div>

          <p className="flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-[#3E4E46] lg:col-start-1 lg:row-start-2">
            <Info size={14} className="shrink-0" />
            {guestNote}
          </p>

          <aside className="flex h-full flex-col overflow-hidden rounded-[14px] border border-[#D5DECE] bg-[#E7EFE4] lg:col-start-2 lg:row-start-1">
            <div className="flex flex-1 flex-col px-4 pt-4">
              <h2 className="font-serif text-[1.45rem] font-semibold leading-none text-[#1A3C32]">{bag.title}</h2>
              <ul className="mt-3">
                {bag.items.map((item, index) => (
                  <li key={item.id} className="flex items-center gap-3 border-t border-[#D3DCC8] py-3 first:border-t-0">
                    <div className={`relative shrink-0 ${index === 0 ? "h-[4.25rem] w-[4.25rem] overflow-hidden rounded-full" : "h-14 w-11"}`}>
                      <Image src={item.imageSrc} alt={item.imageAlt} fill sizes="68px" className="object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-[14px] font-medium leading-snug text-[#1A3C32]">{item.title}</h3>
                      <p className="text-right font-serif text-[15px] font-semibold text-[#1A3C32]">{item.formattedPrice}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex items-center justify-between bg-[#D7E4CC] px-4 py-3">
              <p className="font-serif text-[1.2rem] font-semibold text-[#1A3C32]">{bag.totalLabel}</p>
              <p className="font-serif text-[1.25rem] font-bold text-[#1A3C32]">{bag.formattedTotal}</p>
            </div>
          </aside>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2.5 rounded-[8px] bg-[#E3EDD6] px-4 py-2.5">
          <ShieldCheck size={16} className="shrink-0 text-[#143028]" />
          <span className="h-3.5 w-px shrink-0 bg-[#C5D0BE]" aria-hidden />
          <p className="font-sans text-[13.5px] font-semibold text-[#143028]">{insuredBanner.text}</p>
        </div>
      </div>
    </section>
  );
}
