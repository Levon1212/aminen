"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Billboard, Text } from "@react-three/drei";
import { CatmullRomCurve3, Group } from "three";
import { CORRIDOR_ANCHORS, CinematicSectionData } from "./sections";

const FADE_WINDOW = 0.1;

interface Props {
  section: CinematicSectionData;
}

export default function SectionText({ section }: Props) {
  const scroll = useScroll();
  const group = useRef<Group>(null);

  const curve = useMemo(() => new CatmullRomCurve3(CORRIDOR_ANCHORS, false, "catmullrom", 0.4), []);
  const anchor = useMemo(() => curve.getPointAt(section.t), [curve, section.t]);

  useFrame(() => {
    if (!group.current) return;
    const dist = Math.abs(scroll.offset - section.t);
    const opacity = Math.max(0, 1 - dist / FADE_WINDOW);
    group.current.visible = opacity > 0.01;
    group.current.traverse((child) => {
      const text = child as unknown as { fillOpacity?: number };
      if (typeof text.fillOpacity === "number") text.fillOpacity = opacity;
    });
  });

  return (
    <group ref={group} position={[anchor.x + 2.6, anchor.y + 0.6, anchor.z]}>
      <Billboard>
        <Text fontSize={0.18} color={section.accentColor} anchorX="left" anchorY="bottom" position={[0, 1.05, 0]} letterSpacing={0.08}>
          {section.eyebrow.toUpperCase()}
        </Text>
        <Text fontSize={0.42} color="white" anchorX="left" anchorY="bottom" position={[0, 0.55, 0]} maxWidth={4}>
          {section.title}
        </Text>
        <Text fontSize={0.16} color="#e2e8f0" anchorX="left" anchorY="top" position={[0, 0.35, 0]} maxWidth={3.4}>
          {section.subtitle}
        </Text>
      </Billboard>
    </group>
  );
}
