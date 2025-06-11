import { useEffect, useState } from 'react';
import FilterDate from '../filterDate/filterDate';
import './userGreet.css'
import { PieChart,Pie,Legend,Tooltip } from 'recharts'
import Api from '../../privateProfile/Api'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'

function UserGreet() {

  const [date,setDate] = useState('one_month');
  const [pie,setPie] = useState([]);
  const { currentUser } = useSelector(state => state.user)
  const [amounts,setAmounts] = useState({
    expense:0,
    income:0
  })
  const expensePieData = [];
  
  useEffect(()=>{
    
    const totalAmount = async() => {
      const { data } = await Api.get(`/transaction/totalAmount/${currentUser._id}`)
      if(!data){
        toast.error(data.message)
        return
      }
      setData(data.message)
        const { totalExpense,totalIncome } = data.message
        setAmounts({expense:totalExpense,income:totalIncome})
      }
      
          const getFilterData = async() => {
            const {data} = await Api.get(`/transaction/filterbydate/${date}/${currentUser._id}`)
            if(!data){
              toast.error(data.message)
            }
            let transaction = data.message;

            transaction.forEach((item) => {
              const existing = expensePieData.find(
                (e) => e.name === item.category
              );
              if (existing) {
                existing.value += item.amount;
              } else {
                expensePieData.push({
                  name: item.category,
                  value: item.amount,
                });
              }
            });
            setPie(expensePieData);
          }

    totalAmount()
    getFilterData()

  },[date,currentUser._id,expensePieData])      
       
     const COLORS = ["#FF6B6B","#A78BFA", "#6EE7B7", "#60A5FA", "#FBBF24"];

     const pieData = pie.map((item,index)=>({
      ...item,
      fill:COLORS[index % COLORS.length],
     }))

    return (
      <section className="usergreet">
        <div className="usergreet_left">
          <h3>Hello Dhanush!</h3>
          <p>Track your finance and spend wisely</p>
          <a href='/add-transaction'>+Add Transation</a>
        </div>

        <div className="usergreet_center">
          <div className="statistic_container">
            <div className="statistic_filter">
              <FilterDate onfilter={setDate}/>
            </div>

            <div className="totalExpense">
             {pieData.length === 0 ? <p style={{color:'white'}}>No Transaction found</p> : <PieChart
                height={250}
                width={400}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                padding={{top:0,right:0,bottom:0,left:0}}
              >
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                >
                  {pieData.map((item, index) => (
                    <cell key={`cell-${index}`} fill={item.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor:'#333',border:'none'}}itemStyle={{color:'#fff'}} cursor={{fill:'rgba(225,225,225,0.1)'}} />
                <Legend
                layout='vertical'
                verticalAlign='middle'
                align='left'
                wrapperStyle={{
                  lineHeight:'40px'
                }}
                />
              </PieChart>}
            </div>
          </div>
        </div>

        <div className="totalAmount">
          <div className="totalAmountContainer">
            <div className="totalAmount_left">
              <p>Balance:</p>
              <p>$ {amounts.income > amounts.expense ?(amounts.income - amounts.expense) : 0}</p>
            </div>
            <div className="totalAmount_center">
              <p>Expense:</p>
              <p>$ {amounts.expense}</p>
            </div>
            <div className="totalAmount_right">
              <p>Income:</p>
              <p>$ {amounts.income}</p>
            </div>
          </div>
        </div>
      </section>
    );
}

export default UserGreet