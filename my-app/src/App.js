import {Route,Routes} from 'react-router-dom'
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Addtransaction from './pages/addTransaction/Addtransaction';
import GetTransaction from './pages/getTransaction/GetTransaction';
import TransactionItem from './pages/transactionItem/TransactionItem';
import EditTransaction from './pages/editTransaction/EditTransaction';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/add-transaction' element={<Addtransaction/>}/>
        <Route path='/get-transaction' element={<GetTransaction/>}/>
        <Route path='/transaction-item' element={<TransactionItem/>}/>
        <Route path='/edit-transaction' element={<EditTransaction/>}/>
      </Routes>
    </div>
  );
}

export default App;
