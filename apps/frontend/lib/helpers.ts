export const getThemeColor = () => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
        return '#F4F4F0'; // Light cream/white stroke for dark mode
    }
    return '#111111'; // Dark stroke for light mode
};

export const drawShape = (ctx: CanvasRenderingContext2D, shape: Shape) => {
    const strokeColor = getThemeColor();
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = strokeColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    if (shape.type === 'rect') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === 'circle') {
        const degToRad = (deg: number) => (deg * Math.PI) / 180;
        ctx.arc(shape.centerX, shape.centerY, shape.radius, degToRad(0), degToRad(360));
        ctx.stroke();
    } else if (shape.type === 'pencil' && shape.path.length > 0) {
        ctx.moveTo(shape.path[0].x, shape.path[0].y);
        for (let i = 1; i < shape.path.length; i++) {
            ctx.lineTo(shape.path[i].x + 0.5, shape.path[i].y + 0.5);
        }
        ctx.stroke();
    } else if (shape.type === 'text') {
        ctx.textBaseline = "top";
        ctx.font = '20px sans-serif';

        const lines = shape.text.split('\n');
        const lineHeight = 24;

        lines.forEach((line, index) => {
            ctx.fillText(line, shape.x, shape.y + (index * lineHeight));
        });
    }
};

export const getCanvasCoordinates = (canvas: HTMLCanvasElement, e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
};

export const redrawCanvas = (existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    existingShapes?.forEach((shape) => {
        drawShape(ctx, shape);
    });
};

export const handleResize = (canvas: HTMLCanvasElement, existingShapes: Shape[], ctx: CanvasRenderingContext2D) => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    redrawCanvas(existingShapes, canvas, ctx);
};


