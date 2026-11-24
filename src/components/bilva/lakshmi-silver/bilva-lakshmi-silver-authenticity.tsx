import { BILVA_SITE_FRAME_CLASS } from "@/lib/bilva-site-shell";
import { LAKSHMI_SILVER_COIN_DATA } from "@/data/bilva/lakshmi-silver-coin";

function CardIcon({ name }: { name: "document" | "shield" | "medal" }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: "0 0 36 36",
    fill: "none",
    stroke: "#1A3328",
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (name === "document") {
    return (
      <svg {...common}>
        <path d="M12 6.5h8.2L26.5 12.8V29.5h-14.5V6.5Z" />
        <path d="M20 6.8V13h6.2" />
        <path d="M15 18.5h8M15 22.5h8" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M18 5.5 28 9.2v8.2c0 6.2-4.1 10.6-10 13.1-5.9-2.5-10-6.9-10-13.1V9.2L18 5.5Z" />
        <path d="m14.2 17.6 2.6 2.6 5.2-5.4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="18" cy="14" r="6.2" />
      <circle cx="18" cy="14" r="2.4" />
      <path d="M14.2 19.2 12 30l6-3.2L24 30l-2.2-10.8" />
    </svg>
  );
}

function Corners() {
  const edge = "pointer-events-none absolute h-3.5 w-3.5 border-[#C4B08A]";
  return (
    <>
      <span className={`${edge} top-3 left-3 border-t border-l`} />
      <span className={`${edge} top-3 right-3 border-t border-r`} />
      <span className={`${edge} bottom-3 left-3 border-b border-l`} />
      <span className={`${edge} bottom-3 right-3 border-b border-r`} />
    </>
  );
}

export function BilvaLakshmiSilverAuthenticity() {
  const { authenticity } = LAKSHMI_SILVER_COIN_DATA;
  const titleLines = authenticity.title.split("\n");

  return (
    <section className="w-full select-none bg-[#FAF7F2] py-0" aria-labelledby="silver-authenticity-heading">
      <div className={`${BILVA_SITE_FRAME_CLASS} relative overflow-hidden bg-[#0C3D32] px-6 py-12 text-[#F4EFE4] sm:px-10 sm:py-14 lg:px-14 lg:py-16`}>
        <svg viewBox="0 0 220 280" className="pointer-events-none absolute -bottom-6 -left-8 h-56 w-44 text-[#145C45]" aria-hidden>
          <path fill="currentColor" d="M40 250c20-70 70-120 130-150-30 40-40 90-30 150" />
          <path fill="#0E4A38" d="M20 260c40-40 90-50 140-40-50 10-100 20-140 50" />
        </svg>
        <svg viewBox="0 0 200 240" className="pointer-events-none absolute top-6 -right-6 h-48 w-40 text-[#145C45]" aria-hidden>
          <path fill="currentColor" d="M160 20c-10 50-40 90-90 120 40-10 70-40 90-120" />
          <path fill="#0E4A38" d="M170 80c-30 20-70 24-110 10 40 8 80 4 110-10" />
        </svg>

        <div className="relative z-[1]">
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div>
              <h2
                id="silver-authenticity-heading"
                className="font-serif text-[clamp(2.15rem,3.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]"
              >
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <span className="mt-4 block h-[2px] w-12 bg-[#C4A15A]" aria-hidden />
            </div>
            <p className="max-w-sm font-sans text-[15px] leading-relaxed text-[#E7EFE8] lg:justify-self-end lg:pb-1 lg:text-right">
              {authenticity.intro}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {authenticity.cards.map((card) => (
              <article key={card.id} className="relative flex aspect-[5/4.6] flex-col items-center justify-center bg-[#F3EDE1] px-6 py-8 text-center">
                <Corners />
                <CardIcon name={card.icon} />
                <h3 className="mt-4 font-sans text-[13px] font-semibold tracking-[0.14em] text-[#1A3328] sm:text-[14px]">
                  {card.title}
                </h3>
                <p className="mt-2 font-sans text-[12.5px] leading-snug text-[#6A6258]">
                  {card.detail.split("\n").map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
