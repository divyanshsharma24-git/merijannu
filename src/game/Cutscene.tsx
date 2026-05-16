import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./store";
import { LEVELS } from "./levels";

export function Cutscene() {
  const { state, level, nextLevel } = useGame();
  const show = state === "cutscene";
  const cfg = LEVELS[level];
  const isFinal = level === 6;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-40 bg-background/85 backdrop-blur-xl flex items-center justify-center px-6"
        >
          <div className="max-w-2xl text-center">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-script text-gold text-2xl"
            >
              {cfg.chapter} complete
            </motion.p>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="font-display text-4xl md:text-6xl mt-4 text-glow italic"
            >
              {cfg.cutsceneTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1.4 }}
              className="mt-8 font-display text-lg md:text-xl text-foreground/80 leading-relaxed italic"
            >
              {cfg.cutsceneText}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => (isFinal ? useGame.setState({ state: "ending" }) : nextLevel())}
              className="mt-12 px-8 py-3 rounded-full bg-gradient-to-r from-rose to-gold text-primary-foreground font-medium tracking-wide shadow-glow"
            >
              {isFinal ? "Open my letter" : "Keep running"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
