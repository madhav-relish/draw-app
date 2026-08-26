import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8081 });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

async function checkUser(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (typeof decoded == "string" || !decoded || !decoded.userId) {
      return null;
    }

    if (typeof decoded.userId === "string" && decoded.userId.startsWith("guest_")) {
      return decoded.userId;
    }

    const dbUser = await prismaClient.user.findUnique({
      where: { id: decoded.userId }
    });

    return dbUser ? dbUser.id : null;
  } catch (e) {
    return null;
  }
}

wss.on('connection', async function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  let userId = await checkUser(token);

  // If unauthenticated or user not found in DB, assign a unique guest ID so they can collaborate
  if (!userId) {
    userId = "guest_" + Math.random().toString(36).substring(2, 10);
  }

  const currentUser: User = {
    userId,
    rooms: [],
    ws
  };

  users.push(currentUser);

  ws.on('close', () => {
    const index = users.findIndex(u => u.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });

  ws.on('message', async function message(data) {
    try {
      let parsedData;
      if (typeof data !== "string") {
        parsedData = JSON.parse(data.toString());
      } else {
        parsedData = JSON.parse(data);
      }

      if (parsedData.type === "join_room") {
        const user = users.find(x => x.ws === ws);
        if (user && !user.rooms.includes(String(parsedData.roomId))) {
          user.rooms.push(String(parsedData.roomId));
        }
      }

      if (parsedData.type === "leave_room") {
        const user = users.find(x => x.ws === ws);
        if (user) {
          user.rooms = user.rooms.filter(x => x !== String(parsedData.roomId));
        }
      }

      console.log("message received", parsedData);

      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        const isGuest = userId.startsWith("guest_");

        try {
          await prismaClient.chat.create({
            data: {
              roomId: Number(roomId),
              message,
              userId: isGuest ? null : userId
            }
          });
        } catch (e) {
          console.error("Failed to save chat with userId, retrying with null userId:", e);
          try {
            await prismaClient.chat.create({
              data: {
                roomId: Number(roomId),
                message,
                userId: null
              }
            });
          } catch (err) {
            console.error("Failed to save chat to DB:", err);
          }
        }

        users.forEach(user => {
          if (user.rooms.includes(String(roomId))) {
            user.ws.send(JSON.stringify({
              type: "chat",
              message: message,
              roomId
            }));
          }
        });
      }
    } catch (error) {
      console.log("Error while chat::", error);
    }
  });
});

