import express from 'express';
import {Express} from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router'
import v2Router from './routers/v2/index.router';
import z from 'zod';

const app: Express = express();

app.use(express.json())


app.use('/api/v1', v1Router);

app.use('/api/v2', v2Router);

console.log('env variable',serverConfig.PORT);

const obj = {
    name : "nitish",
    age : 22
}

const objSchema = z.object({
    name : z.string(),
    age : z.number().int().positive()
})

console.log(objSchema.parse(obj))

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
});