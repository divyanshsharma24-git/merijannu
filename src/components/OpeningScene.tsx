import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StarField } from "./StarField";

export function OpeningScene({ onStart }: { onStart: () => void }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 3200);
    const t2 = setTimeout(() => setStage(2), 6800);
    const t3 = setTimeout(() => setStage(3), 9500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-night flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {stage >= 1 && <motion.div key="stars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
          <StarField count={180} />
        </motion.div>}
      </AnimatePresence>

      <div className="relative text-center px-6 max-w-2xl">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.h1 key="s0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 2 }}
              className="font-display text-3xl md:text-5xl text-gold text-glow leading-tight">
              For The Most Beautiful<br />Part Of My Life
            </motion.h1>
          )}
          {stage === 1 && (
            <motion.p key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 2 }}
              className="font-display italic text-2xl md:text-4xl text-foreground/90 text-glow">
              Every memory with you<br />became a part of my soul.
            </motion.p>
          )}
          {stage === 2 && (
            <motion.p key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
              className="font-script text-3xl md:text-5xl text-rose text-glow">
              Janhvi ❤
            </motion.p>
          )}
          {stage === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
              className="flex flex-col items-center gap-8">
              <p className="font-display text-xl md:text-2xl text-foreground/80">Are you ready, my love?</p>
              <button onClick={onStart}
                className="glow-pulse glass rounded-full px-10 py-4 font-display text-lg md:text-xl text-gold tracking-wider hover:scale-105 transition-transform">
                Start Our Journey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
