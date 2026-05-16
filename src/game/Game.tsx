import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Scene } from "./Scene";
import { HUD } from "./HUD";
import { Menu } from "./Menu";
import { Cutscene } from "./Cutscene";
import { Ending } from "./Ending";
import { useControls } from "./useControls";

export function Game() {
  useControls();
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
