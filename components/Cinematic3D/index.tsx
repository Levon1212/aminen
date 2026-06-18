"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Scene from "./Scene";
import { buildSections, CinematicContent } from "./sections";

interface Props {
  content: CinematicContent;
}

export default function CinematicHomepage({ content }: Props) {
  const sections = useMemo(() => buildSections(content), [content]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0b0b10]">
      <Canvas camera={{ position: [0, 0, 4], fov: 55, near: 0.1, far: 200 }} dpr={[1, 1.75]}>
        <Suspense fallback={null}>
          <ScrollControls pages={sections.length + 1.5} damping={0.25}>
            <Scene sections={sections} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
