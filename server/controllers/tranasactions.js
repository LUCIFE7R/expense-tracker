import Transaction from "../model/trasaction.js";

const getallTarnasaction =  async (req, res) => {
    const { id } = req.params
    const findTransaction = await Transaction.find({ user: { _id: id } }).populate('user')
   
    res.json({
        success:"true",
        data:findTransaction,
        message:" Transaction fetch successfully..!" 
      })
}

const postTransaction = async (req, res) => {
    const {user, amount, type, description, category } = req.body;

    const transaction = new Transaction({
       user, amount, type, description, category
    })
    try {
        const savedData = await transaction.save();
        return res.json({
            success: true,
            data: savedData,
            message: 'transaction successfull'
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
}
export { getallTarnasaction, postTransaction }