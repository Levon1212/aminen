import Image from "next/image";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import {
  SectionEyebrow,
  buttonMotion,
  focusRing,
  surfaceClass,
} from "./SectionShell";
import Reveal from "./Reveal";
import { BookIcon } from "./icons";

/** Closing section of the homepage: the beginner book on Amazon. */
const AmazonSection = ({
  content,
  bookTitle,
  tone,
}: {
  content: SectionContent;
  bookTitle: string;
  tone: SectionTone;
}) => (
  <section className={`py-20 md:py-28 ${surfaceClass["dark-alt"]}`}>
    <div className="max-w-c-1390 mx-auto px-4 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="scale" delay={120}>
          <div className="flex justify-center lg:justify-start">
            <div className="shadow-navy-900/80 relative aspect-2/3 w-full max-w-[19rem] overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={content.image}
                alt={bookTitle}
                fill
                sizes="(max-width: 1024px) 60vw, 304px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div className="text-center lg:text-left">
            <SectionEyebrow
              tone={tone}
              icon={<BookIcon className="h-5 w-5" />}
              label={content.eyebrow}
              className="justify-center lg:justify-start"
            />
            <h2 className="text-onnavy-strong text-[28px] leading-tight font-bold sm:text-[34px] lg:text-[40px] lg:leading-[52px]">
              {content.title}
            </h2>
            <p className="text-onnavy-strong mt-4 text-lg font-semibold">
              {bookTitle}
            </p>
            <p className="text-onnavy-muted mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg md:leading-8 lg:mx-0">
              {content.body}
            </p>

            <a
              href={content.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-accent-amazon mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-base font-semibold text-black ${buttonMotion} ${focusRing.dark}`}
            >
              <BookIcon className="h-5 w-5" />
              {content.ctaLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default AmazonSection;
