"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaSearchDiscoverPage } from "@/components/bilva/search/bilva-search-discover-page";

export default function SearchDiscoverRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaSearchDiscoverPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
