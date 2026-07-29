import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@repo/ui";


export const Canvas = ({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (canvasRef.current) {
            setIsLoading(true)

            const canvas = canvasRef.current;

            initDraw(canvas, socket, roomId)
            setIsLoading(false)
        }

    }, [canvasRef, roomId, socket])

    if (isLoading) return <Loading fullPage label="Initializing Canvas..." size="lg" />

    return <div style={{
        height: '100vh',
        overflow: 'hidden'
    }}>

        <canvas ref={canvasRef}
            width={window.innerWidth} height={window.innerHeight}
        />
    </div>
} 