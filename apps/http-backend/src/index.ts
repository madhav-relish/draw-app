import express from 'express';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { JWT_SECRET } from './config';

const app = express();

app.post('/singup', (req, res)=>{
    //db call

    res.json({
        userId: 123
    })
})


app.post('/singin', (req, res)=>{

    const userId = 1;
   const token =  jwt.sign({
        userId,
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post('/create-room', middleware,  (req, res)=>{
    //db call
    res.json({
        roomId: 123
    })
})

app.listen(3004);