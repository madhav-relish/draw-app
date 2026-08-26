import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Loading } from "@repo/ui";
import { Tool } from "@/types/canvasTypes";
import { ToolBar } from "./ToolBar";
import { Check, Copy, Home, Share2 } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export const Canvas = ({ roomId, roomSlug, socket }: {
    roomId: string,
    roomSlug?: string,
    socket: WebSocket
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTool, setSelectedTool] = useState<Tool>('rect');
    const [copied, setCopied] = useState(false);
    const selectedToolRef = useRef(selectedTool);

    useEffect(() => {
        selectedToolRef.current = selectedTool;
    }, [selectedTool]);

    useEffect(() => {
        if (canvasRef.current) {
            setIsLoading(true);
            const canvas = canvasRef.current;

            initDraw(canvas, socket, roomId, () => selectedToolRef.current);
            setIsLoading(false);
        }
    }, [canvasRef, roomId, socket]);

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) return <Loading fullPage label="Initializing Canvas..." size="lg" />;

    const isGuest = typeof window !== 'undefined' && !localStorage.getItem('authToken');

    return (
        <div style={{ height: '100vh', overflow: 'hidden' }} className="relative bg-background bg-grid-pattern select-none">
            {/* Top Right Floating Navigation & Share Controls */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2.5 select-none">
                {isGuest && (
                    <Link
                        href="/signin"
                        className="hidden sm:inline-flex items-center px-3.5 h-10 rounded-xl bg-card/90 backdrop-blur-md border-2 border-border shadow-brutal-sm text-foreground font-sans font-bold text-xs hover:bg-foreground/5 transition-all"
                        title="Sign in to save and create multiple rooms"
                    >
                        Sign in for more rooms
                    </Link>
                )}

                <Link
                    href="/"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-card/90 backdrop-blur-md border-2 border-border shadow-brutal-sm text-foreground hover:bg-foreground/5 transition-all active:scale-95"
                    title="Back to Home"
                >
                    <Home size={18} />
                </Link>

                <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-3.5 h-10 rounded-xl bg-primary text-white font-sans font-bold text-sm shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
                    title="Share room link with friends"
                >
                    {copied ? (
                        <>
                            <Check size={16} className="stroke-[3]" />
                            <span>Link Copied!</span>
                        </>
                    ) : (
                        <>
                            <Share2 size={16} />
                            <span>Share Room</span>
                        </>
                    )}
                </button>

                <ThemeToggle />
            </div>

            {/* Room Indicator (Top Left) */}
            <div className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card/90 backdrop-blur-md border-2 border-border shadow-brutal-sm text-xs font-mono font-bold text-foreground/80 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Room: {roomSlug || roomId}</span>
            </div>

            {/* Center Toolbar */}
            <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />

            {/* Canvas Surface */}
            <canvas
                ref={canvasRef}
                width={typeof window !== 'undefined' ? window.innerWidth : 1200}
                height={typeof window !== 'undefined' ? window.innerHeight : 800}
                className={`${selectedTool === 'pan' ? 'cursor-grab' : selectedTool === 'text' ? 'cursor-text' : 'cursor-crosshair'}`}
            />
        </div>
    );
};
