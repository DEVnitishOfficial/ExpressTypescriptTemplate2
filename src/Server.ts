import express from 'express';
import {Express} from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router'
import v2Router from './routers/v2/index.router';

const app: Express = express();

app.use(express.json())


app.use('/api/v1', v1Router);

app.use('/api/v2', v2Router);

console.log('env variable',serverConfig.PORT);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
});