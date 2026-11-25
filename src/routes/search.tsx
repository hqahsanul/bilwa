"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaSearchResultsPage } from "@/components/bilva/search/bilva-search-results-page";

export default function SearchRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaSearchResultsPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
