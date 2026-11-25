"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaLoginPage } from "@/components/bilva/account/bilva-login-page";

export default function LoginRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaLoginPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
