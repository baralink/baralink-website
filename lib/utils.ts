/** Joins class names, dropping the false ones (no dependency needed for the few we have). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

/** Stagger for the reveal animation of [data-rise] elements, in milliseconds. */
export function riseDelay(ms: number) {
  return { '--rise-delay': `${ms}ms` } as import('react').CSSProperties;
}
