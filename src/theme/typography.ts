/**
 * Lingua design tokens — Typography
 * Font: Poppins (geometric sans-serif)
 * Source: prompt_material/01-design-system.png
 *
 * H1: Page / Screen Title — 32 / Bold / 1.2
 * H2: Section Title — 24 / SemiBold / 1.3
 * H3: Card / Module Title — 20 / SemiBold / 1.3
 * H4: Subheading — 16 / Medium / 1.4
 * Body Large: Important content — 16 / Regular / 1.6
 * Body Medium: Body text — 14 / Regular / 1.6
 * Body Small: Supporting text — 13 / Regular / 1.6
 * Caption: Labels, meta text — 11 / Regular / 1.4
 */

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export type FontWeightName = keyof typeof fontFamily;

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 13,
  caption: 11,
} as const;

export const lineHeight = {
  h1: 38.4, // 32 * 1.2
  h2: 31.2, // 24 * 1.3
  h3: 26, // 20 * 1.3
  h4: 22.4, // 16 * 1.4
  bodyLarge: 25.6, // 16 * 1.6
  bodyMedium: 22.4, // 14 * 1.6
  bodySmall: 20.8, // 13 * 1.6
  caption: 15.4, // 11 * 1.4
} as const;

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "bodyLarge"
  | "bodyMedium"
  | "bodySmall"
  | "caption";
