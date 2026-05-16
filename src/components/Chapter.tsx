import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Chapter({
  number, title, subtitle, children, tone = "night",
}: { number: string; title: string; subtitle?: string; children: ReactNode; tone?: "night" | "warm" | "rain" | "dream" }) {
  const toneClass = {
    night: "bg-night",
    warm: "bg-[radial-gradient(ellipse_at_center,oklch(0.22_0.08_60)_0%,oklch(0.08_0.03_300)_70%)]",
    rain: "bg-[radial-gradient(ellipse_at_center,oklch(0.15_0.04_260)_0%,oklch(0.04_0.01_280)_80%)]",
    dream: "bg-[radial-gradient(ellipse_at_top,oklch(0.25_0.08_320)_0%,oklch(0.05_0.02_290)_70%)]",
  }[tone];

  return (
    <section className={`relative min-h-screen w-full ${toneClass} py-24 md:py-32 px-6 overflow-hidden`}>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.2 }}
        className="relative max-w-5xl mx-auto text-center mb-16">
        <p className="font-script text-gold text-xl md:text-2xl mb-3">{number}</p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground text-glow leading-tight">{title}</h2>
        {subtitle && <p className="mt-6 font-display italic text-lg md:text-2xl text-foreground/70 max-w-2xl mx-auto">{subtitle}</p>}
      </motion.div>
      <div className="relative max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
