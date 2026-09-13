import type { Lesson } from "@/types/learning";

/**
 * Beginner sample lessons (2 per language).
 * Copy one lesson block to add more. IDs stay stable
 * so progress stores can reference them later.
 */
export const lessons: Lesson[] = [
  {
    id: "es-lesson-1",
    unitId: "es-unit-1",
    languageId: "es",
    order: 1,
    title: "Say hello",
    goals: ["Greet someone in Spanish", "Say goodbye politely"],
    xp: 10,
    vocabulary: [
      { id: "es-v-hola", word: "hola", translation: "hello", example: "¡Hola!" },
      { id: "es-v-adios", word: "adiós", translation: "goodbye", example: "¡Adiós!" },
      { id: "es-v-gracias", word: "gracias", translation: "thank you", example: "Gracias." },
    ],
    phrases: [
      { id: "es-p-hola", text: "¡Hola!", translation: "Hello!" },
      { id: "es-p-adios", text: "¡Adiós!", translation: "Goodbye!" },
    ],
    activities: [
      {
        id: "es-l1-a1",
        kind: "vocabulary",
        prompt: 'How do you say "hello"?',
        answer: "hola",
        options: ["hola", "adiós", "gracias"],
        hint: "It starts with H.",
      },
      {
        id: "es-l1-a2",
        kind: "phrase",
        prompt: 'Say "Goodbye!" in Spanish.',
        answer: "¡Adiós!",
        hint: "A-D-I-Ó-S.",
      },
      {
        id: "es-l1-a3",
        kind: "quiz",
        prompt: '"Gracias" means…',
        answer: "thank you",
        options: ["hello", "thank you", "goodbye"],
      },
    ],
    aiTeacherPrompt:
      "You are a warm, patient Spanish teacher for absolute beginners. " +
      "Teach only: hola (hello), adiós (goodbye), gracias (thank you). " +
      "Speak slowly, say each word twice, ask the learner to repeat aloud, " +
      "then praise every attempt. Keep the audio lesson under 2 minutes.",
  },
  {
    id: "es-lesson-2",
    unitId: "es-unit-1",
    languageId: "es",
    order: 2,
    title: "Be polite",
    goals: ["Say please and thank you", "Introduce yourself simply"],
    xp: 10,
    vocabulary: [
      { id: "es-v-porfavor", word: "por favor", translation: "please", example: "Por favor." },
      { id: "es-v-yo", word: "yo", translation: "I", example: "Yo soy Ana." },
      { id: "es-v-soy", word: "soy", translation: "I am", example: "Soy Ana." },
    ],
    phrases: [
      { id: "es-p-me-llamo", text: "Me llamo Ana.", translation: "My name is Ana." },
      { id: "es-p-por-favor", text: "Por favor.", translation: "Please." },
    ],
    activities: [
      {
        id: "es-l2-a1",
        kind: "vocabulary",
        prompt: 'How do you say "please"?',
        answer: "por favor",
        options: ["por favor", "gracias", "hola"],
      },
      {
        id: "es-l2-a2",
        kind: "phrase",
        prompt: 'Say "My name is Ana." in Spanish.',
        answer: "Me llamo Ana.",
        hint: "Starts with Me llamo…",
      },
      {
        id: "es-l2-a3",
        kind: "speaking",
        prompt: "Say your own name: “Me llamo …”.",
        answer: "Me llamo …",
        hint: "Any name counts — just try aloud.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, patient Spanish teacher for absolute beginners. " +
      "Teach only: por favor (please), me llamo (my name is). " +
      "Model “Me llamo Ana.”, then invite the learner to say their own name. " +
      "Correct gently, celebrate effort, keep the audio lesson under 2 minutes.",
  },
  {
    id: "ja-lesson-1",
    unitId: "ja-unit-1",
    languageId: "ja",
    order: 1,
    title: "Greet politely",
    goals: ["Say hello in Japanese", "Say thank you politely"],
    xp: 10,
    vocabulary: [
      {
        id: "ja-v-konnichiwa",
        word: "こんにちは",
        translation: "hello",
        pronunciation: "konnichiwa",
        example: "こんにちは。",
      },
      {
        id: "ja-v-arigato",
        word: "ありがとう",
        translation: "thank you",
        pronunciation: "arigatou",
        example: "ありがとう。",
      },
    ],
    phrases: [
      { id: "ja-p-konnichiwa", text: "こんにちは。", translation: "Hello." },
      { id: "ja-p-arigato", text: "ありがとう。", translation: "Thank you." },
    ],
    activities: [
      {
        id: "ja-l1-a1",
        kind: "vocabulary",
        prompt: 'How do you say "hello"?',
        answer: "こんにちは",
        options: ["こんにちは", "ありがとう", "さようなら"],
        hint: "Pronounced konnichiwa.",
      },
      {
        id: "ja-l1-a2",
        kind: "listening",
        prompt: "Listen and pick what you hear: “arigatou”.",
        answer: "ありがとう",
        options: ["こんにちは", "ありがとう", "さようなら"],
      },
      {
        id: "ja-l1-a3",
        kind: "quiz",
        prompt: '"ありがとう" means…',
        answer: "thank you",
        options: ["hello", "thank you", "goodbye"],
      },
    ],
    aiTeacherPrompt:
      "You are a warm, patient Japanese teacher for absolute beginners. " +
      "Teach only: こんにちは (konnichiwa, hello), ありがとう (arigatou, thank you). " +
      "Say each word slowly twice with romaji, ask the learner to repeat aloud, " +
      "then praise every attempt. Keep the audio lesson under 2 minutes.",
  },
  {
    id: "ja-lesson-2",
    unitId: "ja-unit-1",
    languageId: "ja",
    order: 2,
    title: "Say goodbye",
    goals: ["Say goodbye in Japanese", "Greet someone in the morning"],
    xp: 10,
    vocabulary: [
      {
        id: "ja-v-sayonara",
        word: "さようなら",
        translation: "goodbye",
        pronunciation: "sayounara",
        example: "さようなら。",
      },
      {
        id: "ja-v-ohayo",
        word: "おはよう",
        translation: "good morning",
        pronunciation: "ohayou",
        example: "おはよう。",
      },
    ],
    phrases: [
      { id: "ja-p-sayonara", text: "さようなら。", translation: "Goodbye." },
      { id: "ja-p-ohayo", text: "おはよう。", translation: "Good morning." },
    ],
    activities: [
      {
        id: "ja-l2-a1",
        kind: "vocabulary",
        prompt: 'How do you say "goodbye"?',
        answer: "さようなら",
        options: ["さようなら", "おはよう", "ありがとう"],
      },
      {
        id: "ja-l2-a2",
        kind: "phrase",
        prompt: 'Say "Good morning." in Japanese.',
        answer: "おはよう。",
        hint: "Pronounced ohayou.",
      },
      {
        id: "ja-l2-a3",
        kind: "speaking",
        prompt: "Greet your teacher: say “おはよう” aloud.",
        answer: "おはよう",
        hint: "Any attempt counts — just try aloud.",
      },
    ],
    aiTeacherPrompt:
      "You are a warm, patient Japanese teacher for absolute beginners. " +
      "Teach only: さようなら (sayounara, goodbye), おはよう (ohayou, good morning). " +
      "Contrast morning greeting vs goodbye, drill each twice with romaji, " +
      "then role-play a short goodbye. Keep the audio lesson under 2 minutes.",
  },
];

export function getLessonsForUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsForLanguage(languageId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}
