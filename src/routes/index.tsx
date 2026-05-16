import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { OpeningScene } from "@/components/OpeningScene";
import { StarField, Petals } from "@/components/StarField";
import { Chapter } from "@/components/Chapter";
import { MemoryGallery, type Memory } from "@/components/MemoryGallery";
import { LoveCards } from "@/components/LoveCards";
import { GiftBox } from "@/components/GiftBox";
import { MusicToggle } from "@/components/MusicToggle";

import m1 from "@/assets/memory-1.png";
import m2 from "@/assets/memory-2.png";
import m3 from "@/assets/memory-3.png";
import m4 from "@/assets/memory-4.png";
import m5 from "@/assets/memory-5.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Journey Together — Happy Anniversary" },
      { name: "description", content: "A cinematic memory journey for the most beautiful part of my life." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
  }),
  component: Index,
});

const memories: Memory[] = [
  { src: m1, caption: "the first of forever", date: "Oct 26, 2025" },
  { src: m2, caption: "lost in your laugh" },
  { src: m3, caption: "quiet mornings, loud hearts", date: "Apr 18" },
  { src: m4, caption: "even through a screen, you" },
  { src: m5, caption: "us, against everything", date: "Mar 26, 2026" },
  { src: m1, caption: "kisses that wrote our story" },
  { src: m2, caption: "your ring, my promise" },
  { src: m5, caption: "every smile, my favorite memory" },
];

function Index() {
  const [started, setStarted] = useState(false);

  return (
    <main className="relative">
      {!started && <OpeningScene onStart={() => setStarted(true)} />}
      <MusicToggle enabled={started} />

      {/* Chapter 1 */}
      <Chapter number="Chapter One" title="The Beginning" subtitle="I never knew one person could completely change my world." tone="warm">
        <Petals count={10} />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center">
          <p className="font-display italic text-xl md:text-2xl text-foreground/90 leading-relaxed">
            I was searching for a stone… and somewhere along the way, I found a diamond.
            You walked into my life so quietly, and then changed everything — loudly, beautifully, completely.
          </p>
          <p className="font-script text-gold text-2xl mt-8">and there you were ❤</p>
        </motion.div>
      </Chapter>

      {/* Chapter 2 */}
      <Chapter number="Chapter Two" title="Our Beautiful Memories" subtitle="Every frame, a feeling. Every smile, a forever." tone="night">
        <StarField count={80} />
        <MemoryGallery memories={memories} />
      </Chapter>

      {/* Chapter 3 */}
      <Chapter number="Chapter Three" title="Through The Storm" subtitle="Even during the hardest moments — I still chose you. I will always choose you." tone="rain">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="absolute w-px bg-gradient-to-b from-transparent via-white/40 to-transparent"
              style={{
                left: `${Math.random() * 100}%`, top: `-10%`, height: `${40 + Math.random() * 80}px`,
                animation: `float-up ${2 + Math.random() * 2}s linear infinite`, animationDelay: `${Math.random() * 3}s`,
                transform: "rotate(8deg)",
              }} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center space-y-6">
          <p className="font-display italic text-xl md:text-2xl text-foreground/90 leading-relaxed">
            Distance tried. Silence tried. Days tried.<br />But your name kept finding its way back to my soul.
          </p>
          <p className="font-script text-rose text-2xl">"mere pass hi hai" — and I always will be.</p>
        </motion.div>
      </Chapter>

      {/* Chapter 4 */}
      <Chapter number="Chapter Four" title="Why You Matter To Me" subtitle="A few of the thousand reasons. Tap each one." tone="night">
        <StarField count={60} />
        <LoveCards />
      </Chapter>

      {/* Chapter 5 */}
      <Chapter number="Chapter Five" title="A Lifetime With You" subtitle="I don't just want memories with you — I want a lifetime." tone="dream">
        <Petals count={12} />
        <StarField count={100} />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }}
          className="text-center max-w-3xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-14">
            <p className="font-display italic text-2xl md:text-3xl text-gold text-glow leading-relaxed">
              Every sunrise from here, I want it with you.<br />
              Every quiet night, your hand in mine.<br />
              Every dream — ours to build together.
            </p>
            <p className="font-script text-rose text-3xl mt-10">forever, and a little more.</p>
          </div>
        </motion.div>
      </Chapter>

      {/* Final */}
      <Chapter number="One Last Thing" title="A Letter For You" tone="night">
        <StarField count={120} />
        <GiftBox />
        <p className="text-center mt-16 font-display text-foreground/50 text-sm tracking-widest uppercase">
          For Janhvi · Happy Anniversary, my love
        </p>
      </Chapter>

      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Dancing+Script:wght@500;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
    </main>
  );
}
