"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/config";
import { Button, Input, Card } from "@repo/ui";
import { PlusIcon, ArrowRightIcon } from "lucide-react";

interface CreateRoomCardProps {
  token: string | null;
  onRoomCreated: () => void;
}

export const CreateRoomCard: React.FC<CreateRoomCardProps> = ({
  token,
  onRoomCreated,
}) => {
  const router = useRouter();
  const [newRoomName, setNewRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim() || !token) return;

    setCreateError(null);
    setIsCreating(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/create-room`,
        { name: newRoomName.trim() },
        { headers: { Authorization: token } }
      );

      const newRoomId = response.data.roomId;

      setNewRoomName("");
      onRoomCreated();

      // Navigate to the newly created room canvas
      router.push(`/canvas/${newRoomId}`);
    } catch (err: any) {
      console.error("Create room error:", err);
      setCreateError(err.response?.data?.message || "Room already exists with this name.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="shadow-brutal p-6">
      <div className="flex items-center gap-2">
        <PlusIcon className="text-primary" size={20} />
        <h3 className="font-clash font-bold text-lg uppercase tracking-tight">
          Create Room
        </h3>
      </div>

      <form onSubmit={handleCreateRoom} className="flex flex-col gap-4 mt-2">
        <Input
          label="Room Name / Slug"
          placeholder="e.g. brainstorming-board"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          error={createError || undefined}
          hint="Use letters, numbers, or dashes."
          required
        />
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isCreating}
          rightIcon={<ArrowRightIcon size={16} />}
          size="lg"
        >
          Create & Launch
        </Button>
      </form>
    </Card>
  );
};
