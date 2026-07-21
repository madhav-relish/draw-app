
interface Shape {
    type: 'rect',
    x: number,
    y: number,
    height: number,
    width: number
}


export function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');

    console.log("Init")

    let existingShapes: Shape[] = []

    if (!ctx) {
        return
    }

    let clicked = false;
    let startX = 0;
    let startY = 0;

    // Start x, start y, width, height
    // ctx?.strokeRect(25, 25, 100, 100);

    canvas.addEventListener("mousedown", (e) => {
        console.log("MouseDown")
        clicked = true
        startX = e.clientX;
        startY = e.clientY
    })

    canvas.addEventListener("mouseup", (e) => {
        clicked = false
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            console.log("Clicked")
            const width = e.clientX - startX
            const height = e.clientY - startY
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeRect(startX, startY, width, height)
        }
    })
}