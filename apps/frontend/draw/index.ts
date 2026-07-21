
import { getExistingShapes } from "./http";

interface Shape {
    type: 'rect',
    x: number,
    y: number,
    height: number,
    width: number
}


export async function initDraw(canvas: HTMLCanvasElement, socket: WebSocket, roomId: string) {

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

    socket.onmessage = (event) => {

        const message = JSON.parse(event.data)

        if (message.type = "chat") {
            const parsedShape = JSON.parse(message?.message);
            existingShapes?.push(parsedShape?.shape)
            clearCanvas(existingShapes, canvas, ctx)
        }

    }

    clearCanvas(existingShapes, canvas, ctx)

    let clicked = false;
    let startX = 0;
    let startY = 0;

    // Start x, start y, width, height
    // ctx?.strokeRect(25, 25, 100, 100);

    canvas.addEventListener("mousedown", (e) => {
        console.log("MouseDown")
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX
        const height = e.clientY - startY

        let newShape: Shape | null = {
            type: 'rect',
            x: startX,
            y: startY,
            width,
            height
        }

        if (!newShape) return;

        existingShapes?.push(newShape)

        socket.send(JSON.stringify({
            type: 'chat',
            roomId,
            message: JSON.stringify({
                shape: newShape
            }),
        }))

    })



    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            console.log("Clicked")
            const width = e.clientX - startX
            const height = e.clientY - startY
            clearCanvas(existingShapes, canvas, ctx)
            // ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeRect(startX, startY, width, height)
        }
    })
}

const clearCanvas = (existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    existingShapes?.map((shape) => {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
    })

}


