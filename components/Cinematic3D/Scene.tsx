"use client";

import { useMemo } from "react";
import { CatmullRomCurve3 } from "three";
import CameraRig from "./CameraRig";
import LightTrail from "./LightTrail";
import SectionText from "./SectionText";
import LogoShatter from "./objects/LogoShatter";
import LaptopWireframe from "./objects/LaptopWireframe";
import NetworkWeb from "./objects/NetworkWeb";
import GlobeCompass from "./objects/GlobeCompass";
import BookPedestal from "./objects/BookPedestal";
import { CORRIDOR_ANCHORS, CinematicSectionData } from "./sections";

const OBJECTS_BY_ID: Record<string, typeof LogoShatter> = {
  hero: LogoShatter,
  "online-lessons": LaptopWireframe,
  "live-lessons": NetworkWeb,
  kids: GlobeCompass,
  knowledge: BookPedestal,
};

interface Props {
  sections: CinematicSectionData[];
}

export default function Scene({ sections }: Props) {
  const curve = useMemo(() => new CatmullRomCurve3(CORRIDOR_ANCHORS, false, "catmullrom", 0.4), []);

  return (
    <>
      <color attach="background" args={["#0b0b10"]} />
      <fog attach="fog" args={["#0b0b10", 6, 26]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 2]} intensity={2} color="#a78bfa" />

      <CameraRig />
      <LightTrail />

      {sections.map((section) => {
        const ObjectComponent = OBJECTS_BY_ID[section.id] ?? LogoShatter;
        const anchor = curve.getPointAt(section.t);
        return (
          <group key={section.id}>
            <ObjectComponent position={[anchor.x, anchor.y, anchor.z]} color={section.color} accentColor={section.accentColor} />
            <SectionText section={section} />
          </group>
        );
      })}
    </>
  );
}
