import express, {Request, Response} from 'express';
import middlewares from './config/middlewares';
import {Db} from './config/db';

const app = express();
const db = new Db();
const PORT = process.env.PORT;

app.use(middlewares);
db.connect();

app.get('/', (req: Request, res: Response) => {
    res.json({message: "testing"});
});

app.listen(PORT, () => {
    console.log(`Node Server listening on Port ${PORT}`);
});

