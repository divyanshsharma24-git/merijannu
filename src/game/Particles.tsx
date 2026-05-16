import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LevelConfig } from "./levels";

export function Particles({ level }: { level: LevelConfig }) {
  const ref = useRef<THREE.Points>(null!);
  const count = level.particle === "rain" ? 900 : 350;

  const { positions, velocities } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = Math.random() * 20;
      p[i * 3 + 2] = -Math.random() * 120;
      v[i * 3] = (Math.random() - 0.5) * 0.2;
      v[i * 3 + 1] = level.particle === "rain" ? -8 - Math.random() * 4 : -0.3 - Math.random() * 0.3;
      v[i * 3 + 2] = level.particle === "lanterns" ? 0.4 : 0.8;
    }
    return { positions: p, velocities: v };
  }, [count, level.particle]);

  useFrame((_, dt) => {
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * dt;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * dt;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * dt;
      if (arr[i * 3 + 1] < 0 || arr[i * 3 + 2] > 20) {
        arr[i * 3] = (Math.random() - 0.5) * 60;
        arr[i * 3 + 1] = 8 + Math.random() * 14;
        arr[i * 3 + 2] = -80 - Math.random() * 40;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  const color =
    level.particle === "rain"
      ? "#9fd7ff"
      : level.particle === "petals"
        ? "#ff7aa3"
        : level.particle === "lanterns"
          ? "#ffd27a"
          : level.particle === "snow"
            ? "#ffffff"
            : level.particle === "photos"
              ? "#fff5e0"
              : level.accentColor;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={level.particle === "rain" ? 0.06 : 0.18}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
