import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGame } from "./store";
import { Heart } from "lucide-react";

const LETTER = `My Janhvi,

A year ago you held my hand and chose me. Every day since, you have kept choosing me — even on the days I made it hard, even on the days the world made it hard.

You are my calm in chaos, my softest landing, my favourite reason. I love the way you laugh, the way you fight for us, the way you love me without holding back.

I promise to keep running beside you — through sunsets, storms, ordinary mornings, and every dream we have not dreamt yet.

Happy anniversary, my love.
pyareeeeeee babyyyyy

— with all my love,
your Patidev`;

export function Ending() {
  const state = useGame((s) => s.state);
  const reset = useGame((s) => s.reset);
  const [opened, setOpened] = useState(false);
  if (state !== "ending") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="ending"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-[radial-gradient(ellipse_at_top,oklch(0.22_0.1_330)_0%,oklch(0.04_0.02_290)_70%)]"
      >
        {/* floating hearts */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose"
              initial={{
                x: `${Math.random() * 100}%`,
                y: "110%",
                opacity: 0,
                scale: 0.5 + Math.random(),
              }}
              animate={{ y: "-10%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 12 + Math.random() * 8,
                delay: Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Heart size={14 + Math.random() * 18} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16">
          {!opened ? (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1 }}
              onClick={() => setOpened(true)}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl blur-3xl bg-gradient-to-br from-rose/60 to-gold/60 group-hover:from-rose group-hover:to-gold transition" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-rose to-plum border border-gold/40 shadow-glow flex items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-3 bg-gold/80" />
                <div className="absolute left-1/2 inset-y-0 w-3 -translate-x-1/2 bg-gold/80" />
                <div className="relative z-10 w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-glow glow-pulse">
                  <Heart size={26} className="text-plum fill-plum" />
                </div>
              </div>
              <p className="mt-6 font-script text-2xl text-gold text-center">tap to open</p>
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.4 }}
              className="glass rounded-3xl max-w-2xl w-full p-8 md:p-12 shadow-glow"
            >
              <p className="font-script text-gold text-3xl text-center mb-2">forever, and a little more</p>
              <h2 className="font-display italic text-3xl md:text-4xl text-center text-glow mb-8">
                Happy Anniversary
              </h2>
              <pre className="whitespace-pre-wrap font-display text-base md:text-lg leading-relaxed text-foreground/90 italic">
                {LETTER}
              </pre>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setOpened(false);
                    reset();
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-rose to-gold text-primary-foreground font-medium shadow-glow"
                >
                  Run it again
                </button>
                <p className="text-xs text-foreground/40 tracking-widest uppercase">made just for you, my love</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
