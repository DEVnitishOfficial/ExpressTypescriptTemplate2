import express from 'express';
import {Express} from 'express';
import { serverConfig } from './config';

const app: Express = express();

app.get('/',(req,res) => {
    res.send("Hi i am home page");
})
console.log('env variabele',serverConfig.PORT);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
});