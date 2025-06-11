import Transaction from "../model/transactionModel.js"


export const createTransaction = async(req,res) => {
    const {category,paymentType,date,amount,note,paymentMethod,userId} = req.body;
    try {
      const newTransaction = await Transaction.create({
        userId,
        paymentMethod,
        category,
        paymentType,
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
    const { userId } = req;
    try {
        const transaction = await Transaction.find({userId}).sort({date:-1});
        if(!transaction){
            return res.status(404).json({success:false,message:"no transaction available,create one"})
        }
        return res.status(200).json({success:true,data:transaction})
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

export const filterTransaction = async(req,res) => {

    const { paymentType,paymentMethod,category,maxAmount,minAmount,maxDate,minDate,userId } = req.query;

    try {
        const query = {}

        if(userId){
            query.userId = userId
        }
        if(typeof paymentType === 'string' && paymentType.trim()) {
            query.paymentType = {$regex : paymentType.trim(),$options:'i'}
        }
        if(typeof paymentMethod === 'string' && paymentMethod?.trim()) {
            query.paymentMethod = { $regex :paymentMethod.trim(),$options : 'i'}
        }
        if(typeof category === 'string' && category?.trim()) {
            query.category = { $regex : category.trim(),$options:'i'}
        }
        if(maxAmount || minAmount){
            query.amount ={}
            if(maxAmount) query.amount.$lte = Number(maxAmount)
            if(minAmount) query.amount.$gte = Number(minAmount)
        }
        if(maxDate || minDate){
            query.date = {} 
            
            if(maxDate) query.date.$lte = new Date(maxDate)
            if(minDate) query.date.$gte = new Date(minDate)
        }
            const transaction = await Transaction.find(query).sort({date:-1}).lean().exec()

            return res.status(200).json({success:true,message:transaction})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}
