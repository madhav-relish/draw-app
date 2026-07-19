"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation transforms moving in opposite directions
  const shapeLeftY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const shapeRightY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-foreground text-background border-b-2 border-border overflow-hidden select-none"
      data-testid="final-cta"
    >
      {/* Inverted Parallax Shapes */}
      {/* Primary Orange Square */}
      <motion.div
        style={{ y: shapeLeftY }}
        className="hidden md:block absolute left-[12%] top-[20%] w-24 h-24 rounded-2xl bg-primary border-2 border-border shadow-[4px_4px_0_0_var(--background)] pointer-events-none"
      />
      {/* Secondary Butter Yellow/Mint Cyan Circle */}
      <motion.div
        style={{ y: shapeRightY }}
        className="hidden md:block absolute right-[12%] bottom-[20%] w-24 h-24 rounded-full bg-secondary border-2 border-border shadow-[4px_4px_0_0_var(--background)] pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col items-center relative z-10 text-center">
        
        {/* Giant Inverted Type */}
        <h2 className="font-clash text-[8vw] sm:text-[7vw] md:text-[6.5vw] lg:text-[5.5vw] font-bold tracking-tighter leading-[0.9] max-w-4xl mb-12">
          Start sketching details, <span className="italic text-primary">playfully</span>.
        </h2>

        {/* Big Brutalist Button */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="#pricing"
          className="inline-flex items-center justify-center gap-3 px-10 h-16 rounded-full border-2 border-border bg-primary text-white font-sans font-bold text-lg shadow-[6px_6px_0_0_var(--background)] hover:shadow-[10px_10px_0_0_var(--background)] hover:-translate-y-1 active:translate-y-0 transition-brutal"
          data-testid="final-cta-button"
        >
          Launch sandbox now <ArrowRight size={20} className="stroke-[3]" />
        </motion.a>

      </div>
    </section>
  );
}
