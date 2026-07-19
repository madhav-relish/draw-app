"use client";

import { motion } from "framer-motion";
import { Users, Pencil, RefreshCw, FolderClosed } from "lucide-react";
import Image from "next/image";

export default function HowItWorks() {
  const chapters = [
    {
      id: "01",
      title: "Launch a multiplayer room",
      icon: <Users className="stroke-[2.25] text-white" size={20} />,
      desc: "Spin up a shared infinite canvas in exactly one click. No sign-up walls, no configuration, and zero barrier to entry. Simply share the room URL to invite teammates, clients, or guests to collaborate in real-time.",
      stat: "1 click setup",
      sticker: "Live Sync",
      stickerBg: "bg-secondary",
      // Team collaborating photo
      imageSrc: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "02",
      title: "Sketch with zero latency",
      icon: <Pencil className="stroke-[2.25] text-white" size={20} />,
      desc: "Draw freehand ideas, place structured rectangles, and connect ideas using smart vector SVG connectors. Our canvas uses hardware-accelerated rendering so your mouse or stylus movements feel fluid and local.",
      stat: "< 16ms delay",
      sticker: "Vector Engine",
      stickerBg: "bg-accent text-white dark:bg-accent dark:text-foreground",
      // Whiteboard writing photo
      imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "03",
      title: "Structure with color & cards",
      icon: <FolderClosed className="stroke-[2.25] text-white" size={20} />,
      desc: "Turn messy thoughts into cohesive pipelines. Drop colorful sticky notes, arrange frames in modular bento-style layouts, and tag elements to establish clear hierarchies. It's structure when you want it, drawing when you don't.",
      stat: "Infinite space",
      sticker: "Neo-Brutal",
      stickerBg: "bg-secondary",
      // Sticky notes / designing photo
      imageSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "04",
      title: "Save and export anywhere",
      icon: <RefreshCw className="stroke-[2.25] text-white" size={20} />,
      desc: "Figment continuously saves state so you never lose progress. Export your infinite board or selected regions as clean SVG vector code or high-res PNG images. Embed boards natively inside Notion, Slack, or your developer docs.",
      stat: "Clean SVG code",
      sticker: "Zero Lock-in",
      stickerBg: "bg-accent text-white dark:bg-accent dark:text-foreground",
      // Meeting brainstorming photo
      imageSrc: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-40 bg-background border-b-2 border-border"
      data-testid="how-it-works"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-24 md:mb-32">
          <div className="inline-block px-3 py-1 rounded-full border-2 border-border bg-card text-xs font-bold uppercase tracking-wider mb-6">
            Manifesto
          </div>
          <h2 className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
            How it works <span className="text-foreground/40">— step by step.</span>
          </h2>
          <p className="font-sans text-lg text-foreground/70">
            We stripped away the menus, sidebars, and enterprise fluff. Here is the path to visual collaboration.
          </p>
        </div>

        {/* Chapters List */}
        <div className="flex flex-col gap-32 md:gap-48">
          {chapters.map((ch, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={ch.id}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}
              >
                {/* Text Content Block (5 Cols) */}
                <div className="w-full lg:w-[45%] flex flex-col items-start">
                  {/* Mega Chapter Number */}
                  <div className="font-clash text-[8rem] md:text-[10rem] font-bold text-primary leading-none select-none tracking-tighter -mb-6 md:-mb-10">
                    {ch.id}
                  </div>
                  
                  {/* Title & Icon Chip */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-md bg-foreground border-2 border-border flex items-center justify-center shadow-[2px_2px_0_0_var(--border-color)]">
                      {ch.icon}
                    </div>
                    <h3 className="font-clash font-bold text-2xl md:text-3xl tracking-tight">
                      {ch.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-base md:text-lg text-foreground/75 leading-relaxed mb-8">
                    {ch.desc}
                  </p>

                  {/* Pinned Stat */}
                  <div className="w-full border-t-2 border-border pt-4">
                    <span className="font-clash text-sm uppercase tracking-widest text-foreground/40 mr-4">Stat:</span>
                    <span className="font-clash font-bold text-base md:text-lg text-foreground">{ch.stat}</span>
                  </div>
                </div>

                {/* Visual Block (7 Cols) */}
                <motion.div
                  whileInView={{ y: [40, 0], opacity: [0, 1] }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full lg:w-[55%] relative group"
                >
                  {/* Bordered Image Container */}
                  <div className="aspect-[4/3] w-full rounded-2xl border-2 border-border bg-card overflow-hidden shadow-brutal-sm group-hover:shadow-brutal transition-brutal relative">
                    {/* Multiply tint wrapper */}
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 pointer-events-none transition-colors group-hover:bg-primary/5" />
                    
                    {/* Unsplash Image */}
                    <img
                      src={ch.imageSrc}
                      alt={ch.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Sticker Overlay */}
                  <div className={`absolute top-4 right-4 ${ch.stickerBg} text-foreground border-2 border-border rounded-full px-4 py-1.5 font-clash font-bold text-xs sm:text-sm uppercase tracking-wider shadow-brutal-sm group-hover:shadow-brutal group-hover:-translate-y-1.5 transition-brutal select-none ${isEven ? "rotate-6 group-hover:rotate-12" : "-rotate-6 group-hover:-rotate-12"}`}>
                    {ch.sticker}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
