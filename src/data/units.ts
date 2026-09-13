import type { Unit } from "@/types/learning";

/**
 * Units group lessons inside a language.
 * `order` controls display order. Keep one beginner unit
 * per language for now; add more as content grows.
 */
export const units: Unit[] = [
  {
    id: "es-unit-1",
    languageId: "es",
    order: 1,
    title: "First words",
    description: "Say hello, be polite, introduce yourself.",
  },
  {
    id: "ja-unit-1",
    languageId: "ja",
    order: 1,
    title: "First words",
    description: "Greet politely and say simple phrases.",
  },
];

export function getUnitsForLanguage(languageId: string): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}
