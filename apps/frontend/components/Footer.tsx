"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Sandbox", href: "#" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#" },
    { name: "Community Discord", href: "#" },
    { name: "Github Repo", href: "#" },
    { name: "Security Spec", href: "#" },
  ];

  const companyLinks = [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "Careers", href: "#" },
  ];

  const legalLinks = [
    { name: "Terms of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "DPA Agreement", href: "#" },
    { name: "Cookie Settings", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-background border-t-2 border-border pt-24 pb-12 select-none"
      data-testid="footer"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-border/10">
          
          {/* Brand block (Col span 4) */}
          <div className="md:col-span-4 flex flex-col items-start gap-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-primary border-2 border-border shadow-[3px_3px_0_0_var(--border-color)] flex items-center justify-center font-clash font-bold text-white text-lg leading-none select-none">
                F
              </div>
              <span className="font-clash font-semibold text-2xl tracking-[-0.03em] text-foreground">
                Figment
              </span>
            </a>
            
            <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-xs">
              Neo-brutalist whiteboard engine for creative engineering teams. Sketch concepts in high fidelity.
            </p>

            {/* Socials as bordered circle buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-secondary transition-brutal flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-secondary transition-brutal flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5"
                aria-label="Github"
              >
                <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.069.069-.608 0 .963.748 1.47 1.473 1.47 1.258.822 2.379.584 2.964.446.077-.544.295-.908.536-1.116-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-secondary transition-brutal flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5"
                aria-label="Youtube"
              >
                <svg className="w-4 h-4 fill-current text-foreground" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-clash font-bold text-sm uppercase tracking-wider text-foreground/40">Product</h4>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="font-sans text-sm font-semibold text-foreground/70 hover:text-foreground hover:underline transition-brutal">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-clash font-bold text-sm uppercase tracking-wider text-foreground/40">Resources</h4>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="font-sans text-sm font-semibold text-foreground/70 hover:text-foreground hover:underline transition-brutal">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 4 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-clash font-bold text-sm uppercase tracking-wider text-foreground/40">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="font-sans text-sm font-semibold text-foreground/70 hover:text-foreground hover:underline transition-brutal">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 5 */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-clash font-bold text-sm uppercase tracking-wider text-foreground/40">Legal</h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="font-sans text-sm font-semibold text-foreground/70 hover:text-foreground hover:underline transition-brutal">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Mega Ghost Wordmark + Back to top */}
        <div className="relative pt-12 flex flex-col items-center justify-center">
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="absolute top-12 right-0 w-10 h-10 rounded-full border-2 border-border bg-card hover:bg-secondary transition-brutal flex items-center justify-center shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={16} className="stroke-[2.5]" />
          </button>

          {/* Mega Wordmark Poster: ~18vw size, 6% opacity */}
          <div className="font-clash font-bold text-[18vw] text-foreground/[0.06] tracking-[-0.03em] leading-none select-none select-none text-center pointer-events-none mt-6">
            Figment
          </div>
        </div>

        {/* Footer Meta & Signature Dry Joke */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-border/5">
          <p className="font-sans text-xs text-foreground/50 font-medium">
            © {new Date().getFullYear()} Figment Inc. All rights reserved.
          </p>
          <p className="font-sans text-xs text-foreground/60 font-semibold italic">
            "All ideas remain yours."
          </p>
        </div>

      </div>
    </footer>
  );
}
