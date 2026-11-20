import React from "react";
import Image from "next/image";

interface BilvaLogoProps {
  variant?: "navbar" | "header" | "header-clean" | "header-badge" | "master" | "full" | "emblem-only";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BilvaLogo({ variant = "navbar", className = "" }: BilvaLogoProps) {
  // 1. SRI BILVA JEWELS Horizontal Navbar Logo
  // Emblem (arch + 3 leaves + infinity loop) on left + "SRI BILVA JEWELS" text on right
  if (
    variant === "navbar" ||
    variant === "header" ||
    variant === "header-clean" ||
    variant === "header-badge"
  ) {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
        {/* Emblem only - arch + leaves + infinity */}
        <Image
          src="/images/bilva/sri-bilva-emblem-master.jpg"
          alt="Sri Bilva Jewels Emblem"
          width={42}
          height={38}
          className="h-9 sm:h-10 w-auto object-contain rounded-sm"
          priority
        />
        {/* Text lockup */}
        <div className="flex flex-col leading-none">
          <span className="font-serif text-[16px] sm:text-[18px] font-semibold tracking-[0.08em] text-[#0A2D23]">
            SRI BILVA
          </span>
          <span className="font-sans text-[9.5px] sm:text-[10.5px] font-semibold tracking-[0.28em] text-[#B6914C] uppercase mt-[1px]">
            JEWELS
          </span>
        </div>
      </div>
    );
  }

  // 2. Master Heritage Logo (Full vertical emblem + typography + tagline)
  if (variant === "master" || variant === "full") {
    return (
      <div className={`flex flex-col items-center select-none ${className}`}>
        <div className="relative w-48 sm:w-56 aspect-[584/520]">
          <Image
            src="/images/bilva/sri-bilva-master-logo-transparent.png"
            alt="Sri Bilva Jewels - Divine Elegance, Timeless Beauty"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  // 3. Emblem only (Flame arch + 3 green leaves + infinity loop)
  return (
    <div className={`relative w-9 h-9 sm:w-10 sm:h-10 ${className}`}>
      <Image
        src="/images/bilva/sri-bilva-emblem.png"
        alt="Sri Bilva Jewels Emblem"
        width={40}
        height={40}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
