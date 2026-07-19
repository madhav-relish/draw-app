"use client";

import { useTheme } from "../lib/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full border-2 border-border bg-card cursor-pointer transition-brutal shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:scale-95 flex items-center justify-between px-1.5 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {/* Background tint overlay */}
      <div className="absolute inset-0 bg-secondary/10 dark:bg-accent/10 pointer-events-none" />
      
      {/* Capsule Slider Knob */}
      <motion.div
        className="absolute top-[2px] bottom-[2px] w-6 rounded-full bg-primary"
        animate={{
          x: theme === "light" ? 0 : 32,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
      />

      {/* Sun Icon */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6 text-foreground select-none">
        <motion.div
          animate={{
            rotate: theme === "light" ? 0 : 180,
            opacity: theme === "light" ? 1 : 0.6,
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun size={14} className="stroke-[2.5]" />
        </motion.div>
      </div>

      {/* Moon Icon */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6 text-foreground select-none">
        <motion.div
          animate={{
            rotate: theme === "dark" ? 0 : -180,
            opacity: theme === "dark" ? 1 : 0.6,
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon size={14} className="stroke-[2.5]" />
        </motion.div>
      </div>
    </button>
  );
}
