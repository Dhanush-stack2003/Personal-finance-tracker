import './Dashboard.css'
import UserGreet from './userGreet/userGreet'
import FinanceTrack from './financeTrack/financeTrack';
import Sidebar from '../../components/Sidebar/Sidebar'

function Dashboard() {

  return (
    <div className="dashboard">
      <div className="dashboard_sidebar">
      <Sidebar/>
      </div>
      <UserGreet/>
      <FinanceTrack/>
    </div>
  );
}

export default Dashboard