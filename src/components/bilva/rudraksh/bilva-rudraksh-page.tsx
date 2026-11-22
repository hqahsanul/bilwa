"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaMetalDiscoverSection } from "@/components/bilva/gold-collection/bilva-gold-discover-section";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { RUDRAKSH_PRODUCTS } from "@/data/bilva/rudraksh";
import { BilvaRudrakshHero } from "./bilva-rudraksh-hero";
import { BilvaRudrakshGuideBar } from "./bilva-rudraksh-guide-bar";
import { BilvaRudrakshBrowse } from "./bilva-rudraksh-browse";
import { BilvaRudrakshAssurance } from "./bilva-rudraksh-assurance";
import { BilvaRudrakshCta } from "./bilva-rudraksh-cta";
import styles from "./rudraksh.module.css";

const RUDRAKSH_DISCOVER_PRODUCTS = RUDRAKSH_PRODUCTS.map((product) => ({
  id: product.id,
  title: product.title,
  subtitle: product.subtitle,
  price: product.price,
  image: product.image,
  alt: product.alt,
  badge: product.badge,
}));

export function BilvaRudrakshPage() {
  return (
    <main className={`bilva-page ${styles['page']}`}>
      <BilvaNavbar />
      <div className={BILVA_SITE_SHELL_CLASS}>
        <BilvaRudrakshHero />
        <BilvaRudrakshGuideBar />
        <BilvaRudrakshBrowse />
      </div>
      <BilvaMetalDiscoverSection
        presetKey="rudraksh"
        products={RUDRAKSH_DISCOVER_PRODUCTS}
      />
      <BilvaRudrakshAssurance />
      <BilvaRudrakshCta />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}