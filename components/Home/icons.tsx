import type { SVGProps } from "react";

/**
 * Self-contained inline icons for the homepage and the shell.
 *
 * Every icon draws on a 24x24 grid in `currentColor`, so size comes from the
 * `width`/`height` props (or a `h-*`/`w-*` class) and colour from the parent's
 * text colour. Deliberately hand-rolled — the project carries no icon package.
 */
type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} satisfies IconProps;

const fillProps = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
} satisfies IconProps;

export const PlayCircleIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10.25 8.5 16 12l-5.75 3.5V8.5Z" />
  </svg>
);

export const VideoCallIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <rect x="3" y="6" width="12.5" height="12" rx="2.5" />
    <path d="m15.5 10.5 5.5-3v9l-5.5-3" />
  </svg>
);

export const ArticleIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <rect x="4" y="3" width="16" height="18" rx="2.5" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

export const KidsIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <path d="m12 3.5 2.6 5.27 5.82.85-4.21 4.1.99 5.78L12 16.77 6.8 19.5l.99-5.78-4.21-4.1 5.82-.85L12 3.5Z" />
  </svg>
);

export const YouTubeIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...fillProps} {...props}>
    <path d="M23.5 6.9a3 3 0 0 0-2.1-2.12C19.53 4.25 12 4.25 12 4.25s-7.53 0-9.4.53A3 3 0 0 0 .5 6.9C0 8.8 0 12 0 12s0 3.2.5 5.1a3 3 0 0 0 2.1 2.12c1.87.53 9.4.53 9.4.53s7.53 0 9.4-.53a3 3 0 0 0 2.1-2.12C24 15.2 24 12 24 12s0-3.2-.5-5.1ZM9.6 15.6V8.4l6.28 3.6-6.28 3.6Z" />
  </svg>
);

export const BookIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <path d="M12 6.75S10 4.5 4 4.5v13c6 0 8 2 8 2s2-2 8-2v-13c-6 0-8 2.25-8 2.25Z" />
    <path d="M12 6.75v12.75" />
  </svg>
);

export const ArrowRightIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const ExternalLinkIcon = ({ width = 24, height = 24, ...props }: IconProps) => (
  <svg width={width} height={height} {...strokeProps} {...props}>
    <path d="M14 4h6v6" />
    <path d="M20 4 10.5 13.5" />
    <path d="M18 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.5" />
  </svg>
);
