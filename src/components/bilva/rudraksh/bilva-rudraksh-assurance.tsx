import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { cn } from "@/lib/utils";
import { RUDRAKSH_ASSURANCE, RUDRAKSH_REVIEWS } from "@/data/bilva/rudraksh";
import styles from "./rudraksh.module.css";

function LeafIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden>
      <path
        d="M24 6c-2 8-10 14-14 22 6 2 12 2 14 2s8 0 14-2C34 20 26 14 24 6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M24 12v26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M24 18c-3 3-6 5-9 7M24 24c3 2 6 4 9 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CaliperIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden>
      <path
        d="M14 10h8v4H14zM26 10h8v4h-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path d="M18 14v22M30 14v22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 36h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="28" r="2" fill="currentColor" />
      <circle cx="30" cy="22" r="2" fill="currentColor" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden>
      <path
        d="M10 20 14 12h20l4 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 20h28v4c0 2-2 4-4 4s-4-2-4-4c0 2-2 4-4 4s-4-2-4-4c0 2-2 4-4 4s-4-2-4-4c0 2-2 4-4 4s-4-2-4-4v-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path d="M14 28v10h20V28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 38v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AssuranceIcon({ icon }: { icon: (typeof RUDRAKSH_ASSURANCE)[number]["icon"] }) {
  switch (icon) {
    case "leaf":
      return <LeafIcon />;
    case "caliper":
      return <CaliperIcon />;
    case "store":
      return <StoreIcon />;
    default:
      return null;
  }
}

function GoldStars() {
  return (
    <div className={styles['stars']} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={styles['star']} aria-hidden>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export function BilvaRudrakshAssurance({
  items = RUDRAKSH_ASSURANCE,
  reviews = RUDRAKSH_REVIEWS,
}: {
  items?: typeof RUDRAKSH_ASSURANCE;
  reviews?: typeof RUDRAKSH_REVIEWS;
}) {
  return (
    <section className={styles['assuranceSection']} aria-label="Trust, assurance and customer reviews">
      <div className={cn(BILVA_SITE_SHELL_CLASS, "py-6 sm:py-8")}>
        <div className={styles['assurancePanel']}>
          <div className={styles['sectionHeading']}>
            <span className={styles['sectionHeadingRule']} aria-hidden />
            <h2 className={styles['sectionHeadingTitle']}>Our Trust &amp; Assurance</h2>
            <span className={styles['sectionHeadingRule']} aria-hidden />
          </div>

          <div className={styles['assuranceGrid']}>
            {items.map((item) => (
              <article key={item.title} className={styles['assuranceCard']}>
                <div className={styles['assuranceIconWrap']}>
                  <AssuranceIcon icon={item.icon} />
                </div>
                <h3 className={styles['assuranceCardTitle']}>{item.title}</h3>
                <p className={styles['assuranceCardBody']}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(BILVA_SITE_SHELL_CLASS, styles['reviewsBlock'])}
        aria-labelledby="rudraksh-testimonials-heading"
      >
        <div className={styles['sectionHeading']}>
          <span className={styles['sectionHeadingRule']} aria-hidden />
          <h2 id="rudraksh-testimonials-heading" className={styles['sectionHeadingTitle']}>
            Words from our customers
          </h2>
          <span className={styles['sectionHeadingRule']} aria-hidden />
        </div>

        <div className={styles['reviewsGrid']}>
          {reviews.map((review, index) => (
            <article key={`${review.who}-${index}`} className={styles['reviewCard']}>
              <GoldStars />
              <div className={styles['quoteWrap']}>
                <span className={styles['quoteMark']} aria-hidden>
                  &ldquo;
                </span>
                <blockquote className={styles['quote']}>
                  {review.quote}
                  <span className={styles['quoteClose']} aria-hidden>
                    &rdquo;
                  </span>
                </blockquote>
              </div>
              <p className={styles['reviewWho']}>{review.who}</p>
            </article>
          ))}
        </div>

        <p className={styles['reviewsNote']}>
          Sample review layout — replace with verified customer feedback.
        </p>
        <hr className={styles['divider']} />
      </div>
    </section>
  );
}