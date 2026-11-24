"use client";

import Link from "next/link";
import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { BilvaLogo } from "../bilva-logo";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  GOLD_COINS_AND_BARS_PATH,
  SILVER_COINS_AND_BARS_PATH,
  RUDRAKSH_COLLECTION_PATH,
  CORPORATE_GIFTING_PATH,
} from "@/lib/bilva-collection-routes";

export function BilvaCorporateFooter() {
  const navItems = [
    { label: "Gold Coins", href: GOLD_COINS_AND_BARS_PATH },
    { label: "Silver Coins", href: SILVER_COINS_AND_BARS_PATH },
    { label: "Jewellery", href: "#jewellery" },
    { label: "Spiritual", href: RUDRAKSH_COLLECTION_PATH },
    { label: "Corporate Gifting", href: CORPORATE_GIFTING_PATH },
  ];

  return (
    <footer className="w-full bg-[#FAF8F5] border-t border-[#EAE6DF] pt-8 pb-10 select-none">
      <div className={BILVA_SITE_SHELL_CLASS}>
        {/* Main Footer Row: Brand Logo | Navigation Links | Minimal Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
          {/* Left: BILWA Brand Logo */}
          <Link href="/" className="flex items-center cursor-pointer" aria-label="BILWA Home">
            <BilvaLogo variant="navbar" />
          </Link>

          {/* Center: Category Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13.5px] sm:text-[14px] font-sans text-[#2C3E38] hover:text-[#0A2D23] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Minimalist Icons */}
          <div className="flex items-center gap-4 text-[#0A2D23]">
            <Link href="#configurator" className="p-1 hover:text-[#A67C44] transition-colors cursor-pointer" aria-label="Search">
              <Search size={18} strokeWidth={1.65} />
            </Link>
            <Link href="#configurator" className="p-1 hover:text-[#A67C44] transition-colors cursor-pointer" aria-label="Account">
              <User size={18} strokeWidth={1.65} />
            </Link>
            <Link href="#configurator" className="p-1 hover:text-[#A67C44] transition-colors cursor-pointer" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.65} />
            </Link>
            <Link href="#configurator" className="p-1 hover:text-[#A67C44] transition-colors cursor-pointer" aria-label="Bag">
              <ShoppingBag size={18} strokeWidth={1.65} />
            </Link>
          </div>
        </div>

        {/* Bottom Tagline Row: PRECIOUS METALS • SPIRITUAL PRODUCTS • CORPORATE GIFTING */}
        <div className="mt-8 pt-6 border-t border-[#EAE4D8] text-center">
          <p className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.24em] uppercase text-[#6B7E75]">
            PRECIOUS METALS &nbsp;&bull;&nbsp; SPIRITUAL PRODUCTS &nbsp;&bull;&nbsp; CORPORATE GIFTING
          </p>
        </div>
      </div>
    </footer>
  );
}
