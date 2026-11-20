import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { PwaRegister } from "@/components/pwa-register";
import "../src/styles.css";

export const metadata: Metadata = {
  title: "Sri Bilva Jewels — Divine Elegance, Timeless Beauty",
  description:
    "Precious pieces. Thoughtfully chosen. Certified 24K gold and pure silver crafted for gifting, celebrating, and keeping.",
  applicationName: "Sri Bilva Jewels",
  authors: [{ name: "Sri Bilva Jewels" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/bilva/emblem.png",
    apple: "/images/bilva/emblem.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0E3D30",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
