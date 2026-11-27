"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaEnquirySubmittedPage } from "@/components/bilva/corporate/bilva-enquiry-submitted-page";
import { GIFTING_ENQUIRY_SUBMITTED_DATA } from "@/data/bilva/gifting-enquiry-submitted";

export default function GiftingEnquirySubmittedRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaEnquirySubmittedPage data={GIFTING_ENQUIRY_SUBMITTED_DATA} />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}