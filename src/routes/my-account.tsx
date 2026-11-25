"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaMyAccountPage } from "@/components/bilva/account/bilva-my-account-page";

export default function MyAccountRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaMyAccountPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
