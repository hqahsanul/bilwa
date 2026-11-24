import Image from "next/image";
import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_GOLD_COIN_DATA } from "@/data/bilva/lakshmi-gold-coin";

export function BilvaLakshmiGoldHero() {
  const { hero } = LAKSHMI_GOLD_COIN_DATA;

  return (
    <section className="w-full select-none bg-[#F7F3EC]">
      <div className={`${BILVA_SITE_FRAME_CLASS} overflow-hidden bg-[#F4EFE6]`}>
        <h1 className="sr-only">{hero.headline.replace("\n", " ")}</h1>
        <Image
          src="/images/bilva/lakshmi-gold/hero-scene.png"
          alt="Lakshmi gold coin on a stone pedestal, with the headline A legacy, held in gold."
          width={1024}
          height={400}
          priority
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
