"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const ACCENT = "rgb(53, 86, 250)";
const SECTION_BG = "#F9FAFB";
const HEADING = "#111827";
const BODY = "#6B7280";
const BORDER = "#F3F4F6";

const STATS = [
  { value: "6.32 M", label: "Unique users empowered" },
  { value: "960 M", label: "requests / month" },
  { value: "2,530+", label: "Companies" },
] as const;

const LOGOS = [
  { src: "/trust-logos/websitelearners.svg", alt: "Websitelearners.com Logo" },
  { src: "/trust-logos/starofservice.svg", alt: "StarOfService Logo" },
  { src: "/trust-logos/ruoanhinta.svg", alt: "Ruoanhinta.fi Logo" },
  { src: "/trust-logos/klink.svg", alt: "Klink.cloud Logo" },
  { src: "/trust-logos/france-vae.svg", alt: "France VAE Logo" },
] as const;

export function StatsBar({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="stats-heading"
      className={cn("w-full py-12 sm:py-24", className)}
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="stats-heading"
            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: HEADING }}
          >
            Over 6.32 million users empowered to date
          </h2>
          <p className="mt-3 text-xl sm:mt-4" style={{ color: BODY }}>
            NineBeam drives growth effectively for both small and large companies
          </p>
        </div>
      </div>

      <div className="mt-10" style={{ backgroundColor: SECTION_BG }}>
        <div className="relative">
          <div
            className="absolute inset-0 h-1/2"
            style={{ backgroundColor: SECTION_BG }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                {STATS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex flex-col p-6 text-center",
                      index === 0 && "border-b sm:border-0 sm:border-r",
                      index === 1 && "border-t border-b sm:border-0 sm:border-l sm:border-r",
                      index === 2 && "border-t sm:border-0 sm:border-l",
                    )}
                    style={{ borderColor: BORDER }}
                  >
                    <dt
                      className="order-2 mt-2 text-lg leading-6 font-medium"
                      style={{ color: BODY }}
                    >
                      {stat.label}
                    </dt>
                    <dd
                      className="order-1 text-5xl font-extrabold tracking-tight"
                      style={{ color: ACCENT }}
                    >
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 sm:py-16" style={{ backgroundColor: SECTION_BG }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h3
            className="text-center text-xl font-semibold"
            style={{ color: HEADING }}
          >
            Trusted by more than 2,530 companies around the world, such as
          </h3>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="col-span-2 flex max-h-12 w-full items-center justify-center transition-transform hover:scale-110 lg:col-span-1"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={158}
                  height={48}
                  className="max-h-12 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
