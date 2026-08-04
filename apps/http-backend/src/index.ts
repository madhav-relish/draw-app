import express from 'express';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from '@repo/common/types';
import { prismaClient } from "@repo/db/client"
import bcrypt from 'bcryptjs';
const cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "Hello from /"
    })
})

app.post('/signup', async (req, res) => {
    //db call

    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log("Error::", parsedData.error)
        return res.status(400).json({
            message: "Incorrect credentials"
        })
    }

    try {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(parsedData.data.password, saltRounds)
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name
            }
        })

        res.json({
            userId: user.id
        })
    } catch (error) {
        console.log("Error::", error)
        res.status(401).json({
            message: "Something is wrong with the data"
        })
    }


})

app.post('/signin', async (req, res) => {

    const parsedData = SignInSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect credentials"
        })
        return;
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        })

        if (!user) {
            console.log("User not found:::::", user)
            res.status(404).json({
                message: "User not found!"
            })
            return;
        }

        const isMatch = await bcrypt.compare(parsedData.data.password, user.password)

        console.log("isMAtched::", isMatch)
        if (!isMatch) {
            res.status(401).json({
                message: "Password is incorrect"
            })
            return;
        }
        const token = jwt.sign({
            userId: user?.id,
        }, JWT_SECRET);

        res.json({
            token
        })
    } catch (error) {
        console.log("Error while signin in::", error)
        res.status(401).json({
            message: "Something doesn't seem right"
        })
    }

})

app.post('/create-room', middleware, async (req, res) => {
    //db call

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // @ts-ignore: TODO: Fix this
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch (e) {
        console.log("Error in creating room::", e)
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.get("/chat/:roomId", async (req, res) => {

    try {

        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: 'desc'
            },
            take: 50
        })
        res.json({
            messages
        })
    } catch (error) {
        console.log("Error while getting chats::", error)
    }
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

app.get("/me", middleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;

    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user
        });
    } catch (error) {
        console.log("Error fetching user details::", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.get("/rooms", middleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;

    try {
        const rooms = await prismaClient.room.findMany({
            where: {
                OR: [
                    { adminId: userId },
                    { chats: { some: { userId } } }
                ]
            },
            include: {
                admin: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json({
            rooms
        });
    } catch (error) {
        console.log("Error while fetching rooms::", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

app.listen(8080);