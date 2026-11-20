import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Refund Policy | PostPuls" };

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      intro="This Refund and Cancellation Policy explains how to cancel a PostPuls subscription and when a refund may be issued. Payments are processed by Dodo Payments, our Merchant of Record."
      sections={[
        {
          title: "1. Cancelling your subscription",
          body: <p>You can cancel from your account settings or by emailing legal@postpuls.com from your account email. Cancel before the next renewal to avoid another charge. Cancellation takes effect at the end of the current paid period, and access continues until then.</p>,
        },
        {
          title: "2. When we issue refunds",
          body: <p>We will refund an accidental duplicate charge, a material billing error, or a first payment for a new paid subscription when requested within 14 days and usage remains within the plan&apos;s included limits. Additional rights under local law continue to apply.</p>,
        },
        {
          title: "3. What is not refundable",
          body: <p>Renewals after the cancellation date, partial billing periods after cancellation, usage beyond the limits above, and purchases after an account suspension for a Terms of Service violation are generally non-refundable.</p>,
        },
        {
          title: "4. How to request a refund",
          body: <p>Email legal@postpuls.com from your account email with the payment date, invoice or transaction reference, and reason. We will reply within 5 business days.</p>,
        },
        {
          title: "5. Processing",
          body: <p>Approved refunds are returned to the original payment method. Your bank or card issuer controls posting time. Refunds do not necessarily reverse currency conversion or third-party bank fees.</p>,
        },
        {
          title: "6. Chargebacks",
          body: <p>If you have a billing problem, contact us first so we can resolve it quickly. A bank dispute may delay resolution.</p>,
        },
        {
          title: "7. Contact",
          body: <p>legal@postpuls.com</p>,
        },
      ]}
    />
  );
}
