"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { CatmullRomCurve3, Vector3 } from "three";
import { CORRIDOR_ANCHORS } from "./sections";

export default function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();

  const curve = useMemo(() => new CatmullRomCurve3(CORRIDOR_ANCHORS, false, "catmullrom", 0.4), []);

  const lookTarget = useRef(new Vector3());
  const currentPos = useRef(new Vector3().copy(CORRIDOR_ANCHORS[0]));
  const currentLook = useRef(new Vector3());

  useFrame((_, delta) => {
    const t = Math.min(Math.max(scroll.offset, 0), 1);

    const point = curve.getPointAt(t);
    const aheadT = Math.min(t + 0.02, 1);
    const aheadPoint = curve.getPointAt(aheadT);
    lookTarget.current.copy(aheadPoint);

    // gentle drift so the corridor feels alive even when scroll is idle
    const drift = Math.sin(t * Math.PI * 6) * 0.15;
    point.x += drift;

    const smoothing = 1 - Math.pow(0.001, delta);
    currentPos.current.lerp(point, smoothing);
    currentLook.current.lerp(lookTarget.current, smoothing);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
