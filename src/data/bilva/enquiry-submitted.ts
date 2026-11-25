export interface EnquiryDetailRow {
  id: string;
  label: string;
  value: string;
}

export const ENQUIRY_SUBMITTED_DATA = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Corporate Gifting", href: "/corporate-gifting" },
    { label: "Enquiry Submitted" },
  ],
  heading: "Your enquiry is with Bilwa",
  referenceLabel: "Enquiry reference: BLW-CG-0000",
  lead: "Our team will review your requirements and contact you using the details provided.",
  details: [
    { id: "occasion", label: "Occasion", value: "Corporate Gifting (Sample)" },
    { id: "quantity", label: "Estimated quantity", value: "~ 100 units" },
    { id: "timeline", label: "Preferred timeline", value: "Mar 2026 (Sample)" },
    { id: "email", label: "Contact email", value: "a***@example.com" },
  ] as EnquiryDetailRow[],
  actions: {
    backLabel: "Back to gifting",
    backHref: "/corporate-gifting",
    exploreLabel: "Explore collections",
    exploreHref: "/#explore-collections",
  },
  note: "This is an enquiry, not a confirmed order.",
};
