

import { RoomCanvas } from "@/components/RoomCanvas";
import { Background } from "@repo/ui";


export default async function CanvasPage({ params }: {
    params: {
        roomId: string
    }
}) {

    const roomId = (await params).roomId

    return (<div>
        <Background showDecorativeShapes={false}>
            <RoomCanvas roomId={roomId} />
        </Background>
    </div>)
}