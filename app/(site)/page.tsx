import { Fragment, type ReactNode } from "react";
import type { Metadata } from "next";

import Hero from "@/components/Home/Hero";
import OnlineLessonsSection from "@/components/Home/OnlineLessonsSection";
import LiveLessonsSection from "@/components/Home/LiveLessonsSection";
import ArticlesSection from "@/components/Home/ArticlesSection";
import KidsSection from "@/components/Home/KidsSection";
import YouTubeSection from "@/components/Home/YouTubeSection";
import AmazonSection from "@/components/Home/AmazonSection";

import { resolveSettingImage } from "@/libs/imageHelper";
import type { Blog } from "@/types/blog";
import type { OnlineLesson } from "@/types/online-lesson";
import type {
  HeroContent,
  SectionContent,
  SectionTone,
  SettingsMap,
} from "@/types/homeSettings";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "ARMENIANINENGLISH — Learn Armenian in English with Margarita",
  description:
    "Friendly Armenian lessons for English speakers: alphabet, pronunciation, beginner grammar, culture notes, videos, and a beginner book by Margarita.",
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/"
).replace(/\/$/, "");

/**
 * One failed fetch must never blank the homepage, so every call resolves to
 * `null` and the caller falls back to its hardcoded copy / an empty list.
 */
async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return null;
  }
}

type SectionDefaults = {
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export default async function Home() {
  const [settingsRes, lessonsRes, articlesRes, kidsRes] = await Promise.all([
    fetchJson<{ data?: SettingsMap }>("/settings"),
    fetchJson<{ data?: OnlineLesson[] }>("/online-lessons"),
    fetchJson<{ data?: Blog[] }>("/articles"),
    fetchJson<{ data?: Blog[] }>("/kids-articles"),
  ]);

  const settings: SettingsMap = settingsRes?.data ?? {};
  const lessons: OnlineLesson[] = (lessonsRes?.data ?? []).slice(0, 3);
  const articles: Blog[] = (articlesRes?.data ?? []).slice(0, 3);
  const kidsArticles: Blog[] = (kidsRes?.data ?? []).slice(0, 3);

  const text = (key: string, fallback: string): string => {
    const value = settings[key];
    return value && value.trim() !== "" ? value : fallback;
  };

  const section = (key: string, defaults: SectionDefaults): SectionContent => ({
    enabled: settings[`home_${key}_enabled`] !== "0",
    eyebrow: text(`home_${key}_eyebrow`, defaults.eyebrow),
    title: text(`home_${key}_title`, defaults.title),
    body: text(`home_${key}_body`, defaults.body),
    ctaLabel: text(`home_${key}_cta_label`, defaults.ctaLabel),
    ctaHref: text(`home_${key}_cta_href`, defaults.ctaHref),
    image: resolveSettingImage(settings[`home_${key}_image`], defaults.image),
  });

  // `hero_title` is the key this page reads. The older seeded rows split the
  // same sentence across `hero_title_prefix` + `hero_name`, so fall back to
  // those before dropping to hardcoded copy.
  const seededHeroTitle = [settings.hero_title_prefix, settings.hero_name]
    .filter((part): part is string => !!part && part.trim() !== "")
    .join(" ");

  const hero: HeroContent = {
    badge: text("hero_badge", "Armenian in English"),
    title: text(
      "hero_title",
      seededHeroTitle || "Learn Armenian, taught in English",
    ),
    subtitle: text(
      "hero_subtitle",
      "Friendly, step-by-step lessons for English speakers — the alphabet, pronunciation, everyday phrases and the culture behind them.",
    ),
    tagline: text("hero_tagline", "Արի միասին սովորենք հայերեն։"),
    image: resolveSettingImage(
      settings.hero_image,
      "/images/hero/hero-light-v3.jpg",
    ),
    primaryLabel: text("hero_cta_primary_label", "Browse online lessons"),
    primaryHref: text("hero_cta_primary_href", "/online-lessons"),
    secondaryLabel: text("hero_cta_secondary_label", "Book a live lesson"),
    secondaryHref: text("hero_cta_secondary_href", "/live-lessons"),
  };

  const online = section("online", {
    eyebrow: "Online lessons",
    title: "Learn at your own pace",
    body: "Video courses you can start today and revisit whenever you like, built for absolute beginners and steady improvers alike.",
    ctaLabel: "See all online lessons",
    ctaHref: "/online-lessons",
    image: "/images/hero/hero-light-v3.jpg",
  });

  const live = section("live", {
    eyebrow: "Live lessons",
    title: "One-to-one lessons with a teacher",
    body: "Book a private hour and practise speaking with real feedback, at a time that fits your week.",
    ctaLabel: "Book a live lesson",
    ctaHref: "/live-lessons",
    image: "/images/hero/hero-light-v2.jpg",
  });

  const articlesSection = section("articles", {
    eyebrow: "Articles",
    title: "Free reading to build your foundations",
    body: "Short, practical write-ups on the alphabet, grammar, vocabulary and the everyday culture behind the language.",
    ctaLabel: "Read all articles",
    ctaHref: "/articles",
    image: "/images/hero/hero-light-v2.jpg",
  });

  const kids = section("kids", {
    eyebrow: "For kids",
    title: "Armenian for young learners",
    body: "Playful lessons and stories that introduce children to the Armenian alphabet, sounds and first words.",
    ctaLabel: "Explore the kids area",
    ctaHref: "/kids-articles",
    image: "/images/hero/hero-light-v2.jpg",
  });

  const youtube = section("youtube", {
    eyebrow: "YouTube",
    title: "Watch free lessons on YouTube",
    body: "New videos on pronunciation, the alphabet and everyday Armenian — free to watch, any time.",
    ctaLabel: "Watch on YouTube",
    ctaHref: "https://www.youtube.com/@HayLanguage",
    image: "/images/hero/hero-light-v2.jpg",
  });

  const amazon = section("amazon", {
    eyebrow: "The book",
    title: "Start with the beginner's book",
    body: "A gentle printed introduction to the Armenian alphabet and first conversations, written for English speakers.",
    ctaLabel: "Buy on Amazon",
    ctaHref: "https://a.co/d/aPsda2g",
    image: "/images/hero/hero-light-v3.jpg",
  });

  const youtubeHandle = text("home_youtube_handle", "@HayLanguage");
  const amazonBookTitle = text(
    "home_amazon_book_title",
    "Armenian in English — A Beginner's Guide",
  );

  const rawPrice = text("live_lesson_price", "30");
  const parsedPrice = Number(rawPrice);
  const livePrice = Number.isFinite(parsedPrice)
    ? String(parsedPrice)
    : rawPrice;

  // Only enabled sections are rendered, and the white / tinted rhythm is
  // assigned over that filtered list so a disabled section leaves no gap.
  const sections: { key: string; render: (tone: SectionTone) => ReactNode }[] =
    [];

  if (online.enabled) {
    sections.push({
      key: "online",
      render: (tone) => (
        <OnlineLessonsSection content={online} lessons={lessons} tone={tone} />
      ),
    });
  }

  if (live.enabled) {
    sections.push({
      key: "live",
      render: (tone) => (
        <LiveLessonsSection content={live} price={livePrice} tone={tone} />
      ),
    });
  }

  if (articlesSection.enabled) {
    sections.push({
      key: "articles",
      render: (tone) => (
        <ArticlesSection
          content={articlesSection}
          articles={articles}
          tone={tone}
        />
      ),
    });
  }

  if (kids.enabled) {
    sections.push({
      key: "kids",
      render: (tone) => (
        <KidsSection content={kids} articles={kidsArticles} tone={tone} />
      ),
    });
  }

  if (youtube.enabled) {
    sections.push({
      key: "youtube",
      render: (tone) => (
        <YouTubeSection content={youtube} handle={youtubeHandle} tone={tone} />
      ),
    });
  }

  if (amazon.enabled) {
    sections.push({
      key: "amazon",
      render: (tone) => (
        <AmazonSection
          content={amazon}
          bookTitle={amazonBookTitle}
          tone={tone}
        />
      ),
    });
  }

  return (
    <main>
      <Hero content={hero} />
      {sections.map((entry, index) => (
        <Fragment key={entry.key}>
          {entry.render(index % 2 === 0 ? "tint" : "white")}
        </Fragment>
      ))}
    </main>
  );
}
