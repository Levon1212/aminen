import Image from "next/image";
import type { SectionContent, SectionTone } from "@/types/homeSettings";
import {
  SectionEyebrow,
  buttonMotion,
  focusRing,
  surfaceClass,
} from "./SectionShell";
import Reveal from "./Reveal";
import { YouTubeIcon } from "./icons";

/** Plain link out to the channel — deliberately no embedded player. */
const YouTubeSection = ({
  content,
  handle,
  tone,
}: {
  content: SectionContent;
  handle: string;
  tone: SectionTone;
}) => (
  <section className={`py-20 md:py-28 ${surfaceClass.dark}`}>
    <div className="max-w-c-1390 mx-auto px-4 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="scale" delay={120}>
          <div className="border-navy-line bg-navy-800 shadow-navy-900/70 relative aspect-16/9 w-full overflow-hidden rounded-2xl border shadow-2xl">
            <Image
              src={content.image}
              alt={content.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal variant="up">
          <div className="text-center lg:text-left">
            <SectionEyebrow
              tone={tone}
              icon={<YouTubeIcon className="h-5 w-5" />}
              label={content.eyebrow}
              className="justify-center lg:justify-start"
            />
            <h2 className="text-onnavy-strong text-[28px] leading-tight font-bold sm:text-[34px] lg:text-[40px] lg:leading-[52px]">
              {content.title}
            </h2>
            <p className="text-onnavy-muted mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg md:leading-8 lg:mx-0">
              {content.body}
            </p>
            <p className="text-onnavy-faint mt-4 text-base font-medium">
              {handle}
            </p>

            <a
              href={content.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-accent-youtube mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-base font-semibold text-white ${buttonMotion} ${focusRing.dark}`}
            >
              <YouTubeIcon className="h-5 w-5" />
              {content.ctaLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default YouTubeSection;
