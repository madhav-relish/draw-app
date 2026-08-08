export type Tool = 'rect' | 'circle' | 'pencil' | 'text'

export type Shape = {
    type: 'rect',
    x: number,
    y: number,
    height: number,
    width: number
} | { type: 'circle', centerX: number, centerY: number, radius: number }
    | { type: 'pencil', path: { x: number, y: number }[] }
    | { type: 'text', text: string, x: number, y: number, fonstSize?: number, fontFamily?: string }