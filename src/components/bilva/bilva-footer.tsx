"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Instagram, Facebook, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  FOOTER_ABOUT_LINKS,
  FOOTER_ACCOUNT_LINKS,
  FOOTER_CARE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_PRE_CTA,
  FOOTER_SHOP_LINKS,
} from "@/data/bilva/footer";

export function BilvaFooter({
  showPreFooterCta = true,
  fullBleedEmerald = false,
}: {
  showPreFooterCta?: boolean;
  fullBleedEmerald?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full select-none">
      {showPreFooterCta ? (
      <section className="relative w-full bg-[#FAF7F2] overflow-hidden border-t border-[#EAE3D6] py-14 sm:py-20">
        <div className={BILVA_SITE_SHELL_CLASS}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 z-10">
              {/* Eyebrow with gold horizontal rule */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.2em] text-[#A67C44] uppercase">
                  THE NEXT CHAPTER IS YOURS
                </span>
                <span className="w-14 sm:w-20 h-[1px] bg-[#C5A059]/70 inline-block" />
              </div>

              {/* Headline */}
              <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.08] tracking-[-0.015em] text-[#0A2D23] font-semibold mb-4">
                Find something worth keeping.
              </h2>

              {/* Subheading */}
              <p className="font-sans text-[15px] sm:text-[16.5px] text-[#3D574D] font-normal leading-relaxed max-w-lg mb-8">
                Explore thoughtfully chosen precious pieces and meaningful gifts.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-7 w-full sm:w-auto">
                {/* Primary Emerald Button */}
                <Link
                  href={FOOTER_PRE_CTA.primary.href}
                  className="inline-flex items-center justify-center gap-2 bg-[#025342] hover:bg-[#014134] active:scale-[0.98] text-[#FFFFFF] px-7 py-3.5 rounded-[3px] font-sans font-medium text-[14px] tracking-[0.02em] transition-all shadow-xs hover:shadow-md cursor-pointer w-full sm:w-auto"
                >
                  <span>{FOOTER_PRE_CTA.primary.label}</span>
                  <span className="text-[16px] leading-none">→</span>
                </Link>

                {/* Secondary Underlined Link */}
                <Link
                  href={FOOTER_PRE_CTA.secondary.href}
                  className="inline-flex items-center gap-2 text-[14.5px] font-serif font-medium text-[#0A2D23] hover:text-[#A67C44] transition-colors py-1 group cursor-pointer"
                >
                  <span className="border-b border-[#0A2D23] group-hover:border-[#A67C44] transition-colors pb-0.5">
                    Need assistance? Contact us
                  </span>
                  <span className="text-[16px] leading-none transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Visual: Lakshmi Gold & Ganesha Silver Coins on Limestone */}
            <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-[504/278] rounded-[8px] overflow-hidden drop-shadow-lg">
                <Image
                  src="/images/bilva/prefooter-lakshmi-ganesha-coins-raw.webp"
                  alt="Lakshmi 24K Gold Coin and Ganesha 999 Silver Coin on Limestone Pedestal"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Left Scrim for gentle blend */}
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </section>
      ) : null}

      {/* ========================================================================= */}
      {/* 2. MAIN DEEP IMPERIAL EMERALD FOOTER                                      */}
      {/* Same max-w-7xl column as hero / signature / legacy                         */}
      {/* ========================================================================= */}
      <div
        className={
          fullBleedEmerald
            ? "w-full bg-[#0C4338]"
            : "w-full bg-[#FAF7F2] pb-10 sm:pb-12 lg:pb-16"
        }
      >
        <div
          className={
            fullBleedEmerald
              ? cn(BILVA_SITE_SHELL_CLASS, "bg-[#0C4338] pb-10 pt-6 text-[#E6EFE9] sm:pb-8 sm:pt-7")
              : cn(
                  BILVA_SITE_SHELL_CLASS,
                  "bg-[#083D35] pb-10 pt-12 text-[#FFFFFF] sm:pt-14 sm:pb-12 lg:pt-14 lg:pb-12 overflow-hidden rounded-t-none rounded-b-[14px]",
                )
          }
        >
          {/* TIER 1: Brand Lockup (Left) + Newsletter Signup (Right) */}
          <div
            className={cn(
              "flex flex-col gap-8 pb-10 lg:flex-row lg:items-center lg:justify-between",
              fullBleedEmerald ? "border-b border-[#C5A059]/50" : "border-b border-[#1A574C]",
            )}
          >
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-4">
              {/* 3 Golden Leaves Icon */}
              <div className="relative w-11 h-11 shrink-0 drop-shadow-xs">
                <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Bilwa 3 Golden Leaves */}
                  <path
                    d="M 22 4 C 18 10, 18 20, 22 25 C 26 20, 26 10, 22 4 Z"
                    fill="#C5A059"
                  />
                  <path
                    d="M 20 23 C 13 18, 5 21, 6 29 C 13 32, 19 28, 20 23 Z"
                    fill="#C5A059"
                  />
                  <path
                    d="M 24 23 C 31 18, 39 21, 38 29 C 31 32, 25 28, 24 23 Z"
                    fill="#C5A059"
                  />
                  {/* Stem */}
                  <path d="M 22 24 L 22 36" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-10 bg-[#25685B] shrink-0" />

              {/* Wordmark & Tagline */}
              <div>
                <h3 className="font-serif text-[24px] sm:text-[26px] tracking-[0.08em] text-white font-medium leading-none">
                  BILWA
                </h3>
                <p className="font-sans text-[12px] sm:text-[13px] text-[#AEC7BD] tracking-[0.01em] mt-1">
                  Precious pieces. Thoughtfully chosen.
                </p>
              </div>
            </div>

            {/* Right: Newsletter Signup */}
            <div className="w-full lg:w-auto">
              <p className="font-sans text-[13px] sm:text-[14px] text-[#B8D3C8] mb-2.5">
                Product stories, new collections and thoughtful inspiration.
              </p>

              {isSubscribed ? (
                <div className="px-4 py-2.5 rounded-[4px] bg-[#0E7A67] text-white font-sans text-xs tracking-wide">
                  Thank you for joining our thoughtful community.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="bg-[#FAF7F2] text-[#0A2D23] placeholder:text-[#7A8E84] px-4 py-2.5 rounded-[4px] text-[13.5px] font-sans w-full sm:w-80 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                  <button
                    type="submit"
                    className={cn(
                      "active:scale-[0.98] shrink-0 rounded-[5px] px-3.5 py-2.5 text-center font-sans text-xs font-medium text-white transition-colors cursor-pointer sm:text-[12px]",
                      fullBleedEmerald
                        ? "bg-[#128670] hover:bg-[#0f735f]"
                        : "bg-[#0E7A67] hover:bg-[#0B6555]",
                    )}
                  >
                    Join updates
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* TIER 2: 5 Editorial Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 py-10">
            {/* Col 1: Shop */}
            <div>
              <h4 className="text-[14px] font-serif font-semibold text-white tracking-wide">
                Shop
              </h4>
              <div className="w-7 h-[1px] bg-[#C5A059] mt-1 mb-4" />
              <ul className="space-y-2.5 text-[13px] text-[#B8D3C8]">
                {FOOTER_SHOP_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Customer care */}
            <div>
              <h4 className="text-[14px] font-serif font-semibold text-white tracking-wide">
                Customer care
              </h4>
              <div className="w-7 h-[1px] bg-[#C5A059] mt-1 mb-4" />
              <ul className="space-y-2.5 text-[13px] text-[#B8D3C8]">
                {FOOTER_CARE_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Your account */}
            <div>
              <h4 className="text-[14px] font-serif font-semibold text-white tracking-wide">
                Your account
              </h4>
              <div className="w-7 h-[1px] bg-[#C5A059] mt-1 mb-4" />
              <ul className="space-y-2.5 text-[13px] text-[#B8D3C8]">
                {FOOTER_ACCOUNT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: About Bilwa */}
            <div>
              <h4 className="text-[14px] font-serif font-semibold text-white tracking-wide">
                About Bilwa
              </h4>
              <div className="w-7 h-[1px] bg-[#C5A059] mt-1 mb-4" />
              <ul className="space-y-2.5 text-[13px] text-[#B8D3C8]">
                {FOOTER_ABOUT_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Information */}
            <div>
              <h4 className="text-[14px] font-serif font-semibold text-white tracking-wide">
                Information
              </h4>
              <div className="w-7 h-[1px] bg-[#C5A059] mt-1 mb-4" />
              <ul className="space-y-2.5 text-[13px] text-[#B8D3C8]">
                {FOOTER_LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TIER 3: Copyright, Region & Social Utilities Bar */}
          <div className="pt-8 border-t border-[#1A574C] flex flex-col md:flex-row items-center justify-between text-[12px] text-[#A6C4B8] gap-4">
            {/* Left: Copyright */}
            <p className="order-1 md:order-1 text-center md:text-left">
              © 2026 Bilwa. All rights reserved.
            </p>

            {/* Center: Locale / Currency */}
            <p className="order-2 md:order-2 text-center text-[#B8D3C8]">
              India • English • INR
            </p>

            {/* Right: Social Icons + Payment Note */}
            <div className="order-3 md:order-3 flex items-center gap-3 justify-center md:justify-end">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-7 w-7 rounded-full border border-[#25685B] hover:border-white text-[#B8D3C8] hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram size={14} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-7 w-7 rounded-full border border-[#25685B] hover:border-white text-[#B8D3C8] hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook size={14} />
              </a>

              {/* Divider */}
              <span className="text-[#25685B] hidden sm:inline-block">|</span>

              {/* Payment note */}
              <span className="text-[12px] text-[#A6C4B8] hidden sm:inline-block">
                Payment methods shown at checkout
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
