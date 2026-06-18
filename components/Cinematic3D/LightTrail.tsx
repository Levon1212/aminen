"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, BufferGeometry, BufferAttribute, Color, Points } from "three";
import { CORRIDOR_ANCHORS } from "./sections";

const TRAIL_COUNT = 2200;
const PALETTE = ["#7dd3fc", "#a78bfa", "#fbbf24", "#34d399", "#f87171"];

export default function LightTrail() {
  const pointsRef = useRef<Points>(null);

  const { geometry } = useMemo(() => {
    const curve = new CatmullRomCurve3(CORRIDOR_ANCHORS, false, "catmullrom", 0.4);
    const geo = new BufferGeometry();
    const positions = new Float32Array(TRAIL_COUNT * 3);
    const colors = new Float32Array(TRAIL_COUNT * 3);
    const colorObj = new Color();

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = i / TRAIL_COUNT;
      const point = curve.getPointAt(t);
      const spread = 1.2 + Math.sin(t * Math.PI * 10) * 0.4;
      positions[i * 3] = point.x + (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = point.y + (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 2;

      colorObj.set(PALETTE[Math.floor(t * (PALETTE.length - 1))]);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }

    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("color", new BufferAttribute(colors, 3));
    return { geometry: geo };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}
