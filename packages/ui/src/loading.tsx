"use client";

import React from "react";
import { Background } from "./background";

export interface LoadingProps {
  label?: string;
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  label = "Loading...",
  fullPage = false,
  size = "md",
  className = "",
}) => {
  const sizeStyles = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  const textStyles = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  const loaderContent = (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div 
        className={`${sizeStyles[size]} rounded-full border-primary border-t-transparent animate-spin`} 
      />
      {label && (
        <span className={`font-clash font-bold text-foreground tracking-wide ${textStyles[size]}`}>
          {label}
        </span>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <Background showDecorativeShapes={true} className="flex justify-center items-center">
        {loaderContent}
      </Background>
    );
  }

  return (
    <div className="flex justify-center items-center p-8 w-full">
      {loaderContent}
    </div>
  );
};

Loading.displayName = "Loading";
