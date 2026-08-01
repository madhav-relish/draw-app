"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { Card, Background, Loading } from "@repo/ui";
import { DashboardHeader } from "./DashboardHeader";
import { CreateRoomCard } from "./CreateRoomCard";
import { JoinRoomCard } from "./JoinRoomCard";
import { RoomsList } from "./RoomsList";

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

interface User {
  id: string;
  name: string;
  email: string;
}

export const Dashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const fetchRooms = async (authToken: string) => {
    try {
      const roomsRes = await axios.get(`${BACKEND_URL}/rooms`, {
        headers: { Authorization: authToken },
      });
      setRooms(roomsRes.data.rooms);
    } catch (error) {
      console.error("Error refreshing rooms list:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      router.push("/signin");
      return;
    }
    setToken(storedToken);

    const fetchDashboardData = async () => {
      try {
        const [userRes, roomsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/me`, {
            headers: { Authorization: storedToken },
          }),
          axios.get(`${BACKEND_URL}/rooms`, {
            headers: { Authorization: storedToken },
          })
        ]);

        setUser(userRes.data.user);
        setRooms(roomsRes.data.rooms);
      } catch (error: any) {
        console.error("Dashboard data load error:", error);
        if (error.response?.status === 403) {
          localStorage.removeItem("authToken");
          router.push("/signin");
        }
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    router.push("/signin");
  };

  if (isPageLoading) {
    return <Loading fullPage label="Loading Figment Dashboard..." size="lg" />;
  }

  return (
    <Background showDecorativeShapes={true} className="py-8 px-4 sm:px-6 md:px-10 flex flex-col justify-start items-center">
      <DashboardHeader 
        userName={user?.name} 
        userEmail={user?.email} 
        onSignOut={handleSignOut} 
      />

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 mb-16">
        {/* Left column: Actions */}
        <section className="md:col-span-4 flex flex-col gap-8">
          {/* Welcome User Header Card */}
          <Card className="bg-secondary/20 shadow-brutal p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-border bg-secondary flex items-center justify-center font-clash font-bold text-foreground shadow-brutal-sm">
                {(user?.name?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <h2 className="font-clash font-bold text-lg leading-tight">
                  Hey, {user?.name?.split(" ")[0]}!
                </h2>
                <p className="font-sans text-xs text-foreground/60">
                  Ready to sketch something wild?
                </p>
              </div>
            </div>
          </Card>

          <CreateRoomCard token={token} onRoomCreated={() => token && fetchRooms(token)} />
          <JoinRoomCard />
        </section>

        {/* Right column: Room Grid list */}
        <section className="md:col-span-8 flex flex-col gap-6">
          <RoomsList rooms={rooms} currentUserId={user?.id} />
        </section>
      </main>
    </Background>
  );
};