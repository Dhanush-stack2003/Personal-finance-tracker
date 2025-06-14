import './getTransaction_left.css'
import Api from "../../privateProfile/Api";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function GetTransactionLeft({changeHandler,filteredRadio,setFilterRadio,setFilteredTransaction}) {
    
    const { currentUser } = useSelector((state) => state.user); 
    
      const submitHandler = async (e) => {
        e.preventDefault();

        const params = new URLSearchParams({
          paymentMethod: filteredRadio.paymentMethod || "",
          paymentType: filteredRadio.paymentType || "",
          category: filteredRadio.category || "",
          minAmount: filteredRadio.minAmount || "",
          maxAmount: filteredRadio.maxAmount || "",
          maxDate: filteredRadio.maxDate || "",
          minDate: filteredRadio.minDate || "",
          userId: currentUser._id,
        });
        try {
          const { data } = await Api.get(`/transaction/filter?${params}`);
          if (data.success) {
            setFilteredTransaction(data.message);
          }
        } catch (error) {
          toast.error(error.message)
        }
      };

    const dateFormat = (date) => {
      return date ? date.toISOString().split("T")[0] : "";
    };

    const amountHandler = (e) => {
      const { value, id } = e.target;
      const cleanValue = value.replace(/[^0-9]/g, "");
      setFilterRadio({ ...filteredRadio, [id]: cleanValue });
    };
  return (
    <div className="get_transaction_left_side">
      <p className="title">Filter Transaction</p>
      <form onSubmit={submitHandler}>
        <div className="choose_payment_method section">
          <span>Filter by Payment Method</span>
          <div className="choose_payment_method_container">
            <div className="choose_payment_method radio">
              <label htmlFor="cash">Cash</label>
              <input
                type="radio"
                id="Cash"
                name="payment_method"
                onChange={changeHandler}
                checked={filteredRadio.paymentMethod === "Cash"}
              />
            </div>
            <div className="choose_payment_method radio">
              <label htmlFor="upi">Upi</label>
              <input
                type="radio"
                id="Upi"
                name="payment_method"
                onChange={changeHandler}
                checked={filteredRadio.paymentMethod === "Upi"}
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
                id="Rent"
                name="category"
                onChange={changeHandler}
                checked={filteredRadio.category === "Rent"}
              />
            </div>
            <div className="choose_category radio">
              <lable htmlFor="entertainment">Entertainment</lable>
              <input
                type="radio"
                id="Entertainment"
                name="category"
                onChange={changeHandler}
                checked={filteredRadio.category === "Entertainment"}
              />
            </div>
            <div className="choose_category radio">
              <lable htmlFor="food">Food</lable>
              <input
                type="radio"
                id="Food"
                name="category"
                onChange={changeHandler}
                checked={filteredRadio.category === "Food"}
              />
            </div>
            <div className="choose_category radio">
              <lable htmlFor="salary">Salary</lable>
              <input
                type="radio"
                id="Salary"
                name="category"
                onChange={changeHandler}
                checked={filteredRadio.category === "Salary"}
              />
            </div>
            <div className="choose_category radio">
              <lable>Others</lable>
              <input
                type="radio"
                id="Others"
                name="category"
                onChange={changeHandler}
                checked={filteredRadio.category === "Others"}
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
                id="Income"
                name="payment_type"
                onChange={changeHandler}
                checked={filteredRadio.paymentType === "Income"}
              />
            </div>
            <div className="choose_payment_type radio">
              <label htmlFor="expense">Expense</label>
              <input
                type="radio"
                id="Expense"
                name="payment_type"
                onChange={changeHandler}
                checked={filteredRadio.paymentType === "Expense"}
              />
            </div>
          </div>
        </div>

        <div className="choose_filter_date section">
          <span>Filter by Date</span>
          <div className="choose_filter_date_container">
            <div className="choose_date">
              <p>min date</p>
              <input
                type="date"
                id="minDate"
                value={dateFormat(filteredRadio.minDate)}
                onChange={changeHandler}
              />
            </div>
            <div className="choose_date">
              <p>max date</p>
              <input
                type="date"
                id="maxDate"
                value={dateFormat(filteredRadio.maxDate)}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>

        <div className="choose_filter_amount section">
          <span>Filter by Amount</span>
          <div className="choose_amount_container">
            <div className="choose_amount">
              <p>min amount</p>
              <input
                type="text"
                id="minAmount"
                value={filteredRadio.minAmount}
                onChange={amountHandler}
              />
            </div>
            <div className="choose_amount">
              <p>max amount</p>
              <input
                type="text"
                id="maxAmount"
                value={filteredRadio.maxAmount}
                onChange={amountHandler}
              />
            </div>
          </div>
        </div>
        <button className="find_transaction" type="submit">
          Find Transactions
        </button>
      </form>
    </div>
  );
}

export default GetTransactionLeft