const BASE_URL = import.meta.env.BASE_URL || "/";
const VALID_LETTERS = /^[A-Z]$/;

export function getLogoPath(): string {
  return `${BASE_URL}assets/logo.png`;
}

export function getReferenceImage(letter: string): string {
  const normalized = String(letter || "").trim().toUpperCase();
  if (!VALID_LETTERS.test(normalized)) {
    return getLogoPath();
  }
  return `${BASE_URL}assets/reference/${normalized}_test.jpg`;
}

export function handleReferenceImageError(event: Event): void {
  const img = event.currentTarget as HTMLImageElement | null;
  if (img) {
    img.src = getLogoPath();
  }
}
