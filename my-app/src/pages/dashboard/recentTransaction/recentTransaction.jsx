import "./recentTransaction.css";
import Api from "../../privateProfile/Api";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import TransactionList from "./transactionList/transactionList";

function RecentTransaction() {
  const [transactions, setTransactions] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function Transaction() {
      const { data } = await Api.get(`/transaction/get-all`);
      if (!data) {
        toast.error(data.message);
        return;
      }
      setTransactions(data.data);
    }
    Transaction();
  }, [currentUser._id]);

  const recentIncome = useMemo(()=>
    transactions.filter((t)=>t.paymentType === 'Income').slice(0,3)
  ,[transactions])

  const recentExpense = useMemo(()=>
    transactions.filter((t)=>t.paymentType === 'Expense').slice(0,3)
  ,[transactions])

  const incomeCount = useMemo(()=>
  transactions.filter((t)=>t.paymentType === 'Income').length
  ,[transactions])

  const expenseCount = useMemo(()=>
  transactions.filter((t)=>t.paymentType === 'Expense').length  
  ,[transactions])

  return (
      <div className="latestTransaction">
       <TransactionList title='Income' transaction={recentIncome} totalCount={incomeCount}/>
       <TransactionList title='Expense' transaction={recentExpense} totalCount={expenseCount}/>
      </div>
  );
}

export default RecentTransaction;
