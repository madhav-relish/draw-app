"use client";

import React, { HTMLAttributes } from "react";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  className = "",
  ...props
}) => {
  if (!label) {
    return (
      <hr
        className={`w-full border-t-2 border-border/10 my-2 ${className}`}
        {...props}
      />
    );
  }

  return (
    <div className={`flex items-center gap-3 w-full my-2 ${className}`} {...props}>
      <hr className="flex-1 border-t-2 border-border/10" />
      <span className="text-[10px] font-clash font-bold uppercase tracking-widest text-foreground/40 select-none">
        {label}
      </span>
      <hr className="flex-1 border-t-2 border-border/10" />
    </div>
  );
};
