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

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  let userId = checkUser(token);

  // If unauthenticated, assign a unique guest ID so they can collaborate
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

        await prismaClient.chat.create({
          data: {
            roomId: Number(roomId),
            message,
            userId: isGuest ? null : userId
          }
        });

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

