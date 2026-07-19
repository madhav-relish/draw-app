"use client";

import React, { ReactNode, HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hoverable" | "interactive";
  children: ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", children, className = "", ...props },
    ref
  ) => {
    const baseStyles =
      "bg-card border-2 border-border rounded-2xl shadow-brutal p-8 flex flex-col gap-6 transition-brutal";

    const variantStyles = {
      default: "",
      hoverable: "hover:shadow-brutal-lg",
      interactive: "hover:shadow-brutal-lg hover:-translate-y-1 cursor-pointer",
    };

    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
