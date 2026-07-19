"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling settings for background shapes
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const circleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const squareY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const squareRotate = useTransform(scrollYProgress, [0, 1], [12, 45]);

  // Framer-motion variants for the masked lines reveal
  const lineContainerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const lineVariants: any = {
    hidden: { y: "115%" },
    show: {
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative pt-36 pb-24 overflow-hidden bg-grid-pattern bg-background border-b-2 border-border"
      data-testid="hero"
    >
      {/* Floating Parallax Shapes (Neo-Brutalist) */}
      {/* Butter Yellow/Mint Cyan Circle */}
      <motion.div
        style={{ y: circleY }}
        className="hidden md:block absolute left-[8%] top-[25%] w-32 h-32 rounded-full bg-secondary border-2 border-border shadow-brutal-sm pointer-events-none z-10"
      />
      {/* Cool Blue/Hot Pink Square */}
      <motion.div
        style={{ y: squareY, rotate: squareRotate }}
        className="hidden md:block absolute right-[10%] top-[20%] w-28 h-28 bg-accent border-2 border-border shadow-brutal-sm pointer-events-none z-10"
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex flex-col items-center relative z-20">
        
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-border bg-card shadow-brutal-sm text-xs font-bold uppercase tracking-widest text-foreground select-none mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-blink" />
          Figment is live on v1.0
        </motion.div>

        {/* Hero Headlines (Masked Line-by-Line Reveal) */}
        <motion.h1
          variants={lineContainerVariants}
          initial="hidden"
          animate="show"
          className="font-clash text-[12vw] sm:text-[10vw] md:text-[8.5vw] lg:text-[7vw] font-bold text-center tracking-tighter leading-[0.92] max-w-5xl"
        >
          <div className="overflow-hidden h-fit py-1">
            <motion.div variants={lineVariants}>
              Think in
            </motion.div>
          </div>
          <div className="overflow-hidden h-fit py-1">
            <motion.div variants={lineVariants}>
              <span className="italic text-primary">drawings</span>.
            </motion.div>
          </div>
          <div className="overflow-hidden h-fit py-1">
            <motion.div variants={lineVariants}>
              Collaborate live.
            </motion.div>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-center text-lg sm:text-xl text-foreground/70 max-w-xl font-sans leading-relaxed"
        >
          Figment is a rapid, sketch-first multiplayer whiteboard.
          Built for teams who want to build details, not just slide decks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
        >
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full border-2 border-border bg-primary text-white font-sans font-bold shadow-[4px_4px_0_0_var(--border-color)] hover:shadow-[8px_8px_0_0_var(--border-color)] hover:-translate-y-1 active:translate-y-0 transition-brutal"
            data-testid="hero-cta-primary"
          >
            Start sketching <ArrowRight size={18} className="stroke-[2.5]" />
          </a>
          <button
            onClick={() => {
              const pricing = document.getElementById("pricing");
              pricing?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-14 rounded-full border-2 border-border bg-card text-foreground font-sans font-bold shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 active:translate-y-0 transition-brutal"
            data-testid="hero-cta-secondary"
          >
            <Play size={16} className="fill-foreground stroke-none" /> Watch demo
          </button>
        </motion.div>

        {/* Product Board Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl mt-16 rounded-2xl border-2 border-border bg-card shadow-brutal overflow-hidden aspect-[16/10] relative select-none"
        >
          {/* Canvas Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />

          {/* Connected SVG lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 220 180 C 350 100, 420 300, 680 160"
              fill="transparent"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
            />
            <motion.path
              d="M 680 200 Q 520 380, 360 380"
              fill="transparent"
              stroke="var(--accent)"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1.5,
              }}
            />
          </svg>

          {/* Sticky Note 1 (Butter Yellow / Mint Cyan) */}
          <motion.div
            drag
            dragConstraints={{ top: 10, bottom: 200, left: 10, right: 600 }}
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="absolute left-[8%] top-[12%] w-[180px] sm:w-[220px] p-5 rounded-2xl border-2 border-border bg-secondary shadow-brutal-sm cursor-grab active:cursor-grabbing text-foreground"
          >
            <div className="font-clash font-bold text-lg mb-2">💡 Brainstorm</div>
            <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-80">
              Neo-brutalist styling: hard shadows, solid border structures, soft handwritten contents!
            </p>
          </motion.div>

          {/* Sticky Note 2 (White card) */}
          <motion.div
            drag
            dragConstraints={{ top: 10, bottom: 200, left: 10, right: 600 }}
            whileHover={{ scale: 1.02, rotate: 2 }}
            className="absolute left-[38%] top-[55%] w-[160px] sm:w-[200px] p-5 rounded-2xl border-2 border-border bg-card shadow-brutal-sm cursor-grab active:cursor-grabbing text-foreground"
          >
            <div className="font-clash font-bold text-lg mb-2">⚡ User Flow</div>
            <div className="flex flex-col gap-1 text-xs sm:text-sm font-sans font-medium">
              <div className="px-2 py-1 rounded bg-foreground/5 border border-border/20">1. Click "Launch"</div>
              <div className="px-2 py-1 rounded bg-foreground/5 border border-border/20">2. Draw shapes</div>
              <div className="px-2 py-1 rounded bg-primary/20 text-primary border border-primary/20">3. Collaborate!</div>
            </div>
          </motion.div>

          {/* Sticky Note 3 (Accent Card) */}
          <motion.div
            drag
            dragConstraints={{ top: 10, bottom: 200, left: 10, right: 600 }}
            whileHover={{ scale: 1.02, rotate: -2 }}
            className="absolute left-[65%] top-[10%] w-[180px] sm:w-[220px] p-5 rounded-2xl border-2 border-border bg-card shadow-brutal-sm cursor-grab active:cursor-grabbing text-foreground"
          >
            <div className="font-clash font-bold text-lg mb-2">🎯 Launch Spec</div>
            <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-80">
              Deliver complete editorial landing page by tonight. Follow the brand guidelines.
            </p>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-accent">
              <Sparkles size={10} /> Priority High
            </div>
          </motion.div>

          {/* Live Cursors on mirror loop */}
          {/* Cursor 1: Sarah */}
          <motion.div
            animate={{
              x: [250, 480, 320, 180, 250],
              y: [120, 280, 80, 320, 120]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute z-30 pointer-events-none flex flex-col items-start gap-1"
          >
            {/* Cursor Arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4.5 3V19L9.5 14L15.5 22L18.5 20L12.5 12.5L19.5 12.5L4.5 3Z" fill="#FF4D9C" stroke="black" strokeWidth="2" />
            </svg>
            <div className="px-2 py-1 rounded-md border-2 border-border bg-[#FF4D9C] text-white font-sans text-[10px] font-bold shadow-brutal-sm leading-none">
              Sarah
            </div>
          </motion.div>

          {/* Cursor 2: Alex */}
          <motion.div
            animate={{
              x: [650, 280, 550, 720, 650],
              y: [220, 150, 380, 90, 220]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute z-30 pointer-events-none flex flex-col items-start gap-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4.5 3V19L9.5 14L15.5 22L18.5 20L12.5 12.5L19.5 12.5L4.5 3Z" fill="#4D9FFF" stroke="black" strokeWidth="2" />
            </svg>
            <div className="px-2 py-1 rounded-md border-2 border-border bg-[#4D9FFF] text-white font-sans text-[10px] font-bold shadow-brutal-sm leading-none">
              Alex
            </div>
          </motion.div>

          {/* Cursor 3: Chen */}
          <motion.div
            animate={{
              x: [120, 750, 430, 290, 120],
              y: [300, 100, 260, 420, 300]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute z-30 pointer-events-none flex flex-col items-start gap-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4.5 3V19L9.5 14L15.5 22L18.5 20L12.5 12.5L19.5 12.5L4.5 3Z" fill="#FFE873" stroke="black" strokeWidth="2" />
            </svg>
            <div className="px-2 py-1 rounded-md border-2 border-border bg-[#FFE873] text-black font-sans text-[10px] font-bold shadow-brutal-sm leading-none">
              Chen
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
