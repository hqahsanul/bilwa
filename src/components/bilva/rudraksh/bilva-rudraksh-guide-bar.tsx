import Link from "next/link";
import { ArrowUpRight, BookOpen, CircleDot, Ruler } from "lucide-react";

import { RUDRAKSH_GUIDE, type RudrakshGuideLink } from "@/data/bilva/rudraksh";
import styles from "./rudraksh.module.css";

function GuideIcon({ icon }: { icon: RudrakshGuideLink["icon"] }) {
  const className = styles['guideIcon'];
  switch (icon) {
    case "mukhi":
      return <CircleDot className={className} strokeWidth={1.75} aria-hidden />;
    case "size":
      return <Ruler className={className} strokeWidth={1.75} aria-hidden />;
    case "care":
      return <BookOpen className={className} strokeWidth={1.75} aria-hidden />;
    case "guide":
      return <ArrowUpRight className={className} strokeWidth={1.75} aria-hidden />;
    default:
      return null;
  }
}

export function BilvaRudrakshGuideBar({
  config = RUDRAKSH_GUIDE,
}: {
  config?: typeof RUDRAKSH_GUIDE;
}) {
  return (
    <div
      id="rudraksh-guide"
      className={styles['guideBar']}
      role="navigation"
      aria-label="Choosing Rudraksh"
    >
      <p className={styles['guideTitle']}>{config.title}</p>
      <div className={styles['guideLinks']}>
        {config.links.map((link) => (
          <Link key={link.id} href={link.href} className={styles['guideLink']}>
            <GuideIcon icon={link.icon} />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}