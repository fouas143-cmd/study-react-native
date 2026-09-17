import type { SupportedLanguage } from "@/types/learning";

/**
 * Supported languages. Beginner-friendly sample set.
 * Add a new language here, then add its units in `data/units.ts`
 * and its lessons in `data/lessons.ts`.
 */
export const languages: SupportedLanguage[] = [
  {
    id: "es",
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    tagline: "Greetings and everyday basics",
  },
  {
    id: "ja",
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    tagline: "First words and polite phrases",
  },
];

export const languageIds = languages.map((language) => language.id);

/** Returns the supported language with the given stable identifier. */
export function getLanguage(id: string): SupportedLanguage | undefined {
  return languages.find((language) => language.id === id);
}
