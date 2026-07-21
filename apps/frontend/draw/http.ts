import axios from "axios"


export async function getExistingShapes(roomId: string) {
    try {

        const response = await axios.get(`http://localhost:3004/chat/${roomId}`)
        const messages = response.data.messages;

        console.log("Messages::", messages)

        const shapes = messages?.map((x: { message: string }) => {
            const messageData = JSON.parse(x.message)
            return messageData.shape
        })

        console.log("Shapes::", shapes)

        return shapes;
    } catch (error) {
        console.log("Error while geting existing messages", error)
    }
}