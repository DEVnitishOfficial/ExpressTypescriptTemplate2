import express from 'express'
import { pingHandler } from '../../controllers/ping.controller';
import { validateRequestBody } from '../../validators';
import { pingSchema } from '../../validators/ping.validators';

 const pingRouter = express.Router();

 function checkHandler(req:express.Request,res:express.Response,next:express.NextFunction):void {
    if(typeof req.body.name !== 'string'){
       res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
    next()
    }



 pingRouter.get('/',validateRequestBody(pingSchema), pingHandler)

 pingRouter.get('/health',(req,res)=> {
    res.send('Server health is in good condition')
})

 export default pingRouter;
