"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import gsap from "gsap";

interface Props {
  position: [number, number, number];
  color: string;
  accentColor: string;
}

export default function GlobeCompass({ position, color, accentColor }: Props) {
  const group = useRef<Group>(null);
  const compass = useRef<Group>(null);

  useEffect(() => {
    if (!compass.current) return;
    gsap.to(compass.current.rotation, { z: Math.PI * 2, duration: 14, repeat: -1, ease: "none" });
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2;
  });

  return (
    <group ref={group} position={position}>
      {/* globe */}
      <mesh>
        <sphereGeometry args={[1.4, 18, 14]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      {/* compass rings */}
      <group ref={compass}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.1, 0.02, 8, 48]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[2.1, 0.02, 8, 48]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 2]} position={[0, 2.1, 0]}>
            <coneGeometry args={[0.08, 0.3, 6]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
