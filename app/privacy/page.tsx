import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Policy | PostPuls" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="PostPuls is operated by Ahsanul Hoque, an individual based in India. This policy explains what we collect, why we use it, who we share it with, and the choices available to you."
      sections={[
        {
          title: "1. What PostPuls does",
          body: <p>You choose public X accounts to watch. When a watched account posts, we alert you and suggest an AI-drafted reply. You review the draft and post it yourself. PostPuls never posts, replies, likes, follows, or sends direct messages on your behalf, does not access private accounts, and is not affiliated with or endorsed by X Corp.</p>,
        },
        {
          title: "2. Information we collect",
          body: <p>We collect your email and authentication data; watchlists, alert preferences, reply drafts, and writing samples; public X posts, handles, display names, and engagement counts for watched accounts; log events, IP address, browser type, and cookies; and limited billing details such as name, email, billing country, subscription status, and transaction reference. Dodo Payments processes payments, and we do not store full card numbers.</p>,
        },
        {
          title: "3. How we use information",
          body: <p>We use information to provide and secure PostPuls, send alerts and service notifications, generate reply suggestions, save preferences, process payments, provide support, prevent fraud and abuse, and understand product usage through aggregated analytics.</p>,
        },
        {
          title: "4. AI processing",
          body: <p>To generate drafts, we send relevant public post text and, if provided, your writing samples to OpenAI through its API. We do not use your content to train our own models. OpenAI&apos;s API data-use and retention terms apply to this processing. Drafts are suggestions only.</p>,
        },
        {
          title: "5. Who we share information with",
          body: <p>We share information with providers for hosting, databases, email, analytics, AI, third-party X data, and Dodo Payments. We may disclose information when required by law, to protect rights and safety, or during a business transfer. We do not sell personal information.</p>,
        },
        {
          title: "6. Public posts from other people",
          body: <p>Posts belong to their authors. We use them to provide alerts and drafts. If you are the author of a post and want it removed from our systems, email us at the address below.</p>,
        },
        {
          title: "7. Retention",
          body: <p>Account data is kept while active, then deleted within 30 days of account deletion except where required for legal, fraud-prevention, or dispute reasons. Public X post data is kept for 14 days. Billing records are retained as required by tax and accounting laws.</p>,
        },
        {
          title: "8. Security",
          body: <p>We use access controls, encryption in transit, and operational safeguards. No system is completely risk-free.</p>,
        },
        {
          title: "9. International transfers",
          body: <p>Our providers may process data in countries other than yours. We take reasonable steps to ensure appropriate safeguards.</p>,
        },
        {
          title: "10. Cookies and analytics",
          body: <p>We use essential cookies to keep you signed in and PostPuls&apos; first-party analytics to measure usage in aggregate. You can control cookies in your browser settings.</p>,
        },
        {
          title: "11. Your rights",
          body: <p>You may request access, correction, export, or deletion of your information, or withdraw consent where applicable. Email us from your account address; we will respond within 30 days. You can unsubscribe from non-essential emails at any time.</p>,
        },
        {
          title: "12. Children",
          body: <p>PostPuls is not intended for anyone under 18, and we do not knowingly collect their information.</p>,
        },
        {
          title: "13. Changes",
          body: <p>We may update this policy as the service changes. The new version and updated date will be posted here.</p>,
        },
        {
          title: "14. Contact and grievances",
          body: <p>Privacy questions, requests, and complaints: legal@postpuls.com. Grievance contact: Ahsanul Hoque, legal@postpuls.com.</p>,
        },
      ]}
    />
  );
}
