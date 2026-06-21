import { REFERENCE_IMAGE_VERSIONS } from "@/generated/referenceImageVersions";

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

  const version = REFERENCE_IMAGE_VERSIONS[normalized];
  const path = `${BASE_URL}assets/reference/${normalized}_test.jpg`;

  return version ? `${path}?v=${version}` : path;
}
