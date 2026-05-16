import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const LETTER = `Happy anniversary my love

Today I just want to thank you for being part of my life. Every day with you feels special to me. You are not only my wife, you are also my best friend and the person who understands me the most. Life is not always easy, but with you everything feels better and peaceful.

I still remember the beautiful moments we shared together, the laughs, the talks, the small fights, and the way we always stay together no matter what happens. These memories are very important to me and I keep them close to my heart.

Thank you for caring for me, supporting me, and standing beside me in every situation. Your love gives me strength and happiness every day. I may not always say it clearly, but I truly appreciate everything you do for me.

You make my life brighter with your smile and calmer with your presence. I feel lucky that I can wake up every day and call you my wife. I never want to lose the bond we share.

I hope we continue to grow together, understand each other more, and create many more beautiful memories in the coming years. I want us to keep smiling together, facing problems together, and enjoying every little moment of life together.

No matter how much time passes, my love and respect for you will always stay strong. Thank you for filling my life with love, care, and happiness.

Happy anniversary my love
pyarreeeeeee babyyyyy`;

export function GiftBox() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh]">
      {/* candles glow */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute rounded-full drift"
            style={{
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              width: 4 + Math.random() * 6, height: 4 + Math.random() * 6,
              background: "radial-gradient(circle, var(--gold), transparent 70%)",
              animationDelay: `${i * 0.3}s`, filter: "blur(1px)",
            }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="box"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.2 }}
            onClick={() => setOpened(true)}
            className="relative group"
          >
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-rose/20 to-gold/20 blur-3xl glow-pulse" />
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {/* box body */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 rounded-lg shadow-glow"
                style={{ background: "linear-gradient(180deg, oklch(0.25 0.1 320), oklch(0.15 0.06 310))" }} />
              {/* box lid */}
              <motion.div
                whileHover={{ y: -8, rotateX: -10 }}
                className="absolute inset-x-0 top-1/4 h-1/4 rounded-lg shadow-soft"
                style={{ background: "var(--gradient-rose)", transformOrigin: "bottom" }}
              />
              {/* ribbon vertical */}
              <div className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2" style={{ background: "var(--gradient-gold)" }} />
              {/* ribbon horizontal */}
              <div className="absolute inset-x-0 top-[40%] h-6" style={{ background: "var(--gradient-gold)" }} />
              {/* bow */}
              <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-16 h-10 rounded-full" style={{ background: "var(--gradient-gold)", boxShadow: "0 0 30px var(--gold)" }} />
            </div>
            <p className="mt-10 font-display italic text-lg text-gold/90 group-hover:text-gold transition-colors">click to open</p>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.85, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="relative w-full max-w-2xl"
          >
            <div className="glass rounded-2xl p-8 md:p-12 shadow-glow"
              style={{ background: "linear-gradient(135deg, oklch(0.96 0.03 80 / 0.95), oklch(0.92 0.04 70 / 0.92))" }}>
              <div className="whitespace-pre-line font-script text-stone-800 text-xl md:text-2xl leading-relaxed">
                {LETTER}
              </div>
              <div className="mt-10 pt-6 border-t border-stone-400/40 text-center">
                <p className="font-display text-stone-700 text-lg">Forever yours,</p>
                <p className="font-script text-rose text-3xl mt-2">Your Prince ❤</p>
                <motion.p animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-3xl mt-4">❤️</motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
