"use client";

import React, { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border font-sans font-bold shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:scale-95 transition-brutal cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none";

    const variantStyles = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-foreground hover:bg-secondary/90",
      outline: "bg-card text-foreground hover:bg-card/90",
      accent: "bg-accent text-white hover:bg-accent/90",
      ghost:
        "bg-transparent text-foreground border-transparent hover:border-border shadow-none hover:shadow-brutal-sm",
    };

    const sizeStyles = {
      sm: "py-2 px-3 text-xs rounded-lg",
      md: "py-3 px-4 text-xs sm:text-sm rounded-xl",
      lg: "py-3 px-6 text-sm sm:text-base rounded-xl",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      widthStyle,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
