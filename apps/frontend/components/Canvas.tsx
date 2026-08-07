import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@repo/ui";
import { Tool } from "@/types/canvasTypes";
import { ToolBar } from "./ToolBar";


export const Canvas = ({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTool, setSelectedTool] = useState<Tool>('rect');
    const selectedToolRef = useRef(selectedTool)

    useEffect(() => {
        selectedToolRef.current = selectedTool
    }, [selectedTool])

    useEffect(() => {
        if (canvasRef.current) {
            setIsLoading(true)

            const canvas = canvasRef.current;

            initDraw(canvas, socket, roomId, () => selectedToolRef.current)
            setIsLoading(false)
        }

    }, [canvasRef, roomId, socket])

    if (isLoading) return <Loading fullPage label="Initializing Canvas..." size="lg" />

    return <div style={{
        height: '100vh',
        overflow: 'hidden'
    }}>
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <canvas ref={canvasRef}
            width={window.innerWidth} height={window.innerHeight}
        />
    </div>
} 