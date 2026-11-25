export type PolicyKey =
  | "shipping"
  | "returns"
  | "privacy"
  | "terms"
  | "contact";

export type PolicyIconName =
  | "box"
  | "ret"
  | "lock"
  | "doc"
  | "chat"
  | "truck"
  | "shield"
  | "warn"
  | "head"
  | "clock"
  | "info";

export interface PolicySectionItem {
  icon: PolicyIconName;
  title: string;
  body: string;
}

export interface PolicyDefinition {
  key: PolicyKey;
  navIcon: PolicyIconName;
  title: string;
  sections: PolicySectionItem[];
  note: string;
}

export const POLICIES_DATA = {
  heroTitle: "Clear terms. Considered purchases.",
  heroSubtitle: "Information to review before placing an order.",
  heroLeafImageSrc: "/images/bilva/checkout/summary-leaf-accent.png",
  sidebarHeading: "BILWA POLICIES",
  draftPill: "Draft structure — policy approval pending",

  cta: {
    heading: "Need clarity before ordering?",
    description:
      "Have a question about shipping, insurance or any other policy? We’re here to help.",
    buttonLabel: "Contact Bilwa",
  },

  policies: [
    {
      key: "shipping",
      navIcon: "box",
      title: "Shipping & insurance",
      sections: [
        {
          icon: "truck",
          title: "Dispatch and tracking",
          body: "Once your order is prepared, it is handed over to our delivery partner for shipping. Tracking details, when available, will be shared so you can follow your order’s progress.",
        },
        {
          icon: "shield",
          title: "Bilwa-covered delivery insurance",
          body: "Select orders may include delivery insurance arranged by Bilwa for added peace of mind during transit, subject to the final policy terms.",
        },
        {
          icon: "warn",
          title: "Delivery exceptions",
          body: "In certain situations, delivery may be affected by factors outside Bilwa’s direct control, such as service disruptions, access limitations or other unforeseen circumstances.",
        },
        {
          icon: "head",
          title: "Contact and claims",
          body: "If you experience an issue with delivery, please reach out to the Bilwa support team with your order details. We’ll guide you on the next steps in line with the final policy.",
        },
      ],
      note: "Coverage, exclusions and claim windows to be confirmed in the final policy.",
    },
    {
      key: "returns",
      navIcon: "ret",
      title: "Returns & cancellations",
      sections: [
        {
          icon: "ret",
          title: "Return eligibility",
          body: "Eligible items may be returned within the window stated in the final policy, provided they are unused and in their original condition and packaging.",
        },
        {
          icon: "clock",
          title: "Cancelling an order",
          body: "Orders may be cancelled before they are prepared for dispatch. Once an order is with our delivery partner, cancellation may no longer be possible.",
        },
        {
          icon: "warn",
          title: "Items that cannot be returned",
          body: "Made-to-order and personalised pieces may be excluded from returns, as outlined in the final policy terms.",
        },
        {
          icon: "doc",
          title: "Refunds",
          body: "Approved refunds will be processed to the original payment method. Timelines will be confirmed in the final policy.",
        },
      ],
      note: "Return windows, exclusions and refund timelines to be confirmed in the final policy.",
    },
    {
      key: "privacy",
      navIcon: "lock",
      title: "Privacy & consent",
      sections: [
        {
          icon: "info",
          title: "Information we collect",
          body: "We may collect details you share with us, such as your name, contact information and order preferences, to process enquiries and orders.",
        },
        {
          icon: "doc",
          title: "How we use it",
          body: "Your information is used to fulfil orders, respond to enquiries and improve your experience with Bilwa.",
        },
        {
          icon: "lock",
          title: "Consent and choices",
          body: "You can review or withdraw your consent for communications at any time by contacting the Bilwa support team.",
        },
        {
          icon: "shield",
          title: "Keeping your data safe",
          body: "We apply reasonable safeguards to protect your information, in line with the final policy.",
        },
      ],
      note: "Data handling and retention details to be confirmed in the final policy.",
    },
    {
      key: "terms",
      navIcon: "doc",
      title: "Terms of use",
      sections: [
        {
          icon: "doc",
          title: "Using this site",
          body: "By browsing or placing an order, you agree to follow the terms that apply to the use of this website.",
        },
        {
          icon: "box",
          title: "Orders and pricing",
          body: "Indicative prices may change until confirmed at checkout. An enquiry is not a confirmed order.",
        },
        {
          icon: "warn",
          title: "Limits of liability",
          body: "Bilwa’s responsibility for events outside its control will be described in the final terms.",
        },
        {
          icon: "info",
          title: "Changes to these terms",
          body: "We may update these terms from time to time. The version published on this page applies.",
        },
      ],
      note: "Final terms of use to be confirmed after policy approval.",
    },
    {
      key: "contact",
      navIcon: "chat",
      title: "Contact & support",
      sections: [
        {
          icon: "head",
          title: "Customer support",
          body: "Reach the Bilwa support team with your order details and we’ll guide you on the next steps.",
        },
        {
          icon: "chat",
          title: "Enquiries",
          body: "For gifting, bulk or custom requirements, share your details and our team will contact you.",
        },
        {
          icon: "clock",
          title: "Response times",
          body: "We aim to respond promptly. Specific timelines will be confirmed in the final policy.",
        },
        {
          icon: "info",
          title: "Before you write to us",
          body: "Keep your enquiry reference or order details handy to help us assist you faster.",
        },
      ],
      note: "Support hours and contact details to be confirmed in the final policy.",
    },
  ] as PolicyDefinition[],
};
