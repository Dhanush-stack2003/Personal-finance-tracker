import { useEffect,useState } from 'react';
import './TransactionItem.css'
import { useLocation } from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar';
import Api from '../privateProfile/Api';
import Posts from './transactionPost/Posts';
import Paginate from './pagination/Paginate';

function TransactionItem({filteredTransaction}) {
     const [transactionItems,setTransactionItems] = useState([]);
     const [loading, setLoading] = useState(false);
     const [currrentPage,setCurrentPage] = useState(1);
     const postPerPage = 3
     const { currentUser } = useSelector((state) => state.user);
     const location = useLocation();
     
     useEffect(()=>{ 
         async function getItem(){
           try {
                 const { data } = await Api.get('/transaction/get-all',{withCredentials:true});
                 if (data.success) {
                   setLoading(false);
                   setTransactionItems(data.data);
                 } else {
                   setLoading(false);
                   toast.error(data?.response?.message);
                  }
                }
             catch (error) {
            setLoading(false);
            toast.error(error.message);
        }}
    
        getItem()
       },[currentUser._id,filteredTransaction,currrentPage])


       const paginate = (pagenumber) => {
        setCurrentPage(pagenumber);
       }

      const displayItem =!filteredTransaction && transactionItems.length > 0 ? transactionItems.length : filteredTransaction?.length
       
  return (
    <>
    <div className={`transactionItem_sidebar ${location.pathname === '/transaction-item' ? 'active' : ''}`}>
      <Sidebar/>
    </div>
    <div className="transaction_item_section">
      <Posts transactionItems={filteredTransaction || filteredTransaction?.length > 0 ? filteredTransaction : transactionItems} loading={loading} currentPage={currrentPage}/>
      {displayItem > postPerPage  && <Paginate totalPosts={transactionItems.length} postPerPage={postPerPage} paginate={paginate}/>}
    </div>
    </>
  );
}

export default TransactionItem