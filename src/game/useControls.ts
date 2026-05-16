import { useEffect } from "react";
import { useGame } from "./store";

export function useControls() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = useGame.getState();
      if (s.state !== "playing") return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        useGame.setState({ lane: (Math.max(-1, s.lane - 1) as -1 | 0 | 1) });
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        useGame.setState({ lane: (Math.min(1, s.lane + 1) as -1 | 0 | 1) });
      } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
        s.triggerJump();
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        s.triggerSlide();
      } else if (e.key === "p" || e.key === "P") {
        s.togglePause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startT = 0;
    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startT = Date.now();
    };
    const onEnd = (e: TouchEvent) => {
      const s = useGame.getState();
      if (s.state !== "playing") return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const dt = Date.now() - startT;
      if (dt > 700) return;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const threshold = 24;
      if (absX < threshold && absY < threshold) return;
      if (absX > absY) {
        if (dx > 0) useGame.setState({ lane: (Math.min(1, s.lane + 1) as -1 | 0 | 1) });
        else useGame.setState({ lane: (Math.max(-1, s.lane - 1) as -1 | 0 | 1) });
      } else {
        if (dy < 0) s.triggerJump();
        else s.triggerSlide();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);
}
