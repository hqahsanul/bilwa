export function tpx(px: number, scale = 1): string {
  if (scale === 1) return `${px}px`;
  const v = px * scale;
  return `${Number.isInteger(v) ? v : v.toFixed(2)}px`;
}

export function tclamp(minRem: number, vw: number, maxRem: number, scale = 1): string {
  if (scale === 1) return `clamp(${minRem}rem, ${vw}vw, ${maxRem}rem)`;
  const b = (r: number) => `${r * scale}rem`;
  return `clamp(${b(minRem)}, ${vw * scale}vw, ${b(maxRem)})`;
}

export function tclampPx(minPx: number, vw: number, maxPx: number, scale = 1): string {
  if (scale === 1) return `clamp(${minPx}px, ${vw}vw, ${maxPx}px)`;
  const n = (px: number) => {
    const v = px * scale;
    return `${Number.isInteger(v) ? v : v.toFixed(2)}px`;
  };
  return `clamp(${n(minPx)}, ${vw * scale}vw, ${n(maxPx)})`;
}