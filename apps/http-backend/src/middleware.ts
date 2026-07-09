import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function middleware (req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? ""

    const decoded = jwt.verify(token, JWT_SECRET)

    if(decoded){
        //@ts-ignore TODO: Fix the type error
        req.userId = decoded.userId;
        next();
    }else{
        res.status(403).json({
            message: "Unauthorized"
        })
    }
}