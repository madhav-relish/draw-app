"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@repo/ui";
import { LogOutIcon } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
  onSignOut: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  userEmail,
  onSignOut,
}) => {
  return (
    <header className="w-full max-w-6xl flex items-center justify-between border-2 border-border bg-card rounded-2xl p-4 sm:p-6 mb-12 shadow-brutal relative z-20">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-primary border-2 border-border shadow-[3px_3px_0_0_var(--border-color)] flex items-center justify-center select-none text-white font-clash font-bold text-xl">
          F
        </div>
        <div className="flex flex-col">
          <span className="font-clash font-bold text-lg sm:text-xl tracking-tight text-foreground leading-none">
            Figment
          </span>
          <span className="font-sans text-[10px] sm:text-xs text-foreground/50 font-bold uppercase tracking-widest mt-1">
            Collaborative Spaces
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end mr-2">
          <span className="font-clash font-bold text-sm text-foreground">
            {userName || "Collaborator"}
          </span>
          <span className="font-sans text-xs text-foreground/50">
            {userEmail || ""}
          </span>
        </div>
        <ThemeToggle />
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSignOut} 
          leftIcon={<LogOutIcon size={16} />}
          className="hidden sm:inline-flex"
        >
          Sign Out
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSignOut} 
          className="sm:hidden p-2.5"
        >
          <LogOutIcon size={16} />
        </Button>
      </div>
    </header>
  );
};
