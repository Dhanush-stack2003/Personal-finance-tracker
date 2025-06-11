import './getTransaction_right.css'
import TransactionItem from "../../transactionItem/TransactionItem";


function GetTransactionRight({filteredTransaction}) {
  return (
    <div className="get_transaction_right_side">
      <div className="all_transaction">
        <p className="title">Latest Transaction</p>
        <div className="all_transaction_items">
          <TransactionItem filteredTransaction={filteredTransaction} />
        </div>
      </div>
    </div>
  );
}

export default GetTransactionRight