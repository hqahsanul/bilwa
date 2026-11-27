"use client";

import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCorporateHero } from "@/components/bilva/corporate/bilva-corporate-hero";
import { BilvaCorporateConfigurator } from "@/components/bilva/corporate/bilva-corporate-configurator";
import { BilvaCorporateDocumentation } from "@/components/bilva/corporate/bilva-corporate-documentation";
import { BilvaCorporateReviews } from "@/components/bilva/corporate/bilva-corporate-reviews";
import { BilvaCorporateCollections } from "@/components/bilva/corporate/bilva-corporate-collections";
import { BilvaCorporateFaq } from "@/components/bilva/corporate/bilva-corporate-faq";
import { GIFTING_ENQUIRY_PATH } from "@/lib/bilva-collection-routes";
import { useRouter } from "next/navigation";

export default function GiftingSignaturePage() {
  const router = useRouter();

  const goToEnquiry = (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    router.push(`${GIFTING_ENQUIRY_PATH}${query}`);
  };

  return (
    <main className="bilva-page">
      <BilvaNavbar />
      <BilvaCorporateHero />
      <BilvaCorporateConfigurator
        onRequestQuote={(config) =>
          goToEnquiry({
            quantity: config.quantity,
            finish: config.finish,
            personalization: config.personalization,
            region: config.region,
          })
        }
        onSpeakSpecialist={() => goToEnquiry()}
      />
      <BilvaCorporateDocumentation />
      <BilvaCorporateReviews />
      <BilvaCorporateCollections onSelectSet={(setName) => goToEnquiry({ set: setName })} />
      <BilvaCorporateFaq />
      <BilvaFooter showPreFooterCta={false} />
    </main>
  );
}
