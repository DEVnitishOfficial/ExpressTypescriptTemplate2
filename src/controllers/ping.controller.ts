import { Request, Response } from "express";

export const pingHandler = (req:Request,res:Response) => {
    res.send("Hi i am home page");
}