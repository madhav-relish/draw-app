import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";


export const Canvas = ({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("current outer")
        if (canvasRef.current) {
            setIsLoading(true)
            console.log("Current")
            const canvas = canvasRef.current;

            initDraw(canvas, socket, roomId)
            setIsLoading(false)
        }

    }, [canvasRef, roomId, socket])

    if (isLoading) return <div>Loading....</div>

    return <canvas ref={canvasRef} style={{
        width: "100vw",
        height: "100vh"
    }}
        width={window.innerWidth} height={window.innerHeight}
    />
} 