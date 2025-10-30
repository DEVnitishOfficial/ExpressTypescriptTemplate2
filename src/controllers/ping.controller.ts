import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/error/app.error";
import logger from "../config/logger.config";

export const pingHandler = async (req: Request, res: Response, next: NextFunction) => {

   try {
      // await fs.readFile("sample")
      res.status(200).json({ success: true, message: "file sample read successfully" })
      logger.info("Ping request processed successfully")
   } catch (error) {
      logger.error("Error in ping handler",{error,message:"File not found"})
      throw new NotFoundError("File not found")
   }
}