import './transactionList.css'
import { Link } from 'react-router-dom';

function TransactionList({title,transaction,totalCount}) {
  return (
    <div>
      <div className={`latest${title}`}>
        <span> {title} </span>
        {transaction.length > 0 ? (
          transaction.map((transaction, id) => {
            return (
              <div key={transaction._id}>
                <ul>
                  <li key={id}>
                    <div className="key">{transaction.note}</div>
                    <div className="value">{transaction.amount}</div>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <p>no Transaction found</p>
        )}
        {totalCount > 3 && (
          <span>
            <Link to="/get-transaction">view more</Link>
          </span>
        )}
      </div>
    </div>
  );
}

export default TransactionList