import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "./store";

const LANE_X = [-2.2, 0, 2.2];

export function Player({ accentColor }: { accentColor: string }) {
  const group = useRef<THREE.Group>(null!);
  const hair = useRef<THREE.Mesh>(null!);
  const dress = useRef<THREE.Mesh>(null!);
  const legL = useRef<THREE.Mesh>(null!);
  const legR = useRef<THREE.Mesh>(null!);
  const armL = useRef<THREE.Mesh>(null!);
  const armR = useRef<THREE.Mesh>(null!);
  const glow = useRef<THREE.PointLight>(null!);
  const targetX = useRef(0);

  useFrame((_, dt) => {
    const s = useGame.getState();
    targetX.current = LANE_X[s.lane + 1];
    const g = group.current;
    if (!g) return;
    g.position.x += (targetX.current - g.position.x) * Math.min(1, dt * 12);

    // jump arc
    const jumpY = Math.sin((1 - s.jump) * Math.PI) * 2.1 * (s.jump > 0 ? 1 : 0);
    // slide
    const slideY = s.slide > 0 ? -0.35 : 0;
    g.position.y += (jumpY + slideY + 0.9 - g.position.y) * Math.min(1, dt * 14);

    // body tilt when sliding
    const tilt = s.slide > 0 ? -0.6 : 0;
    g.rotation.x += (tilt - g.rotation.x) * Math.min(1, dt * 10);

    // run cycle (only when grounded)
    const t = performance.now() * 0.012;
    const running = s.jump <= 0.05 && s.slide <= 0.05 && s.state === "playing";
    const sway = running ? Math.sin(t) : 0;
    if (legL.current) legL.current.rotation.x = sway * 0.9;
    if (legR.current) legR.current.rotation.x = -sway * 0.9;
    if (armL.current) armL.current.rotation.x = -sway * 0.7;
    if (armR.current) armR.current.rotation.x = sway * 0.7;
    if (hair.current) hair.current.rotation.x = Math.sin(t * 1.3) * 0.15 - 0.1;
    if (dress.current) dress.current.rotation.z = Math.sin(t * 0.9) * 0.04;
    if (glow.current) glow.current.intensity = 1.2 + Math.sin(t * 0.5) * 0.3;
  });

  return (
    <group ref={group} position={[0, 0.9, 0]}>
      <pointLight ref={glow} color={accentColor} intensity={1.5} distance={6} />
      {/* head */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#f1c6a7" roughness={0.6} />
      </mesh>
      {/* hair */}
      <mesh ref={hair} position={[0, 1.55, -0.05]} castShadow>
        <sphereGeometry args={[0.34, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshStandardMaterial color="#1a0a05" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* torso / dress */}
      <mesh ref={dress} position={[0, 0.75, 0]} castShadow>
        <coneGeometry args={[0.55, 1.4, 16]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.35} roughness={0.35} />
      </mesh>
      {/* arms */}
      <mesh ref={armL} position={[-0.42, 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.55, 4, 8]} />
        <meshStandardMaterial color="#f1c6a7" roughness={0.6} />
      </mesh>
      <mesh ref={armR} position={[0.42, 1.15, 0]} castShadow>
        <capsuleGeometry args={[0.08, 0.55, 4, 8]} />
        <meshStandardMaterial color="#f1c6a7" roughness={0.6} />
      </mesh>
      {/* legs */}
      <mesh ref={legL} position={[-0.18, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#2a1a30" roughness={0.6} />
      </mesh>
      <mesh ref={legR} position={[0.18, 0.05, 0]} castShadow>
        <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
        <meshStandardMaterial color="#2a1a30" roughness={0.6} />
      </mesh>
    </group>
  );
}
