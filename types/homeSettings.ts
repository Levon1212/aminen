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

/** Background alternation, assigned by the page over the enabled sections. */
export type SectionTone = "white" | "tint";

/** The three static selling points rendered by the live-lessons panel. */
export type LiveLessonHighlight = string;
