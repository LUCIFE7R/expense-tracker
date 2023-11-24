import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
import Transaction from "./model/trasaction.js";

const app = express();
app.use(express.json());

const connectdb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log("mongodb connect successfully")
    }
}
connectdb()

app.get('/api/health' , (req,res)=>{
        return res.json({
            success : true,
            message : "server is running"
        })
});


app.post('/api/transaction' , async(req,res)=>{
   const {amount,type,description,category} = req.body;

   const transaction = new Transaction({
    amount,type,description,category
})
try{
    const savedData = await transaction.save();
    return res.json({
        success : true,
        data : savedData,
        message : 'transaction successfull'
    })
}catch(e){
    return res.json({
        success : false,
        message : e.message
    })
}
})

app.get('/api/transactions' , async(req,res)=>{
    const savedtransaction = await Transaction.find();
    return res.json({
        success : true,
        data : savedtransaction,
        message : "Transaction fetch succesfully"
    })
})
const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`)
})