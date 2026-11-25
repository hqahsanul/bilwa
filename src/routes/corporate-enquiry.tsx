"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCorporateEnquiryPage } from "@/components/bilva/corporate/bilva-corporate-enquiry-page";

export default function CorporateEnquiryRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCorporateEnquiryPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
