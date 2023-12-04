import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import gethealth from "./controllers/health.js";
import { getallTarnasaction, postTransaction, delTransaction, editTransation, displayedit } from "./controllers/tranasactions.js"
import { postuserdata, postuserlogin } from "./controllers/loginSignup.js";
import Transaction from "./model/trasaction.js";
import path from 'path';
const app = express();
app.use(express.json());
const __dirname = path.resolve();

const connectdb = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log("mongodb connect successfully")
    }
}
connectdb()

app.get('/api/health', gethealth);

app.post('/api/transaction', postTransaction);

app.get('/api/gettransactions/user/:id', getallTarnasaction);

app.post('/api/signup', postuserdata);

app.post('/api/login', postuserlogin);

app.delete('/api/transaction/:id', delTransaction)

app.put('/api/edittransaction/:id', editTransation)

app.get('/api/gettransaction/:id', displayedit)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

    app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')) });
}

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`)
})