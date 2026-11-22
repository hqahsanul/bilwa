"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BilvaLogo } from "./bilva-logo";
import { BilvaSearchOverlay } from "./bilva-search-overlay";
import {
  BilvaBagQuickView,
  MOCK_BAG_ITEMS,
  type BagItem,
} from "./bilva-bag-quick-view";
import {
  BilvaWishlistQuickView,
  MOCK_WISHLIST_ITEMS,
  type WishlistItem,
} from "./bilva-wishlist-quick-view";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import {
  GOLD_COINS_AND_BARS_PATH,
  SILVER_COINS_AND_BARS_PATH,
  RUDRAKSH_COLLECTION_PATH,
} from "@/lib/bilva-collection-routes";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";

const GOLD_COLLECTION_PATH = GOLD_COINS_AND_BARS_PATH;
const SILVER_COLLECTION_PATH = SILVER_COINS_AND_BARS_PATH;
const RUDRAKSH_PATH = RUDRAKSH_COLLECTION_PATH;

export function BilvaNavbar() {
  const frameClass = BILVA_SITE_SHELL_CLASS;
  // Menu is strictly CLOSED by default on site load
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<BagItem[]>(MOCK_BAG_ITEMS);
  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(MOCK_WISHLIST_ITEMS);
  const navRef = useRef<HTMLDivElement>(null);
  const wishlistAnchorRef = useRef<HTMLDivElement>(null);
  const bagAnchorRef = useRef<HTMLDivElement>(null);
  const searchDesktopTriggerRef = useRef<HTMLButtonElement>(null);
  const searchMobileTriggerRef = useRef<HTMLButtonElement>(null);
  const searchDesktopPanelRef = useRef<HTMLDivElement>(null);
  const searchMobilePanelRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navMenuBarRef = useRef<HTMLElement>(null);

  const isFlyoutOpen = isSearchOpen || isWishlistOpen || isBagOpen || openMenu !== null;

  const closeAllFlyouts = () => {
    setOpenMenu(null);
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsBagOpen(false);
  };

  // Close flyouts when clicking outside their panels (including header chrome beside the card)
  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (navRef.current && !navRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
        if (openMenu) setOpenMenu(null);
      }

      if (isWishlistOpen && wishlistAnchorRef.current && !wishlistAnchorRef.current.contains(target)) {
        setIsWishlistOpen(false);
      }
      if (isBagOpen && bagAnchorRef.current && !bagAnchorRef.current.contains(target)) {
        setIsBagOpen(false);
      }

      if (isSearchOpen) {
        const inSearch =
          searchDesktopTriggerRef.current?.contains(target) ||
          searchMobileTriggerRef.current?.contains(target) ||
          searchDesktopPanelRef.current?.contains(target) ||
          searchMobilePanelRef.current?.contains(target);
        if (!inSearch) setIsSearchOpen(false);
      }

      if (openMenu) {
        const inMega =
          megaMenuRef.current?.contains(target) || navMenuBarRef.current?.contains(target);
        if (!inMega) setOpenMenu(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isWishlistOpen, isBagOpen, isSearchOpen, openMenu]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeAllFlyouts();
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMenuClick = (menuName: string, hasDropdown: boolean) => {
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsBagOpen(false);
    if (!hasDropdown) {
      setOpenMenu(null);
      return;
    }
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const openSearch = () => {
    setOpenMenu(null);
    setIsWishlistOpen(false);
    setIsBagOpen(false);
    setIsSearchOpen(true);
    setSearchQuery((prev) => (prev.trim() ? prev : "gold coin"));
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleWishlist = () => {
    setOpenMenu(null);
    closeSearch();
    setIsBagOpen(false);
    setIsWishlistOpen((open) => !open);
  };

  const closeWishlist = () => setIsWishlistOpen(false);

  const removeWishlistItem = (id: string) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const toggleBag = () => {
    setOpenMenu(null);
    closeSearch();
    setIsWishlistOpen(false);
    setIsBagOpen((open) => !open);
  };

  const closeBag = () => setIsBagOpen(false);

  const removeBagItem = (id: string) => {
    setBagItems((items) => items.filter((item) => item.id !== id));
  };

  const submitSearch = () => {
    const q = searchQuery.trim() || "gold coin";
    setSearchQuery(q);
    closeSearch();
    window.location.hash = `catalog?q=${encodeURIComponent(q)}`;
  };

  const menuList = [
    { label: "Gold & Silver", hasDropdown: true },
    { label: "Rudraksh", hasDropdown: true },
    { label: "Gemstones", hasDropdown: true },
    { label: "Gifting", hasDropdown: true },
    { label: "Corporate Gifting", hasDropdown: false },
    { label: "Our Story", hasDropdown: false },
  ];

  return (
    <div ref={navRef} className="w-full relative z-50 select-none">
      {isFlyoutOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[45] cursor-default bg-black/15"
          aria-label="Close menu"
          onClick={closeAllFlyouts}
        />
      )}

      <div className="w-full">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bilva-announce">
        <p className="bilva-announce__text">Precious pieces. Thoughtfully chosen.</p>
      </div>

      {/* 2. MAIN HEADER (Tier 1 + Tier 2) */}
      <header className="w-full bg-[#FAF8F5] border-b border-[#EAE6DF] relative">
        <div className={frameClass}>
          {/* TIER 1: Exact BILWA Logo (Left) + Minimalist Icons (Right) */}
          <div className="flex items-center justify-between h-[72px] sm:h-[80px] md:h-[86px]">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 -ml-1 min-h-11 min-w-11 flex items-center justify-center text-[#0A2D23] lg:hidden hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Exact BILWA Logo (Golden 3-leaf emblem + BILWA wordmark) */}
            <Link href="/" className="flex items-center cursor-pointer" aria-label="BILWA Home">
              <BilvaLogo variant="navbar" />
            </Link>

            {/* Right Minimalist Luxury Icons: User, Search, Heart, Bag */}
            <div className="flex items-center gap-2 sm:gap-6 md:gap-7 text-[#0A2D23]">
              {/* Account / User */}
              <button
                className="hover:text-[#B58E3F] transition-colors cursor-pointer group hidden sm:block p-1"
                aria-label="Account login"
              >
                <User size={22} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
              </button>

              {/* Search — pill on desktop, icon on small screens */}
              <button
                ref={searchDesktopTriggerRef}
                type="button"
                onClick={openSearch}
                className={`hidden lg:inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full border px-5 py-2.5 font-sans text-[14.5px] sm:text-[15px] font-medium transition-colors ${
                  isSearchOpen
                    ? "border-[#9CC4B8] bg-[#E4EFEA] text-[#0A2D23]"
                    : "border-[#C9DAD4] bg-[#E8F0EC] text-[#0A2D23] hover:border-[#387C71] hover:bg-[#E0EBE6]"
                }`}
                aria-expanded={isSearchOpen}
                aria-haspopup="dialog"
              >
                <Search size={18} strokeWidth={1.75} className="text-[#387C71]" aria-hidden />
                Search
              </button>
              <button
                ref={searchMobileTriggerRef}
                type="button"
                onClick={openSearch}
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center transition-colors hover:text-[#B58E3F] lg:hidden group"
                aria-label="Search collection"
                aria-expanded={isSearchOpen}
              >
                <Search size={21} strokeWidth={1.5} className="transition-transform group-hover:scale-105" />
              </button>

              {/* Wishlist quick view */}
              <div ref={wishlistAnchorRef} className="relative">
                <button
                  type="button"
                  onClick={toggleWishlist}
                  className={`flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full transition-colors group ${
                    isWishlistOpen
                      ? "border-2 border-[#387C71] bg-[#E8F0EC] text-[#387C71]"
                      : "border-2 border-transparent text-[#0A2D23] hover:text-[#B58E3F]"
                  }`}
                  aria-label="View wishlist"
                  aria-expanded={isWishlistOpen}
                  aria-haspopup="dialog"
                >
                  <Heart
                    size={22}
                    strokeWidth={1.5}
                    className={`transition-transform ${isWishlistOpen ? "fill-[#387C71]/15" : "group-hover:scale-105"}`}
                  />
                </button>
                {isWishlistOpen && (
                  <div className="absolute right-0 top-full z-[70] mt-3">
                    <BilvaWishlistQuickView
                      items={wishlistItems}
                      onRemove={removeWishlistItem}
                      onClose={closeWishlist}
                    />
                  </div>
                )}
              </div>

              {/* Bag quick view */}
              <div ref={bagAnchorRef} className="relative -mr-1">
                <button
                  type="button"
                  onClick={toggleBag}
                  className={`flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full transition-colors group ${
                    isBagOpen
                      ? "border-2 border-[#387C71] bg-[#E8F0EC] text-[#387C71]"
                      : "border-2 border-transparent text-[#0A2D23] hover:text-[#B58E3F]"
                  }`}
                  aria-label="Your bag"
                  aria-expanded={isBagOpen}
                  aria-haspopup="dialog"
                >
                  <ShoppingBag
                    size={22}
                    strokeWidth={1.5}
                    className={`transition-transform ${isBagOpen ? "" : "group-hover:scale-105"}`}
                  />
                  {bagCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#B89248] px-0.5 text-[10px] font-semibold text-white">
                      {bagCount}
                    </span>
                  )}
                </button>
                {isBagOpen && (
                  <div className="absolute right-0 top-full z-[70] mt-3">
                    <BilvaBagQuickView items={bagItems} onRemove={removeBagItem} onClose={closeBag} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 1px Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-[#EAE6DF]" />

        {/* TIER 2: Centered Navigation Categories Row (Desktop) */}
        <div className={cn("hidden lg:block", frameClass)}>
          <nav ref={navMenuBarRef} className="flex items-center justify-center gap-8 xl:gap-11 h-[50px] sm:h-[54px] relative">
            {menuList.map((item) => {
              const isOpen = openMenu === item.label;

              return (
                <div key={item.label} className="relative h-full flex items-center">
                  <button
                    onClick={() => handleMenuClick(item.label, item.hasDropdown)}
                    className={`relative inline-flex items-center gap-2 text-[14.5px] sm:text-[15.5px] font-sans tracking-[0.02em] transition-colors cursor-pointer h-full px-2 ${
                      isOpen
                        ? "text-[#0A2D23] font-semibold"
                        : "text-[#283832] hover:text-[#0A2D23]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={`text-[#556961] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#B58E3F]" : ""
                        }`}
                      />
                    )}

                    {/* Exact Active Underline Indicator */}
                    {isOpen && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0A2D23]" />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>
        </div>

        {/* 3. EXACT MEGA DROPDOWN PANELS (Only opens when user clicks a menu item) */}
        {isSearchOpen && (
          <>
            <div className="pointer-events-none absolute left-0 right-0 top-full z-[60] w-full bg-transparent pt-1">
              <div className={cn("pointer-events-none", frameClass)}>
                <div ref={searchDesktopPanelRef} className="pointer-events-auto">
                  <BilvaSearchOverlay
                    query={searchQuery}
                    onQueryChange={setSearchQuery}
                    onClose={closeSearch}
                    onSubmit={submitSearch}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {openMenu && !isSearchOpen && (
          <div className="pointer-events-none absolute left-0 right-0 top-full z-50 hidden w-full bg-transparent pt-1 lg:block">
            <div className={cn("pointer-events-none", frameClass)}>
              <div
                ref={megaMenuRef}
                className="pointer-events-auto w-full rounded-[6px] border border-[#E2DDD5] bg-[#FFFFFF] px-6 pt-5 pb-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-1 duration-150"
              >
                {/* -------------------- 1. GOLD & SILVER DROPDOWN -------------------- */}
                {openMenu === "Gold & Silver" && (
                  <div>
                    <div className="flex items-start justify-between">
                      {/* Col 1: SHOP GOLD */}
                      <div className="w-[18%] pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP GOLD
                        </h4>
                        <div className="w-[76px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Gold Coins", "Gold Bars", "Small Denominations", "Artistic Coins", "All Gold"].map((link) => (
                            <li key={link}>
                              <Link
                                href={GOLD_COLLECTION_PATH}
                                className="block hover:text-[#387C71] hover:underline transition-colors"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: SHOP SILVER */}
                      <div className="w-[18%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP SILVER
                        </h4>
                        <div className="w-[80px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Silver Coins", "Silver Bars", "Collectible Designs", "Silver Gifts", "All Silver"].map((link) => (
                            <li key={link}>
                              <Link
                                href={SILVER_COLLECTION_PATH}
                                className="block hover:text-[#387C71] hover:underline transition-colors"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: EXPLORE BY WEIGHT */}
                      <div className="w-[28%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          EXPLORE BY WEIGHT
                        </h4>
                        <div className="w-[126px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <div>
                          <p className="text-[12px] font-medium text-[#444444] mb-1.5">Gold:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["0.5 g", "1 g", "2 g", "5 g", "10 g"].map((weight) => (
                              <button
                                key={weight}
                                className="px-2.5 py-0.5 text-[11.5px] font-sans rounded-[4px] border border-[#DDD5C7] bg-[#FFFFFF] text-[#333333] hover:border-[#387C71] hover:text-[#387C71] transition-colors cursor-pointer"
                              >
                                {weight}
                              </button>
                            ))}
                          </div>

                          <p className="text-[12px] font-medium text-[#444444] mt-3 mb-1.5">Silver:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {["10 g", "20 g", "50 g", "100 g"].map((weight) => (
                              <button
                                key={weight}
                                className="px-2.5 py-0.5 text-[11.5px] font-sans rounded-[4px] border border-[#DDD5C7] bg-[#FFFFFF] text-[#333333] hover:border-[#387C71] hover:text-[#387C71] transition-colors cursor-pointer"
                              >
                                {weight}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Col 4: Featured Signature Card */}
                      <div className="w-[36%] pl-4 flex items-center justify-end">
                        <Link
                          href={GOLD_COLLECTION_PATH}
                          className="block relative w-full aspect-[342/160] rounded-[6px] overflow-hidden shadow-xs border border-[#E8E1D5] hover:opacity-95 transition-opacity"
                          onClick={() => setOpenMenu(null)}
                        >
                          <Image
                            src="/images/bilva/banner-exact-gold-2x.jpg"
                            alt="The Bilwa Signature - Precious metals, thoughtfully made."
                            fill
                            className="object-cover"
                            priority
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Link Bar */}
                    <div className="mt-4 pt-2.5 border-t border-[#EFEAE2] flex items-center gap-3 text-[12.5px] text-[#387C71]">
                      <a href="#purity" className="hover:underline font-medium">Understand Purity</a>
                      <span className="text-[#C7BCAB]">|</span>
                      <a href="#pricing-works" className="hover:underline font-medium">How Metal Pricing Works</a>
                    </div>
                  </div>
                )}

                {/* -------------------- 2. RUDRAKSH DROPDOWN -------------------- */}
                {openMenu === "Rudraksh" && (
                  <div>
                    <div className="flex items-start justify-between">
                      {/* Col 1: SHOP BY MUKHI */}
                      <div className="w-[18%] pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP BY MUKHI
                        </h4>
                        <div className="w-[90px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["1 Mukhi", "2 Mukhi", "3 Mukhi", "5 Mukhi", "7 Mukhi", "All Rudraksh"].map((link) => (
                            <li key={link}>
                              <Link
                                href={RUDRAKSH_PATH}
                                className="block hover:text-[#387C71] hover:underline transition-colors"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: SHOP BY FORMAT */}
                      <div className="w-[18%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP BY FORMAT
                        </h4>
                        <div className="w-[96px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Individual Beads", "Mala & Bracelets", "Gift Sets", "Certified Selection"].map((link) => (
                            <li key={link}>
                              <Link
                                href={RUDRAKSH_PATH}
                                className="block hover:text-[#387C71] hover:underline transition-colors"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: EXPLORE & LEARN */}
                      <div className="w-[28%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          EXPLORE & LEARN
                        </h4>
                        <div className="w-[96px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Choosing Your Rudraksh", "Origins & Characteristics", "Care & Handling", "Authenticity & Reports"].map((link) => (
                            <li key={link}>
                              <Link
                                href={`${RUDRAKSH_PATH}#rudraksh-guide`}
                                className="block hover:text-[#387C71] hover:underline transition-colors"
                                onClick={() => setOpenMenu(null)}
                              >
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 4: Featured Rudraksh Card */}
                      <div className="w-[36%] pl-4 flex items-center justify-end">
                        <Link
                          href={RUDRAKSH_PATH}
                          className="block relative w-full aspect-[342/160] rounded-[6px] overflow-hidden shadow-xs border border-[#E8E1D5] hover:opacity-95 transition-opacity"
                          onClick={() => setOpenMenu(null)}
                        >
                          <Image
                            src="/images/bilva/banner-exact-rudraksh-2x.jpg"
                            alt="The Bilwa Selection - Chosen with care. Rooted in meaning."
                            fill
                            className="object-cover"
                            priority
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Link Bar */}
                    <div className="mt-4 pt-2.5 border-t border-[#EFEAE2] flex items-center gap-3 text-[12.5px] text-[#387C71]">
                      <Link
                        href={`${RUDRAKSH_PATH}#rudraksh-guide`}
                        className="hover:underline font-medium"
                        onClick={() => setOpenMenu(null)}
                      >
                        Rudraksh Guide
                      </Link>
                      <span className="text-[#C7BCAB]">|</span>
                      <Link
                        href={`${RUDRAKSH_PATH}#understanding-certification`}
                        className="hover:underline font-medium"
                        onClick={() => setOpenMenu(null)}
                      >
                        Understanding Certification
                      </Link>
                    </div>
                  </div>
                )}

                {/* -------------------- 3. GEMSTONES DROPDOWN -------------------- */}
                {openMenu === "Gemstones" && (
                  <div>
                    <div className="flex items-start justify-between">
                      {/* Col 1: SHOP GEMSTONES */}
                      <div className="w-[18%] pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP GEMSTONES
                        </h4>
                        <div className="w-[100px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Emerald (Panna)", "Ruby (Manik)", "Blue Sapphire (Neelam)", "Yellow Sapphire (Pukhraj)", "All Gemstones"].map((link) => (
                            <li key={link}>
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: COLOURED STONES */}
                      <div className="w-[18%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          COLOURED STONES
                        </h4>
                        <div className="w-[96px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Amethyst", "Citrine", "Garnet", "Tourmaline", "All Coloured Stones"].map((link) => (
                            <li key={link}>
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: DISCOVER BY */}
                      <div className="w-[28%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          DISCOVER BY
                        </h4>
                        <div className="w-[80px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Stone Type", "Colour", "Carat Weight", "Certification", "Budget"].map((link) => (
                            <li key={link}>
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 4: Featured Gemstone Card */}
                      <div className="w-[36%] pl-4 flex items-center justify-end">
                        <Link
                          href="#gemstone-collection"
                          className="block relative w-full aspect-[342/160] rounded-[6px] overflow-hidden shadow-xs border border-[#E8E1D5] hover:opacity-95 transition-opacity"
                        >
                          <Image
                            src="/images/bilva/banner-exact-gemstones-2x.jpg"
                            alt="Stone Selection - Character in every stone."
                            fill
                            className="object-cover"
                            priority
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Link Bar */}
                    <div className="mt-4 pt-2.5 border-t border-[#EFEAE2] flex items-center gap-3 text-[12.5px] text-[#387C71]">
                      <a href="#gemstone-guide" className="hover:underline font-medium">Gemstone Buying Guide</a>
                      <span className="text-[#C7BCAB]">|</span>
                      <a href="#understanding-reports" className="hover:underline font-medium">Understanding Reports</a>
                    </div>
                  </div>
                )}

                {/* -------------------- 4. GIFTING DROPDOWN -------------------- */}
                {openMenu === "Gifting" && (
                  <div>
                    <div className="flex items-start justify-between">
                      {/* Col 1: SHOP BY OCCASION */}
                      <div className="w-[18%] pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP BY OCCASION
                        </h4>
                        <div className="w-[105px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Weddings", "Anniversaries", "Festivals", "Milestones", "Housewarming"].map((link) => (
                            <li key={link}>
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 2: SHOP BY RECIPIENT */}
                      <div className="w-[18%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          SHOP BY RECIPIENT
                        </h4>
                        <div className="w-[105px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Family & Loved Ones", "Friends", "Clients & Partners", "Employees", "All Gifts"].map((link) => (
                            <li key={link}>
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: PERSONALISE YOUR GIFT */}
                      <div className="w-[28%] border-l border-[#EFEAE2] pl-6 pr-4">
                        <h4 className="text-[12.5px] font-serif font-semibold tracking-[0.06em] text-[#387C71] uppercase">
                          PERSONALISE YOUR GIFT
                        </h4>
                        <div className="w-[125px] h-[1px] bg-[#E8DFD0] mt-1.5 mb-3" />
                        <ul className="space-y-2 text-[13px] text-[#333333]">
                          {["Engravable Coins", "Curated Gift Boxes", "Gift Packaging", "Personal Messages", "Corporate Enquiries"].map((link) => (
                            <li key={link}>
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 4: Featured Gifting Card */}
                      <div className="w-[36%] pl-4 flex items-center justify-end">
                        <Link
                          href="#gifting-collection"
                          className="block relative w-full aspect-[342/160] rounded-[6px] overflow-hidden shadow-xs border border-[#E8E1D5] hover:opacity-95 transition-opacity"
                        >
                          <Image
                            src="/images/bilva/banner-exact-gifting-2x.jpg"
                            alt="The Art of Giving - Meaningful gifts, beautifully presented."
                            fill
                            className="object-cover"
                            priority
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Link Bar */}
                    <div className="mt-4 pt-2.5 border-t border-[#EFEAE2] flex items-center gap-3 text-[12.5px] text-[#387C71]">
                      <a href="#gifting-guide" className="hover:underline font-medium">Gifting Guide</a>
                      <span className="text-[#C7BCAB]">|</span>
                      <a href="#corporate-gifting" className="hover:underline font-medium">Corporate Gifting</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 4. MOBILE SEARCH (full-width panel below header) */}
      {isSearchOpen && (
        <div
          ref={searchMobilePanelRef}
          className="relative z-[60] border-b border-[#E2DDD5] bg-[#FAF8F5] px-4 py-3 lg:hidden"
        >
          <BilvaSearchOverlay
            query={searchQuery}
            onQueryChange={setSearchQuery}
            onClose={closeSearch}
            onSubmit={submitSearch}
          />
        </div>
      )}

      {/* 5. MOBILE ACCORDION MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#FFFFFF] border-b border-[#E8DFC9] px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-4">
            {menuList.map((item) => (
              <div key={item.label} className="border-b border-[#F0ECE1] pb-3 last:border-b-0">
                <div
                  onClick={() => handleMenuClick(item.label, item.hasDropdown)}
                  className="flex items-center justify-between font-serif text-[15px] text-[#0A2D23] font-medium py-1 cursor-pointer"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      size={15}
                      className={`text-[#B89248] transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                {item.hasDropdown && openMenu === item.label && (
                  <div className="mt-2.5 pl-3 border-l-2 border-[#B89248] space-y-2 text-[13px] text-[#333333]">
                    {item.label === "Gold & Silver" && (
                      <>
                        <p className="font-semibold text-[#387C71] text-[11px] uppercase tracking-wider">Gold</p>
                        <Link href={GOLD_COLLECTION_PATH} className="block pl-2 py-0.5" onClick={() => setIsMobileMenuOpen(false)}>
                          Gold Coins
                        </Link>
                        <Link href={GOLD_COLLECTION_PATH} className="block pl-2 py-0.5" onClick={() => setIsMobileMenuOpen(false)}>
                          Gold Bars
                        </Link>
                        <p className="font-semibold text-[#387C71] text-[11px] uppercase tracking-wider mt-2">Silver</p>
                        <Link
                          href={SILVER_COLLECTION_PATH}
                          className="block pl-2 py-0.5"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Silver Coins
                        </Link>
                        <Link
                          href={SILVER_COLLECTION_PATH}
                          className="block pl-2 py-0.5"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Silver Bars
                        </Link>
                        <Link
                          href={SILVER_COLLECTION_PATH}
                          className="block pl-2 py-0.5 font-medium text-[#387C71]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          All Silver →
                        </Link>
                      </>
                    )}
                    {item.label === "Rudraksh" && (
                      <>
                        <Link href={RUDRAKSH_PATH} className="block py-0.5" onClick={() => setIsMobileMenuOpen(false)}>
                          Individual Beads
                        </Link>
                        <Link href={RUDRAKSH_PATH} className="block py-0.5" onClick={() => setIsMobileMenuOpen(false)}>
                          Mala & Bracelets
                        </Link>
                        <Link
                          href={RUDRAKSH_PATH}
                          className="block py-0.5 font-medium text-[#387C71]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          All Rudraksh →
                        </Link>
                      </>
                    )}
                    {item.label === "Gemstones" && (
                      <>
                        <a href="#emerald" className="block py-0.5">Emerald (Panna)</a>
                        <a href="#ruby" className="block py-0.5">Ruby (Manik)</a>
                        <a href="#sapphire" className="block py-0.5">Blue Sapphire (Neelam)</a>
                      </>
                    )}
                    {item.label === "Gifting" && (
                      <>
                        <a href="#weddings" className="block py-0.5">Weddings</a>
                        <a href="#festivals" className="block py-0.5">Festivals</a>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
