const URL_LENGTH = 23;

export function weightedPostLength(value: string): number {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .reduce((total, token) => {
      if (/^https?:\/\//i.test(token)) return total + URL_LENGTH;
      return total + Array.from(token).reduce(
        (count, character) => count + (character.codePointAt(0)! > 0x7f ? 2 : 1),
        0,
      );
    }, 0);
}
