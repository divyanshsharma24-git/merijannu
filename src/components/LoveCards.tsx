import { motion } from "framer-motion";
import { useState } from "react";

const reasons = [
  { front: "Your Smile", back: "heals my worst days and lights up every room." },
  { front: "Your Voice", back: "feels like home, no matter where I am." },
  { front: "Your Heart", back: "is the softest, strongest thing I've ever known." },
  { front: "Your Patience", back: "with all my chaos is something I'll never deserve but always treasure." },
  { front: "Your Love", back: "became my peace, my strength, my reason." },
  { front: "Your Soul", back: "found mine — and I never want to let it go." },
];

export function LoveCards() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {reasons.map((r, i) => (
        <motion.button
          key={i}
          onClick={() => setFlipped(flipped === i ? null : i)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          className="relative h-56 [perspective:1000px] drift"
          style={{ animationDelay: `${i * 0.7}s` }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
            style={{ transform: flipped === i ? "rotateY(180deg)" : undefined }}
          >
            <div className="absolute inset-0 glass rounded-2xl flex items-center justify-center p-6 [backface-visibility:hidden]">
              <span className="font-display text-2xl md:text-3xl text-gold text-glow">{r.front}</span>
            </div>
            <div className="absolute inset-0 glass rounded-2xl flex items-center justify-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.15 15 / 0.2), oklch(0.45 0.12 330 / 0.15))" }}>
              <span className="font-display italic text-lg md:text-xl text-foreground/95 text-center leading-snug">{r.back}</span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
