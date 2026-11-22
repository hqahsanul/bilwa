import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | Sri Bilva Jewels",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms apply to your use of the Sri Bilva Jewels website and related online services. By using the site you agree to them. Product availability, pricing on the site, and checkout flows may be illustrative until a live commerce backend is connected."
      sections={[
        {
          title: "1. About our products",
          body: (
            <p>
              We sell certified gold and silver coins, bars, and related products. Weights,
              purities, and hallmark details are stated on product pages and invoices. Minor
              variation within manufacturing tolerances may occur. Images are for reference; actual
              packaging or finish may vary by mint or batch.
            </p>
          ),
        },
        {
          title: "2. Orders and pricing",
          body: (
            <p>
              Published prices follow prevailing metal rates and may change without notice until an
              order is confirmed. We reserve the right to refuse or cancel orders affected by
              pricing errors, stock unavailability, or suspected fraud. Taxes and delivery charges
              are shown at checkout where applicable.
            </p>
          ),
        },
        {
          title: "3. Acceptable use",
          body: (
            <p>
              Use the site lawfully. Do not attempt to disrupt our systems, scrape content at scale,
              misrepresent your identity, or use our branding without permission.
            </p>
          ),
        },
        {
          title: "4. Intellectual property",
          body: (
            <p>
              Site content, photography, logos, and design are owned by Sri Bilva Jewels or our
              licensors. You may browse and share links for personal use; commercial reuse requires
              written consent.
            </p>
          ),
        },
        {
          title: "5. Disclaimers",
          body: (
            <p>
              Metal investments carry market risk. We do not provide financial advice. The site is
              provided “as is” to the extent permitted by law, without warranties of uninterrupted
              availability.
            </p>
          ),
        },
        {
          title: "6. Liability",
          body: (
            <p>
              To the extent permitted by law, we are not liable for indirect or consequential loss.
              Our total liability for a claim is limited to the amount you paid us for the relevant
              order, except where mandatory consumer law provides otherwise.
            </p>
          ),
        },
        {
          title: "7. Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have
              jurisdiction, subject to your mandatory consumer rights.
            </p>
          ),
        },
        {
          title: "8. Changes",
          body: (
            <p>
              We may update these terms on this page. Continued use after an update constitutes
              acceptance.
            </p>
          ),
        },
      ]}
    />
  );
}