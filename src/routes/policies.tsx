"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaPoliciesPage } from "@/components/bilva/policies/bilva-policies-page";

export default function PoliciesRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaPoliciesPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
