"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BilvaLogo } from "./bilva-logo";
import { BilvaSearchOverlay } from "./bilva-search-overlay";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export function BilvaNavbar() {
  // Menu is strictly CLOSED by default on site load
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bagCount] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        closeSearch();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMenuClick = (menuName: string, hasDropdown: boolean) => {
    setIsSearchOpen(false);
    if (!hasDropdown) {
      setOpenMenu(null);
      return;
    }
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const openSearch = () => {
    setOpenMenu(null);
    setIsSearchOpen(true);
    setSearchQuery((prev) => (prev.trim() ? prev : "gold coin"));
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
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
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#DCE6E0] py-1.5 px-4 text-center border-b border-[#D2DDD7]">
        <p className="font-serif italic text-[12.5px] sm:text-[13px] tracking-[0.02em] text-[#0A2D23]">
          Precious pieces. Thoughtfully chosen.
        </p>
      </div>

      {/* 2. MAIN HEADER (Tier 1 + Tier 2) */}
      <header className="w-full bg-[#FAF8F5] border-b border-[#EAE6DF] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* TIER 1: Exact BILWA Logo (Left) + Minimalist Icons (Right) */}
          <div className="flex items-center justify-between h-[62px] sm:h-[68px]">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 -ml-1 min-h-11 min-w-11 flex items-center justify-center text-[#0A2D23] lg:hidden hover:opacity-75 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Exact BILWA Logo (Golden 3-leaf emblem + BILWA wordmark) */}
            <Link href="/" className="flex items-center cursor-pointer" aria-label="BILWA Home">
              <BilvaLogo variant="navbar" />
            </Link>

            {/* Right Minimalist Luxury Icons: User, Search, Heart, Bag */}
            <div className="flex items-center gap-1.5 sm:gap-6 md:gap-7 text-[#0A2D23]">
              {/* Account / User */}
              <button
                className="hover:text-[#B58E3F] transition-colors cursor-pointer group hidden sm:block"
                aria-label="Account login"
              >
                <User size={19} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
              </button>

              {/* Search — pill on desktop, icon on small screens */}
              <button
                type="button"
                onClick={openSearch}
                className={`hidden lg:inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 font-sans text-[13.5px] font-medium transition-colors ${
                  isSearchOpen
                    ? "border-[#9CC4B8] bg-[#E4EFEA] text-[#0A2D23]"
                    : "border-[#C9DAD4] bg-[#E8F0EC] text-[#0A2D23] hover:border-[#387C71] hover:bg-[#E0EBE6]"
                }`}
                aria-expanded={isSearchOpen}
                aria-haspopup="dialog"
              >
                <Search size={16} strokeWidth={1.75} className="text-[#387C71]" aria-hidden />
                Search
              </button>
              <button
                type="button"
                onClick={openSearch}
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center transition-colors hover:text-[#B58E3F] lg:hidden group"
                aria-label="Search collection"
                aria-expanded={isSearchOpen}
              >
                <Search size={19} strokeWidth={1.5} className="transition-transform group-hover:scale-105" />
              </button>

              {/* Wishlist */}
              <button
                className="min-h-11 min-w-11 flex items-center justify-center hover:text-[#B58E3F] transition-colors cursor-pointer group"
                aria-label="View wishlist"
              >
                <Heart size={19} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
              </button>

              {/* Shopping Bag */}
              <button
                className="min-h-11 min-w-11 flex items-center justify-center hover:text-[#B58E3F] transition-colors cursor-pointer group relative -mr-1"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={19} strokeWidth={1.5} className="group-hover:scale-105 transition-transform" />
                {bagCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#B89248] text-[9px] font-medium text-white">
                    {bagCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 1px Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-[#EAE6DF]" />

        {/* TIER 2: Centered Navigation Categories Row (Desktop) */}
        <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <nav className="flex items-center justify-center gap-8 xl:gap-11 h-[42px] relative">
            {menuList.map((item) => {
              const isOpen = openMenu === item.label;

              return (
                <div key={item.label} className="relative h-full flex items-center">
                  <button
                    onClick={() => handleMenuClick(item.label, item.hasDropdown)}
                    className={`relative inline-flex items-center gap-1.5 text-[13.5px] font-sans tracking-[0.015em] transition-colors cursor-pointer h-full px-1 ${
                      isOpen
                        ? "text-[#0A2D23] font-semibold"
                        : "text-[#283832] hover:text-[#0A2D23]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        size={12}
                        className={`text-[#556961] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#B58E3F]" : ""
                        }`}
                      />
                    )}

                    {/* Exact Active Underline Indicator */}
                    {isOpen && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A2D23]" />
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
            <button
              type="button"
              className="fixed inset-0 z-40 cursor-default bg-black/15"
              aria-label="Close search overlay"
              onClick={closeSearch}
            />
            <div className="absolute left-0 right-0 top-full z-[60] w-full bg-transparent pt-1">
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <BilvaSearchOverlay
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  onClose={closeSearch}
                  onSubmit={submitSearch}
                />
              </div>
            </div>
          </>
        )}

        {openMenu && !isSearchOpen && (
          <div className="hidden lg:block absolute left-0 right-0 top-full w-full bg-transparent pt-1 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <div className="w-full bg-[#FFFFFF] rounded-[6px] border border-[#E2DDD5] shadow-[0_16px_36px_rgba(0,0,0,0.08)] px-6 pt-5 pb-3.5 animate-in fade-in slide-in-from-top-1 duration-150">
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
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
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
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
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
                          href="#signature-collection"
                          className="block relative w-full aspect-[342/160] rounded-[6px] overflow-hidden shadow-xs border border-[#E8E1D5] hover:opacity-95 transition-opacity"
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
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
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
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
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
                              <a href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block hover:text-[#387C71] hover:underline transition-colors">
                                {link}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 4: Featured Rudraksh Card */}
                      <div className="w-[36%] pl-4 flex items-center justify-end">
                        <Link
                          href="#rudraksh-collection"
                          className="block relative w-full aspect-[342/160] rounded-[6px] overflow-hidden shadow-xs border border-[#E8E1D5] hover:opacity-95 transition-opacity"
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
                      <a href="#rudraksh-guide" className="hover:underline font-medium">Rudraksh Guide</a>
                      <span className="text-[#C7BCAB]">|</span>
                      <a href="#understanding-certification" className="hover:underline font-medium">Understanding Certification</a>
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
        <div className="border-b border-[#E2DDD5] bg-[#FAF8F5] px-4 py-3 lg:hidden">
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
                        <a href="#gold-coins" className="block pl-2 py-0.5">Gold Coins</a>
                        <a href="#gold-bars" className="block pl-2 py-0.5">Gold Bars</a>
                        <p className="font-semibold text-[#387C71] text-[11px] uppercase tracking-wider mt-2">Silver</p>
                        <a href="#silver-coins" className="block pl-2 py-0.5">Silver Coins</a>
                        <a href="#silver-bars" className="block pl-2 py-0.5">Silver Bars</a>
                      </>
                    )}
                    {item.label === "Rudraksh" && (
                      <>
                        <a href="#rudraksh-beads" className="block py-0.5">Individual Beads</a>
                        <a href="#rudraksh-mala" className="block py-0.5">Mala & Bracelets</a>
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
  );
}
