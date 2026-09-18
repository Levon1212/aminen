import type {
  LiveLessonHighlight,
  SectionContent,
  SectionTone,
} from "@/types/homeSettings";
import SectionShell from "./SectionShell";

/** The only intentionally hardcoded copy on the page, per the section brief. */
const HIGHLIGHTS: LiveLessonHighlight[] = [
  "1-on-1 with a teacher",
  "Flexible scheduling",
  "Live conversation practice",
];

const LiveLessonsSection = ({
  content,
  price,
  tone,
}: {
  content: SectionContent;
  price: string;
  tone: SectionTone;
}) => (
  <SectionShell
    tone={tone}
    eyebrow={content.eyebrow}
    title={content.title}
    body={content.body}
    ctaLabel={content.ctaLabel}
    ctaHref={content.ctaHref}
  >
    <div className="mx-auto max-w-c-1016 rounded-2xl border border-stroke bg-white p-8 text-center shadow-solid-11 md:p-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-waterloo">
        From
      </p>
      <p className="mt-2 text-[40px] font-bold leading-none text-primary md:text-[52px]">
        ${price}
      </p>
      <p className="mt-2 text-base text-waterloo">per lesson</p>

      <ul className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3 sm:gap-6 sm:text-center">
        {HIGHLIGHTS.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-3 rounded-xl bg-alabaster px-4 py-4 sm:flex-col sm:items-center sm:gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mt-0.5 shrink-0 text-primary sm:mt-0"
              aria-hidden="true"
            >
              <path
                d="M16.6667 5.83331L7.50004 15L3.33337 10.8333"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base font-medium text-black">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  </SectionShell>
);

export default LiveLessonsSection;
