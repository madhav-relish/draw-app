'use client'

import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export const RoomCanvas = ({ roomId }: { roomId: string }) => {

    const [socket, setSocket] = useState<WebSocket | null>(null)


    useEffect(() => {

        const token = localStorage.getItem('authToken')
        const ws = new WebSocket(`ws://localhost:8081?token=${token}`)

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
        return <div> Connecting to server... </div>
    }

    return <Canvas roomId={roomId} socket={socket} />

}