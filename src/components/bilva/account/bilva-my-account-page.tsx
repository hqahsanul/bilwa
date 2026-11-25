"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  ChevronDown,
  FileText,
  Headset,
  Heart,
  Home,
  Mail,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import { MY_ACCOUNT_DATA } from "@/data/bilva/my-account";
import styles from "./bilva-my-account-page.module.css";

function TabIcon({ id }: { id: string }) {
  switch (id) {
    case "overview":
      return <Home size={16} strokeWidth={1.8} aria-hidden="true" />;
    case "orders":
      return <Package size={16} strokeWidth={1.8} aria-hidden="true" />;
    case "documents":
      return <FileText size={16} strokeWidth={1.8} aria-hidden="true" />;
    case "wishlist":
      return <Heart size={16} strokeWidth={1.8} aria-hidden="true" />;
    case "addresses":
      return <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />;
    case "profile":
      return <User size={16} strokeWidth={1.8} aria-hidden="true" />;
    case "support":
      return <Headset size={16} strokeWidth={1.8} aria-hidden="true" />;
    default:
      return <Settings size={16} strokeWidth={1.8} aria-hidden="true" />;
  }
}

function QuickCardIcon({ id }: { id: string }) {
  const className = "shrink-0 text-[#e08a1e]";
  switch (id) {
    case "orders":
      return (
        <Package size={28} strokeWidth={1.4} className={className} aria-hidden="true" />
      );
    case "saved":
      return (
        <Heart size={28} strokeWidth={1.4} className={className} aria-hidden="true" />
      );
    default:
      return (
        <Award size={28} strokeWidth={1.4} className={className} aria-hidden="true" />
      );
  }
}

function PreferenceIcon({ id }: { id: string }) {
  switch (id) {
    case "addresses":
      return <MapPin size={18} strokeWidth={1.6} aria-hidden="true" />;
    case "communication":
      return <Mail size={18} strokeWidth={1.6} aria-hidden="true" />;
    default:
      return <ShieldCheck size={18} strokeWidth={1.6} aria-hidden="true" />;
  }
}

export function BilvaMyAccountPage() {
  const {
    hero,
    tabs,
    quickCards,
    recentOrders,
    ownershipDocuments,
    savedPieces,
    help,
    preferences,
  } = MY_ACCOUNT_DATA;

  const headingId = useId();
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <section id="overview" className={styles["page"]} aria-labelledby={headingId}>
      {/* Hero banner */}
      <div className={BILVA_SITE_SHELL_CLASS}>
        <header className={styles["hero"]}>
          <div className={styles["heroBgWrap"]} aria-hidden="true">
            <Image
              src={hero.bannerImageSrc}
              alt={hero.bannerImageAlt}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
          <div className={styles["heroScrim"]} aria-hidden="true" />

          <div className={styles["heroContent"]}>
            <nav className={styles["crumbs"]} aria-label="Breadcrumb">
              {hero.breadcrumbs.map((crumb, index) => (
                <span key={crumb.label} className="inline-flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <Link href={crumb.href}>{crumb.label}</Link>
                </span>
              ))}
            </nav>

            <h1 id={headingId} className={styles["heroTitle"]}>
              {hero.title}
            </h1>
            <p className={styles["heroSub"]}>{hero.subtitle}</p>
            <Link href={hero.exploreHref} className={styles["exploreLink"]}>
              <span>{hero.exploreLabel}</span>
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </header>
      </div>

      {/* Sub-navigation tabs */}
      <nav className={styles["tabsBar"]} aria-label="Account navigation">
        <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["tabsTrack"]}`}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const isSettings = tab.id === "settings";
            return (
              <div key={tab.id} className="contents">
                {isSettings && index > 0 ? (
                  <span className={styles["tabDivider"]} aria-hidden="true" />
                ) : null}
                <Link
                  href={tab.href}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles["tabLink"]} ${
                    isActive ? styles["tabLinkActive"] : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <TabIcon id={tab.id} />
                  <span>{tab.label}</span>
                  {tab.hasChevron ? (
                    <ChevronDown size={13} strokeWidth={2} aria-hidden="true" />
                  ) : null}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Main dashboard content */}
      <div className={`${BILVA_SITE_SHELL_CLASS} ${styles["body"]}`}>
        {/* Quick links */}
        <section className={styles["quickGrid"]} aria-label="Account shortcuts">
          {quickCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className={`${styles["box"]} ${styles["quickCard"]}`}
            >
              <QuickCardIcon id={card.id} />
              <div>
                <strong className={styles["quickTitle"]}>{card.title}</strong>
                <span className={styles["goLink"]}>
                  {card.actionLabel}
                  <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* Recent orders + Ownership documents */}
        <section className={styles["splitGrid"]} aria-label="Orders and documents">
          <div id="recent-orders" className={`${styles["box"]} ${styles["ordersCard"]}`}>
            <h2 className={styles["sectionTitle"]}>{recentOrders.title}</h2>

            {recentOrders.items.map((item) => (
              <div key={item.id} className={styles["orderRow"]}>
                <div className={styles["orderThumb"]}>
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    sizes="124px"
                    className="object-cover"
                  />
                </div>

                <div className={styles["orderMid"]}>
                  <div>
                    <strong className={styles["orderName"]}>{item.title}</strong>
                    <small className={styles["orderSub"]}>{item.subtitle}</small>
                  </div>
                  <span
                    className={`${styles["pill"]} ${
                      item.statusTone === "transit"
                        ? styles["pillTransit"]
                        : styles["pillConfirmed"]
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                <div className={styles["orderActions"]}>
                  <Link
                    href={item.primaryActionHref}
                    className={`${styles["btn"]} ${
                      item.primaryActionStyle === "fill"
                        ? styles["btnFill"]
                        : styles["btnLine"]
                    }`}
                  >
                    <span>{item.primaryActionLabel}</span>
                    <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
                  </Link>
                  <Link
                    href={item.secondaryActionHref}
                    className={`${styles["btn"]} ${styles["btnLine"]}`}
                  >
                    {item.secondaryActionLabel}
                  </Link>
                </div>
              </div>
            ))}

            <p className={styles["orderNote"]}>{recentOrders.note}</p>
          </div>

          <div
            id="ownership-documents"
            className={`${styles["box"]} ${styles["ownCard"]}`}
          >
            <div>
              <h2 className={styles["sectionTitle"]}>
                {ownershipDocuments.title}
              </h2>
              <p className={styles["ownDesc"]}>
                {ownershipDocuments.description}
              </p>
              <Link
                href={ownershipDocuments.ctaHref}
                className={`${styles["btn"]} ${styles["btnCta"]}`}
              >
                <span>{ownershipDocuments.ctaLabel}</span>
                <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles["ownImageWrap"]}>
              <Image
                src={ownershipDocuments.imageSrc}
                alt={ownershipDocuments.imageAlt}
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Saved pieces */}
        <section
          id="saved-pieces"
          className={`${styles["box"]} ${styles["savedCard"]}`}
          aria-label={savedPieces.title}
        >
          <h2 className={styles["sectionTitle"]}>{savedPieces.title}</h2>
          <div className={styles["savedGrid"]}>
            {savedPieces.items.map((piece) => (
              <div key={piece.id} className={styles["pieceCard"]}>
                <div className={styles["pieceThumb"]}>
                  <Image
                    src={piece.imageSrc}
                    alt={piece.imageAlt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <strong className={styles["pieceName"]}>{piece.title}</strong>
                  <small className={styles["pieceSub"]}>{piece.subtitle}</small>
                  <Link href={piece.href} className={styles["goLink"]}>
                    <span>{piece.actionLabel}</span>
                    <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Help */}
        <section
          id="account-help"
          className={`${styles["box"]} ${styles["helpCard"]}`}
          aria-label={help.title}
        >
          <Headset
            size={38}
            strokeWidth={1.4}
            className="shrink-0 text-[#0b6f6c]"
            aria-hidden="true"
          />
          <span className={styles["vr"]} aria-hidden="true" />
          <div className={styles["bannerInfo"]}>
            <h3 className={styles["bannerTitle"]}>{help.title}</h3>
            <p className={styles["helpDesc"]}>{help.description}</p>
          </div>
          <Link
            href={help.ctaHref}
            className={`${styles["btn"]} ${styles["btnContact"]}`}
          >
            <span>{help.ctaLabel}</span>
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>

        {/* Preferences */}
        <section
          id="preferences"
          className={`${styles["box"]} ${styles["prefsCard"]}`}
          aria-label={preferences.title}
        >
          <Settings
            size={38}
            strokeWidth={1.4}
            className="shrink-0 text-[#e08a1e]"
            aria-hidden="true"
          />
          <span className={styles["vr"]} aria-hidden="true" />
          <div className={styles["bannerInfo"]}>
            <h3 className={styles["bannerTitle"]}>{preferences.title}</h3>
            <div className={styles["prefsLinks"]}>
              {preferences.links.map((item, idx) => (
                <span key={item.id} className="inline-flex items-center gap-3">
                  {idx > 0 ? (
                    <span className={styles["prefsSep"]} aria-hidden="true" />
                  ) : null}
                  <Link href={item.href} className={styles["prefsLinkItem"]}>
                    <PreferenceIcon id={item.id} />
                    <span>{item.label}</span>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <Link
            href={preferences.openHref}
            className={styles["prefsArrow"]}
            aria-label={preferences.openAriaLabel}
          >
            <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </section>
  );
}
