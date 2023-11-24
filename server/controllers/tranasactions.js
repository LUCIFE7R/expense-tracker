import Transaction from "../model/trasaction.js";

const getallTarnasaction = async (req, res) => {
    const savedtransaction = await Transaction.find();
    return res.json({
        success: true,
        data: savedtransaction,
        message: "Transaction fetch succesfully"
    })
}

const postTransaction = async (req, res) => {
    const { amount, type, description, category } = req.body;

    const transaction = new Transaction({
        amount, type, description, category
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