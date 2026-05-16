import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export type Memory = { src: string; caption: string; date?: string };

export function MemoryGallery({ memories }: { memories: Memory[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {memories.map((m, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, y: 30, rotate: i % 2 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? -2 : 2 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: i * 0.08 }}
            whileHover={{ scale: 1.04, rotate: 0, y: -6 }}
            className="group relative bg-white/95 p-3 pb-12 rounded-sm shadow-soft hover:shadow-glow transition-shadow drift"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-black">
              <img src={m.src} alt={m.caption} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <p className="absolute bottom-3 left-0 right-0 text-center font-script text-stone-700 text-lg px-3 truncate">{m.caption}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <img src={memories[active].src} alt="" className="w-full max-h-[75vh] object-contain rounded-lg shadow-glow" />
              <p className="mt-6 text-center font-display italic text-xl md:text-2xl text-gold">{memories[active].caption}</p>
              {memories[active].date && <p className="text-center text-sm text-foreground/50 mt-2">{memories[active].date}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
