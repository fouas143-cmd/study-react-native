/**
 * Shared learning content types.
 * All lesson content is hardcoded TypeScript (no database).
 * Keep shapes small and readable so students can extend them.
 */

export type LanguageId = string;

export interface SupportedLanguage {
  id: LanguageId;
  /** BCP-47-ish short code, e.g. "es", "ja". */
  code: string;
  /** Display name in the learner's language, e.g. "Spanish". */
  name: string;
  /** Name in its own language, e.g. "Español". */
  nativeName: string;
  /** Flag emoji for course cards. */
  flag: string;
  /** One-line pitch shown on language selection. */
  tagline: string;
}

export interface Unit {
  id: string;
  languageId: LanguageId;
  /** 1-based order inside the language. */
  order: number;
  title: string;
  description: string;
}

export type ActivityKind =
  | "vocabulary"
  | "phrase"
  | "listening"
  | "speaking"
  | "quiz";

export interface Activity {
  id: string;
  kind: ActivityKind;
  /** What the learner sees, e.g. 'How do you say "Hello"?'. */
  prompt: string;
  /** Correct answer. */
  answer: string;
  /** Multiple-choice options (quiz/vocabulary). Omit for open response. */
  options?: string[];
  /** Optional hint shown after a wrong attempt. */
  hint?: string;
}

export interface VocabItem {
  id: string;
  word: string;
  translation: string;
  /** Pronunciation helper, e.g. romaji for Japanese. */
  pronunciation?: string;
  /** Short usage example in the target language. */
  example?: string;
}

export interface Phrase {
  id: string;
  text: string;
  translation: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: LanguageId;
  /** 1-based order inside the unit. */
  order: number;
  title: string;
  /** What the learner will be able to do after this lesson. */
  goals: string[];
  /** XP awarded on completion. */
  xp: number;
  vocabulary: VocabItem[];
  phrases: Phrase[];
  activities: Activity[];
  /**
   * System prompt for the future audio-based AI teacher
   * (Stream Vision Agent). Stored with content now so lessons
   * are voice-ready later; never contains secrets.
   */
  aiTeacherPrompt: string;
}
