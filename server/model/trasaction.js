import { Schema , model } from "mongoose";

const transactionSchema = new Schema ({
    amount:{
        type: Number,
        required : true
    },
    type:{
        type: String,
        enum : ["debit","credit"],
        required : true
    },
    category:{
        type :String,
        enum : ['food','shopping','education','travell','entertainment',"other"],
        default : "other"
    },
    description:{
        type:String,
    }
})

const Transaction = model ('Transaction' , transactionSchema);
export default Transaction