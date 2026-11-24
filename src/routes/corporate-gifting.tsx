"use client";

import { useState } from "react";
import { BilvaNavbar } from "@/components/bilva/bilva-navbar";
import { BilvaFooter } from "@/components/bilva/bilva-footer";
import { BilvaCorporateHero } from "@/components/bilva/corporate/bilva-corporate-hero";
import { BilvaCorporateConfigurator } from "@/components/bilva/corporate/bilva-corporate-configurator";
import { BilvaCorporateDocumentation } from "@/components/bilva/corporate/bilva-corporate-documentation";
import { BilvaCorporateReviews } from "@/components/bilva/corporate/bilva-corporate-reviews";
import { BilvaCorporateCollections } from "@/components/bilva/corporate/bilva-corporate-collections";
import { BilvaCorporateFaq } from "@/components/bilva/corporate/bilva-corporate-faq";
import { BilvaCorporateQuoteModal } from "@/components/bilva/corporate/bilva-corporate-quote-modal";

export default function CorporateGiftingPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    quantity?: string;
    finish?: string;
    personalization?: string;
    region?: string;
    setName?: string;
  }>({
    quantity: "25",
    finish: "Gold",
    personalization: "Yes",
    region: "Select region",
  });

  const handleOpenQuote = (config: {
    quantity: string;
    finish: string;
    personalization: string;
    region: string;
  }) => {
    setModalConfig(config);
    setIsQuoteModalOpen(true);
  };

  const handleSelectSet = (setName: string) => {
    setModalConfig((prev) => ({ ...prev, setName }));
    setIsQuoteModalOpen(true);
  };

  return (
    <main className="bilva-page">
      {/* 1. Global Navbar Header */}
      <BilvaNavbar />

      {/* 2. Hero Section with bilwa-one photographic backdrop */}
      <BilvaCorporateHero />

      {/* 3. Corporate Signature Collection + B2B Enquiry Configurator */}
      <BilvaCorporateConfigurator
        onRequestQuote={handleOpenQuote}
        onSpeakSpecialist={() => setIsQuoteModalOpen(true)}
      />

      {/* 4. Quality and Documentation (Emerald Band with Certificate Documents) */}
      <BilvaCorporateDocumentation />

      {/* 5. Customer Reviews (From our corporate partners) */}
      <BilvaCorporateReviews />

      {/* 6. Complement Your Gifting Program (3 Product Sets) */}
      <BilvaCorporateCollections onSelectSet={handleSelectSet} />

      {/* 7. FAQ / Common Questions Accordion */}
      <BilvaCorporateFaq />

      {/* 8. Global Bilva Footer */}
      <BilvaFooter showPreFooterCta={false} />

      {/* Modal Dialog for Quote Requests */}
      <BilvaCorporateQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialConfig={modalConfig}
      />
    </main>
  );
}
