import { NextFunction, Request, Response } from "express";
import fs from 'fs/promises'
import { NotFoundError } from "../utils/error/app.error";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {

   try {
      await fs.readFile("sample")
      res.status(200).json({ success: true, message: "file sample read successfully" })
   } catch (error) {
      throw new NotFoundError("File not found>>>>")
   }
}