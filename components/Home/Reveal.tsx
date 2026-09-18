"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type ElementType,
  type JSX,
  type ReactNode,
} from "react";

export type RevealVariant = "up" | "fade" | "scale";

/**
 * Entrance wrapper for the homepage.
 *
 * The markup it renders on the server is the VISIBLE markup — no hidden class,
 * no inline style. The hidden state is added on the client, before paint, and
 * only once `IntersectionObserver` is known to exist. So with JavaScript off
 * (or if anything here throws) every section stays readable.
 *
 * Children come in through `children`, so the sections that use this stay
 * server components.
 */

/** Hidden-state classes per variant. Defined in `app/globals.css`. */
const hiddenClass: Record<RevealVariant, string[]> = {
  up: ["reveal", "reveal-up"],
  fade: ["reveal", "reveal-fade"],
  scale: ["reveal", "reveal-scale"],
};

/** Matches the 500ms transition in `.reveal.is-animating`. */
const TRANSITION_MS = 500;

// `useLayoutEffect` warns when it runs during SSR, so fall back to `useEffect`
// on the server. The browser path is the one that matters: the hidden class
// must land before the first paint or the element would flash in visible.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  /** Stagger, in ms, applied as `transition-delay`. */
  delay?: number;
  variant?: RevealVariant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const Reveal = ({
  children,
  delay = 0,
  variant = "up",
  as = "div",
  className = "",
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support: leave the server markup alone, visible.
    if (typeof IntersectionObserver === "undefined") return;

    // Reduced motion: no hidden state, no observer, nothing to clean up.
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const classes = hiddenClass[variant];
    el.classList.add(...classes);
    if (delay > 0) el.style.transitionDelay = `${delay}ms`;

    let frame = 0;
    let timer = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;

        // 0.15 is the intended trigger. The second test is a safety net: if the
        // element was scrolled clean past between two observer samples it never
        // reaches 0.15, and without this it would stay at opacity 0 forever.
        const reached = entry.intersectionRatio >= 0.15;
        const scrolledPast = entry.boundingClientRect.bottom <= 0;
        if (!reached && !scrolledPast) return;

        // Entrance only: stop observing so scrolling back up never replays it.
        observer.disconnect();

        // `will-change` goes on a frame ahead of the transition, and comes off
        // once it has finished — leaving it on permanently costs memory.
        el.classList.add("is-animating");
        frame = window.requestAnimationFrame(() => {
          el.classList.add("is-visible");
          timer = window.setTimeout(
            () => {
              el.classList.remove("is-animating");
              el.style.transitionDelay = "";
            },
            delay + TRANSITION_MS + 50,
          );
        });
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
    };
  }, [delay, variant]);

  const Tag = as as ElementType;

  return (
    <Tag ref={ref} className={className || undefined}>
      {children}
    </Tag>
  );
};

export default Reveal;
