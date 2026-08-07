import { Tool } from "@/types/canvasTypes"
import { Circle, PencilIcon, Square } from "lucide-react"

interface ToolItem {
    type: Tool;
    icon: React.ReactNode;
}

const tools: ToolItem[] = [
    {
        type: 'rect',
        icon: <Square />
    },
    {
        type: 'circle',
        icon: <Circle />
    },
    {
        type: 'pencil',
        icon: <PencilIcon />
    }
]

interface ToolBarProps {
    selectedTool: Tool;
    setSelectedTool: (toolType: Tool) => void;
}

export const ToolBar = ({ selectedTool, setSelectedTool }: ToolBarProps) => {
    console.log(selectedTool)

    return <div className="absolute top-2 left-[50%] p-2 rounded-lg border border-1 ">

        {
            tools.map((tool, index) => (
                <button
                    className={`mx-1 ${selectedTool === tool.type ? 'bg-blue border border-2 rounded-lg' : ''}`}
                    key={index}
                    onClick={() => {
                        setSelectedTool(tool.type)

                        console.log(tool.type)
                    }}
                >
                    {tool.icon}
                </button>))
        }
    </div>
}