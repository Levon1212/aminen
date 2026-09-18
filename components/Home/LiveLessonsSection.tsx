import Link from "next/link";
import type {
  LiveLessonHighlight,
  SectionContent,
  SectionTone,
} from "@/types/homeSettings";
import SectionShell, {
  arrowClass,
  buttonMotion,
  focusRing,
  isExternal,
} from "./SectionShell";
import Reveal from "./Reveal";
import { CheckIcon, VideoCallIcon, ArrowRightIcon } from "./icons";

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
}) => {
  const ctaClassName = `group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-medium text-white hover:bg-primaryho ${buttonMotion} ${focusRing.light}`;

  const ctaContent = (
    <>
      {content.ctaLabel}
      <ArrowRightIcon className={arrowClass} />
    </>
  );

  return (
    <SectionShell
      tone={tone}
      surface="light-tint"
      icon={<VideoCallIcon className="h-5 w-5" />}
      showCta={false}
      eyebrow={content.eyebrow}
      title={content.title}
      body={content.body}
      ctaLabel={content.ctaLabel}
      ctaHref={content.ctaHref}
    >
      <Reveal variant="scale">
        <div className="max-w-c-1016 bg-ink-0 shadow-solid-7 mx-auto rounded-2xl p-8 text-center md:p-12">
          <p className="text-waterloo text-sm font-semibold tracking-[0.2em] uppercase">
            From
          </p>
          <p className="text-primary mt-2 text-[40px] leading-none font-bold md:text-[52px]">
            ${price}
          </p>
          <p className="text-waterloo mt-2 text-base">per lesson</p>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3 sm:gap-6 sm:text-center">
            {HIGHLIGHTS.map((highlight, index) => (
              // `as="li"` keeps the list semantics and the grid item intact.
              <Reveal
                key={highlight}
                as="li"
                variant="fade"
                delay={index * 80}
                className="bg-ink-100 flex items-start gap-3 rounded-xl px-4 py-4 sm:flex-col sm:items-center sm:gap-2"
              >
                <CheckIcon className="text-primary mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
                <span className="text-base font-medium text-black">
                  {highlight}
                </span>
              </Reveal>
            ))}
          </ul>

          {isExternal(content.ctaHref) ? (
            <a
              href={content.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              {ctaContent}
            </a>
          ) : (
            <Link href={content.ctaHref} className={ctaClassName}>
              {ctaContent}
            </Link>
          )}
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default LiveLessonsSection;
