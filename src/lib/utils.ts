/**
 * Tiny class-name combiner (clsx-style, dependency-free).
 */
export function cn(
  ...classes: Array<string | number | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
