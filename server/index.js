import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());

const connectdb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log("mongodb connect successfully")
    }
}
connectdb()

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`)
})