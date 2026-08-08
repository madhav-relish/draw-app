
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
    let newShape: Shape | null = null
    let activeTextarea = null;

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

    canvas.addEventListener('click', (e) => {
        const tool = getSelectedTool()
        if (activeTextarea || tool !== 'text') {
            console.log("Text area already active::")
            return
        };

        const clientX = e.clientX
        const clientY = e.clientY // Because of postion: fixed we need to use this and not getCanvasCoordinates for textarea input box
        const { x: canvasX, y: canvasY } = getCanvasCoordinates(canvas, e) //for the shape

        if (tool === 'text') {
            createCanvasTextArea(clientX, clientY, canvasX, canvasY, (newShape: Shape) => {

                existingShapes.push(newShape);

                redrawCanvas(existingShapes, canvas, ctx);

                socket.send(JSON.stringify({
                    type: 'chat',
                    roomId,
                    message: JSON.stringify({
                        shape: newShape
                    })
                }));
            });
        }

    })
}


export const createCanvasTextArea = (clientX: number, clientY: number, canvasX: number, canvasY: number, onCommit: (shape: Shape) => void) => {
    // Create the html textare element
    const textArea = document.createElement('textarea')
    textArea.className = "canvas-textArea"

    // Position the textare on the click position
    textArea.style.position = 'fixed'
    textArea.style.left = `${clientX}px`
    textArea.style.top = `${clientY}px`
    textArea.style.width = '120px'
    textArea.style.height = '40px'
    textArea.style.border = '1px dashed black'
    textArea.style.outline = 'none'
    document.body.appendChild(textArea);
    textArea.focus()


    // create the html text drawing when user click away the textbox (on blur)
    textArea.addEventListener('blur', (e) => {
        const text = textArea.value.trim()
        if (text.length > 0) {
            const newShape: Shape = {
                type: 'text',
                text: text,
                x: canvasX,
                y: canvasY
            };

            onCommit(newShape);
        }
        textArea.remove();

    }
    )

}








