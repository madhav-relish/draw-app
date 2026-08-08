import axios from "axios"
import { BACKEND_URL } from "../config";


export async function getExistingShapes(roomId: string | number) {
    try {
        const response = await axios.get(`${BACKEND_URL}/chat/${roomId}`)
        const messages = response.data.messages;

        console.log("Messages::", messages)

        const shapes = messages?.map((x: { message: string }) => {
            const messageData = JSON.parse(x.message)
            return messageData.shape
        })

        console.log("Shapes::", shapes)

        return shapes || [];
    } catch (error) {
        console.log("Error while getting existing messages", error)
        return [];
    }
}

export async function getRoomDetails(slug: string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
        return response.data.room;
    } catch (error) {
        console.log("Error fetching room details:", error);
        return null;
    }
}

export async function createDemoRoom() {
    try {
        const response = await axios.post(`${BACKEND_URL}/demo-room`);
        return response.data;
    } catch (error) {
        console.log("Error creating demo room:", error);
        return null;
    }
}