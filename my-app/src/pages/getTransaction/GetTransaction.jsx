import {useState} from 'react'
import './GetTransaction.css'

function GetTransaction() {

   const [filteredRadio,setFilterRadio] = useState({
    paymentMethod:'cash',
    category:"salary",
    paymentType:"expense",
    amount:0,
    date:null,
    note:""
  })

      const changeHandler = (e) => {
        if (e.target.id === "cash" || e.target.id === "upi") {
          setFilterRadio({ ...filteredRadio, paymentMethod: e.target.id });
        }
        if (
          e.target.id === "rent" ||
          e.target.id === "salary" ||
          e.target.id === "entertainment" ||
          e.target.id === "food" ||
          e.target.id === "others"
        ) {
          setFilterRadio({ ...filteredRadio, category: e.target.id });
        }
        if (e.target.id === "income" || e.target.id === "expense") {
          setFilterRadio({ ...filteredRadio, paymentType: e.target.id });
        }
        if (
          e.target.id === "amount" ||
          e.target.id === "note" ||
          e.target.id === "date"
        ) {
          setFilterRadio({ ...filteredRadio, [e.target.id]: e.target.value });
        }
        if (e.target.id === "date") {
          let value = new Date(e.target.value);
          if (!isNaN(value.getTime())) {
            setFilterRadio({ ...filteredRadio, date: value });
          }
        }
      };

      const dateFormat = (date) => {
        return date ? date.toISOString().split("T")[0] : "";
      };
  return (
    <div className="get_transaction">
      <div className="get_transaction_left_side">
      <p className='title'>Filter Transaction</p>
        <form>
          <div className="choose_payment_method section">
            <span>Filter by Payment Type</span>
            <div className="choose_payment_method_container">
              <div className="choose_payment_method radio">
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  id="cash"
                  name="payment_method"
                  onChange={changeHandler}
                  checked={filteredRadio.paymentMethod === "cash"}
                />
              </div>
              <div className="choose_payment_method radio">
                <label htmlFor="upi">Upi</label>
                <input
                  type="radio"
                  id="upi"
                  name="payment_method"
                  onChange={changeHandler}
                  checked={filteredRadio.paymentMethod === "upi"}
                />
              </div>
            </div>
          </div>

          <div className="choose_category section">
            <span>Filter By Category</span>
            <div className="choose_category_container">
              <div className="choose_category radio">
                <lable htmlFor="rent">Rent</lable>
                <input
                  type="radio"
                  id="rent"
                  name="category"
                  onChange={changeHandler}
                  checked={filteredRadio.category === "rent"}
                />
              </div>
              <div className="choose_category radio">
                <lable htmlFor="entertainment">Entertainment</lable>
                <input
                  type="radio"
                  id="entertainment"
                  name="category"
                  onChange={changeHandler}
                  checked={filteredRadio.category === "entertainment"}
                />
              </div>
              <div className="choose_category radio">
                <lable htmlFor="food">Food</lable>
                <input
                  type="radio"
                  id="food"
                  name="category"
                  onChange={changeHandler}
                  checked={filteredRadio.category === "food"}
                />
              </div>
              <div className="choose_category radio">
                <lable htmlFor="salary">Salary</lable>
                <input
                  type="radio"
                  id="salary"
                  name="category"
                  onChange={changeHandler}
                  checked={filteredRadio.category === "salary"}
                />
              </div>
              <div className="choose_category radio">
                <lable>Others</lable>
                <input
                  type="radio"
                  id="others"
                  name="category"
                  onChange={changeHandler}
                  checked={filteredRadio.category === "others"}
                />
              </div>
            </div>
          </div>

          <div className="choose_payment_type section">
            <span>Filter by Payment Type</span>
            <div className="choose_payment_type_container">
              <div className="choose_payment_type radio">
                <label htmlFor="income">Income</label>
                <input
                  type="radio"
                  id="income"
                  name="payment_type"
                  onChange={changeHandler}
                  checked={filteredRadio.paymentType === "income"}
                />
              </div>
              <div className="choose_payment_type radio">
                <label htmlFor="expense">Expense</label>
                <input
                  type="radio"
                  id="expense"
                  name="payment_type"
                  onChange={changeHandler}
                  checked={filteredRadio.paymentType === "expense"}
                />
              </div>
            </div>
          </div>

          <div className="choose_filter_date section">
            <span>Filter by Date</span>
            <div className="choose_filter_date_container">
              <div className="choose_date">
                <input
                  type="date"
                  id="date"
                  value={dateFormat(filteredRadio.date)}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <button className='find_transaction'>Find Transaction</button>
        </form>
      </div>
      <div className="get_transaction_right_side">
        <div className="all_transaction">
          <p className='title'>Latest Transaction</p>
        </div>
      </div>
    </div>
  );
}

export default GetTransaction