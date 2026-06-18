"use client";

import dynamic from "next/dynamic";
import { CinematicContent } from "./sections";

const CinematicHomepage = dynamic(() => import("./index"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#0b0b10]" />,
});

export default function CinematicHomepageLoader({ content }: { content: CinematicContent }) {
  return <CinematicHomepage content={content} />;
}
