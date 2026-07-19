"use client";

import { motion } from "framer-motion";
import { Move, Users2, Keyboard, Share2, Code, Zap } from "lucide-react";

export default function Features() {
  const cards = [
    {
      title: "Infinite Workspace",
      desc: "Pan, scroll, and zoom without boundaries. Figment handles complex canvas scaling seamlessly so your drawings never run out of room.",
      icon: <Move size={24} className="stroke-[2.25]" />,
      bg: "bg-card text-foreground",
      cols: "md:col-span-7",
      illustration: (
        <div className="mt-6 border-2 border-border rounded-xl bg-background p-4 relative overflow-hidden h-36 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.9, 1.1, 0.8] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-lg border-2 border-border bg-secondary flex items-center justify-center font-clash font-bold shadow-brutal-sm text-sm"
          >
            Zoom
          </motion.div>
        </div>
      )
    },
    {
      title: "Multiplayer Sync",
      desc: "Changes sync in under 16ms. Watch cursors glide, text update, and boxes snap with other team members in real-time.",
      icon: <Users2 size={24} className="stroke-[2.25]" />,
      bg: "bg-secondary text-foreground",
      cols: "md:col-span-5",
      illustration: (
        <div className="mt-6 border-2 border-border rounded-xl bg-card p-4 relative overflow-hidden h-36 flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="flex gap-3">
            <span className="px-2 py-1 bg-primary text-white border-2 border-border text-xs font-bold rotate-[-6deg]">Active</span>
            <span className="px-2 py-1 bg-accent text-white border-2 border-border text-xs font-bold rotate-[4deg] dark:text-foreground">Synced</span>
          </div>
        </div>
      )
    },
    {
      title: "Hotkeys for Speed",
      desc: "Hold [V] to select, [S] for sticky, [T] for text. Designed for fast fingers and zero friction.",
      icon: <Keyboard size={24} className="stroke-[2.25]" />,
      bg: "bg-accent text-white dark:bg-accent dark:text-foreground",
      cols: "md:col-span-4",
      illustration: (
        <div className="mt-6 border-2 border-border rounded-xl bg-card/10 p-4 h-36 flex items-center justify-center gap-2 select-none">
          <kbd className="px-3 py-2 rounded-lg border-2 border-white bg-white/20 text-white font-bold font-mono text-lg shadow-[2px_2px_0_0_white] dark:border-foreground dark:bg-foreground/10 dark:text-foreground dark:shadow-[2px_2px_0_0_var(--border-color)]">V</kbd>
          <span className="text-xl font-bold">+</span>
          <kbd className="px-3 py-2 rounded-lg border-2 border-white bg-white/20 text-white font-bold font-mono text-lg shadow-[2px_2px_0_0_white] dark:border-foreground dark:bg-foreground/10 dark:text-foreground dark:shadow-[2px_2px_0_0_var(--border-color)]">S</kbd>
        </div>
      )
    },
    {
      title: "Smart Connectors",
      desc: "Drag stickies and watch the vector paths recalculate their curves. No overlapping text, just clean arrows.",
      icon: <Share2 size={24} className="stroke-[2.25]" />,
      bg: "bg-card text-foreground",
      cols: "md:col-span-8",
      illustration: (
        <div className="mt-6 border-2 border-border rounded-xl bg-background p-4 relative overflow-hidden h-36 flex items-center justify-around">
          <div className="w-12 h-12 rounded-full bg-secondary border-2 border-border flex items-center justify-center font-bold text-xs shadow-brutal-sm">A</div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 120 72 Q 220 20, 310 72"
              fill="transparent"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
          <div className="w-12 h-12 rounded-full bg-accent border-2 border-border flex items-center justify-center font-bold text-xs shadow-brutal-sm dark:text-foreground">B</div>
        </div>
      )
    },
    {
      title: "SVG Export",
      desc: "No pixelated outputs. Copy layers as native code to drop straight into your HTML, Tailwind, or React projects.",
      icon: <Code size={24} className="stroke-[2.25]" />,
      bg: "bg-primary text-white",
      cols: "md:col-span-6",
      illustration: (
        <div className="mt-6 border-2 border-border rounded-xl bg-black/20 p-4 h-36 flex items-center justify-center">
          <pre className="font-mono text-[10px] text-white/90 overflow-x-hidden select-all bg-black/40 p-3 rounded-lg border border-white/20 w-full">
            {`// Click to copy SVG
<svg width="40" height="40">
  <path d="M10 10 H90 V90 H10 Z" />
</svg>`}
          </pre>
        </div>
      )
    },
    {
      title: "Immediate Sandbox",
      desc: "No accounts, no email invites, no password checklists. Click 'Start Sketching' and you're immediately in your space.",
      icon: <Zap size={24} className="stroke-[2.25]" />,
      bg: "bg-card text-foreground",
      cols: "md:col-span-6",
      illustration: (
        <div className="mt-6 border-2 border-border rounded-xl bg-background p-4 relative overflow-hidden h-36 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full border-2 border-border bg-foreground text-background font-clash font-bold shadow-brutal-sm cursor-pointer select-none"
          >
            Create Sandbox
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <section
      id="features"
      className="py-24 md:py-40 bg-background border-b-2 border-border"
      data-testid="features"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <div className="inline-block px-3 py-1 rounded-full border-2 border-border bg-card text-xs font-bold uppercase tracking-wider mb-6">
            Features
          </div>
          <h2 className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
            Designed for speed. <span className="text-foreground/40">Not meetings.</span>
          </h2>
          <p className="font-sans text-lg text-foreground/70">
            A tools stack built for developers, designers, and systems architects who sketch to build.
          </p>
        </div>

        {/* Bento Grid (12-Col) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 sm:p-8 rounded-2xl border-2 border-border shadow-brutal-sm hover:shadow-brutal transition-brutal flex flex-col justify-between ${card.bg} ${card.cols}`}
            >
              <div>
                {/* Icon Badge */}
                <div className="w-10 h-10 rounded-lg border-2 border-border bg-foreground text-background flex items-center justify-center shadow-[2px_2px_0_0_var(--border-color)] mb-6">
                  {card.icon}
                </div>
                
                {/* Title */}
                <h3 className="font-clash font-bold text-2xl md:text-3xl tracking-tight mb-4">
                  {card.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-sm sm:text-base leading-relaxed opacity-85">
                  {card.desc}
                </p>
              </div>

              {/* Graphic / Illustration */}
              {card.illustration}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
