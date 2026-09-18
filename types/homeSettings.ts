/**
 * Shape of the flat `settings` key/value map returned by `GET /api/settings`,
 * plus the resolved content objects the homepage sections consume.
 *
 * Every field is resolved with a hardcoded English fallback in
 * `app/(site)/page.tsx`, so a missing or empty settings row never leaves a
 * section blank.
 */
export type SettingsMap = Record<string, string | null>;

export type HeroContent = {
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

/** Shared copy block behind every `home_{section}_*` settings group. */
export type SectionContent = {
  enabled: boolean;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

/**
 * Whether a band is authored on navy or on a light "island" surface. It drives
 * every text/border colour inside the section; the page assigns it per section.
 */
export type SectionTone = "dark" | "light";

/**
 * The exact band background. `tone` says which palette to read text from,
 * `surface` picks the shade within it so neighbouring bands stay legible
 * without any divider graphic.
 */
export type SectionSurface =
  | "dark" // navy-900
  | "dark-alt" // navy-800
  | "light" // ink-0
  | "light-tint" // ink-100
  | "light-warm"; // ink-0 under a soft warm wash

/** Which accent the eyebrow chip and CTA of a section are tinted with. */
export type SectionAccent = "primary" | "kids";

/** The three static selling points rendered by the live-lessons panel. */
export type LiveLessonHighlight = string;
