import Image from "next/image";
import Link from "next/link";

import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";
import { RUDRAKSH_CTA } from "@/data/bilva/rudraksh";
import styles from "./rudraksh.module.css";

export function BilvaRudrakshCta({
  config = RUDRAKSH_CTA,
}: {
  config?: typeof RUDRAKSH_CTA;
}) {
  const headlineLines = config.headline.split("\n");

  return (
    <section className={styles['ctaSection']} aria-labelledby="rudraksh-cta-heading">
      {/* Emerald lives on the shell — same width as the footer card, not full-bleed */}
      <div className={cn(BILVA_SITE_SHELL_CLASS, styles['ctaShell'])}>
        <div className={styles['ctaFrame']}>
          <div className={styles['ctaCopy']}>
            <h2 id="rudraksh-cta-heading" className={styles['ctaTitle']}>
              {headlineLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < headlineLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className={styles['ctaSubcopy']}>{config.subcopy}</p>
            <div className={styles['ctaActions']}>
              <Link href="#collection" className={styles['ctaPrimary']}>
                {config.primaryCta}
              </Link>
              <Link href="#rudraksh-guide" className={styles['ctaSecondary']}>
                {config.secondaryCta}
              </Link>
            </div>
          </div>

          <div className={styles['ctaMedia']}>
            <Image
              src={config.imageSrc}
              alt={config.imageAlt}
              fill
              className={styles['ctaImage']}
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={92}
            />
            {/* Soft emerald wash so the photo melts into the panel colour */}
            <div className={styles['ctaMediaBlend']} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}