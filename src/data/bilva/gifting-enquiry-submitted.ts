import type { EnquirySubmittedPageData } from "@/data/bilva/enquiry-submitted";
import {
  GIFTING_CATALOGUE_PATH,
  GIFTING_SIGNATURE_PATH,
} from "@/lib/bilva-collection-routes";

export const GIFTING_ENQUIRY_SUBMITTED_DATA: EnquirySubmittedPageData = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Gifting", href: GIFTING_CATALOGUE_PATH },
    { label: "Enquiry Submitted" },
  ],
  heading: "Your gift enquiry is with Bilwa",
  referenceLabel: "Enquiry reference: BLW-PG-0000",
  lead: "We’ll review your request and contact you using the details provided.",
  details: [
    { id: "occasion", label: "Occasion", value: "Personal gifting (Sample)" },
    { id: "quantity", label: "Quantity", value: "1 gift" },
    { id: "timeline", label: "Preferred timeline", value: "As discussed (Sample)" },
    { id: "email", label: "Contact email", value: "a***@example.com" },
  ],
  actions: {
    backLabel: "Back to gifting",
    backHref: GIFTING_CATALOGUE_PATH,
    exploreLabel: "Explore signature collection",
    exploreHref: GIFTING_SIGNATURE_PATH,
  },
  note: "This is an enquiry, not a confirmed order.",
};