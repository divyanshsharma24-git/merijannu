import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "./store";
import { LEVELS } from "./levels";
import { Player } from "./Player";
import { Track } from "./Track";
import { Particles } from "./Particles";

export function Scene() {
  const levelId = useGame((s) => s.level);
  const level = LEVELS[levelId];
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const { scene, camera: defaultCam } = useThree();

  // fog & background
  scene.fog = new THREE.Fog(level.fogColor, level.fogNear, level.fogFar);
  scene.background = new THREE.Color(level.skyBottom);

  useFrame((state, dt) => {
    useGame.getState().tick(dt);
    // camera follow + subtle shake
    const s = useGame.getState();
    const t = state.clock.elapsedTime;
    const shake = s.state === "playing" ? Math.sin(t * 28) * 0.02 : 0;
    defaultCam.position.set(0, 3.6 + shake, 5.2);
    defaultCam.lookAt(0, 1.2, -8);
  });

  return (
    <>
      <ambientLight intensity={level.ambient} color={level.skyTop} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.1}
        color={level.accentColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight args={[level.skyTop, level.skyBottom, 0.4]} />

      {/* sky gradient backdrop */}
      <mesh position={[0, 15, -80]}>
        <planeGeometry args={[200, 60]} />
        <meshBasicMaterial color={level.skyTop} fog={false} />
      </mesh>

      <Track level={level} />
      <Player accentColor={level.accentColor} />
      <Particles level={level} />
    </>
  );
}
