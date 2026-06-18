import { Vector3 } from "three";

export interface CinematicSectionData {
  id: string;
  t: number; // 0..1 position along the corridor curve
  color: string;
  accentColor: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface CinematicContent {
  hero: { badge?: string; titlePrefix?: string; name?: string; subtitle?: string };
  about: { name?: string; body?: string };
  cta: { title?: string; body?: string };
}

export function buildSections(content: CinematicContent): CinematicSectionData[] {
  return [
    {
      id: "hero",
      t: 0,
      color: "#7dd3fc",
      accentColor: "#a78bfa",
      eyebrow: content.hero.badge || "EXPLORE LANGUAGES",
      title: content.hero.name || "Haylang",
      subtitle: content.hero.subtitle || "A cinematic journey into language, in 3D.",
    },
    {
      id: "online-lessons",
      t: 0.25,
      color: "#60a5fa",
      accentColor: "#38bdf8",
      eyebrow: "ONLINE LESSONS",
      title: "Self-Paced. Self-Premiere.",
      subtitle: "Easy & learn, anywhere, anytime.",
    },
    {
      id: "live-lessons",
      t: 0.5,
      color: "#fbbf24",
      accentColor: "#f97316",
      eyebrow: "LIVE LESSONS",
      title: "Book a Session",
      subtitle: "Real teachers, real conversation, live.",
    },
    {
      id: "kids",
      t: 0.7,
      color: "#34d399",
      accentColor: "#facc15",
      eyebrow: "FOR KIDS",
      title: "Fun for Ages 3+",
      subtitle: "Playful exploration, built for curious minds.",
    },
    {
      id: "knowledge",
      t: 0.95,
      color: "#f87171",
      accentColor: "#fb7185",
      eyebrow: "KNOWLEDGE BEYOND THE CLASSROOM",
      title: content.cta.title || "Articles. Books. Videos.",
      subtitle: content.cta.body || "Go further with our guide, articles, and channel.",
    },
  ];
}

// Anchor points the camera corridor curve passes through. Travels along -Z.
export const CORRIDOR_ANCHORS: Vector3[] = [
  new Vector3(0, 0, 0),
  new Vector3(1.5, 0.4, -18),
  new Vector3(-1.5, -0.3, -36),
  new Vector3(1.2, 0.6, -54),
  new Vector3(-1, 0.2, -72),
  new Vector3(0, 0, -90),
];
