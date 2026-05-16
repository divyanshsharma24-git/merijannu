import { motion } from "framer-motion";
import { useGame } from "./store";
import { Heart, Play } from "lucide-react";

export function Menu() {
  const state = useGame((s) => s.state);
  const startGame = useGame((s) => s.startGame);
  if (state !== "menu") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_center,oklch(0.18_0.08_330)_0%,oklch(0.04_0.02_290)_70%)]"
    >
      <div className="text-center max-w-xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-script text-gold text-2xl md:text-3xl"
        >
          for the most beautiful part of my life
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.4 }}
          className="font-display text-5xl md:text-7xl mt-4 text-glow leading-tight"
        >
          Our Run<br />
          <span className="italic text-gold">Through Forever</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-6 text-foreground/70 font-display italic text-lg"
        >
          A little game built from our memories.<br />
          Collect every heart. Don't look back.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={startGame}
          className="glow-pulse mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose to-gold text-primary-foreground font-medium tracking-wide text-lg shadow-glow"
        >
          <Play size={20} fill="currentColor" />
          Begin our journey
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-foreground/40 tracking-widest uppercase"
        >
          <Heart size={12} className="text-rose fill-rose" /> Happy Anniversary, Janhvi
        </motion.div>
      </div>
    </motion.div>
  );
}
