import express from 'express';
import {Express} from 'express';
import { serverConfig } from './config';
import pingRouter from './routers/ping.router';

const app: Express = express();

app.use(pingRouter);

console.log('env variabele',serverConfig.PORT);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
});