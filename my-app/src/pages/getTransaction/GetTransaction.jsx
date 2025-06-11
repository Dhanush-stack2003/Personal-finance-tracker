import {useState} from 'react'
import './GetTransaction.css'
import GetTransactionLeft from './getTransaction_left/getTransaction_left'
import GetTransactionRight from './getTransaction_right/getTransaction_right'

function GetTransaction() {

  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const [filteredRadio, setFilterRadio] = useState({
    paymentMethod: "",
    category: "",
    paymentType: "",
    maxAmount: 0,
    minAmount: 0,
    minDate: null,
    maxDate: null,
    note: "",
  });

  const changeHandler = (e) => {
    if (e.target.id === "Cash" || e.target.id === "Upi") {
      setFilterRadio({ ...filteredRadio, paymentMethod: e.target.id });
    }
    if (
      e.target.id === "Rent" ||
      e.target.id === "Salary" ||
      e.target.id === "Entertainment" ||
      e.target.id === "Food" ||
      e.target.id === "Others"
    ) {
      setFilterRadio({ ...filteredRadio, category: e.target.id });
    }
    if (e.target.id === "Income" || e.target.id === "Expense") {
      setFilterRadio({ ...filteredRadio, paymentType: e.target.id });
    }
    if (e.target.id === "minDate") {
      let value = new Date(e.target.value);
      if (!isNaN(value.getTime())) {
        setFilterRadio({ ...filteredRadio, minDate: value });
      }
    }
    if (e.target.id === "maxDate") {
      let value = new Date(e.target.value);
      if (!isNaN(value.getTime())) {
        setFilterRadio({ ...filteredRadio, maxDate: value });
      }
    }
  };

  return (
    <div className="get_transaction">
     <GetTransactionLeft changeHandler={changeHandler} filteredRadio={filteredRadio} setFilterRadio={setFilterRadio} setFilteredTransaction={setFilteredTransaction}/>
     <GetTransactionRight filteredTransaction={filteredTransaction}/> 
    </div>
  );
}

export default GetTransaction