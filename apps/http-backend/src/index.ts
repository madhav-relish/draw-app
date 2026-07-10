import express from 'express';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from '@repo/common/types';
import { prismaClient } from "@repo/db/client"

const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {
    //db call

    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log("Error::", parsedData.error)
        return res.json({
            message: "Incorrect credentials"
        })
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: parsedData.data.password,
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


app.post('/singin', async (req, res) => {

    const parsedData = SignInSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect credentials"
        })
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username,
                password: parsedData.data.password
            }
        })

        if (!user) {
            return res.json({
                message: "User not found!"
            })
        }
        //@ts-ignore
        const userId = req.userId;
        const token = jwt.sign({
            userId,
        }, JWT_SECRET);

        res.json({
            token
        })
    } catch (error) {
        console.log("Error while signin in::", error)
    }

})

app.post('/create-room', middleware, async (req, res) => {
    //db call

    const parsedData = CreateRoomSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect credentials"
        })
    }

    //@ts-ignore
    const userId = req.userId

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
    } catch (error) {
        //TODO:: Do error handling
        console.log("Error while creating room::", error)
    }
})

app.listen(3004);