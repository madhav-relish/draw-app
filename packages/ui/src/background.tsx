"use client";

import React, { ReactNode, HTMLAttributes } from "react";

export interface BackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showDecorativeShapes?: boolean;
  className?: string;
}

export const Background: React.FC<BackgroundProps> = ({
  children,
  showDecorativeShapes = true,
  className = "",
  ...props
}) => {
  const baseStyles =
    "min-h-screen bg-grid-pattern bg-background flex items-center justify-center py-16 px-6 relative overflow-hidden select-none";

  const combinedClassName = [baseStyles, className].filter(Boolean).join(" ");

  return (
    <div className={combinedClassName} data-testid="page-background" {...props}>
      {showDecorativeShapes && (
        <>
          {/* Top Left Floating Decorative Shape */}
          <div className="hidden md:block absolute left-[-5%] top-[10%] w-48 h-48 rounded-full bg-secondary border-2 border-border shadow-brutal-sm opacity-20 pointer-events-none" />
          {/* Bottom Right Floating Decorative Shape */}
          <div className="hidden md:block absolute right-[-5%] bottom-[10%] w-40 h-40 bg-accent border-2 border-border shadow-brutal-sm opacity-20 pointer-events-none" />
        </>
      )}
      {children}
    </div>
  );
};
