"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaMetalCollectionHero } from "@/components/bilva/gold-collection/bilva-gold-collection-hero";
import { BilvaMetalReferenceTicker } from "@/components/bilva/gold-collection/bilva-gold-reference-ticker";
import { BilvaMetalBrowseWay } from "@/components/bilva/gold-collection/bilva-gold-browse-way";
import { BilvaMetalDiscoverSection } from "@/components/bilva/gold-collection/bilva-gold-discover-section";
import { BilvaMetalAssuranceBand } from "@/components/bilva/gold-collection/bilva-gold-assurance-band";
import { BilvaMetalCollectionCta } from "@/components/bilva/gold-collection/bilva-gold-collection-cta";
import type { MetalCollectionPageConfig } from "@/components/bilva/gold-collection/metal-collection-page-config";
import { MetalCollectionPageShell } from "@/components/bilva/gold-collection/metal-collection-page-shell";

export function BilvaMetalCollectionPage({ config }: { config: MetalCollectionPageConfig }) {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <MetalCollectionPageShell>
          <BilvaMetalCollectionHero
            config={config.hero}
            typeScale={config.metal === "silver" ? 1.25 : 1}
          />
          <BilvaMetalReferenceTicker config={config.ticker} />
          <BilvaMetalBrowseWay config={config.browse} />
        </MetalCollectionPageShell>
        <BilvaMetalDiscoverSection
          presetKey={config.discoverPresetKey}
          products={config.products}
        />
        <BilvaMetalAssuranceBand variant={config.assuranceVariant} items={config.assuranceItems} />
        {config.showCollectionCta ? (
          <BilvaMetalCollectionCta config={config.cta} variant={config.metal} />
        ) : null}
      <BilvaFooter
        showPreFooterCta={config.showFooterPreCta}
        fullBleedEmerald={config.footerFullBleed}
      />
    </main>
  );
}