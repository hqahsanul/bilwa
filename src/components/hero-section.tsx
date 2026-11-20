"use client";

import HeroSectionWithGradient from "@/components/ui/hero-section-with-gradient";

/**
 * Landing hero wrapper. Keeps the existing import path used by the home route
 * while rendering the gradient hero from the shadcn ui folder.
 */
export function HeroSection(_props: { authenticated?: boolean } = {}) {
  return <HeroSectionWithGradient />;
}

export default HeroSection;
