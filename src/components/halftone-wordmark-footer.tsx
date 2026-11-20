"use client";

import * as React from "react";

export interface HalftonePalette {
  background: string;
  ink: string;
  warm: string;
}

export type HalftonePreset = "night" | "paper" | "ember" | "cobalt";

export type FooterLink = { label: string; href?: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterSocial = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export interface HalftoneWordmarkFooterProps {
  wordmark?: string;
  label?: string;
  meta?: string;
  columns?: FooterColumn[];
  legal?: FooterLink[];
  socials?: FooterSocial[];
  copyright?: string;
  status?: FooterLink | null;
  backToTop?: boolean;
  preset?: HalftonePreset;
  palette?: Partial<HalftonePalette>;
  dotGap?: number;
  radius?: number;
  crop?: number;
  grain?: number;
  interactive?: boolean;
  fontFamily?: string;
  fontWeight?: number;
  monoFamily?: string;
  height?: string;
  className?: string;
}

const PRESETS: Record<HalftonePreset, HalftonePalette> = {
  night: { background: "#0c0c0b", ink: "#e9e4da", warm: "#e9762b" },
  paper: { background: "#ffffff", ink: "#111111", warm: "#f97316" },
  ember: { background: "#160a06", ink: "#f2c48c", warm: "#ff5a1f" },
  cobalt: { background: "#0d1b4d", ink: "#dfe7ff", warm: "#ffcd3c" },
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: "Product", links: [{ label: "Platform", href: "#demo" }, { label: "Features", href: "#features" }, { label: "Lead Management", href: "#how-it-works" }, { label: "Team Management", href: "#team-management" }, { label: "Pricing", href: "#pricing" }] },
  { title: "Capabilities", links: [{ label: "Unified Inbox", href: "#features" }, { label: "AI Voice", href: "#features" }, { label: "Campaigns", href: "#features" }, { label: "Lead Groups", href: "#how-it-works" }] },
  { title: "Company", links: [{ label: "Book appointment", href: "/request-demo" }, { label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Refunds", href: "/refund" }] },
];

const DEFAULT_LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

const socialIcon = (d: string) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
);

const DEFAULT_SOCIALS: FooterSocial[] = [
  {
    label: "X",
    href: "https://x.com",
    icon: socialIcon(
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: socialIcon(
      "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5",
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: socialIcon(
      "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
    ),
  },
];

const SANS_STACK = '"Inter Tight", "Inter Variable", "Inter", "Helvetica Neue", Arial, system-ui, sans-serif';
const MONO_STACK = '"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace';

export function hwfHex(hex: string): [number, number, number] | null {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || "").trim());
  if (!match) return null;
  const value = match[1].length === 3 ? match[1].split("").map((char) => char + char).join("") : match[1];
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
}

export function hwfRadius(coverage: number, gap: number) {
  return Math.sqrt(Math.max(0, Math.min(1, coverage))) * gap * 0.56;
}

export function hwfStep(x: number, y: number, vx: number, vy: number, hx: number, hy: number, px: number, py: number, radius: number) {
  const dx = x - px;
  const dy = y - py;
  const distanceSquared = dx * dx + dy * dy;
  if (radius > 0 && distanceSquared < radius * radius) {
    const distance = Math.sqrt(distanceSquared) + 0.001;
    const force = (1 - distance / radius) * 2.6;
    vx += (dx / distance) * force;
    vy += (dy / distance) * force;
  }
  vx = (vx + (hx - x) * 0.05) * 0.84;
  vy = (vy + (hy - y) * 0.05) * 0.84;
  return [x + vx, y + vy, vx, vy] as const;
}

export function hwfWarmth(x: number, y: number, hx: number, hy: number, span: number) {
  return span > 0 ? Math.min(1, Math.hypot(x - hx, y - hy) / span) : 0;
}

const HWF_CSS = `
.hwf-root{position:relative;width:100%;isolation:isolate;background:var(--hwf-bg);color:var(--hwf-ink);-webkit-font-smoothing:antialiased}
.hwf-top{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,1fr));gap:24px;padding:clamp(22px,3.4vw,40px) clamp(20px,3.4vw,44px) 0;font-family:var(--hwf-sans);font-size:14px;letter-spacing:0;text-transform:none;line-height:1.75}
.hwf-brand strong{display:block;font-weight:700}.hwf-brand span{display:block;max-width:280px;margin-top:12px;opacity:.65;line-height:1.6}.hwf-col h3{margin:0;font:inherit;font-weight:600}.hwf-col ul{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px}
.hwf-col a,.hwf-up{color:inherit;text-decoration:none;opacity:.65;background:none;border:0;padding:0;font:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer;background-image:linear-gradient(currentColor,currentColor);background-size:0% 1px;background-repeat:no-repeat;background-position:0 100%;transition:opacity .25s ease,background-size .35s cubic-bezier(.2,.7,.1,1)}
.hwf-col a:hover,.hwf-up:hover{opacity:1;background-size:100% 1px}.hwf-col a:focus-visible,.hwf-up:focus-visible{outline:1px solid currentColor;outline-offset:3px;opacity:1}
.hwf-rule{position:relative;z-index:2;height:0;margin:clamp(14px,2vw,22px) clamp(20px,3.4vw,44px) 0;border-top:.5px solid color-mix(in srgb,var(--hwf-ink) 16%,transparent)}
.hwf-stage{position:relative;z-index:1;width:100%;overflow:hidden;height:var(--hwf-stage-height,320px)}
.hwf-stage canvas{position:absolute;inset:0;width:100%;height:100%;display:block;max-width:none}
.hwf-bar{position:relative;z-index:2;border-top:.5px solid color-mix(in srgb,var(--hwf-ink) 16%,transparent);background:var(--hwf-bg)}
.hwf-bar-inner{display:flex;flex-direction:column;gap:16px;max-width:72rem;margin:0 auto;padding:18px clamp(20px,3.4vw,44px);font-family:var(--hwf-sans);font-size:13px;line-height:1.4;color:color-mix(in srgb,var(--hwf-ink) 65%,transparent)}
.hwf-bar-left{display:flex;flex-wrap:wrap;align-items:center;gap:8px 20px}
.hwf-bar-right{display:flex;flex-wrap:wrap;align-items:center;gap:4px}
.hwf-bar a,.hwf-bar button{color:inherit;text-decoration:none;background:none;border:0;padding:0;font:inherit;cursor:pointer;opacity:.9;transition:opacity .2s ease,color .2s ease}
.hwf-bar a:hover,.hwf-bar button:hover{opacity:1;color:var(--hwf-ink)}
.hwf-status{display:inline-flex;align-items:center;gap:8px}
.hwf-status-dot{position:relative;display:inline-flex;width:8px;height:8px}
.hwf-status-dot i{position:absolute;inset:0;border-radius:999px;background:#22c55e}
.hwf-status-dot i:first-child{animation:hwf-ping 1.4s cubic-bezier(0,0,.2,1) infinite;opacity:.75}
.hwf-social{display:grid;place-items:center;width:36px;height:36px;border-radius:8px;transition:background .2s ease,color .2s ease}
.hwf-social:hover{background:color-mix(in srgb,var(--hwf-ink) 6%,transparent);color:var(--hwf-ink)}
.hwf-sep{display:inline-block;width:1px;height:16px;margin:0 8px;background:color-mix(in srgb,var(--hwf-ink) 16%,transparent)}
.hwf-topbtn{display:inline-flex;align-items:center;gap:6px;padding:0 4px;font-size:12px;font-weight:500}
.hwf-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@keyframes hwf-ping{75%,to{transform:scale(2);opacity:0}}
@media(min-width:640px){.hwf-bar-inner{flex-direction:row;align-items:center;justify-content:space-between}}
@media(max-width:720px){.hwf-top{grid-template-columns:minmax(0,1fr) minmax(0,1fr);row-gap:18px}.hwf-brand{grid-column:1/-1}}
@media(prefers-reduced-motion:reduce){.hwf-col a,.hwf-up,.hwf-bar a,.hwf-bar button{transition:none}.hwf-status-dot i:first-child{animation:none}}
`;

function hexColor(value: string, fallback: [number, number, number]) {
  return hwfHex(value) ?? fallback;
}

export default function HalftoneWordmarkFooter({
  wordmark = "NineBeam",
  label = "NineBeam",
  meta = "©2026 · Customer engagement platform",
  columns = DEFAULT_COLUMNS,
  legal = DEFAULT_LEGAL,
  socials = DEFAULT_SOCIALS,
  copyright = `© ${new Date().getFullYear()} NineBeam. All rights reserved.`,
  status = { label: "All systems operational", href: "#demo" },
  backToTop = true,
  preset = "night",
  palette,
  dotGap = 6,
  radius = 80,
  crop = 0.2,
  grain = 0.5,
  interactive = true,
  fontFamily = SANS_STACK,
  fontWeight = 800,
  monoFamily = MONO_STACK,
  height = "380px",
  className = "",
}: HalftoneWordmarkFooterProps) {
  const colors = { ...PRESETS[preset], ...palette };
  const rootRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const options = React.useRef({ colors, dotGap, radius, crop, grain, interactive, fontFamily, fontWeight, wordmark });
  options.current = { colors, dotGap, radius, crop, grain, interactive, fontFamily, fontWeight, wordmark };
  const renderKey = [wordmark, dotGap, crop, grain, fontFamily, fontWeight, colors.background, colors.ink, colors.warm].join("|");

  React.useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!root || !stage || !canvas || !context) return;

    let width = 0;
    let heightInPixels = 0;
    let dpr = 1;
    let pointerX = -1e5;
    let pointerY = -1e5;
    let animationFrame = 0;
    let visible = true;
    let awake = true;
    const ring = { x: 0, y: 0, time: -1 };
    let introStartedAt = performance.now();
    let dots = new Float32Array(0);
    let count = 0;
    let grainTile: HTMLCanvasElement | null = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const layout = () => {
      const current = options.current;
      const rect = stage.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      heightInPixels = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(heightInPixels * dpr);

      const mask = document.createElement("canvas");
      mask.width = width;
      mask.height = heightInPixels;
      const maskContext = mask.getContext("2d", { willReadFrequently: true });
      if (!maskContext) return;
      maskContext.font = `${current.fontWeight} 100px ${current.fontFamily}`;
      const word = current.wordmark || " ";
      const measured = maskContext.measureText(word).width;
      // Fit width first, then shrink to keep full glyphs inside the stage
      const widthBased = measured > 0 ? (width * 0.9 / measured) * 100 : 0;
      maskContext.font = `${current.fontWeight} ${widthBased}px ${current.fontFamily}`;
      let metrics = maskContext.measureText(word);
      let ascent = metrics.actualBoundingBoxAscent || widthBased * 0.72;
      let descent = metrics.actualBoundingBoxDescent || widthBased * 0.22;
      const padY = Math.max(10, Math.round(heightInPixels * 0.035));
      const maxGlyphH = Math.max(1, heightInPixels - padY * 2);
      const glyphH = Math.max(1, ascent + descent);
      const fontSize = widthBased * Math.min(1, maxGlyphH / glyphH);
      maskContext.font = `${current.fontWeight} ${fontSize}px ${current.fontFamily}`;
      metrics = maskContext.measureText(word);
      ascent = metrics.actualBoundingBoxAscent || fontSize * 0.72;
      descent = metrics.actualBoundingBoxDescent || fontSize * 0.22;
      // Sit directly above the below border line
      const baseline = Math.max(padY + ascent, heightInPixels - padY - descent);
      maskContext.fillStyle = "#000";
      maskContext.textBaseline = "alphabetic";
      maskContext.fillText(word, (width - metrics.width) / 2, baseline);
      const image = maskContext.getImageData(0, 0, width, heightInPixels).data;
      const gap = Math.max(3, current.dotGap);
      const generated: number[] = [];
      for (let gy = 0; gy < Math.ceil(heightInPixels / gap); gy++) {
        for (let gx = 0; gx < Math.ceil(width / gap); gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) for (let sx = 0; sx < 3; sx++) {
            const x = Math.min(width - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3));
            const y = Math.min(heightInPixels - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3));
            sum += image[(y * width + x) * 4 + 3];
          }
          const coverage = sum / (9 * 255);
          if (coverage < 0.06) continue;
          const homeX = gx * gap + gap / 2;
          const homeY = gy * gap + gap / 2;
          generated.push(homeX, homeY, 0, 0, homeX, homeY, hwfRadius(coverage, gap));
        }
      }
      dots = new Float32Array(generated);
      count = generated.length / 7;
      introStartedAt = performance.now();

      grainTile = document.createElement("canvas");
      grainTile.width = 256;
      grainTile.height = 256;
      const grainContext = grainTile.getContext("2d");
      if (grainContext) {
        const grainImage = grainContext.createImageData(256, 256);
        for (let i = 0; i < grainImage.data.length; i += 4) {
          const value = Math.random() * 255;
          grainImage.data[i] = grainImage.data[i + 1] = grainImage.data[i + 2] = value;
          grainImage.data[i + 3] = Math.random() < 0.5 ? 0 : 255;
        }
        grainContext.putImageData(grainImage, 0, 0);
      }
      awake = true;
    };

    const draw = (now: number) => {
      const current = options.current;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.fillStyle = current.colors.background;
      context.fillRect(0, 0, width, heightInPixels);
      const pushRadius = current.interactive && !reduced ? Math.max(0, current.radius) : 0;
      const ringAge = ring.time < 0 ? 1e9 : now - ring.time;
      const ringRadius = ringAge * 0.9;
      const introProgress = Math.min(1, Math.max(0, (now - introStartedAt) / 1100));
      const introEase = 1 - Math.pow(1 - introProgress, 3);
      const introScale = 1.04 - introEase * 0.04;
      const ink = hexColor(current.colors.ink, [233, 228, 218]);
      const warm = hexColor(current.colors.warm, [233, 118, 43]);
      let moving = false;
      for (let index = 0; index < count; index++) {
        const offset = index * 7;
        let x = dots[offset];
        let y = dots[offset + 1];
        let vx = dots[offset + 2];
        let vy = dots[offset + 3];
        const homeX = dots[offset + 4];
        const homeY = dots[offset + 5];
        if (!reduced) {
          if (ringAge < 900) {
            const dx = homeX - ring.x;
            const dy = homeY - ring.y;
            const distance = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(distance - ringRadius) / 26);
            if (band > 0) {
              const force = band * 3.2 * (1 - ringAge / 900);
              vx += (dx / distance) * force;
              vy += (dy / distance) * force;
            }
          }
          [x, y, vx, vy] = hwfStep(x, y, vx, vy, homeX, homeY, pointerX, pointerY, pushRadius);
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - homeX) + Math.abs(y - homeY) > 0.05) moving = true;
          else { x = homeX; y = homeY; vx = 0; vy = 0; }
          dots[offset] = x; dots[offset + 1] = y; dots[offset + 2] = vx; dots[offset + 3] = vy;
        }
        const warmth = hwfWarmth(x, y, homeX, homeY, 28);
        context.fillStyle = warmth > 0.02
          ? `rgb(${Math.round(ink[0] + (warm[0] - ink[0]) * warmth)},${Math.round(ink[1] + (warm[1] - ink[1]) * warmth)},${Math.round(ink[2] + (warm[2] - ink[2]) * warmth)})`
          : current.colors.ink;
        const visualX = width / 2 + (x - width / 2) * introScale;
        const visualY = heightInPixels / 2 + (y - heightInPixels / 2) * introScale;
        context.beginPath();
        context.arc(visualX, visualY, dots[offset + 6] * introScale, 0, Math.PI * 2);
        context.fill();
      }
      if (grainTile && current.grain > 0) {
        context.globalAlpha = Math.min(1, current.grain) * 0.09;
        context.globalCompositeOperation = "overlay";
        const pattern = context.createPattern(grainTile, "repeat");
        if (pattern) { context.fillStyle = pattern; context.fillRect(0, 0, width, heightInPixels); }
        context.globalAlpha = 1;
        context.globalCompositeOperation = "source-over";
      }
      awake = moving || ringAge < 900 || pointerX > -1e4 || introProgress < 1;
    };

    const loop = (now: number) => {
      animationFrame = 0;
      if (!visible) return;
      draw(now);
      if (awake) animationFrame = requestAnimationFrame(loop);
    };
    const wake = () => {
      awake = true;
      if (!animationFrame && visible) animationFrame = requestAnimationFrame(loop);
    };
    const localPointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      return [event.clientX - bounds.left, event.clientY - bounds.top];
    };
    const onMove = (event: PointerEvent) => {
      if (!options.current.interactive) return;
      [pointerX, pointerY] = localPointer(event);
      wake();
    };
    const onLeave = () => { pointerX = -1e5; pointerY = -1e5; wake(); };
    const onDown = (event: PointerEvent) => {
      if (!options.current.interactive || reduced || (event.target as HTMLElement).closest("a,button")) return;
      [ring.x, ring.y] = localPointer(event);
      ring.time = performance.now();
      wake();
    };

    layout();
    draw(performance.now());
    wake();
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointerdown", onDown);
    const resizeObserver = new ResizeObserver(() => { layout(); wake(); });
    resizeObserver.observe(stage);
    const intersectionObserver = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; if (visible) wake(); });
    intersectionObserver.observe(stage);
    let alive = true;
    document.fonts?.ready.then(() => { if (alive) { layout(); wake(); } });

    return () => {
      alive = false;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
    };
  }, [renderKey]);

  return (
    <footer
      ref={rootRef}
      className={`hwf-root ${className}`}
      style={
        {
          "--hwf-bg": colors.background,
          "--hwf-ink": colors.ink,
          "--hwf-mono": monoFamily,
          "--hwf-sans": fontFamily,
          "--hwf-stage-height": height,
        } as React.CSSProperties
      }
    >
      <style>{HWF_CSS}</style>
      <span className="hwf-sr">{wordmark}</span>
      <div className="hwf-top">
        <div className="hwf-brand"><strong>{label}</strong><span>{meta}</span></div>
        {columns.map((column) => (
          <nav className="hwf-col" key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>{column.links.map((link) => <li key={link.label}><a href={link.href || "#"}>{link.label}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="hwf-rule" aria-hidden="true" />
      <div className="hwf-stage" ref={stageRef}>
        <canvas ref={canvasRef} aria-hidden="true" />
      </div>
      <div className="hwf-bar">
        <div className="hwf-bar-inner">
          <div className="hwf-bar-left">
            <p>{copyright}</p>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legal.map((link) => (
                <a key={link.label} href={link.href || "#"}>
                  {link.label}
                </a>
              ))}
            </nav>
            {status ? (
              <a href={status.href || "#"} className="hwf-status">
                <span className="hwf-status-dot" aria-hidden="true">
                  <i />
                  <i />
                </span>
                {status.label}
              </a>
            ) : null}
          </div>
          <div className="hwf-bar-right">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="hwf-social">
                {s.icon}
              </a>
            ))}
            {backToTop ? (
              <>
                <span className="hwf-sep" aria-hidden="true" />
                <button
                  type="button"
                  className="hwf-topbtn"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "auto"
                        : "smooth",
                    })
                  }
                >
                  Back to top
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 19V5m-6 6 6-6 6 6" />
                  </svg>
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
