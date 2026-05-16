import { motion, AnimatePresence } from "framer-motion";
import { useGame, LEVEL_TARGETS } from "./store";
import { LEVELS } from "./levels";
import { Heart, Sparkles, Pause, Play } from "lucide-react";

export function HUD() {
  const { state, level, hearts, fragments, distance, paused, togglePause } = useGame();
  if (state !== "playing" && state !== "paused") return null;
  const cfg = LEVELS[level];
  const goal = LEVEL_TARGETS[level];
  const progress = Math.min(1, distance / goal);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 p-4 md:p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-full px-4 py-2 flex items-center gap-3 text-sm"
        >
          <span className="font-script text-gold text-base leading-none">{cfg.chapter}</span>
          <span className="font-display italic text-foreground/80">{cfg.name}</span>
        </motion.div>
        <button
          onClick={togglePause}
          className="pointer-events-auto glass rounded-full p-3 hover:scale-105 transition"
          aria-label="Pause"
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm">
          <Heart size={16} className="text-rose fill-rose" />
          <span className="tabular-nums font-medium">{hearts}</span>
        </div>
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm">
          <Sparkles size={16} className="text-gold" />
          <span className="tabular-nums font-medium">{fragments}</span>
        </div>
      </div>

      <div className="glass rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${cfg.accentColor}, #ff7aa3)`,
            boxShadow: `0 0 20px ${cfg.accentColor}`,
          }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>

      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-md flex items-center justify-center"
          >
            <div className="glass rounded-3xl p-8 text-center pointer-events-auto">
              <p className="font-display text-2xl mb-4">Paused</p>
              <button
                onClick={togglePause}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-rose to-gold text-primary-foreground font-medium"
              >
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile control hint */}
      <div className="md:hidden fixed bottom-6 inset-x-0 text-center text-xs text-foreground/50 font-light tracking-wider">
        swipe ← → to switch · ↑ jump · ↓ slide
      </div>
      <div className="hidden md:block fixed bottom-6 inset-x-0 text-center text-xs text-foreground/50 font-light tracking-wider">
        ← → switch lanes · ↑ / space jump · ↓ slide · P pause
      </div>
    </div>
  );
}
