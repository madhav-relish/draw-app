'use client'

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { Loading } from "@repo/ui";
import { WS_URL } from "@/config";
import { getRoomDetails } from "@/draw/http";

export const RoomCanvas = ({ roomId: initialRoomId }: { roomId: string }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [resolvedRoomId, setResolvedRoomId] = useState<string | null>(null);
    const [roomSlug, setRoomSlug] = useState<string>(initialRoomId);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        let wsInstance: WebSocket | null = null;

        const initRoomAndSocket = async () => {
            let actualId = initialRoomId;

            // If roomId is a slug (contains non-numeric characters), resolve it from DB
            if (isNaN(Number(initialRoomId))) {
                const room = await getRoomDetails(initialRoomId);
                if (!room) {
                    if (isMounted) setError("Room not found or could not be loaded");
                    return;
                }
                actualId = String(room.id);
                if (isMounted) {
                    setRoomSlug(room.slug);
                }
            }

            if (!isMounted) return;
            setResolvedRoomId(actualId);

            const token = localStorage.getItem('authToken') || "";
            const ws = new WebSocket(`${WS_URL}?token=${token}`);
            wsInstance = ws;

            ws.onopen = () => {
                if (!isMounted) return;
                setSocket(ws);
                const data = JSON.stringify({
                    type: 'join_room',
                    roomId: actualId
                });
                console.log("WS Connected, Joining Room:", data);
                ws.send(data);
            };

            ws.onerror = (e) => {
                console.error("WebSocket error:", e);
            };
        };

        initRoomAndSocket();

        return () => {
            isMounted = false;
            if (wsInstance) {
                wsInstance.close();
            }
        };
    }, [initialRoomId]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="font-clash font-bold text-xl text-red-500">{error}</p>
                <a href="/" className="px-5 py-2.5 rounded-full border-2 border-border bg-card text-foreground font-bold shadow-brutal-sm">
                    Back to Home
                </a>
            </div>
        );
    }

    if (!socket || !resolvedRoomId) {
        return <Loading fullPage label="Connecting to live canvas..." size="lg" />;
    }

    return <Canvas roomId={resolvedRoomId} roomSlug={roomSlug} socket={socket} />;
};