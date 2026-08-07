
import { Tool } from "@/types/canvasTypes";
import { getExistingShapes } from "./http";


export type Shape = {
    type: 'rect',
    x: number,
    y: number,
    height: number,
    width: number
} | { type: 'circle', centerX: number, centerY: number, radius: number }
    | { type: 'pencil', path: { x: number, y: number }[] }


export async function initDraw(canvas: HTMLCanvasElement, socket: WebSocket, roomId: string, getSelectedTool: () => Tool) {

    const ctx = canvas.getContext('2d');
    let existingShapes: Shape[] = []

    try {
        existingShapes = await getExistingShapes(roomId)
    } catch (error) {
        console.log("error occured inside draw/index.ts::", error)
    }

    console.log({ existingShapes })

    if (!ctx) {
        return
    }

    const handleResize = () => {
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        redrawCanvas(existingShapes, canvas, ctx)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // For the initial sizing

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
                currentPath.push({ x: coordinates.x, y: coordinates.y })
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

            console.log("NEW shape:::", newShape)
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

const redrawCanvas = (existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    existingShapes?.map((shape) => {
        drawShape(ctx, shape)
    })

}

const getCanvasCoordinates = (canvas: HTMLCanvasElement, e: MouseEvent) => {

    const rect = canvas.getBoundingClientRect()
    console.log("Canvas Co-ordinates::", rect)

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    ctx.beginPath();
    if (shape.type === 'rect') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
    } else if (shape.type === 'circle') {
        //Since Angles in 2D Canvas are taken in Radian
        const degToRad = (deg: number) => (deg * Math.PI) / 180;

        ctx.arc(shape.centerX, shape.centerY, shape.radius, degToRad(0), degToRad(360))
        ctx.stroke();
    } else if (shape.type === 'pencil' && shape.path.length > 0) {
        ctx.moveTo(shape.path[0].x, shape.path[0].y)
        for (let i = 1; i < shape.path.length; i++) {
            ctx.lineTo(shape.path[i].x, shape.path[i].y)
        }
        ctx.stroke();
    }

}




