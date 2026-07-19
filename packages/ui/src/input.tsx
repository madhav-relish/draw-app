"use client";

import React, { ReactNode, InputHTMLAttributes, useId } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      containerClassName = "",
      labelClassName = "",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const inputBaseStyles =
      "w-full border-2 border-border p-3.5 rounded-xl bg-background text-foreground font-sans font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-brutal-sm focus:shadow-brutal transition-brutal placeholder:text-foreground/30 disabled:opacity-50 disabled:cursor-not-allowed";

    const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";
    const iconPaddingStyles = `${leftIcon ? "pl-11" : ""} ${rightIcon ? "pr-11" : ""}`;

    const combinedInputClassName = [
      inputBaseStyles,
      errorStyles,
      iconPaddingStyles,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`font-clash font-bold text-[10px] uppercase tracking-widest text-foreground/60 select-none ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-foreground/50 flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={combinedInputClassName}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 pointer-events-none text-foreground/50 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="font-sans text-xs font-semibold text-red-500 mt-0.5">
            {error}
          </p>
        ) : hint ? (
          <p className="font-sans text-xs text-foreground/50 mt-0.5">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
