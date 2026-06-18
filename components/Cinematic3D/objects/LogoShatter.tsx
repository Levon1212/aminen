"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, BufferGeometry, BufferAttribute } from "three";
import gsap from "gsap";

interface Props {
  position: [number, number, number];
  color: string;
  accentColor: string;
}

const PARTICLE_COUNT = 600;

export default function LogoShatter({ position, color, accentColor }: Props) {
  const group = useRef<Group>(null);
  const coreRef = useRef<Group>(null);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => {
    if (!coreRef.current) return;
    gsap.fromTo(
      coreRef.current.scale,
      { x: 0.4, y: 0.4, z: 0.4 },
      { x: 1, y: 1, z: 1, duration: 2.4, ease: "elastic.out(1, 0.5)", repeat: -1, repeatDelay: 3, yoyo: true },
    );
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={group} position={position}>
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </group>
      <points geometry={geometry}>
        <pointsMaterial color={accentColor} size={0.05} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  );
}
