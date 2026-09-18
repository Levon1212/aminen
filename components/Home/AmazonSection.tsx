import Image from "next/image";
import type { SectionContent, SectionTone } from "@/types/homeSettings";

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
  <section
    className={`py-20 md:py-28 ${tone === "tint" ? "bg-alabaster" : "bg-white"}`}
  >
    <div className="mx-auto max-w-c-1390 px-4 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          <div className="relative aspect-2/3 w-full max-w-[19rem] overflow-hidden rounded-xl shadow-solid-7">
            <Image
              src={content.image}
              alt={bookTitle}
              fill
              sizes="(max-width: 1024px) 60vw, 304px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {content.eyebrow}
          </span>
          <h2 className="text-[28px] font-bold leading-tight text-black sm:text-[34px] lg:text-[40px] lg:leading-[52px]">
            {content.title}
          </h2>
          <p className="mt-4 text-lg font-semibold text-black">{bookTitle}</p>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-waterloo md:text-lg md:leading-8 lg:mx-0">
            {content.body}
          </p>

          <a
            href={content.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-blackho"
          >
            {content.ctaLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default AmazonSection;
