import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund & Returns | Sri Bilva Jewels",
};

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Returns Policy"
      intro="We want you to be confident in every Bilwa purchase. Because precious metals and sealed bullion products have unique handling requirements, returns are limited as described below."
      sections={[
        {
          title: "1. Eligible returns",
          body: (
            <p>
              You may request a return within 7 days of delivery for unused, sealed products in
              original tamper-evident packaging with invoice and certificates intact, provided the
              item was not a special order or custom engraving. Opened bullion packs and products
              with broken seals cannot be accepted for hygiene and authenticity reasons.
            </p>
          ),
        },
        {
          title: "2. Non-returnable items",
          body: (
            <p>
              Products with broken seals, personalised engraving, promotional bundles marked
              non-returnable, or items purchased at a locked live-rate window where metal markets
              have moved materially may not be eligible for return. Defective or mis-shipped items are
              always reviewed case by case.
            </p>
          ),
        },
        {
          title: "3. How to request a return",
          body: (
            <p>
              Email care@sribilva.com with your invoice number, photos of the product and packaging,
              and the reason for return. Our team will confirm eligibility and pickup or drop-off
              instructions within 2 business days.
            </p>
          ),
        },
        {
          title: "4. Refunds",
          body: (
            <p>
              Approved refunds are processed to the original payment method after we receive and
              inspect the product. Processing typically takes 7–10 business days depending on your
              bank. Shipping and payment-gateway fees may be deducted where permitted by law.
            </p>
          ),
        },
        {
          title: "5. Exchanges",
          body: (
            <p>
              If you prefer a different weight or product, we can arrange an exchange when stock is
              available and metal rates are recalculated at the time of exchange.
            </p>
          ),
        },
        {
          title: "6. In-store purchases",
          body: (
            <p>
              Purchases made at a Sri Bilva Jewels store follow the same authenticity rules and may
              have additional state-specific consumer protections. Keep your stamped invoice.
            </p>
          ),
        },
      ]}
    />
  );
}