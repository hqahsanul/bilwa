import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RUDRAKSH_BROWSE } from "@/data/bilva/rudraksh";
import styles from "./rudraksh.module.css";

export function BilvaRudrakshBrowse({
  config = RUDRAKSH_BROWSE,
}: {
  config?: typeof RUDRAKSH_BROWSE;
}) {
  return (
    <section className={styles['browse']} aria-labelledby="rudraksh-browse-heading">
      <div className={styles['browseMedia']}>
        <Image
          src={config.imageSrc}
          alt={config.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 29rem"
        />
      </div>
      <div className={styles['browseBody']}>
        <h2 id="rudraksh-browse-heading" className={styles['browseTitle']}>
          {config.title}
        </h2>
        <div className={styles['browseChips']}>
          {config.chips.map((chip) => (
            <Link key={chip.label} href={chip.href} className={styles['browseChip']}>
              {chip.label}
              <ArrowRight size={14} strokeWidth={2} className={styles['browseChipArrow']} aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}