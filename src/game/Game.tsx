import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Scene } from "./Scene";
import { HUD } from "./HUD";
import { Menu } from "./Menu";
import { Cutscene } from "./Cutscene";
import { Ending } from "./Ending";
import { useControls } from "./useControls";

export function Game() {
  useControls();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <p className="font-script text-gold text-2xl animate-pulse">loading our story…</p>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-background">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 3.6, 5.2], fov: 60, near: 0.1, far: 200 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <HUD />
      <Menu />
      <Cutscene />
      <Ending />
    </div>
  );
}
