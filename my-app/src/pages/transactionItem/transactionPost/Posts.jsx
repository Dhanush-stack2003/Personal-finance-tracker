import { Link,useLocation } from 'react-router-dom';
import './Posts.css'
import { useMemo } from 'react';

function Posts({transactionItems,loading,currentPage}) {

  const location = useLocation();
  
  let postPerPage = 0;
  if(transactionItems.length > 0 && location.pathname === '/transaction-item') {
    postPerPage = 3;
  }
  else if(transactionItems.length > 0 && location.pathname === '/get-transaction'){
    postPerPage = 2;
  } 

  const indexOfLastPage =  currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;

  const currentPost = useMemo(() => {
    return transactionItems.slice(indexOfFirstPage, indexOfLastPage)
  }, [transactionItems, currentPage,postPerPage,loading,indexOfFirstPage,indexOfLastPage]);
  
  return (
    <>
 {currentPost.length > 0 && !loading ? currentPost.map((transaction)=>( 
    <div className="transaction_item_container" key={transaction._id}>    
    <div className="transaction_items">
      <div className="transaction_values">
        <div className="transaction_item">
          <span className="key">Payment Type:</span>
          <span className="value">{transaction.paymentType}</span>
        </div>
        <div className="transaction_item">
          <span className="key">Payment Method:</span>
          <span className="value">{transaction.paymentMethod}</span>
        </div>
        <div className="transaction_item">
          <span className="key">Category:</span>
          <span className="value">{transaction.category}</span>
        </div>
        <div className="transaction_item">
          <span className="key">Amount:</span>
          <span className="value">{transaction.amount}</span>
        </div>
        <div className="transaction_item">
          <span className="key">Note:</span>
          <span className="value">{transaction.note}</span>
        </div>
        <div className="transaction_item">
          <span className="key">Date:</span>
          <span className="value">{transaction.date.split("T")[0]}</span>
        </div>
      </div>
      <div className="actions">
        <Link to={`/edit-transaction/${transaction._id}`}>
          <p>Edit</p>
        </Link>
        <Link to={`/delete-transaction/${transaction._id}`}>
        <p>Delete</p>
        </Link>
      </div>
    </div>
      </div>)) 
      : <div>{loading ? <h2>Loading...</h2> : <h2>No Transaction Found</h2>}</div>}
  </>
  );
}

export default Posts