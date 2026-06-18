"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Line } from "@react-three/drei";
import gsap from "gsap";

interface Props {
  position: [number, number, number];
  color: string;
  accentColor: string;
}

const NODE_COUNT = 6;

export default function NetworkWeb({ position, color, accentColor }: Props) {
  const group = useRef<Group>(null);

  const nodes = useMemo(() => {
    const arr: Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const radius = 2.2;
      arr.push(new Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.7) * 0.8, Math.sin(angle) * radius));
    }
    return arr;
  }, []);

  const connections = useMemo(() => {
    const pairs: [Vector3, Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      pairs.push([nodes[i], nodes[(i + 1) % nodes.length]]);
      pairs.push([nodes[i], new Vector3(0, 0, 0)]);
    }
    return pairs;
  }, [nodes]);

  useEffect(() => {
    if (!group.current) return;
    gsap.to(group.current.rotation, { y: Math.PI * 2, duration: 40, repeat: -1, ease: "none" });
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      if (child.name === "avatar") {
        child.position.y = nodes[i % nodes.length].y + Math.sin(clock.elapsedTime + i) * 0.15;
      }
    });
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
      {connections.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color={color} transparent opacity={0.35} lineWidth={1} />
      ))}
      {nodes.map((n, i) => (
        <mesh key={i} name="avatar" position={n}>
          <capsuleGeometry args={[0.22, 0.5, 4, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? accentColor : color} wireframe />
        </mesh>
      ))}
    </group>
  );
}
