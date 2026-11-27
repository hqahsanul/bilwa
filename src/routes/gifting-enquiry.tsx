"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCorporateEnquiryPage } from "@/components/bilva/corporate/bilva-corporate-enquiry-page";
import { GIFTING_ENQUIRY_SUBMITTED_PATH } from "@/lib/bilva-collection-routes";

export default function GiftingEnquiryRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCorporateEnquiryPage submittedHref={GIFTING_ENQUIRY_SUBMITTED_PATH} />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
