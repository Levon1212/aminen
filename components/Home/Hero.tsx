import Image from "next/image";
import Link from "next/link";
import type { HeroContent } from "@/types/homeSettings";

const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

const Hero = ({ content }: { content: HeroContent }) => {
  const {
    badge,
    title,
    subtitle,
    tagline,
    image,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
  } = content;

  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[70vh] max-w-c-1390 flex-col justify-center px-4 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-zumthor px-4 py-1.5 text-sm font-semibold text-primary">
              {badge}
            </span>

            <h1 className="mt-6 text-[32px] font-bold leading-tight text-black sm:text-[40px] lg:text-[48px] lg:leading-[60px]">
              {title}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-waterloo md:text-lg md:leading-8 lg:mx-0">
              {subtitle}
            </p>

            <p className="mt-4 text-base font-medium text-primary md:text-lg">
              {tagline}
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              {isExternal(primaryHref) ? (
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary px-8 py-3.5 text-center text-base font-medium text-white transition-colors duration-200 hover:bg-primaryho"
                >
                  {primaryLabel}
                </a>
              ) : (
                <Link
                  href={primaryHref}
                  className="rounded-full bg-primary px-8 py-3.5 text-center text-base font-medium text-white transition-colors duration-200 hover:bg-primaryho"
                >
                  {primaryLabel}
                </Link>
              )}

              {isExternal(secondaryHref) ? (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-stroke px-8 py-3.5 text-center text-base font-medium text-black transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  {secondaryLabel}
                </a>
              ) : (
                <Link
                  href={secondaryHref}
                  className="rounded-full border border-stroke px-8 py-3.5 text-center text-base font-medium text-black transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <div className="relative mx-auto aspect-4/5 w-full max-w-xs overflow-hidden rounded-2xl border border-stroke shadow-solid-8 sm:max-w-sm">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 90vw, 384px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
