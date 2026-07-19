"use client";

import MarqueeComponent from "react-fast-marquee";
import { Asterisk } from "lucide-react";

export default function Marquee() {
  const marqueeItems = [
    "Infinite Canvas",
    "Real-time Collaboration",
    "Neo-Brutalist Layouts",
    "Zero Lag Sketching",
    "Multiplayer Cursors",
    "Vector Connectors",
    "Export to SVG",
    "Open Source Board",
  ];

  return (
    <div className="w-full bg-primary border-y-2 border-border py-4 md:py-6 overflow-hidden flex items-center select-none">
      <MarqueeComponent speed={38} gradient={false} play={true}>
        <div className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12">
          {Array.from({ length: 4 }).flatMap(() => marqueeItems).map((text, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-12 font-clash font-bold text-2xl md:text-4xl text-white uppercase tracking-wider">
              <span>{text}</span>
              <Asterisk size={24} className="stroke-[3] text-secondary animate-[spin_12s_linear_infinite]" />
            </div>
          ))}
        </div>
      </MarqueeComponent>
    </div>
  );
}
