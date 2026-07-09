import express from 'express';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from '@repo/common/types';
import { prismaClient } from "@repo/db/client"

const app = express();

app.use(express.json())

app.post('/singup', async(req, res) => {
    //db call

    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect credentials"
        })
    }

    try {
    const user =  await prismaClient.user.create({
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
        res.status(401).json({
           message: "Something is wrong with the data"
        })
    }


})


app.post('/singin', (req, res) => {

    const data = SignInSchema.safeParse(req.body)
    if (!data.success) {
        return res.json({
            message: "Incorrect credentials"
        })
    }

    const userId = 1;
    const token = jwt.sign({
        userId,
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post('/create-room', middleware, (req, res) => {
    //db call

    const parsedData = CreateRoomSchema.safeParse(req.body)
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect credentials"
        })
    }

    // prismaClient.room.create({
    //     data: {
    //         slug: parsedData?.data?.name,

    //     }
    // })
    res.json({
        roomId: 123
    })
})

app.listen(3004);