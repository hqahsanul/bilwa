"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GlyphMatrixProps extends React.HTMLAttributes<HTMLCanvasElement> {
  /** Characters to randomly pick from */
  glyphs?: string;
  /** Words related to PostPuls and radar velocity detection */
  words?: string[];
  /** Cell size in px (also font size) */
  cellSize?: number;
  /** Probability (0-1) a cell mutates each tick */
  mutationRate?: number;
  /** Tick interval in ms */
  interval?: number;
  /** Fade out toward bottom (0 = no fade) */
  fadeBottom?: number;
  /** Glyph color (any CSS color). Pass a theme-aware value from the consumer. */
  color?: string;
}

interface ActiveWord {
  text: string;
  col: number;
  row: number;
  startTime: number;
  formingDuration: number;
  holdDuration: number;
  dissolveDuration: number;
  charSeeds: number[];
}

interface RippleRing {
  cx: number;
  cy: number;
  radius: number;
  maxRadius: number;
  speed: number;
  thickness: number;
}

export const X_ALERT_WORDS = [
  "PostPuls",
  "Radar",
  "Breakout",
  "Velocity",
  "Early Reply",
  "Signal",
  "Spike",
  "Trending",
  "Top Spot",
  "15-Min Window",
  "Reply Headroom",
  "Watchlist",
  "High Reach",
  "Algorithm",
  "Viral Momentum",
  "Voice Draft",
  "Counter Take",
  "First Mover",
  "Engagement",
  "Sub-60s Alert",
  "Distribution",
  "Audience",
  "Impressions",
  "Smart Handoff",
  "Precision",
  "Live Scan",
  "Human in Loop",
  "No Bots",
  "ROI Lift",
  "Growth",
  "Creators",
  "VIP Accounts",
  "Thread Leader",
  "Realtime Feed",
];

const DEFAULT_WORDS = X_ALERT_WORDS;
const RADAR_GLYPHS = ["◎", "○", "●", "◌", "◦", "·", "✕", "✖", "✦", "⚡︎"];

/**
 * GlyphMatrix - an animated canvas grid where words ("PostPuls", "Radar", "Breakout", etc.)
 * and expanding circular radar waves organically materialize and dissolve among shifting glyphs.
 */
export function GlyphMatrix({
  glyphs = "PostPuls·○●◎◌✕✖⚡︎◦",
  words = DEFAULT_WORDS,
  cellSize = 14,
  mutationRate = 0.04,
  interval = 85,
  className,
  fadeBottom = 0.55,
  color = "#111111",
  style,
  ...props
}: GlyphMatrixProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rgbaRef = useRef({ r: 37, g: 99, b: 235, a: 1 });

  // Resolve the CSS color string to RGBA
  useEffect(() => {
    const probe = document.createElement("canvas");
    probe.width = 1;
    probe.height = 1;
    const probeCtx = probe.getContext("2d");
    if (!probeCtx) return;
    probeCtx.fillStyle = "#111111";
    probeCtx.fillStyle = color;
    probeCtx.fillRect(0, 0, 1, 1);
    const data = probeCtx.getImageData(0, 0, 1, 1).data;
    const r = data[0] ?? 37;
    const g = data[1] ?? 99;
    const b = data[2] ?? 235;
    const a = (data[3] ?? 255) / 255;
    rgbaRef.current = { r, g, b, a };
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let cells: string[] = [];
    let alphas: number[] = [];
    let raf = 0;
    const last = 0;
    let stopped = false;

    // Active words currently materializing in the grid
    let activeWords: ActiveWord[] = [];
    // Expanding circular wave ripples ("radar pings")
    let ripples: RippleRing[] = [];
    let nextRippleTime = performance.now() + 1200;

    const spawnWord = (now: number): ActiveWord | null => {
      if (cols < 8 || rows < 4) return null;

      const currentlyUsed = new Set(activeWords.map((w) => w.text.toLowerCase()));
      const available = words.filter(
        (w) => !currentlyUsed.has(w.toLowerCase()) && w.length < cols - 2
      );
      if (available.length === 0) return null;

      const text = available[Math.floor(Math.random() * available.length)];
      if (!text) return null;

      const maxCol = Math.max(1, cols - text.length - 2);
      const maxRow = Math.max(1, Math.floor(rows * 0.8));

      let col = Math.floor(1 + Math.random() * maxCol);
      let row = Math.floor(1 + Math.random() * maxRow);
      let placed = false;

      for (let attempt = 0; attempt < 30; attempt++) {
        const testCol = Math.floor(1 + Math.random() * maxCol);
        const testRow = Math.floor(1 + Math.random() * maxRow);

        const collides = activeWords.some((w) => {
          const rowDiff = Math.abs(testRow - w.row);
          if (rowDiff === 0) {
            const testEnd = testCol + text.length + 3;
            const wEnd = w.col + w.text.length + 3;
            return !(testEnd < w.col || testCol > wEnd);
          }
          if (rowDiff === 1) {
            const testEnd = testCol + text.length + 1;
            const wEnd = w.col + w.text.length + 1;
            return !(testEnd < w.col || testCol > wEnd);
          }
          return false;
        });

        if (!collides) {
          col = testCol;
          row = testRow;
          placed = true;
          break;
        }
      }

      if (!placed && activeWords.length >= 3) {
        return null;
      }

      const charSeeds = new Array(text.length)
        .fill(0)
        .map(() => Math.random());

      return {
        text,
        col,
        row,
        startTime: now + Math.random() * 600,
        formingDuration: 1200 + Math.random() * 400,
        holdDuration: 2800 + Math.random() * 1200,
        dissolveDuration: 1800 + Math.random() * 600,
        charSeeds,
      };
    };

    const spawnRipple = (cx: number, cy: number) => {
      ripples.push({
        cx,
        cy,
        radius: 0,
        maxRadius: Math.max(canvas.clientWidth, canvas.clientHeight) * 0.65,
        speed: 90 + Math.random() * 40,
        thickness: 35 + Math.random() * 20,
      });
      if (ripples.length > 3) ripples.shift();
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: w, clientHeight: h } = canvas;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / cellSize);
      rows = Math.ceil(h / cellSize);

      cells = new Array(cols * rows)
        .fill(0)
        .map(() => glyphs[Math.floor(Math.random() * glyphs.length)] ?? "·");
      alphas = new Array(cols * rows)
        .fill(0)
        .map(() => 0.04 + Math.random() * 0.28);

      const now = performance.now();
      const maxSimultaneous = Math.max(3, Math.min(10, Math.floor(cols / 11)));
      const targetWordCount = Math.min(words.length, maxSimultaneous);
      activeWords = [];

      for (let i = 0; i < targetWordCount; i++) {
        const word = spawnWord(now - (i * 900 + Math.random() * 600));
        if (word) activeWords.push(word);
      }
    };

    const draw = (now: number) => {
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      ctx.textBaseline = "top";
      const { r, g, b, a: colorAlpha } = rgbaRef.current;

      const dt = 0.016;
      ripples.forEach((rip) => {
        rip.radius += rip.speed * dt;
      });
      ripples = ripples.filter((rip) => rip.radius < rip.maxRadius);

      const wordCellMap = new Map<number, { char: string; boost: number; isBold: boolean }>();

      activeWords.forEach((aw) => {
        const elapsed = now - aw.startTime;
        if (elapsed < 0) return;

        const totalTime = aw.formingDuration + aw.holdDuration + aw.dissolveDuration;
        if (elapsed > totalTime) return;

        let globalFade = 1;
        let isDissolving = false;
        let dissolveRatio = 0;

        if (elapsed < aw.formingDuration) {
          const formRatio = Math.min(1, Math.max(0, elapsed / aw.formingDuration));
          globalFade = 0.2 + 0.75 * (formRatio * formRatio * (3 - 2 * formRatio));
        } else if (elapsed < aw.formingDuration + aw.holdDuration) {
          globalFade = 0.95;
        } else {
          isDissolving = true;
          const dissolveElapsed = elapsed - (aw.formingDuration + aw.holdDuration);
          dissolveRatio = Math.min(1, Math.max(0, dissolveElapsed / aw.dissolveDuration));
          const easeOut = 0.5 * (1 + Math.cos(Math.PI * dissolveRatio));
          globalFade = 0.95 * easeOut;
        }

        for (let j = 0; j < aw.text.length; j++) {
          const c = aw.col + j;
          if (c >= cols) break;
          const idx = aw.row * cols + c;

          const seed = aw.charSeeds[j] ?? 0.5;
          let char = aw.text[j] ?? "·";
          let charBoost = globalFade;

          if (elapsed < aw.formingDuration) {
            const formProgress = elapsed / aw.formingDuration;
            const threshold = (j / aw.text.length) * 0.55 + seed * 0.35;
            if (formProgress < threshold) {
              const glyphIdx = Math.floor((seed * 31 + elapsed * 0.005) % glyphs.length);
              char = glyphs[glyphIdx] ?? "·";
              charBoost = globalFade * 0.45;
            }
          } else if (isDissolving) {
            const charDissolveThreshold = (j / aw.text.length) * 0.35 + seed * 0.35;
            if (dissolveRatio > charDissolveThreshold) {
              const glyphIdx = Math.floor(seed * RADAR_GLYPHS.length) % RADAR_GLYPHS.length;
              char = RADAR_GLYPHS[glyphIdx] ?? "○";
            }
          }

          wordCellMap.set(idx, {
            char,
            boost: charBoost,
            isBold: true,
          });
        }
      });

      const maxSimultaneous = Math.max(3, Math.min(10, Math.floor(cols / 11)));
      const targetWordCount = Math.min(words.length, maxSimultaneous);
      activeWords = activeWords.filter((aw) => {
        const totalTime = aw.formingDuration + aw.holdDuration + aw.dissolveDuration;
        return now - aw.startTime <= totalTime;
      });

      while (activeWords.length < targetWordCount) {
        const newWord = spawnWord(now);
        if (newWord) activeWords.push(newWord);
        else break;
      }

      if (now > nextRippleTime) {
        const rx = (0.2 + Math.random() * 0.6) * w;
        const ry = (0.2 + Math.random() * 0.5) * h;
        spawnRipple(rx, ry);
        nextRippleTime = now + 3500 + Math.random() * 2500;
      }

      for (let y = 0; y < rows; y++) {
        const fade = fadeBottom > 0 ? 1 - (y / rows) * fadeBottom : 1;
        const py = y * cellSize;

        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const px = x * cellSize;

          const wordInfo = wordCellMap.get(i);
          let char = wordInfo ? wordInfo.char : (cells[i] ?? "·");
          let baseA = alphas[i] ?? 0.1;
          let ambientAlpha = baseA * fade;

          if (ripples.length > 0 && !wordInfo) {
            for (let k = 0; k < ripples.length; k++) {
              const rip = ripples[k];
              if (!rip) continue;
              const dist = Math.hypot(px - rip.cx, py - rip.cy);
              const diff = Math.abs(dist - rip.radius);
              if (diff < rip.thickness) {
                const waveFactor = 1 - diff / rip.thickness;
                baseA = Math.max(baseA, 0.45 * waveFactor * (1 - rip.radius / rip.maxRadius));
                ambientAlpha = baseA * fade;
                char = RADAR_GLYPHS[Math.floor(Math.random() * RADAR_GLYPHS.length)] ?? "◎";
                break;
              }
            }
          }

          const effectiveAlpha = wordInfo
            ? Math.max(ambientAlpha, wordInfo.boost)
            : ambientAlpha;
          const finalAlpha = Math.min(1, effectiveAlpha * colorAlpha);

          ctx.font = wordInfo?.isBold
            ? `600 ${cellSize - 1}px ui-monospace, SFMono-Regular, Menlo, monospace`
            : `400 ${cellSize - 1}px ui-monospace, SFMono-Regular, Menlo, monospace`;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
          ctx.fillText(char, px, py);
        }
      }
    };

    let lastMutation = 0;

    const tick = (t: number) => {
      if (stopped) return;

      if (t - lastMutation >= interval) {
        lastMutation = t;

        const total = cols * rows;
        const mutations = Math.max(1, Math.floor(total * mutationRate));

        for (let n = 0; n < mutations; n++) {
          const i = Math.floor(Math.random() * total);
          cells[i] = glyphs[Math.floor(Math.random() * glyphs.length)] ?? "·";
          alphas[i] = 0.04 + Math.random() * 0.28;
        }
      }

      draw(t);
      raf = requestAnimationFrame(tick);
    };

    resize();
    draw(performance.now());
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [glyphs, words, cellSize, mutationRate, interval, fadeBottom]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

export default GlyphMatrix;
