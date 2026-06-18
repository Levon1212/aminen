import { Metadata } from "next";
import CinematicHomepage from "@/components/Cinematic3D/CinematicHomepageLoader";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "ARMENIANINENGLISH — Learn Armenian in English with Margarita",
  description:
    "Friendly Armenian lessons for English speakers: alphabet, pronunciation, beginner grammar, culture notes, videos, and a beginner book by Margarita.",
};

async function fetchSettings(): Promise<Record<string, string>> {
  try {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/").replace(/\/$/, "");
    const res = await fetch(`${apiBase}/settings`, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const json = await res.json();
    return json.data || {};
  } catch {
    return {};
  }
}

/**
 * Resolves a setting image value to a usable `src` string.
 * - Absolute URL (http/https): used as-is (uploaded via admin)
 * - Starts with "/": used as-is (seeded static Next.js asset path)
 * - Relative storage path (legacy): builds full URL from API base
 * - Falsy: returns the hardcoded fallback
 */
function resolveImage(value: string | undefined | null, fallback: string): string {
  if (!value) return fallback;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return value;
  const storageBase = (process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8000/storage").replace(/\/$/, "");
  return `${storageBase}/${value}`;
}

export default async function Home() {
  const s = await fetchSettings();

  const heroSettings = {
    badge: s.hero_badge,
    titlePrefix: s.hero_title_prefix,
    name: s.hero_name,
    subtitle: s.hero_subtitle,
    tagline: s.hero_tagline,
    imageUrl: resolveImage(s.hero_image, "/images/hero/hero-light-v3.jpg"),
  };

  const aboutSettings = {
    tag: s.about_tag,
    titlePrefix: s.about_title_prefix,
    name: s.about_name,
    body: s.about_body,
    step1Title: s.about_step1_title,
    step1Body: s.about_step1_body,
    step2Title: s.about_step2_title,
    step2Body: s.about_step2_body,
    imageLightSrc: resolveImage(s.about_image_light, "/images/about/about-light-01.png"),
    imageDarkSrc: resolveImage(s.about_image_dark, "/images/about/about-dark-01.png"),
    tag2: s.about2_tag,
    title2Prefix: s.about2_title_prefix,
    highlighted2: s.about2_highlighted,
    body2: s.about2_body,
  };

  const ctaSettings = {
    title: s.cta_title,
    body: s.cta_body,
  };

  return (
    <main>
      <CinematicHomepage
        content={{
          hero: heroSettings,
          about: { name: aboutSettings.name, body: aboutSettings.body },
          cta: ctaSettings,
        }}
      />
    </main>
  );
}
