import './financeTrack.css'
import RecentTransaction from '../recentTransaction/recentTransaction';
import { BarChart,Bar,ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { useEffect, useState } from 'react';
import Api from '../../privateProfile/Api'
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'

function FinanceTrack() {

  const { currentUser } = useSelector(state => state.user);
  const [ transaction,setTransaction ] = useState([])

  useEffect(()=>{
    const allTransaction = async() => {
      const { data } = await Api.get(`/transaction/filterByMonth/${currentUser._id}`);
      if(!data){
        toast.error(data.message)
        return
      }
      setTransaction(data.message)
    }
    allTransaction()
  },[currentUser._id])

    
  return (
    <section className="financetrack">
      <div className="financeTrackContainer">
        <div className="recent_transaction">
          <p>Recent transaction</p>
          <RecentTransaction />
        </div>
        <div className="financechart">
          <div className="financechart_top">
            <h3>Overview</h3>
          </div>
          <div className="financechart_bottom">
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={transaction}>
                <CartesianGrid strokeDasharray="3 3" stroke='#444'/>
                <Bar dataKey="income" fill="#00E676" barSize={20}/>
                <Bar dataKey="expense" fill="#FF5252" barSize={20}/>
                <XAxis dataKey="id" stroke='#ccc'/>
                <YAxis stroke='#ccc' />
                <Tooltip contentStyle={{border:'none', backgroundColor:'#333',color:'#fff'}}cursor={{fill:'rgba(225,225,225,0.1)'}}/>
                <Legend wrapperStyle={{marginTop:'10px', color:'#ccc'}}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinanceTrack