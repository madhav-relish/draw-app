"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
  const tiers = [
    {
      name: "Draft",
      price: "$0",
      period: "forever",
      desc: "For quick sandboxes and rapid brainstorms.",
      perks: [
        "Unlimited sandbox sketches",
        "Up to 3 live collaborators",
        "24-hour room preservation",
        "Local browser auto-save",
        "Export as standard PNG"
      ],
      buttonText: "Create sandbox",
      ctaHref: "#",
      highlight: false,
      buttonBg: "bg-card text-foreground hover:bg-foreground/5",
      shadow: "shadow-brutal-sm"
    },
    {
      name: "Studio",
      price: "$12",
      period: "user / month",
      desc: "For active development, team channels, and permanent boards.",
      perks: [
        "Everything in Draft",
        "Unlimited multiplayer rooms",
        "Permanent board storage",
        "Smart SVG path exports",
        "Custom asset packs & stickers",
        "Priority Slack community help"
      ],
      buttonText: "Upgrade to Studio",
      ctaHref: "#",
      highlight: true,
      buttonBg: "bg-secondary text-foreground hover:-translate-y-0.5 hover:shadow-brutal",
      shadow: "shadow-brutal-lg"
    },
    {
      name: "Enterprise",
      price: "$39",
      period: "user / month",
      desc: "For organizational architecture maps and compliance controls.",
      perks: [
        "Everything in Studio",
        "SAML SSO & OAuth controls",
        "Dedicated cloud database instance",
        "Audit log history",
        "Custom domain templates",
        "99.9% availability SLA"
      ],
      buttonText: "Contact sales",
      ctaHref: "#",
      highlight: false,
      buttonBg: "bg-card text-foreground hover:bg-foreground/5",
      shadow: "shadow-brutal-sm"
    }
  ];

  return (
    <section
      id="pricing"
      className="py-24 md:py-40 bg-background border-b-2 border-border"
      data-testid="pricing"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-24">
          <div className="inline-block px-3 py-1 rounded-full border-2 border-border bg-card text-xs font-bold uppercase tracking-wider mb-6">
            Pricing
          </div>
          <h2 className="font-clash text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
            Simple plans. <span className="text-foreground/40">No surprises.</span>
          </h2>
          <p className="font-sans text-lg text-foreground/70">
            Choose the pace of your collaborative boards. Start free, scale as your team builds.
          </p>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch max-w-6xl mx-auto pt-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl border-2 border-border p-8 flex flex-col justify-between transition-brutal shadow-brutal-sm hover:shadow-brutal ${
                tier.highlight 
                  ? "bg-primary text-white scale-[1.03] z-10" 
                  : "bg-card text-foreground"
              }`}
            >
              {/* Highlight Badge Sticker */}
              {tier.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-secondary text-foreground border-2 border-border rounded-full px-4 py-1.5 font-clash font-bold text-xs uppercase tracking-wider rotate-[-2deg] shadow-brutal-sm flex items-center gap-1 select-none">
                  <Sparkles size={12} className="stroke-[2.5]" /> Most rooms
                </div>
              )}

              {/* Title & Price */}
              <div>
                <h3 className="font-clash font-bold text-2xl uppercase tracking-wider mb-2">
                  {tier.name}
                </h3>
                <p className={`font-sans text-sm mb-6 ${tier.highlight ? "text-white/80" : "text-foreground/60"}`}>
                  {tier.desc}
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="font-clash text-5xl md:text-6xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  <span className={`font-sans text-xs uppercase tracking-wider ${tier.highlight ? "text-white/70" : "text-foreground/50"}`}>
                    / {tier.period}
                  </span>
                </div>

                {/* Divider */}
                <hr className={`border-t-2 mb-8 ${tier.highlight ? "border-white/20" : "border-border/10"}`} />

                {/* Perks */}
                <ul className="flex flex-col gap-4 mb-10">
                  {tier.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-sm font-medium">
                      <div className={`w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0`}>
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span className="leading-tight opacity-90">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <a
                href={tier.ctaHref}
                className={`w-full inline-flex items-center justify-center h-12 rounded-full border-2 border-border font-sans font-bold shadow-brutal-sm transition-brutal ${tier.buttonBg}`}
                data-testid={`pricing-button-${tier.name.toLowerCase()}`}
              >
                {tier.buttonText}
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
