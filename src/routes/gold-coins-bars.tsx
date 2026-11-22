"use client";

import { BilvaMetalCollectionPage } from "@/routes/metal-collection-page";
import { GOLD_METAL_PAGE_CONFIG } from "@/components/bilva/gold-collection/metal-collection-page-config";

export default function GoldCoinsBarsPage() {
  return <BilvaMetalCollectionPage config={GOLD_METAL_PAGE_CONFIG} />;
}