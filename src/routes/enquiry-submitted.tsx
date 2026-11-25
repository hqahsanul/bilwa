"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaEnquirySubmittedPage } from "@/components/bilva/corporate/bilva-enquiry-submitted-page";

export default function EnquirySubmittedRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaEnquirySubmittedPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
