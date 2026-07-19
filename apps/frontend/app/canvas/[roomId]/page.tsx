'use client'
import { initDraw } from "@/draw";
import { Background } from "@repo/ui";
import { useEffect, useRef } from "react";

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {


        if (canvasRef.current) {
            const canvas = canvasRef.current;


            initDraw(canvas)
        }

    }, [canvasRef])
    return (<div>
        <Background>

            <canvas ref={canvasRef} width={1000} height={1000} />

        </Background>
    </div>)
}