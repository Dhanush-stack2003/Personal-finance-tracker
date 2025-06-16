import  { useState } from 'react'
import './Addtransaction.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../privateProfile/Api';
import {useSelector} from 'react-redux'

function Addtransaction() {
  const navigate = useNavigate();
  const { currentUser} = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);
  const [checkedRadio,setCheckedRadio] = useState({
    paymentMethod:'cash',
    category:"salary",
    paymentType:"expense",
    amount:0,
    date:null,
    note:"",
    userId:currentUser
  });

  const addTransaction = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const {data} = await Api.post('/transaction/add',checkedRadio,{withCredentials:true})
      if(data.success){
        setLoading(false)
        toast.success("transaction added")
        navigate('/transaction-item')
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message)
    }
  }


  const changeHandler = (e) => {
    if(e.target.id === 'Cash' || e.target.id === 'Upi'){
    setCheckedRadio({...checkedRadio,paymentMethod:e.target.id})
    }
    if(e.target.id === 'Rent' || e.target.id === 'Salary' || e.target.id === 'Entertainment' || e.target.id === 'Food' || e.target.id === 'Others'){
      setCheckedRadio({...checkedRadio,category:e.target.id})
    }
    if(e.target.id === 'Income' || e.target.id === 'Expense'){
      setCheckedRadio({...checkedRadio,paymentType:e.target.id})
    }
    if(e.target.id === 'amount' || e.target.id === 'note' || e.target.id === 'date'){
      setCheckedRadio({...checkedRadio,[e.target.id]:e.target.value})
    }
    if(e.target.id === 'date'){
      let value = new Date(e.target.value)
      if(!isNaN(value.getTime())){
        setCheckedRadio({...checkedRadio,date:value})
      }
    }
  }

  const dateFormat = (date) => {
    return date?date.toISOString().split('T')[0]: "";
  }
 
  return (
    <div className="add_transaction_container">
      <div className="addtransaction">
        <div className="add_transaction_left_side">
          <p>Add New Transaction</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={addTransaction}>
              <div className="payment_method section">
                <span>Choose Payment method</span>
                <div className="payment_method_container">
                  <div className="payment_method radio">
                    <label htmlFor="cash">Cash</label>
                    <input
                      type="radio"
                      id="Cash"
                      name="payment_method"
                      onChange={changeHandler}
                      checked={checkedRadio.paymentMethod === "Cash"}
                    />
                  </div>
                  <div className="payment_method radio">
                    <label htmlFor="upi">Upi</label>
                    <input
                      type="radio"
                      id="Upi"
                      name="payment_method"
                      onChange={changeHandler}
                      checked={checkedRadio.paymentMethod === "Upi"}
                    />
                  </div>
                </div>
              </div>
              <div className="category section">
                <span>Choose Category</span>
                <div className="category_container">
                  <div className="category radio">
                    <lable htmlFor="rent">Rent</lable>
                    <input
                      type="radio"
                      id="Rent"
                      name="category"
                      onChange={changeHandler}
                      checked={checkedRadio.category === "Rent"}
                    />
                  </div>
                  <div className="category radio">
                    <lable htmlFor="entertainment">Entertainment</lable>
                    <input
                      type="radio"
                      id="Entertainment"
                      name="category"
                      onChange={changeHandler}
                      checked={checkedRadio.category === "Entertainment"}
                    />
                  </div>
                  <div className="category radio">
                    <lable htmlFor="food">Food</lable>
                    <input
                      type="radio"
                      id="Food"
                      name="category"
                      onChange={changeHandler}
                      checked={checkedRadio.category === "Food"}
                    />
                  </div>
                  <div className="category radio">
                    <lable htmlFor="salary">Salary</lable>
                    <input
                      type="radio"
                      id="Salary"
                      name="category"
                      onChange={changeHandler}
                      checked={checkedRadio.category === "Salary"}
                    />
                  </div>
                  <div className="category radio">
                    <lable>Others</lable>
                    <input
                      type="radio"
                      id="Others"
                      name="category"
                      onChange={changeHandler}
                      checked={checkedRadio.category === "Others"}
                    />
                  </div>
                </div>
              </div>
              <div className="payment_type section">
                <span>Choose payment type</span>
                <div className="payment_type_container">
                  <div className="payment_type radio">
                    <label htmlFor="income">Income</label>
                    <input
                      type="radio"
                      id="Income"
                      name="payment_type"
                      onChange={changeHandler}
                      checked={checkedRadio.paymentType === "Income"}
                    />
                  </div>
                  <div className="payment_type radio">
                    <label htmlFor="expense">Expense</label>
                    <input
                      type="radio"
                      id="Expense"
                      name="payment_type"
                      onChange={changeHandler}
                      checked={checkedRadio.paymentType === "Expense"}
                    />
                  </div>
                </div>
              </div>
              <div className="amount section">
                <span>Enter Amount</span>
                <div className="amount_container">
                  <input
                    type="number"
                    id="amount"
                    value={checkedRadio.amount}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="date section">
                <span>Choose Date</span>
                <input
                  type="date"
                  id="date"
                  value={dateFormat(checkedRadio.date)}
                  onChange={changeHandler}
                />
              </div>
              <div className="note section">
                <span>Add note</span>
                <input
                  type="text"
                  id="note"
                  value={checkedRadio.note}
                  onChange={changeHandler}
                />
              </div>
              <div className="button_container">
                <button onClick={addTransaction}>Add Transaction</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addtransaction