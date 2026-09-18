import Image from "next/image";
import Link from "next/link";
import type { HeroContent } from "@/types/homeSettings";
import { ArrowRightIcon } from "./icons";
import {
  arrowClass,
  buttonMotion,
  focusRing,
  isExternal,
} from "./SectionShell";

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

  const primaryClass = `group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-center text-base font-medium text-white hover:bg-primaryho ${buttonMotion} ${focusRing.dark}`;
  const secondaryClass = `inline-flex items-center justify-center rounded-full border border-navy-line bg-transparent px-8 py-3.5 text-center text-base font-medium text-onnavy-strong hover:border-primary-soft hover:text-primary-soft ${buttonMotion} ${focusRing.dark}`;

  return (
    <section className="bg-navy-900 relative overflow-hidden">
      {/*
        Glow behind the image column — decoration only. It breathes very slowly
        between 0.85 and 1.0 opacity; nothing else about it moves, and the
        animation is dropped entirely under `prefers-reduced-motion`.
      */}
      <div
        aria-hidden="true"
        className="hero-glow bg-primary/20 pointer-events-none absolute top-0 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
      />

      <div className="max-w-c-1390 relative mx-auto flex min-h-[70vh] flex-col justify-center px-4 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/*
            Copy. The hero sits above the fold, so its entrance plays on load
            from CSS rather than on intersection — it needs no JavaScript.
          */}
          <div className="text-center lg:text-left">
            <span className="hero-enter border-navy-line bg-navy-700 text-primary-soft inline-block rounded-full border px-4 py-1.5 text-sm font-semibold">
              {badge}
            </span>

            <h1 className="hero-enter hero-delay-80 text-onnavy-strong mt-6 text-[32px] leading-tight font-bold sm:text-[40px] lg:text-[48px] lg:leading-[60px]">
              {title}
            </h1>

            <p className="hero-enter hero-delay-160 text-onnavy-muted mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg md:leading-8 lg:mx-0">
              {subtitle}
            </p>

            <p className="hero-enter hero-delay-240 text-primary-soft mt-4 text-base font-medium">
              {tagline}
            </p>

            <div className="hero-enter hero-delay-320 mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              {isExternal(primaryHref) ? (
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={primaryClass}
                >
                  {primaryLabel}
                  <ArrowRightIcon className={arrowClass} />
                </a>
              ) : (
                <Link href={primaryHref} className={primaryClass}>
                  {primaryLabel}
                  <ArrowRightIcon className={arrowClass} />
                </Link>
              )}

              {isExternal(secondaryHref) ? (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={secondaryClass}
                >
                  {secondaryLabel}
                </a>
              ) : (
                <Link href={secondaryHref} className={secondaryClass}>
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Image — a lit panel sitting on the navy. */}
          <div className="order-first lg:order-last">
            <div className="hero-enter hero-delay-200 border-navy-line bg-navy-800 shadow-navy-900/70 relative mx-auto aspect-4/5 w-full max-w-xs overflow-hidden rounded-2xl border shadow-2xl sm:max-w-sm">
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
