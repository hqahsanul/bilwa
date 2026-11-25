"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Flower2,
  Gift,
  Info,
  Leaf,
  Truck,
} from "lucide-react";
import { BILVA_SITE_SHELL_CLASS } from "@/lib/bilva-site-shell";
import {
  MAKE_IT_PERSONAL_DATA,
  type PresentationOption,
} from "@/data/bilva/make-it-personal";
import styles from "./bilva-make-it-personal-page.module.css";

export function BilvaMakeItPersonalPage() {
  const {
    heading,
    subtitle,
    heroImageSrc,
    heroImageAlt,
    presentationTitle,
    presentationSubtitle,
    presentationOptions,
    giftMessageTitle,
    giftMessageSubtitle,
    defaultMessage,
    emptyPreviewMessage,
    maxMessageLength,
    engravingTitle,
    engravingPill,
    engravingNote,
    accordions,
    previewTitle,
    previewSubtitle,
    costSummaryTitle,
    costRowLabel,
    totalLabel,
    addLabel,
    skipLabel,
    addedStatus,
    skippedStatus,
  } = MAKE_IT_PERSONAL_DATA;

  const headingId = useId();
  const messageInputId = useId();

  const [selectedId, setSelectedId] =
    useState<PresentationOption["id"]>("classic-case");
  const [message, setMessage] = useState(defaultMessage);
  const [statusMessage, setStatusMessage] = useState("");

  const activeOption =
    presentationOptions.find((opt) => opt.id === selectedId) ??
    presentationOptions[0];
  const formattedPrice = `₹${activeOption.price.toLocaleString("en-IN")}`;
  const trimmedMessage = message.trim();

  return (
    <section className={styles["page"]} aria-labelledby={headingId}>
      <div className={BILVA_SITE_SHELL_CLASS}>
        <header className={styles["head"]}>
          <h1 id={headingId} className={styles["heading"]}>
            {heading}
          </h1>
          <p className={styles["subtitle"]}>{subtitle}</p>
        </header>

        <div className={styles["layout"]}>
          {/* Left hero photograph */}
          <div className={styles["hero"]}>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 35vw"
              className="object-cover"
            />
          </div>

          {/* Right personalisation panel */}
          <section className={styles["panel"]} aria-label="Personalisation">
            <div className={styles["main"]}>
              {/* Presentation */}
              <div className={styles["sec"]}>
                <fieldset className={styles["fieldset"]}>
                  <legend className={styles["secTitle"]}>
                    {presentationTitle}
                  </legend>
                  <p className={styles["secSub"]}>{presentationSubtitle}</p>
                  <div className={styles["opts"]}>
                    {presentationOptions.map((option) => {
                      const isSelected = selectedId === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`${styles["opt"]} ${
                            isSelected ? styles["optSelected"] : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="presentation"
                            value={option.id}
                            checked={isSelected}
                            onChange={() => setSelectedId(option.id)}
                            className={styles["radioInput"]}
                          />
                          <div>
                            <strong className={styles["optTitle"]}>
                              {option.label}
                            </strong>
                            <span className={styles["optDesc"]}>
                              {option.description}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Gift message */}
              <div className={styles["sec"]}>
                <label htmlFor={messageInputId} className={styles["secTitle"]}>
                  {giftMessageTitle}
                </label>
                <p className={styles["secSub"]}>{giftMessageSubtitle}</p>
                <textarea
                  id={messageInputId}
                  maxLength={maxMessageLength}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles["textarea"]}
                />
                <div className={styles["charCount"]}>
                  {message.length} / {maxMessageLength}
                </div>
              </div>

              {/* Engraving */}
              <div className={styles["sec"]}>
                <div className={styles["engRow"]}>
                  <h2 className={styles["secTitle"]}>{engravingTitle}</h2>
                  <span className={styles["pill"]}>{engravingPill}</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked="false"
                    aria-disabled="true"
                    aria-label="Engraving (not available)"
                    tabIndex={-1}
                    className={styles["switchDisabled"]}
                  />
                </div>
                <p className={styles["note"]}>
                  <Info size={14} strokeWidth={1.8} aria-hidden="true" />
                  <span>{engravingNote}</span>
                </p>
              </div>

              {/* Accordions */}
              <div className={styles["accWrap"]}>
                {accordions.map((item) => (
                  <details key={item.id} className={styles["acc"]}>
                    <summary className={styles["accSummary"]}>
                      {item.id === "packaging" ? (
                        <Gift size={18} strokeWidth={1.6} aria-hidden="true" />
                      ) : (
                        <Truck size={18} strokeWidth={1.6} aria-hidden="true" />
                      )}
                      <span>{item.title}</span>
                      <ChevronDown
                        size={15}
                        strokeWidth={1.8}
                        className={styles["accChevron"]}
                        aria-hidden="true"
                      />
                    </summary>
                    <p className={styles["accBody"]}>{item.body}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Live preview & cost summary */}
            <aside className={styles["side"]} aria-label="Preview and cost">
              <h2 className={styles["sideTitle"]}>{previewTitle}</h2>
              <p className={styles["sideSub"]}>{previewSubtitle}</p>

              <div className={styles["previewCard"]} aria-live="polite">
                <Leaf
                  size={52}
                  strokeWidth={1.1}
                  className={styles["leafA"]}
                  aria-hidden="true"
                />
                <Leaf
                  size={52}
                  strokeWidth={1.1}
                  className={styles["leafB"]}
                  aria-hidden="true"
                />
                <div>
                  <div className={styles["brandCrest"]}>
                    <Flower2
                      size={15}
                      strokeWidth={1.8}
                      className="text-[#b98a3e]"
                      aria-hidden="true"
                    />
                    <span>BILWA</span>
                  </div>
                  <p
                    className={`${styles["previewMsg"]} ${
                      !trimmedMessage ? styles["previewMsgEmpty"] : ""
                    }`}
                  >
                    {trimmedMessage ? message : emptyPreviewMessage}
                  </p>
                  <div className={styles["orn"]} aria-hidden="true">
                    <span className={styles["ornDiamond"]} />
                  </div>
                </div>
              </div>

              <div className={styles["costBox"]}>
                <h3 className={styles["costTitle"]}>{costSummaryTitle}</h3>
                <div className={styles["costRow"]}>
                  <span>{costRowLabel}</span>
                  <span>{formattedPrice}</span>
                </div>
                <div className={styles["totalBox"]}>
                  <span>{totalLabel}</span>
                  <strong>{formattedPrice}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStatusMessage(addedStatus)}
                className={styles["addBtn"]}
              >
                {addLabel}
              </button>
              <button
                type="button"
                onClick={() => setStatusMessage(skippedStatus)}
                className={styles["skipBtn"]}
              >
                {skipLabel}
              </button>
              <p className={styles["status"]} role="status" aria-live="polite">
                {statusMessage}
              </p>
            </aside>
          </section>
        </div>
      </div>
    </section>
  );
}
