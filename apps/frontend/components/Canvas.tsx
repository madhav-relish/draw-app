import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";


export const Canvas = ({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("current outer")
        if (canvasRef.current) {
            console.log("Current")
            const canvas = canvasRef.current;
            initDraw(canvas)
        }

    }, [canvasRef])


    return <canvas ref={canvasRef} style={{
        width: "100vw",
        height: "100vh"
    }}
        width={window.innerWidth} height={window.innerHeight}
    />
} 