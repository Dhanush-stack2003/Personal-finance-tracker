import { useEffect, useState } from 'react'
import './EditTransaction.css'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../privateProfile/Api';

function EditTransaction() {
   const [loading,setLoading] = useState(false)
   const navigate = useNavigate();
   const params = useParams()
   const [checkedRadio,setCheckedRadio] = useState({
    paymentMethod:'',
    category:"",
    paymentType:"",
    amount:0,
    date:null,
    note:""
  });


  const updateTransaction = async (e) => {
    e.preventDefault();
    try {
       const { data } = await Api.post(`/transaction/edit/${params.transactionId}`,checkedRadio);
       if (data.success) {
         toast.success("transaction updated");
         navigate("/get-transaction");
       }
    } catch (error) {
       toast.error(error.message)
    }
  }

  useEffect(()=>{
    setLoading(true)
    async function getItem(){
      const {data} = await Api.get(`/transaction/get/${params.transactionId}`)
      if(data.success){
        setLoading(false)
        setCheckedRadio(data.message)
      }
      setLoading(false)
    }
    getItem()
  },[params.transactionId])


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
    if(e.target.id === 'amount' || e.target.id === 'note' ){
      setCheckedRadio({...checkedRadio,[e.target.id]:e.target.value})
    }
    if(e.target.id === 'date'){
      let value = new Date(e.target.value)
      if(!isNaN(value.getTime())){
        setCheckedRadio({...checkedRadio,date:value})
      }
    }
  }

  // const dateFormat = (date) => {
  //   return date?date.toISOString().split('T')[0]: "";
  // }
 
  return (
    <div className="edit_transaction">
      <div className="edit_transaction_left_side">
        <p>Edit Transaction</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form>
            <div className="edit_payment_method section">
              <span>Choose Payment method</span>
              <div className="edit_payment_method_container">
                <div className="edit_payment_method radio">
                  <label htmlFor="cash">Cash</label>
                  <input
                    type="radio"
                    id="Cash"
                    name="payment_method"
                    onChange={changeHandler}
                    checked={checkedRadio.paymentMethod === "Cash"}
                  />
                </div>
                <div className="edit_payment_method radio">
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
            <div className="edit_category section">
              <span>Choose Category</span>
              <div className="edit_category_container">
                <div className="category radio">
                  <lable htmlFor="rent">Rent</lable>
                  <input
                    type="radio"
                    id="Rent"
                    name="category"
                    onChange={changeHandler}
                    value={checkedRadio.category}
                    checked={checkedRadio.category === "Rent"}
                  />
                </div>
                <div className="edit_category radio">
                  <lable htmlFor="entertainment">Entertainment</lable>
                  <input
                    type="radio"
                    id="Entertainment"
                    name="category"
                    onChange={changeHandler}
                    value={checkedRadio.category}
                    checked={checkedRadio.category === "Entertainment"}
                  />
                </div>
                <div className="edit_category radio">
                  <lable htmlFor="food">Food</lable>
                  <input
                    type="radio"
                    id="Food"
                    name="category"
                    onChange={changeHandler}
                    value={checkedRadio.category}
                    checked={checkedRadio.category === "Food"}
                  />
                </div>
                <div className="edit_category radio">
                  <lable htmlFor="salary">Salary</lable>
                  <input
                    type="radio"
                    id="Salary"
                    name="category"
                    onChange={changeHandler}
                    value={checkedRadio.category}
                    checked={checkedRadio.category === "Salary"}
                  />
                </div>
                <div className="edit_category radio">
                  <lable>Others</lable>
                  <input
                    type="radio"
                    id="Others"
                    name="category"
                    onChange={changeHandler}
                    value={checkedRadio.category}
                    checked={checkedRadio.category === "Others"}
                  />
                </div>
              </div>
            </div>
            <div className="edit_payment_type section">
              <span>Choose payment type</span>
              <div className="edit_payment_type_container">
                <div className="edit_payment_type radio">
                  <label htmlFor="income">Income</label>
                  <input
                    type="radio"
                    id="Income"
                    name="payment_type"
                    onChange={changeHandler}
                    value={checkedRadio.paymentType}
                    checked={checkedRadio.paymentType === "Income"}
                  />
                </div>
                <div className="edit_payment_type radio">
                  <label htmlFor="expense">Expense</label>
                  <input
                    type="radio"
                    id="Expense"
                    name="payment_type"
                    onChange={changeHandler}
                    value={checkedRadio.paymentType}
                    checked={checkedRadio.paymentType === "Expense"}
                  />
                </div>
              </div>
            </div>
            <div className="edit_amount section">
              <span>Enter Amount</span>
              <div className="edit_amount_container">
                <input
                  type="number"
                  id="amount"
                  value={checkedRadio.amount}
                  onChange={changeHandler}
                />
              </div>
            </div>
            {/* <div className="edit_date section">
              <span>Choose Date</span>
              <input
                type="date"
                id="date"
                value={dateFormat(checkedRadio.date)}
                onChange={changeHandler}
              />
            </div> */}
            <div className="edit_note section">
              <span>Add note</span>
              <input
                type="text"
                id="note"
                value={checkedRadio.note}
                onChange={changeHandler}
              />
            </div>
            <div className="button_container">
              <button onClick={updateTransaction}>update Transaction</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditTransaction