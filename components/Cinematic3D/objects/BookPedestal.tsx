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

export default function BookPedestal({ position, color, accentColor }: Props) {
  const group = useRef<Group>(null);
  const playButton = useRef<Mesh>(null);

  useEffect(() => {
    if (!playButton.current) return;
    gsap.to(playButton.current.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group} position={position}>
      {/* pedestal */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[1.4, 1.6, 0.4, 24]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>

      {/* open book */}
      <group position={[-1.6, -0.6, 0]}>
        <mesh rotation={[0, -0.4, 0]} position={[0.4, 0, 0]}>
          <boxGeometry args={[0.9, 0.04, 1.1]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
        <mesh rotation={[0, 0.4, 0]} position={[-0.4, 0, 0]}>
          <boxGeometry args={[0.9, 0.04, 1.1]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>

      {/* glass article panels */}
      <group position={[0, -0.2, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, i * 0.35, 0]}>
            <planeGeometry args={[0.9, 0.5]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.18 + i * 0.05} side={2} />
          </mesh>
        ))}
      </group>

      {/* youtube play button */}
      <mesh ref={playButton} position={[1.7, -0.4, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.22, 24]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
    </group>
  );
}
