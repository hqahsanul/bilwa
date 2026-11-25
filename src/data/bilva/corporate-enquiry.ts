export const CORPORATE_ENQUIRY_DATA = {
  visual: {
    heading: "Gifts that honour the relationship.",
    subtitle: "Thoughtful gifting for teams, clients and milestones.",
    imageSrc: "/images/bilva/corporate/hero.png",
    imageAlt: "Bilwa corporate gifting presentation",
  },

  heading: "Corporate Gifting Enquiry",
  lead: "Tell us about your gifting needs, and we’ll curate options tailored to your company, occasion and budget.",

  quantityOptions: ["25 – 50", "51 – 100", "100+"] as const,

  budgetOptions: [
    "Under ₹1,000",
    "₹1,000 – ₹2,500",
    "₹2,500 – ₹5,000",
    "₹5,000 – ₹10,000",
    "₹10,000 and above",
  ] as const,

  deliveryLocations: [
    { value: "single", label: "Single address" },
    { value: "multiple", label: "Multiple destinations" },
  ] as const,

  requirementsPlaceholder:
    "Tell us about the occasion, recipients and any specific requirements (e.g. customisation, product preferences, branding, etc.).",

  upload: {
    label: "Upload brief or logo",
    optionalTag: "(optional)",
    dragPrompt: "Drag and drop a file here, or",
    browseLabel: "Browse files",
    hint: "PDF, PNG, JPG or ZIP (up to 10 MB)",
    errorMessage: "That file type or size isn’t supported.",
  },

  consentText:
    "I agree to be contacted by BILWA regarding this enquiry, including via email or phone, to share relevant gifting options and details.",

  submitLabel: "Request a tailored proposal",
  caption: "Our team will respond with options and timelines.",

  done: {
    heading: "Thank you, your enquiry is in",
    againLabel: "Submit another",
  },
};
