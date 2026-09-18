import Link from "next/link";
import type { ReactNode } from "react";
import type { SectionTone } from "@/types/homeSettings";

type SectionShellProps = {
  tone: SectionTone;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  children?: ReactNode;
};

const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

/**
 * Shared layout for a homepage content section: eyebrow, H2, one paragraph
 * of body copy and a CTA link, followed by the section's own content block.
 */
const SectionShell = ({
  tone,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  children,
}: SectionShellProps) => {
  const ctaClassName =
    "mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-primaryho";

  const ctaArrow = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <section
      className={`py-20 md:py-28 ${tone === "tint" ? "bg-alabaster" : "bg-white"}`}
    >
      <div className="mx-auto max-w-c-1390 px-4 md:px-8">
        <div className="mx-auto max-w-c-1016 text-center">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
          <h2 className="text-[28px] font-bold leading-tight text-black sm:text-[34px] lg:text-[40px] lg:leading-[52px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-c-1016 text-base leading-relaxed text-waterloo md:text-lg md:leading-8">
            {body}
          </p>

          {isExternal(ctaHref) ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              {ctaLabel}
              {ctaArrow}
            </a>
          ) : (
            <Link href={ctaHref} className={ctaClassName}>
              {ctaLabel}
              {ctaArrow}
            </Link>
          )}
        </div>

        {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
      </div>
    </section>
  );
};

export default SectionShell;
