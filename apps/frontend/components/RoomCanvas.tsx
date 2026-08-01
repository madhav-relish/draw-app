'use client'

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { Loading } from "@repo/ui";
import { WS_URL } from "@/config";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null)


    useEffect(() => {

        const token = localStorage.getItem('authToken')
        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: 'join_room',
                roomId
            })
            console.log("WS Data::", data)
            ws.send(data)
        }

    }, [])

    if (!socket) {
        return <Loading fullPage label="Connecting to workspace..." size="lg" />
    }

    return <Canvas roomId={roomId} socket={socket} />

}