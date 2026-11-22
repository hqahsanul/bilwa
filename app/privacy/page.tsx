import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Sri Bilva Jewels",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Sri Bilva Jewels (“Bilwa”, “we”, “us”) operates this website to showcase certified gold and silver products, store information, and customer support channels. This policy explains what personal information we collect, how we use it, and the choices you have."
      sections={[
        {
          title: "1. Information we collect",
          body: (
            <p>
              When you contact us, visit a store, place an order online or in person, subscribe to
              updates, or use our site, we may collect your name, phone number, email address,
              delivery address, order details, payment confirmation references (we do not store
              full card numbers on this marketing site), government ID where required for high-value
              purchases, and messages you send to our team. We also collect technical data such as
              device type, browser, approximate location from IP, and pages viewed through standard
              server and analytics logs.
            </p>
          ),
        },
        {
          title: "2. How we use information",
          body: (
            <p>
              We use your information to fulfil orders and enquiries, provide hallmark and
              certification details, arrange delivery or pickup, send service updates, improve our
              website and product range, prevent fraud, and comply with law. We do not sell your
              personal information.
            </p>
          ),
        },
        {
          title: "3. Sharing",
          body: (
            <p>
              We share information with payment partners, logistics providers, IT and hosting
              vendors, and professional advisers only as needed to operate our business. We may
              disclose information when required by law or to protect people and property.
            </p>
          ),
        },
        {
          title: "4. Cookies",
          body: (
            <p>
              We use essential cookies to keep the site working and may use analytics cookies to
              understand traffic in aggregate. You can control cookies through your browser
              settings.
            </p>
          ),
        },
        {
          title: "5. Retention and security",
          body: (
            <p>
              We keep information for as long as needed for orders, tax records, and legitimate
              business purposes, then delete or anonymise it where practical. We use administrative
              and technical safeguards appropriate to jewellery retail, though no online system is
              perfectly secure.
            </p>
          ),
        },
        {
          title: "6. Your rights",
          body: (
            <p>
              Depending on where you live, you may request access, correction, deletion, or
              restriction of your personal information, or object to certain processing. Contact us
              at care@sribilva.com and we will respond within a reasonable time.
            </p>
          ),
        },
        {
          title: "7. Children",
          body: <p>This site is intended for adults. We do not knowingly collect data from children.</p>,
        },
      ]}
    />
  );
}