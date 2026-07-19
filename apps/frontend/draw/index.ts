export function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return
    }

    let clicked = false;
    let startX = 0;
    let startY = 0;

    // Start x, start y, width, height
    ctx?.strokeRect(25, 25, 100, 100);

    canvas.addEventListener("mousedown", (e) => {
        console.log(e.clientX)
        console.log(e.clientY)
        clicked = true
    })

    canvas.addEventListener("mouseup", (e) => {
        console.log(e.clientX)
        console.log(e.clientY)
        clicked = false
    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX
            const height = e.clientY - startY
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeRect(startX, startY, width, height)
            console.log(e.clientX)
            console.log(e.clientY)
        }
    })
}