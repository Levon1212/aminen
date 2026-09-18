import Link from "next/link";
import type { ReactNode } from "react";
import type {
  SectionAccent,
  SectionSurface,
  SectionTone,
} from "@/types/homeSettings";
import { ArrowRightIcon } from "./icons";
import Reveal from "./Reveal";

/**
 * Focus treatment, split by the surface the control sits on. Every interactive
 * element on the homepage picks one of these so the ring stays visible.
 */
export const focusRing = {
  dark: "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-soft",
  light:
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
} as const;

/**
 * Shared button motion: a slight lift and brightening on hover, settling back
 * on press. Transform + filter only, so it can never shift the layout.
 */
export const buttonMotion =
  "transition duration-200 ease-out hover:brightness-110 hover:-translate-y-px active:translate-y-0";

/**
 * Arrow inside a CTA. Slides 4px right when the *parent link* is hovered, so
 * the link it sits in must carry `group`.
 */
export const arrowClass =
  "h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1";

/** Band backgrounds. The page alternates these to mark section boundaries. */
export const surfaceClass: Record<SectionSurface, string> = {
  dark: "bg-navy-900",
  "dark-alt": "bg-navy-800",
  light: "bg-ink-0",
  "light-tint": "bg-ink-100",
  "light-warm":
    "bg-ink-0 bg-linear-to-b from-accent-kids/10 via-ink-0 to-ink-0",
};

export const isExternal = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

/**
 * Eyebrow row: an icon chip followed by the uppercase section label. Exported
 * so the two sections that build their own two-column layout (YouTube, Amazon)
 * use the same chip as the ones that go through `SectionShell`.
 */
export const SectionEyebrow = ({
  tone,
  accent = "primary",
  icon,
  label,
  className = "",
}: {
  tone: SectionTone;
  accent?: SectionAccent;
  icon?: ReactNode;
  label: string;
  className?: string;
}) => {
  const chipClass =
    tone === "dark"
      ? "border-navy-line bg-navy-700 text-primary-soft"
      : accent === "kids"
      ? "border-accent-kids/40 bg-accent-kids/20 text-accent-kids"
      : // A hairline, because this chip also sits on ink-100 bands.
        "border-black/5 bg-ink-100 text-primary";

  const labelClass = tone === "dark" ? "text-onnavy-faint" : "text-waterloo";

  return (
    <div className={`mb-5 flex items-center gap-3 ${className}`}>
      {icon ? (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${chipClass}`}
        >
          {icon}
        </span>
      ) : null}
      <span
        className={`text-sm font-semibold tracking-[0.2em] uppercase ${labelClass}`}
      >
        {label}
      </span>
    </div>
  );
};

type SectionShellProps = {
  tone: SectionTone;
  surface?: SectionSurface;
  accent?: SectionAccent;
  icon?: ReactNode;
  /** `false` when the section renders its own CTA inside its content block. */
  showCta?: boolean;
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  children?: ReactNode;
};

/**
 * Shared layout for a homepage content section: eyebrow, H2, one paragraph
 * of body copy and a CTA link, followed by the section's own content block.
 */
const SectionShell = ({
  tone,
  surface,
  accent = "primary",
  icon,
  showCta = true,
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  children,
}: SectionShellProps) => {
  const resolvedSurface: SectionSurface =
    surface ?? (tone === "dark" ? "dark" : "light-tint");

  const titleClass = tone === "dark" ? "text-onnavy-strong" : "text-black";
  const bodyClass = tone === "dark" ? "text-onnavy-muted" : "text-waterloo";

  const ctaClassName =
    accent === "kids"
      ? `group mt-8 inline-flex items-center gap-2 rounded-full bg-accent-kids px-7 py-3 text-base font-semibold text-black hover:bg-accent-kids/85 ${buttonMotion} ${focusRing.light}`
      : tone === "dark"
      ? `group mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary-soft hover:text-onnavy-strong ${buttonMotion} ${focusRing.dark}`
      : `group mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primaryho ${buttonMotion} ${focusRing.light}`;

  const ctaContent = (
    <>
      {ctaLabel}
      <ArrowRightIcon className={arrowClass} />
    </>
  );

  return (
    <section className={`py-20 md:py-28 ${surfaceClass[resolvedSurface]}`}>
      <div className="max-w-c-1390 mx-auto px-4 md:px-8">
        <div className="max-w-c-1016 mx-auto text-center">
          {/* Eyebrow, heading, body and CTA enter as one short staggered run. */}
          <Reveal variant="fade">
            <SectionEyebrow
              tone={tone}
              accent={accent}
              icon={icon}
              label={eyebrow}
              className="justify-center"
            />
          </Reveal>

          <Reveal delay={60}>
            <h2
              className={`text-[28px] leading-tight font-bold sm:text-[34px] lg:text-[40px] lg:leading-[52px] ${titleClass}`}
            >
              {title}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p
              className={`max-w-c-1016 mx-auto mt-5 text-base leading-relaxed md:text-lg md:leading-8 ${bodyClass}`}
            >
              {body}
            </p>
          </Reveal>

          {showCta ? (
            <Reveal delay={180}>
              {isExternal(ctaHref) ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClassName}
                >
                  {ctaContent}
                </a>
              ) : (
                <Link href={ctaHref} className={ctaClassName}>
                  {ctaContent}
                </Link>
              )}
            </Reveal>
          ) : null}
        </div>

        {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
      </div>
    </section>
  );
};

export default SectionShell;
