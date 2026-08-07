"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config";
import { Button, Input, Card } from "@repo/ui";
import { SearchIcon, SparklesIcon } from "lucide-react";

export const JoinRoomCard: React.FC = () => {
  const router = useRouter();
  const [joinRoomSlug, setJoinRoomSlug] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinRoomSlug.trim()) return;

    setJoinError(null);
    setIsJoining(true);

    try {
      const response = await axios.get(`${BACKEND_URL}/room/${joinRoomSlug.trim()}`);
      const room = response.data.room;


      if (!room) {
        setJoinError("Room not found. Please double check the room name.");
        setIsJoining(false);
        return;
      }

      // Navigate to room canvas
      router.push(`/canvas/${room.id}`);
    } catch (err: any) {
      if (err.response.status == 404 || err.response.status == 401) {
        setJoinError(err.response.data.message);
      }
      else {
        setJoinError("Failed to join room. Please check your network connection.");
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <Card className="shadow-brutal p-6">
      <div className="flex items-center gap-2">
        <SearchIcon className="text-accent" size={20} />
        <h3 className="font-clash font-bold text-lg uppercase tracking-tight">
          Join Room
        </h3>
      </div>

      <form onSubmit={handleJoinRoom} className="flex flex-col gap-4 mt-2">
        <Input
          label="Room Name / Slug"
          placeholder="Enter exact room slug..."
          value={joinRoomSlug}
          onChange={(e) => setJoinRoomSlug(e.target.value)}
          error={joinError || undefined}
          required
        />
        <Button
          type="submit"
          variant="secondary"
          fullWidth
          isLoading={isJoining}
          rightIcon={<SparklesIcon size={16} />}
          size="lg"
        >
          Find & Join
        </Button>
      </form>
    </Card>
  );
};
