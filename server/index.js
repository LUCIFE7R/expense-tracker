import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import gethealth from "./controllers/health.js";
import {getallTarnasaction,postTransaction} from "./controllers/tranasactions.js"
import { postuserdata ,postuserlogin} from "./controllers/loginSignup.js";
const app = express();
app.use(express.json());

const connectdb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log("mongodb connect successfully")
    }
}
connectdb()

app.get('/api/health' , gethealth);

app.post('/api/transaction' , postTransaction);

app.get('/api/gettransactions/user/:id' , getallTarnasaction);

app.post('/api/signup',postuserdata);

app.post('/api/login', postuserlogin);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`)
})