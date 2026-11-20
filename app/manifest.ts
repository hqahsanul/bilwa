import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sri Bilva Jewels",
    short_name: "Bilwa",
    description: "Precious pieces. Thoughtfully chosen. Certified 24K gold and pure silver crafted for gifting, celebrating, and keeping.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#0E3D30",
    orientation: "portrait-primary",
    categories: ["shopping", "lifestyle", "luxury"],
    icons: [
      {
        src: "/images/bilva/emblem.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
