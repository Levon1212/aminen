"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";
import gsap from "gsap";

interface Props {
  position: [number, number, number];
  color: string;
  accentColor: string;
}

export default function LaptopWireframe({ position, color, accentColor }: Props) {
  const group = useRef<Group>(null);
  const screen = useRef<Mesh>(null);
  const screenGlow = useRef<Mesh>(null);

  useEffect(() => {
    if (!screenGlow.current) return;
    const material = screenGlow.current.material as { opacity: number };
    gsap.to(material, { opacity: 0.9, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true });
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group} position={position} rotation={[0.1, 0.5, 0]}>
      {/* base */}
      <mesh position={[0, -0.55, 0.6]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      {/* screen */}
      <mesh ref={screen} position={[0, 0.45, -0.1]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[2.4, 1.5, 0.08]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <mesh ref={screenGlow} position={[0, 0.45, -0.05]} rotation={[-0.25, 0, 0]}>
        <planeGeometry args={[2.1, 1.2]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
