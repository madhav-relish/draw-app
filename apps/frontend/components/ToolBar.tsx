import { useEffect } from "react";
import { Tool } from "@/types/canvasTypes";
import { Circle, Pencil, Square, TextCursorIcon } from "lucide-react";

interface ToolItem {
    type: Tool;
    name: string;
    shortcut: string;
    icon: React.ReactNode;
}

const tools: ToolItem[] = [
    {
        type: 'rect',
        name: 'Rectangle',
        shortcut: '1',
        icon: <Square size={18} strokeWidth={2.2} />
    },
    {
        type: 'circle',
        name: 'Circle',
        shortcut: '2',
        icon: <Circle size={18} strokeWidth={2.2} />
    },
    {
        type: 'pencil',
        name: 'Pencil',
        shortcut: '3',
        icon: <Pencil size={18} strokeWidth={2.2} />
    },
    {
        type: 'text',
        name: 'Text',
        shortcut: '4',
        icon: <TextCursorIcon size={18} strokeWidth={2.2} />
    }
];

interface ToolBarProps {
    selectedTool: Tool;
    setSelectedTool: (toolType: Tool) => void;
}

export const ToolBar = ({ selectedTool, setSelectedTool }: ToolBarProps) => {
    // Keyboard shortcuts (1: Rect, 2: Circle, 3: Pencil)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in an input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key === '1' || e.key.toLowerCase() === 'r') {
                setSelectedTool('rect');
            } else if (e.key === '2' || e.key.toLowerCase() === 'c') {
                setSelectedTool('circle');
            } else if (e.key === '3' || e.key.toLowerCase() === 'p') {
                setSelectedTool('pencil');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setSelectedTool]);

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 bg-card/95 backdrop-blur-md rounded-2xl border-2 border-border shadow-brutal-sm select-none transition-all">
            {tools.map((tool) => {
                const isActive = selectedTool === tool.type;

                return (
                    <div key={tool.type} className="relative group">
                        <button
                            type="button"
                            onClick={() => setSelectedTool(tool.type)}
                            className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer ${isActive
                                    ? 'bg-primary text-white shadow-sm font-semibold'
                                    : 'text-foreground/75 hover:text-foreground hover:bg-foreground/5 dark:hover:bg-foreground/10'
                                }`}
                            aria-label={`${tool.name} tool`}
                        >
                            {tool.icon}
                        </button>

                        {/* Hover Tooltip */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-foreground text-background text-xs font-medium rounded-md shadow-md whitespace-nowrap">
                                <span>{tool.name}</span>
                                <span className="px-1 py-0.2 bg-background/20 rounded text-[10px] uppercase font-mono">
                                    {tool.shortcut}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
