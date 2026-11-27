"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown, Compass, Search } from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";

interface RouteGroup {
  group: string;
  routes: ReadonlyArray<{ label: string; href: string }>;
}

const BILVA_ROUTE_GROUPS: ReadonlyArray<RouteGroup> = [
  {
    group: "Main & Discovery",
    routes: [
      { label: "Home", href: "/" },
      { label: "Search", href: "/search" },
      { label: "Search — Discover", href: "/search/discover" },
      { label: "Make It Personal", href: "/make-it-personal" },
    ],
  },
  {
    group: "Collections & Products",
    routes: [
      { label: "Gold Coins & Bars", href: "/gold-silver/gold-coins-and-bars" },
      { label: "Lakshmi Gold Coin", href: "/gold-silver/lakshmi-gold-coin" },
      { label: "Silver Coins & Bars", href: "/gold-silver/silver-coins-and-bars" },
      { label: "Lakshmi Silver Coin", href: "/gold-silver/lakshmi-silver-coin" },
      { label: "Rudraksh", href: "/rudraksh" },
      { label: "Rudraksh — Five Mukhi", href: "/rudraksh/five-mukhi" },
    ],
  },
  {
    group: "Bag & Checkout",
    routes: [
      { label: "Bag", href: "/bag" },
      { label: "Bag — Needs attention", href: "/bag?attention=1" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Checkout", href: "/checkout" },
      { label: "Checkout — Delivery", href: "/checkout/delivery" },
      { label: "Checkout — Review", href: "/checkout/review" },
      { label: "Checkout — Payment Pending", href: "/checkout/payment-pending" },
      { label: "Checkout — Payment Failed", href: "/checkout/payment-pending?status=failed" },
      { label: "Checkout — Confirmed", href: "/checkout/confirmed" },
    ],
  },
  {
    group: "Gifting",
    routes: [
      { label: "Gifting Catalogue", href: "/gifting" },
      { label: "Gifting — Signature", href: "/gifting/signature" },
      { label: "Gifting — Enquiry", href: "/gifting/enquiry" },
      { label: "Gifting — Enquiry Submitted", href: "/gifting/enquiry-submitted" },
    ],
  },
  {
    group: "Corporate & Support",
    routes: [
      { label: "Corporate Gifting", href: "/corporate-gifting" },
      { label: "Corporate Gifting — Signature", href: "/corporate-gifting/signature" },
      { label: "Corporate Gifting — Enquiry", href: "/corporate-gifting/enquiry" },
      { label: "Corporate Gifting — Enquiry Submitted", href: "/corporate-gifting/enquiry-submitted" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    group: "Account & Policies",
    routes: [
      { label: "Login", href: "/login" },
      { label: "My Account", href: "/my-account" },
      { label: "My Bilwa", href: "/my-bilwa" },
      { label: "Policies", href: "/policies" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const ALL_ROUTES = BILVA_ROUTE_GROUPS.flatMap((g) => g.routes);

export function BilvaRouteSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentRoute = useMemo(
    () => ALL_ROUTES.find((r) => r.href === pathname) ?? { label: "Home", href: pathname },
    [pathname]
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BILVA_ROUTE_GROUPS;
    return BILVA_ROUTE_GROUPS.map((group) => ({
      ...group,
      routes: group.routes.filter(
        (r) => r.label.toLowerCase().includes(q) || r.href.toLowerCase().includes(q)
      ),
    })).filter((g) => g.routes.length > 0);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    if (href !== pathname) {
      router.push(href);
    }
  };

  return (
    <div className="relative z-[60] w-full bg-[#0A2D23] text-[#FBF9F5] border-b border-[#1E4739]">
      <div className={`${BILVA_SITE_SHELL_CLASS} flex flex-wrap items-center justify-between gap-3 py-2`}>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#164234] text-[#D8B979]">
            <Compass className="h-3.5 w-3.5" />
          </span>
          <span className="font-sans text-[11.5px] font-semibold uppercase tracking-[0.12em] text-[#E6DCCB]">
            Route Switcher
          </span>
          <span className="hidden sm:inline-block rounded-full bg-[#164234] px-2 py-0.5 font-sans text-[11px] font-medium text-[#B8D0C5]">
            {ALL_ROUTES.length} pages
          </span>
        </div>

        <div ref={containerRef} className="relative">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex min-w-[270px] sm:min-w-[330px] items-center justify-between gap-3 rounded-[8px] border border-[#2C5949] bg-[#123B2E] px-3.5 py-1.5 text-left transition-all duration-150 hover:border-[#C5A059] hover:bg-[#174637] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 cursor-pointer"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate font-sans text-[13px] font-medium text-[#FBF9F5]">
                {currentRoute.label}
              </span>
              <span className="truncate rounded bg-[#0A2D23] px-1.5 py-0.5 font-mono text-[11px] text-[#9FC2B3]">
                {currentRoute.href}
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[#D8B979] transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              role="listbox"
              aria-label="Select a Bilwa route"
              className="absolute right-0 mt-2 w-[320px] sm:w-[390px] overflow-hidden rounded-[12px] border border-[#DDD3C3] bg-[#FBF9F5] text-[#0A2D23] shadow-[0_18px_45px_rgba(10,45,35,0.22)]"
            >
              {/* Search bar */}
              <div className="border-b border-[#E8E0D2] bg-[#F4F0E7] p-2.5">
                <div className="relative flex items-center">
                  <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[#5D746B]" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Filter routes by name or path..."
                    className="w-full rounded-[8px] border border-[#D8CEBE] bg-white py-1.5 pl-8 pr-3 font-sans text-[13px] text-[#0A2D23] placeholder:text-[#7D8F87] focus:border-[#0A2D23] focus:outline-none"
                  />
                </div>
              </div>

              {/* Grouped route list */}
              <div className="max-h-[360px] overflow-y-auto p-2 space-y-3">
                {filteredGroups.length === 0 ? (
                  <p className="py-6 text-center font-sans text-[13px] text-[#647A70]">
                    No routes match &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  filteredGroups.map((group) => (
                    <div key={group.group}>
                      <div className="px-2.5 pb-1 pt-0.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#8D6B30]">
                        {group.group}
                      </div>
                      <div className="space-y-0.5">
                        {group.routes.map((route) => {
                          const isActive = route.href === pathname;
                          return (
                            <button
                              key={route.href}
                              type="button"
                              role="option"
                              aria-selected={isActive}
                              onClick={() => handleSelect(route.href)}
                              className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-2.5 py-2 text-left transition-colors cursor-pointer ${
                                isActive
                                  ? "bg-[#E6F0EB] text-[#064E3B]"
                                  : "text-[#0A2D23] hover:bg-[#EFEAE0]"
                              }`}
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <span
                                  className={`truncate font-sans text-[13px] ${
                                    isActive ? "font-semibold" : "font-medium"
                                  }`}
                                >
                                  {route.label}
                                </span>
                              </span>
                              <span className="flex shrink-0 items-center gap-1.5">
                                <span
                                  className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
                                    isActive
                                      ? "bg-[#064E3B] text-white"
                                      : "bg-[#EAE3D5] text-[#4F675D]"
                                  }`}
                                >
                                  {route.href}
                                </span>
                                {isActive && <Check className="h-3.5 w-3.5 text-[#064E3B]" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
