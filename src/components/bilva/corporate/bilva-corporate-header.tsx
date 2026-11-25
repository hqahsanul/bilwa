"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { BilvaLogo } from "../bilva-logo";
import { BilvaSearchOverlay } from "../bilva-search-overlay";
import { BilvaWishlistQuickView } from "../bilva-wishlist-quick-view";
import { BilvaBagQuickView } from "../bilva-bag-quick-view";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  GOLD_COINS_AND_BARS_PATH,
  SILVER_COINS_AND_BARS_PATH,
  RUDRAKSH_COLLECTION_PATH,
  CORPORATE_GIFTING_PATH,
} from "@/lib/bilva-collection-routes";

export function BilvaCorporateHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "corp-milestone-gold",
      title: "Milestone Recognition Gold Coin",
      subtitle: "24K (999) · Corporate Edition",
      price: "Custom quote",
      image: "/images/bilva/corporate/set-milestone-recognition.png",
      href: "/corporate-gifting",
      alt: "Milestone Recognition Gold Coin",
    },
  ]);

  const [bagItems, setBagItems] = useState([
    {
      id: "corp-sample-box",
      title: "Corporate Signature Gift Set",
      subtitle: "25 Units · Bespoke Presentation Box",
      price: "Custom quote",
      quantity: 1,
      image: "/images/bilva/corporate/set-partnership-commemorative.png",
      href: "/corporate-gifting",
      alt: "Corporate Signature Gift Set",
    },
  ]);

  const navItems = [
    { label: "Gold Coins", href: GOLD_COINS_AND_BARS_PATH, active: false },
    { label: "Silver Coins", href: SILVER_COINS_AND_BARS_PATH, active: false },
    { label: "Jewellery", href: "#jewellery", active: false },
    { label: "Spiritual", href: RUDRAKSH_COLLECTION_PATH, active: false },
    { label: "Corporate Gifting", href: CORPORATE_GIFTING_PATH, active: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE6DF] select-none">
      <div className={BILVA_SITE_SHELL_CLASS}>
        <div className="flex items-center justify-between h-[68px] sm:h-[76px] lg:h-[82px]">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-1 text-[#0A2D23] hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Left: BILWA Brand Logo */}
          <Link href="/" className="flex items-center cursor-pointer group" aria-label="BILWA Home">
            <BilvaLogo variant="navbar" />
          </Link>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-2 text-[14.5px] sm:text-[15px] font-sans tracking-[0.015em] transition-colors ${
                  item.active
                    ? "font-semibold text-[#0A2D23]"
                    : "font-normal text-[#2C3E38] hover:text-[#0A2D23]"
                }`}
              >
                <span>{item.label}</span>
                {item.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A2D23] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right: Minimalist Luxury Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-[#0A2D23]">
            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 hover:text-[#A67C44] transition-colors cursor-pointer group"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.65} className="group-hover:scale-105 transition-transform" />
            </button>

            {/* Account */}
            <button
              type="button"
              className="p-1.5 hover:text-[#A67C44] transition-colors cursor-pointer group hidden sm:block"
              aria-label="Account login"
            >
              <User size={20} strokeWidth={1.65} className="group-hover:scale-105 transition-transform" />
            </button>

            {/* Wishlist */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsWishlistOpen(!isWishlistOpen)}
                className="p-1.5 hover:text-[#A67C44] transition-colors cursor-pointer group"
                aria-label="View wishlist"
              >
                <Heart size={20} strokeWidth={1.65} className="group-hover:scale-105 transition-transform" />
              </button>
              {isWishlistOpen && (
                <div className="absolute right-0 top-full z-[70] mt-3">
                  <BilvaWishlistQuickView
                    items={wishlistItems}
                    onRemove={(id) => setWishlistItems((items) => items.filter((i) => i.id !== id))}
                    onClose={() => setIsWishlistOpen(false)}
                  />
                </div>
              )}
            </div>

            {/* Shopping Bag */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBagOpen(!isBagOpen)}
                className="p-1.5 hover:text-[#A67C44] transition-colors cursor-pointer group"
                aria-label="Your bag"
              >
                <ShoppingBag size={20} strokeWidth={1.65} className="group-hover:scale-105 transition-transform" />
              </button>
              {isBagOpen && (
                <div className="absolute right-0 top-full z-[70] mt-3">
                  <BilvaBagQuickView
                    items={bagItems}
                    onRemove={(id) => setBagItems((items) => items.filter((i) => i.id !== id))}
                    onClose={() => setIsBagOpen(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAE6DF] bg-[#FAF8F5] px-6 py-5 shadow-lg">
          <nav className="flex flex-col space-y-3.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[15px] py-1 font-sans ${
                  item.active
                    ? "font-semibold text-[#0A2D23] border-l-2 border-[#0A2D23] pl-2.5"
                    : "text-[#2C3E38] hover:text-[#0A2D23]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl">
            <BilvaSearchOverlay
              query={searchQuery}
              onQueryChange={setSearchQuery}
              onClose={() => setIsSearchOpen(false)}
              onSubmit={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
}
