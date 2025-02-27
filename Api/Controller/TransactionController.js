import Transaction from "../model/transactionModel.js"

export const createTransaction = async(req,res) => {
    const {category,type,date,amount,note,paymentMethod} = req.body;
    try {
      const newTransaction = await Transaction.create({
        userId:req.body.userId,
        paymentMethod,
        category,
        type,
        date,
        amount,
        note
    })
    await newTransaction.save();
    console.log(newTransaction)
    return res.status(200).json({success:true,message:"Transaction Added"})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

export const getAllTransaction = async(req,res) => {
    const {userId} = req.body
    try {
        const transaction = await Transaction.find({userId});
        if(!transaction){
            return res.status(404).json({success:false,message:"no transaction available,create one"})
        }
        return res.status(200).json({success:true,message:transaction})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getTransaction = async (req,res) => {
    const {transactionId} = req.params;
    try {
        const transaction = await Transaction.findById(transactionId)
        if(!transaction){
            return res.status(404).json({success: false,message: "no transaction available,create one"});
        }
        return res.status(200).json({success:true,message:transaction})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const updateTransaction = async(req,res)=>{
    const {transactionId} = req.params;
     try {
        const transaction = await Transaction.findByIdAndUpdate(transactionId,req.body,{new:true})
        await transaction.save()
        console.log(transaction)
        return res.status(200).json({success:true,message:"Transaction updated"})
     } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
     }
}

export const deleteTransaction = async(req,res) => {
    const {transactionId} = req.params
    try {
        await Transaction.findByIdAndDelete(transactionId)
        return res.status(200).json({success:true,message:"Transaction deleted"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}