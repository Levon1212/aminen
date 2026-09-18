import Image from "next/image";
import type { SectionContent, SectionTone } from "@/types/homeSettings";

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
  <section
    className={`py-20 md:py-28 ${tone === "tint" ? "bg-alabaster" : "bg-white"}`}
  >
    <div className="mx-auto max-w-c-1390 px-4 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-stroke bg-zumthor shadow-solid-8">
          <Image
            src={content.image}
            alt={content.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="text-center lg:text-left">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {content.eyebrow}
          </span>
          <h2 className="text-[28px] font-bold leading-tight text-black sm:text-[34px] lg:text-[40px] lg:leading-[52px]">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-waterloo md:text-lg md:leading-8 lg:mx-0">
            {content.body}
          </p>
          <p className="mt-4 text-base font-medium text-black">{handle}</p>

          <a
            href={content.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#ff0000] px-7 py-3 text-base font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19.58 2.19a2.5 2.5 0 0 0-1.76-1.77C16.25 0 10 0 10 0S3.75 0 2.18.42A2.5 2.5 0 0 0 .42 2.19C0 3.76 0 7 0 7s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C3.75 14 10 14 10 14s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C20 10.24 20 7 20 7s0-3.24-.42-4.81ZM8 10V4l5.2 3L8 10Z"
                fill="currentColor"
              />
            </svg>
            {content.ctaLabel}
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default YouTubeSection;
