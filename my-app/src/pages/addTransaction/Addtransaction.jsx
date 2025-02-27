import React, { useState } from 'react'
import './Addtransaction.css'
import family_banner from '../../Asserts/family_banner.jpg'
function Addtransaction() {

  const [checkedRadio,setCheckedRadio] = useState({
    paymentMethod:'cash',
    category:"salary",
    paymentType:"expense",
    amount:0,
    date:null,
    note:""
  });


  const changeHandler = (e) => {
    if(e.target.id === 'cash' || e.target.id === 'upi'){
    setCheckedRadio({...checkedRadio,paymentMethod:e.target.id})
    }
    if(e.target.id === 'rent' || e.target.id === 'salary' || e.target.id === 'entertainment' || e.target.id === 'food' || e.target.id === 'others'){
      setCheckedRadio({...checkedRadio,category:e.target.id})
    }
    if(e.target.id === 'income' || e.target.id === 'expense'){
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
    <div className="addtransaction">
      <div className="add_transaction_left_side">
      <p>Add New Transaction</p>
        <form>
          <div className="payment_method section">
            <span>Choose Payment method</span>
            <div className="payment_method_container">
              <div className="payment_method radio">
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  id="cash"
                  name="payment_method"
                  onChange={changeHandler}
                  checked={checkedRadio.paymentMethod === "cash"}
                />
              </div>
              <div className="payment_method radio">
                <label htmlFor="upi">Upi</label>
                <input
                  type="radio"
                  id="upi"
                  name="payment_method"
                  onChange={changeHandler}
                  checked={checkedRadio.paymentMethod === "upi"}
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
                  id="rent"
                  name="category"
                  onChange={changeHandler}
                  checked={checkedRadio.category === "rent"}
                />
              </div>
              <div className="category radio">
                <lable htmlFor="entertainment">Entertainment</lable>
                <input
                  type="radio"
                  id="entertainment"
                  name="category"
                  onChange={changeHandler}
                  checked={checkedRadio.category === "entertainment"}
                />
              </div>
              <div className="category radio">
                <lable htmlFor="food">Food</lable>
                <input
                  type="radio"
                  id="food"
                  name="category"
                  onChange={changeHandler}
                  checked={checkedRadio.category === "food"}
                />
              </div>
              <div className="category radio">
                <lable htmlFor="salary">Salary</lable>
                <input
                  type="radio"
                  id="salary"
                  name="category"
                  onChange={changeHandler}
                  checked={checkedRadio.category === "salary"}
                />
              </div>
              <div className="category radio">
                <lable>Others</lable>
                <input
                  type="radio"
                  id="others"
                  name="category"
                  onChange={changeHandler}
                  checked={checkedRadio.category === "others"}
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
                  id="income"
                  name="payment_type"
                  onChange={changeHandler}
                  checked={checkedRadio.paymentType === "income"}
                />
              </div>
              <div className="payment_type radio">
                <label htmlFor="expense">Expense</label>
                <input
                  type="radio"
                  id="expense"
                  name="payment_type"
                  onChange={changeHandler}
                  checked={checkedRadio.paymentType === "expense"}
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
            <button>Add Transaction</button>
          </div>
        </form>
      </div>
      <div className="add_transaction_right_side">
        <div className="image_section">
          <img src={family_banner} alt=''/>
        </div>
      </div>
    </div>
  );
}

export default Addtransaction