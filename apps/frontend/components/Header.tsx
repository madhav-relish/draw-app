"use client";

import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Header() {
  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-xl"
      data-testid="header"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo & Wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          {/* Logo Mark: F in a 32x32 orange square, 2px border, 3px shadow */}
          <div className="w-8 h-8 rounded-md bg-primary border-2 border-border shadow-[3px_3px_0_0_var(--border-color)] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0_0_var(--border-color)] active:translate-y-0 transition-brutal flex items-center justify-center select-none">
            <span className="font-clash font-bold text-white text-lg leading-none -mt-[1px]">F</span>
          </div>
          {/* Wordmark: Clash Display Semibold, tracking -0.03em */}
          <span className="font-clash font-semibold text-2xl tracking-[-0.03em] text-foreground">
            Figment
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans font-medium text-foreground/70 hover:text-foreground hover:underline underline-offset-4 decoration-primary decoration-2 transition-brutal"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (ThemeToggle + CTA) */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-5 h-10 rounded-full border-2 border-border bg-foreground text-background font-sans font-semibold text-sm transition-brutal shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:scale-96"
            data-testid="header-cta"
          >
            Launch App
          </a>
        </div>
      </div>
    </motion.header>
  );
}
