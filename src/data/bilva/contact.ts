export interface ContactEnquiryOption {
  id: string;
  topic: string;
  title: string;
  subtitle: string;
}

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CONTACT_DATA = {
  hero: {
    heading: "We’re here for the details.",
    subtitle: "Product guidance, documentation, gifting and order help.",
    imageSrc: "/images/bilva/confidence-details.png",
    imageAlt: "Sri Bilwa Jewels detail craftsmanship",
  },

  sidebarTitle: "Choose your enquiry",
  enquiryOptions: [
    {
      id: "guidance",
      topic: "Product guidance",
      title: "Product guidance",
      subtitle: "Details, specifications and suitability",
    },
    {
      id: "order",
      topic: "Order status & changes",
      title: "My order",
      subtitle: "Order status, updates and changes",
    },
    {
      id: "certification",
      topic: "Certification & documentation",
      title: "Certification & documentation",
      subtitle: "Certificates, reports and related documents",
    },
    {
      id: "gifting",
      topic: "Gifting & bulk needs",
      title: "Gifting",
      subtitle: "Gifting options, order support and bulk needs",
    },
  ] as ContactEnquiryOption[],

  topics: [
    "Product guidance",
    "Order status & changes",
    "Certification & documentation",
    "Gifting & bulk needs",
    "Something else",
  ] as const,

  consentText:
    "I agree to be contacted by Bilwa regarding my enquiry, including updates related to my request. *",
  submitLabel: "Send enquiry",

  done: {
    heading: "Thank you, we’ve got your message",
    againLabel: "Send another",
  },

  quickStrip: [
    {
      id: "track",
      title: "Track an order",
      subtitle: "Check the latest status of your order.",
    },
    {
      id: "corporate",
      title: "Corporate enquiry",
      subtitle: "For team, institutional or bulk gifting needs.",
    },
    {
      id: "faqs",
      title: "Read FAQs",
      subtitle: "Find quick answers to common questions.",
    },
  ] as const,

  faqTitle: "Frequently asked questions",
  faqs: [
    {
      id: "status",
      question: "How do I check my order status?",
      answer:
        "Share your order number with us using the form above and our team will send you the latest update.",
    },
    {
      id: "cert",
      question: "Will I receive certification with my purchase?",
      answer:
        "Hallmark and authenticity details accompany eligible purchases. Choose “Certification & documentation” if you need a copy.",
    },
    {
      id: "bulk",
      question: "Can I place a bulk or corporate order?",
      answer:
        "Yes. Choose “Gifting & bulk needs” and tell us about your quantity and timeline.",
    },
  ] as ContactFaqItem[],
};
