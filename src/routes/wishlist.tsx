"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaWishlistPage } from "@/components/bilva/account/bilva-wishlist-page";

export default function WishlistRoute() {
  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaWishlistPage />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
