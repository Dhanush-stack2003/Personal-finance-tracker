import './TransactionItem.css'
import { Link } from 'react-router-dom'

function TransactionItem() {
  return (
    <div className="transaction_item_section">
      <div className="transaction_item_container">
        <div className="transaction_items">
          <div className="transaction_values">
            <div className="transaction_item">
              <span className="key">Payment Type:</span>
              <span className="value">Income</span>
            </div>
            <div className="transaction_item">
              <span className="key">Payment Method:</span>
              <span className="value">Upi</span>
            </div>
            <div className="transaction_item">
              <span className="key">Category:</span>
              <span className="value">Food</span>
            </div>
            <div className="transaction_item">
              <span className="key">Amount:</span>
              <span className="value">10000</span>
            </div>
            <div className="transaction_item">
              <span className="key">Note:</span>
              <span className="value">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quisquam neque alias, labore dolor impedit quibusdam.
              </span>
            </div>
          </div>
          <div className="actions">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>

        <div className="transaction_items">
          <div className="transaction_values">
            <div className="transaction_item">
              <span className="key">Payment Type:</span>
              <span className="value">Expense</span>
            </div>
            <div className="transaction_item">
              <span className="key">Payment Method:</span>
              <span className="value">Upi</span>
            </div>
            <div className="transaction_item">
              <span className="key">Category:</span>
              <span className="value">Food</span>
            </div>
            <div className="transaction_item">
              <span className="key">Amount:</span>
              <span className="value">10000</span>
            </div>
            <div className="transaction_item">
              <span className="key note">Note:</span>
              <span className="value">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                labore minus provident repellat minima voluptatum.
              </span>
            </div>
          </div>
          <div className="actions">
            <Link to='/edit-transaction'><p>Edit</p></Link>
            <p>Delete</p>
          </div>
        </div>

        <div className="transaction_items">
          <div className="transaction_values">
            <div className="transaction_item">
              <span className="key">Payment Type:</span>
              <span className="value">Expense</span>
            </div>
            <div className="transaction_item">
              <span className="key">Payment Method:</span>
              <span className="value">Upi</span>
            </div>
            <div className="transaction_item">
              <span className="key">Category:</span>
              <span className="value">Food</span>
            </div>
            <div className="transaction_item">
              <span className="key">Amount:</span>
              <span className="value">10000</span>
            </div>
            <div className="transaction_item">
              <span className="key note">Note:</span>
              <span className="value">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
                aspernatur a id omnis harum nulla.
              </span>
            </div>
          </div>
          <div className="actions">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>

        <div className="transaction_items">
          <div className="transaction_values">
            <div className="transaction_item">
              <span className="key">Payment Type:</span>
              <span className="value">Expense</span>
            </div>
            <div className="transaction_item">
              <span className="key">Payment Method:</span>
              <span className="value">Upi</span>
            </div>
            <div className="transaction_item">
              <span className="key">Category:</span>
              <span className="value">Food</span>
            </div>
            <div className="transaction_item">
              <span className="key">Amount:</span>
              <span className="value">10000</span>
            </div>
            <div className="transaction_item">
              <span className="key note">Note:</span>
              <span className="value">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </span>
            </div>
          </div>
          <div className="actions">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem