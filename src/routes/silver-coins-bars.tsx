"use client";

import { BilvaMetalCollectionPage } from "@/routes/metal-collection-page";
import { SILVER_METAL_PAGE_CONFIG } from "@/components/bilva/gold-collection/metal-collection-page-config";

export default function SilverCoinsBarsPage() {
  return <BilvaMetalCollectionPage config={SILVER_METAL_PAGE_CONFIG} />;
}