
import type { Shape, Tool } from "@/types/canvasTypes";
import { getExistingShapes } from "./http";
import { drawShape, getCanvasCoordinates, handleResize, redrawCanvas } from "@/lib/helpers";

export async function initDraw(canvas: HTMLCanvasElement, socket: WebSocket, roomId: string, getSelectedTool: () => Tool) {

    const ctx = canvas.getContext('2d');
    let existingShapes: Shape[] = []

    try {
        existingShapes = await getExistingShapes(roomId)
    } catch (error) {
        console.log("error occured inside draw/index.ts::", error)
    }

    if (!ctx) {
        return
    }


    window.addEventListener('resize', () => handleResize(canvas, existingShapes, ctx))
    handleResize(canvas, existingShapes, ctx) // For the initial sizing

    socket.onmessage = (event) => {

        const message = JSON.parse(event.data)

        if (message.type = "chat") {
            const parsedShape = JSON.parse(message?.message);
            existingShapes?.push(parsedShape?.shape)
            redrawCanvas(existingShapes, canvas, ctx)
        }

    }

    redrawCanvas(existingShapes, canvas, ctx)

    let clicked = false;
    let startX = 0;
    let startY = 0;
    let currentPath: { x: number, y: number }[] = []
    ctx.lineCap = 'round';   // Makes the ends of lines smooth
    ctx.lineJoin = 'round';

    // Start x, start y, width, height
    // ctx?.strokeRect(25, 25, 100, 100);

    canvas.addEventListener("mousedown", (e) => {
        console.log("MouseDown")
        clicked = true;
        const coordinates = getCanvasCoordinates(canvas, e)
        startX = coordinates.x;
        startY = coordinates.y;

        if (getSelectedTool() === 'pencil') {
            currentPath = [{ x: startX, y: startY }]
        }
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            console.log("Clicked")
            const coordinates = getCanvasCoordinates(canvas, e)
            const width = coordinates.x - startX
            const height = coordinates.y - startY
            const tool = getSelectedTool()
            redrawCanvas(existingShapes, canvas, ctx)

            if (tool == 'rect') {

                // ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.strokeRect(startX, startY, width, height)
            } else if (tool === 'circle') {
                const radius = Math.hypot(width, height)
                ctx.beginPath();
                ctx.arc(startX, startY, radius, 0, 2 * Math.PI)
                ctx.stroke()
            } else if (tool === 'pencil') {
                currentPath.push({ x: coordinates.x + 0.5, y: coordinates.y + 0.5 })
            }
            drawShape(ctx, { type: 'pencil', path: currentPath })
        }
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const coordinates = getCanvasCoordinates(canvas, e)
        const width = coordinates.x - startX
        const height = coordinates.y - startY
        const tool = getSelectedTool()

        let newShape: Shape | null = null

        if (tool === 'rect') {
            newShape = {
                type: 'rect',
                x: startX,
                y: startY,
                width,
                height
            }
        } else if (tool === 'circle') {
            newShape = {
                type: 'circle',
                centerX: startX,
                centerY: startY,
                radius: Math.hypot(width, height)
            }
        } else if (tool === 'pencil') {
            newShape = {
                type: 'pencil',
                path: currentPath
            }
        }

        if (newShape) {
            existingShapes?.push(newShape)

            socket.send(JSON.stringify({
                type: 'chat',
                roomId,
                message: JSON.stringify({
                    shape: newShape
                }),
            }))

        }
    })
}








