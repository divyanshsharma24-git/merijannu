import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "./store";
import type { LevelConfig } from "./levels";

const LANE_X = [-2.2, 0, 2.2];
const SPAWN_AHEAD = 90;
const DESPAWN_BEHIND = 12;

type EntityType = "heart" | "fragment" | "obstacle-low" | "obstacle-high";

interface Entity {
  id: number;
  type: EntityType;
  lane: 0 | 1 | 2;
  z: number;
  collected: boolean;
  spin: number;
}

let nextId = 1;

function spawnAt(z: number): Entity {
  const r = Math.random();
  let type: EntityType;
  if (r < 0.55) type = "heart";
  else if (r < 0.68) type = "fragment";
  else if (r < 0.85) type = "obstacle-low";
  else type = "obstacle-high";
  return {
    id: nextId++,
    type,
    lane: Math.floor(Math.random() * 3) as 0 | 1 | 2,
    z,
    collected: false,
    spin: Math.random() * Math.PI * 2,
  };
}

export function Track({ level }: { level: LevelConfig }) {
  const entities = useRef<Entity[]>([]);
  const lastSpawnZ = useRef(-20);
  const ground1 = useRef<THREE.Mesh>(null!);
  const ground2 = useRef<THREE.Mesh>(null!);
  const sidesL = useRef<THREE.Group>(null!);
  const sidesR = useRef<THREE.Group>(null!);
  const meshes = useRef(new Map<number, THREE.Object3D>());

  const groundMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: level.groundColor,
        roughness: 0.55,
        metalness: 0.3,
      }),
    [level.groundColor],
  );

  // initial spawn
  useMemo(() => {
    entities.current = [];
    lastSpawnZ.current = -20;
    for (let z = -20; z > -SPAWN_AHEAD; z -= 7 + Math.random() * 5) {
      entities.current.push(spawnAt(z));
      lastSpawnZ.current = z;
    }
  }, [level.id]);

  useFrame((state, dt) => {
    const s = useGame.getState();
    if (s.state !== "playing" || s.paused) return;
    const move = s.speed * dt;

    // scroll ground
    [ground1.current, ground2.current].forEach((g, i) => {
      if (!g) return;
      g.position.z += move;
      if (g.position.z > 50) g.position.z -= 200;
    });
    if (sidesL.current) {
      sidesL.current.children.forEach((c) => {
        c.position.z += move;
        if (c.position.z > 20) c.position.z -= 200;
      });
    }
    if (sidesR.current) {
      sidesR.current.children.forEach((c) => {
        c.position.z += move;
        if (c.position.z > 20) c.position.z -= 200;
      });
    }

    // move entities
    const playerLane = s.lane + 1;
    const isJumping = s.jump > 0.15;
    const isSliding = s.slide > 0.15;

    for (const e of entities.current) {
      e.z += move;
      e.spin += dt * 2;
      const obj = meshes.current.get(e.id);
      if (obj) {
        obj.position.z = e.z;
        obj.rotation.y = e.spin;
        if (e.type === "heart" || e.type === "fragment") {
          obj.position.y = 1.1 + Math.sin(state.clock.elapsedTime * 2 + e.id) * 0.2;
        }
      }

      // collision check
      if (!e.collected && Math.abs(e.z) < 1.2 && e.lane === playerLane) {
        if (e.type === "heart") {
          e.collected = true;
          s.addHeart();
        } else if (e.type === "fragment") {
          e.collected = true;
          s.addFragment(s.unlockedMemories.length);
        } else if (e.type === "obstacle-low" && !isJumping) {
          e.collected = true;
          s.hit();
        } else if (e.type === "obstacle-high" && !isSliding) {
          e.collected = true;
          s.hit();
        }
      }
    }

    // recycle
    entities.current = entities.current.filter((e) => {
      if (e.z > DESPAWN_BEHIND || e.collected) {
        meshes.current.delete(e.id);
        return false;
      }
      return true;
    });

    // spawn new
    while (lastSpawnZ.current > -SPAWN_AHEAD) {
      const z = lastSpawnZ.current - (5 + Math.random() * 5);
      entities.current.push(spawnAt(z));
      lastSpawnZ.current = z;
    }
  });

  // side decor
  const sideObjects = useMemo(() => {
    const arr: { z: number; side: -1 | 1; h: number; w: number }[] = [];
    for (let z = 10; z > -200; z -= 6 + Math.random() * 4) {
      arr.push({ z, side: -1, h: 2 + Math.random() * 6, w: 1 + Math.random() * 1.5 });
      arr.push({ z, side: 1, h: 2 + Math.random() * 6, w: 1 + Math.random() * 1.5 });
    }
    return arr;
  }, [level.id]);

  return (
    <group>
      {/* ground strips */}
      <mesh ref={ground1} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={groundMat}>
        <planeGeometry args={[12, 200]} />
      </mesh>
      <mesh ref={ground2} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -200]} receiveShadow material={groundMat}>
        <planeGeometry args={[12, 200]} />
      </mesh>

      {/* lane stripes */}
      {[-1.1, 1.1].map((x, i) => (
        <mesh key={i} position={[x, 0.01, -90]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 200]} />
          <meshBasicMaterial color={level.accentColor} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* side decor — abstract pillars/buildings */}
      <group ref={sidesL}>
        {sideObjects.filter((o) => o.side === -1).map((o, i) => (
          <mesh key={i} position={[-6 - o.w / 2, o.h / 2, o.z]} castShadow>
            <boxGeometry args={[o.w, o.h, 1.5]} />
            <meshStandardMaterial
              color={level.groundColor}
              emissive={level.accentColor}
              emissiveIntensity={0.08}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>
      <group ref={sidesR}>
        {sideObjects.filter((o) => o.side === 1).map((o, i) => (
          <mesh key={i} position={[6 + o.w / 2, o.h / 2, o.z]} castShadow>
            <boxGeometry args={[o.w, o.h, 1.5]} />
            <meshStandardMaterial
              color={level.groundColor}
              emissive={level.accentColor}
              emissiveIntensity={0.08}
              roughness={0.4}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* entities */}
      {entities.current.map((e) => (
        <EntityMesh
          key={e.id}
          entity={e}
          accent={level.accentColor}
          onRef={(o) => {
            if (o) meshes.current.set(e.id, o);
          }}
        />
      ))}
    </group>
  );
}

function EntityMesh({
  entity,
  accent,
  onRef,
}: {
  entity: Entity;
  accent: string;
  onRef: (o: THREE.Object3D | null) => void;
}) {
  const x = LANE_X[entity.lane];
  if (entity.type === "heart") {
    return (
      <group ref={onRef} position={[x, 1.1, entity.z]}>
        <mesh>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#ff5b8a" emissive="#ff2d6a" emissiveIntensity={1.4} roughness={0.3} />
        </mesh>
        <pointLight color="#ff7aa3" intensity={1.2} distance={3} />
      </group>
    );
  }
  if (entity.type === "fragment") {
    return (
      <group ref={onRef} position={[x, 1.1, entity.z]}>
        <mesh rotation={[0.4, 0.4, 0]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6} roughness={0.2} metalness={0.6} />
        </mesh>
        <pointLight color={accent} intensity={1.5} distance={4} />
      </group>
    );
  }
  if (entity.type === "obstacle-low") {
    // low barrier — must jump
    return (
      <mesh ref={onRef} position={[x, 0.5, entity.z]} castShadow>
        <boxGeometry args={[1.6, 1, 0.6]} />
        <meshStandardMaterial color="#1a0a14" emissive="#3a0a2a" emissiveIntensity={0.5} roughness={0.7} />
      </mesh>
    );
  }
  // obstacle-high — must slide
  return (
    <group ref={onRef} position={[x, 2.3, entity.z]}>
      <mesh castShadow>
        <boxGeometry args={[1.8, 0.4, 0.6]} />
        <meshStandardMaterial color="#1a0a14" emissive="#3a0a2a" emissiveIntensity={0.5} roughness={0.7} />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[0.1, 1.6, 0.1]} />
        <meshStandardMaterial color="#1a0a14" />
      </mesh>
    </group>
  );
}
