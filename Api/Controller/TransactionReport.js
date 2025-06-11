import Transaction from '../model/transactionModel.js'

export const filterByDate = async (req,res) => {
    const {filterDate,userId} = req.params;
    try{
    let filter = {userId}
    let startDate = new Date();
    switch(filterDate){
        case "one_day":
            startDate.setDate(startDate.getDate() - 1)
            break;
        case "one_week":
            startDate.setDate(startDate.getDate() - 7)
            break;
        case "one_month":
            startDate.setMonth(startDate.getMonth() - 1)
            break;
        case "six_month":
            startDate.setMonth(startDate.getMonth() - 6)
            break;
        case "one_year":
            startDate.setFullYear(startDate.getFullYear() - 1)
            break;
        default:
            startDate = null
    }
    if(startDate){
        filter.date ={$gte:startDate}
    }
    const transaction = await Transaction.find(filter).sort({date:-1})
    return res.status(200).json({success:true,message:transaction}) 
    }catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

export const TotalAmount = async (req,res) => {
    
    const { userId } = req.params;

    const totalAmount = {
     totalIncome : 0,
     totalExpense : 0
    }

    if(userId === '' || userId === null) return res.status(404).json({success:false,message:'sign in please'})

    const userTransaction = await Transaction.find({userId});

    if(!userTransaction) return res.status(403).json({success:false,message:'User not found'})

        const filterMethod = userTransaction.filter((totAmount) =>{
            if(totAmount.paymentType === 'Income'){
                return totalAmount.totalIncome += totAmount.amount
            }
           if(totAmount.paymentType === 'Expense'){
               return totalAmount.totalExpense += totAmount.amount
           }}
    )

    return res.status(200).json({success:true,message:totalAmount})
}

export const FilterByMonth = async (req,res) => {
    const { userId } = req.params;

      try {
        const AllTransaction = await Transaction.find({userId});
        const AllMonth = {
            0:"jan",1:"feb",2:"mar",3:"apr",4:"may",5:"jun",
            6:"jul",7:"aug",8:"sep",9:"oct",10:"nov",11:"dec"
        }
        const summary = {}

        for(let i=0;i<12;i++){
            const month = AllMonth[i];
            summary[month] = {id:month,income:0,expense:0};
        }

        AllTransaction.forEach((txn) => {
            const month = new Date(txn.date).getMonth();
            const key = AllMonth[month]

            if(txn.paymentType === 'Income') {
                summary[key].income += txn.amount;
            }
            else if(txn.paymentType === 'Expense') {
                summary[key].expense += txn.amount;
            }
        })

        const result = Object.values(summary);

        return res.status(200).json({success:true,message:result});

      }catch (error) {
        return res.status(500).json({sucess:false,message:error.message})
      }
}
