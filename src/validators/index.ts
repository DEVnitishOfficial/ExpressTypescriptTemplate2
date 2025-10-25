import { NextFunction, Request,Response } from "express";
import { ZodObject } from "zod";


export const validateRequestBody = (schema:ZodObject) => {
    return async (req:Request,res:Response,next:NextFunction)=> {
        try{
            await schema.parseAsync(req.body)
        }catch(error){
            res.status(400).json({
            success:false,
            message: "invalid schema",
            error:error
           })
        }
        next();
    }
}

export const validateQueryParams = (schema:ZodObject) => {
    return async (req:Request,res:Response,next:NextFunction)=> {
        try{
            await schema.parseAsync(req.query)
            console.log('Query params is validated succcessfully');
        }catch(error){
            res.status(400).json({
            success:false,
            message: "invalid schema",
            error:error
           })
        }
    }
}

export const validateUrlParams = (schema:ZodObject) => {
    return async (req:Request,res:Response,next:NextFunction)=> {
        try{
            await schema.parseAsync(req.params)
            console.log('URL params is validated succcessfully');
        }catch(error){
            res.status(400).json({
            success:false,
            message: "invalid schema",
            error:error
           })
        }
    }
}