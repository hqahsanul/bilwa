import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RUDRAKSH_HERO } from "@/data/bilva/rudraksh";
import styles from "./rudraksh.module.css";

export function BilvaRudrakshHero({
  config = RUDRAKSH_HERO,
}: {
  config?: typeof RUDRAKSH_HERO;
}) {
  return (
    <section className={styles['hero']}>
      <div className={styles['heroGrid']}>
        <div className={styles['heroCopy']}>
          <nav className={styles['breadcrumb']} aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0B6B5C]">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className={styles['breadcrumbCurrent']}>{config.breadcrumbCurrent}</span>
          </nav>

          <p className={styles['eyebrow']}>
            {config.eyebrow}
            <span className={styles['eyebrowRule']} aria-hidden />
          </p>

          <h1 className={styles['heroTitle']}>{config.title}</h1>
          <p className={styles['heroDescription']}>{config.description}</p>

          <div className={styles['heroActions']}>
            <Link href="#collection" className={styles['primaryCta']}>
              {config.primaryCta}
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </Link>
            <Link href="#rudraksh-guide" className={styles['secondaryCta']}>
              {config.secondaryCta}
              <ArrowRight size={15} strokeWidth={2} aria-hidden />
            </Link>
          </div>

          <div className={styles['trustRow']}>
            {config.trustLabels.map((label) => (
              <span key={label} className={styles['trustItem']}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className={styles['heroMedia']}>
          <Image
            src={config.heroImageSrc}
            alt={config.heroImageAlt}
            fill
            priority
            className="object-cover object-[62%_38%] lg:object-[right_center]"
            sizes="(max-width: 1024px) 100vw, 56vw"
          />
          <div className={styles['heroFade']} aria-hidden />
          <div className={styles['heroFadeTop']} aria-hidden />
        </div>
      </div>
    </section>
  );
}