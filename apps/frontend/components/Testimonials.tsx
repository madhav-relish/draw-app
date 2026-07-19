"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "We replaced our whiteboard software entirely. Figment is three times faster and doesn't lag when the entire team jumps on the call.",
      name: "Marcus Vance",
      role: "Lead Engineer, Vercel",
      initials: "MV",
      rotate: "md:-rotate-2",
      bg: "bg-card",
    },
    {
      quote: "The smart connectors are worth the change alone. Dragging system charts around and watching paths re-route instantly makes planning fun.",
      name: "Sonia Lim",
      role: "Product Designer, Linear",
      initials: "SL",
      rotate: "md:rotate-1",
      bg: "bg-secondary", // Butter yellow in light / Mint cyan in dark
    },
    {
      quote: "Immediate multiplayer sandbox. No signups, no credit cards, no password lists. We just share links and start mapping layouts on the fly.",
      name: "Linus Lind",
      role: "Systems Architect, Git",
      initials: "LL",
      rotate: "md:rotate-2",
      bg: "bg-card",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 md:py-40 bg-background border-b-2 border-border"
      data-testid="testimonials"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-24">
          <div className="inline-block px-3 py-1 rounded-full border-2 border-border bg-card text-xs font-bold uppercase tracking-wider mb-6">
            Praise
          </div>
          <h2 className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
            Loved by <span className="italic text-primary">builders</span>.
          </h2>
          <p className="font-sans text-lg text-foreground/70">
            Read comments from engineers and designers who chose speed over meetings.
          </p>
        </div>

        {/* 3-Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              whileHover={{ rotate: 0, y: -8 }}
              className={`p-8 rounded-2xl border-2 border-border shadow-brutal-sm hover:shadow-brutal transition-brutal flex flex-col justify-between h-80 ${test.rotate} ${test.bg}`}
            >
              {/* Quote */}
              <p className="font-sans text-base leading-relaxed text-foreground/80 italic">
                "{test.quote}"
              </p>
              
              {/* User Meta */}
              <div className="flex items-center gap-4 mt-6">
                {/* Initials Avatar inside bordered circle */}
                <div className="w-12 h-12 rounded-full border-2 border-border bg-foreground text-background flex items-center justify-center font-clash font-bold text-sm select-none">
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-clash font-bold text-base tracking-tight leading-none mb-1">
                    {test.name}
                  </h4>
                  <p className="font-sans text-xs text-foreground/60 font-medium">
                    {test.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
