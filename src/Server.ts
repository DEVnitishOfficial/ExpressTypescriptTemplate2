import express from 'express';
import {Express} from 'express';

const app: Express = express();

const PORT:number = 3000;

app.get('/',(req,res) => {
    res.send("Hi i am home page")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});