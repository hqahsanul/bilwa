"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

export default function HeroSection_05() {
  const gradientRef = useRef<HTMLDivElement>(null);

  const transitionVariants = {
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring" as const,
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };

  useEffect(() => {
    if (!gradientRef.current) return;
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.6, ease: "power3.out" },
    );
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl p-6">
      <div className="relative w-full">
        {/* Soft peach / apricot wash — peach at top-center fading to white */}
        <div
          ref={gradientRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 max-h-[90vh] rounded-2xl"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 85% 55% at 50% 8%, #FFC9A8 0%, #FFDAB9 22%, #FFEDD5 48%, rgba(255,255,255,0) 72%),
              linear-gradient(180deg, #FFF8F3 0%, #FFEDD5 18%, #FFDAB9 38%, #FFE4EC 58%, #F3E5F5 78%, #FFFFFF 100%)
            `,
          }}
        />

        <div className="relative z-10 pb-10 pt-8 text-center sm:pb-12 sm:pt-10">
          <div className="relative mx-auto max-w-3xl px-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
              NineBeam: Customer Engagement for the Visionary Web
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-500 sm:text-lg">
              Whether you&apos;re running WhatsApp, voice, or full-scale support
              ops, our platform helps teams move fast, stay consistent, and ship
              beautiful customer experiences — every time.
            </p>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-11 rounded-lg border-transparent bg-black px-7 text-base text-white shadow-md shadow-black/15 hover:bg-black/90 hover:text-white"
              >
                <Link href="/request-demo" className="text-nowrap">
                  Start Building
                </Link>
              </Button>

              <div className="rounded-[9.5px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-[1.5px]">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-lg border-transparent bg-white px-7 text-base text-black hover:bg-black hover:text-white"
                >
                  <Link href="#features" className="text-nowrap">
                    Request a demo
                  </Link>
                </Button>
              </div>
            </AnimatedGroup>
          </div>
        </div>

        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.75,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className="relative z-10 overflow-hidden px-2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-b from-transparent to-white"
            />
            <div className="relative mx-auto max-h-[52vh] max-w-5xl overflow-hidden rounded-t-2xl border border-b-0 border-gray-100 bg-white p-3 shadow-lg shadow-zinc-950/15 ring-1 ring-black/5 sm:p-4">
              <Image
                className="relative aspect-[15/8] w-full rounded-xl object-cover object-top"
                src="https://cdn.21st.dev/assets/localized/6f643e9b131c95a2d7caaab9628e9b3705e5a0aa35be8de19bada8b4e1c1c8d7.png"
                alt="NineBeam product preview"
                width={2700}
                height={1440}
                unoptimized
                priority
              />
            </div>
          </div>
        </AnimatedGroup>
      </div>
      <BrandsGrid className="relative z-10" />
    </div>
  );
}

export const BrandsGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const brands = [
    {
      name: "loops",
      logo: "https://cdn.21st.dev/assets/localized/9c5b38c2133d55566f3bbc46e4570f2a290b5271c18055233423569eb38c983a.svg",
    },
    {
      name: "pwc",
      logo: "https://cdn.21st.dev/assets/localized/81a4c89e6d87a2952396d6c307f46d3d5fe0e882529356a4d06d1b1b45cc6ecc.svg",
    },
    {
      name: "resend",
      logo: "https://cdn.21st.dev/assets/localized/8a65fb8f40a9b7fe0f289b00f5c45128895c9b3edd1ac45b44fe5e260477e587.svg",
    },
    {
      name: "udio",
      logo: "https://cdn.21st.dev/assets/localized/d79afe7d59976d7fa7ddffe2c75a875407dcfc02425be743f73f9b3513776b7f.svg",
    },
    {
      name: "krea",
      logo: "https://cdn.21st.dev/assets/localized/fe7232f2ef6e1ebba6b7e39b2bf3638a23c0e90c264d2221d44085f2ef0f4dd9.svg",
    },
    {
      name: "gopuff",
      logo: "https://cdn.21st.dev/assets/localized/5c9e602e7f67b998ef377a5360371a7110d9cebd5aaf495a3c269e58df2328b0.svg",
    },
  ];

  return (
    <div ref={ref} className={cn("bg-white py-8", className)} {...props}>
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto grid max-w-xs grid-cols-2 items-center md:max-w-lg md:grid-cols-3 lg:max-w-3xl lg:grid-cols-6">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center p-4">
              <div className="relative h-[56px] w-full sm:h-[76px]">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  unoptimized
                  className={cn(
                    "object-contain opacity-80",
                    ["udio", "krea"].includes(brand.name) ? "invert" : "",
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

BrandsGrid.displayName = "BrandsGrid";

type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(4px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  "blur-slide": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(4px)", y: 20 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
  },
  zoom: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      },
    },
  },
  flip: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: {
        opacity: 1,
        rotateX: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 20 },
      },
    },
  },
  bounce: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      },
    },
  },
  rotate: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotate: -180 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { type: "spring" as const, stiffness: 200, damping: 15 },
      },
    },
  },
  swing: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, rotate: -10 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 8 },
      },
    },
  },
};

function AnimatedGroup({ children, className, variants, preset }: AnimatedGroupProps) {
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export { AnimatedGroup };
