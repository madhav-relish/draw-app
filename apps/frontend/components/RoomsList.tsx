"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card } from "@repo/ui";
import { 
  UsersIcon, 
  CalendarIcon, 
  ArrowRightIcon, 
  SparklesIcon, 
  LayersIcon 
} from "lucide-react";

interface Room {
  id: number;
  slug: string;
  createdAt: string;
  adminId: string;
  admin: {
    name: string;
    email: string;
  };
}

interface RoomsListProps {
  rooms: Room[];
  currentUserId?: string;
}

export const RoomsList: React.FC<RoomsListProps> = ({ rooms, currentUserId }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between border-b-2 border-border/10 pb-4">
        <div className="flex items-center gap-2.5">
          <LayersIcon className="text-primary" size={22} />
          <h2 className="font-clash font-bold text-2xl tracking-tight">
            Your Drawing Boards
          </h2>
        </div>
        <span className="font-clash font-bold text-xs bg-card border-2 border-border py-1 px-3 rounded-full shadow-brutal-sm">
          {rooms.length} {rooms.length === 1 ? "Space" : "Spaces"}
        </span>
      </div>

      {rooms.length === 0 ? (
        /* Empty State */
        <Card className="shadow-brutal border-dashed border-2 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-secondary border-2 border-border shadow-brutal flex items-center justify-center text-foreground mb-6">
            <SparklesIcon size={28} />
          </div>
          <h3 className="font-clash font-bold text-xl mb-2">No boards created yet!</h3>
          <p className="font-sans text-sm text-foreground/60 max-w-sm leading-relaxed mb-6">
            Whiteboards are better with friends. Type a name on the left to spin up your first live collaborative canvas.
          </p>
        </Card>
      ) : (
        /* Rooms List Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rooms.map((room) => {
            const isAdmin = room.adminId === currentUserId;
            
            return (
              <Card 
                key={room.id} 
                variant="interactive" 
                onClick={() => router.push(`/canvas/${room.id}`)}
                className="p-6 transition-brutal group"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-clash font-bold text-lg truncate pr-2 max-w-[70%] group-hover:text-primary">
                    {room.slug}
                  </h3>
                  
                  {isAdmin ? (
                    <span className="font-clash font-bold text-[9px] uppercase tracking-widest bg-secondary text-foreground py-1 px-2.5 rounded-full border-2 border-border shadow-brutal-sm">
                      Admin
                    </span>
                  ) : (
                    <span className="font-clash font-bold text-[9px] uppercase tracking-widest bg-accent text-white py-1 px-2.5 rounded-full border-2 border-border shadow-brutal-sm">
                      Collaborator
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 border-t border-border/10 pt-4 mt-2">
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <UsersIcon size={14} className="shrink-0" />
                    <span className="truncate">
                      Host: <strong className="text-foreground/80">{isAdmin ? "You" : room.admin.name}</strong>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <CalendarIcon size={14} className="shrink-0" />
                    <span>
                      {new Date(room.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-4">
                  <span className="font-clash font-bold text-xs text-primary flex items-center gap-1 group-hover:underline">
                    Enter Canvas <ArrowRightIcon size={12} className="ml-1" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
