import {Route,Routes} from 'react-router-dom'
import SignUp from './pages/signUp/SignUp';
import { ToastContainer} from 'react-toastify'
import SignIn from './pages/signIn/SignIn';
import LandingPage from './pages/LandingPage/LandingPage'
import Navbar from './components/Navbar/Navbar';
import Addtransaction from './pages/addTransaction/Addtransaction';
import GetTransaction from './pages/getTransaction/GetTransaction';
import TransactionItem from './pages/transactionItem/TransactionItem';
import EditTransaction from './pages/editTransaction/EditTransaction';
import PrivateProfile from './pages/privateProfile/PrivateProfile';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import NotFound from './pages/404Page/NotFound';
import PublicOnlyRoute from './components/publicRoute/PublicOnlyRoute';

function App() {

  const { currentUser } = useSelector(state => state.user)
  return (
    <div className="App">
      <ToastContainer />
       <Navbar />
        <Routes>
          <Route element={<PublicOnlyRoute/>}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          </Route>

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={currentUser ? <Dashboard /> : <LandingPage/>}/>

          <Route element={<PrivateProfile />}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/get-transaction" element={<GetTransaction />} />
            <Route path="/add-transaction" element={<Addtransaction />} />
            <Route path="/transaction-item" element={<TransactionItem />} />
            <Route path="/edit-transaction/:transactionId" element={<EditTransaction />}/>
          </Route>
            
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  );
}

export default App;
