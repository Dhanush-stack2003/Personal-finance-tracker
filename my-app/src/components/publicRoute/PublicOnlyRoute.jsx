import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PublicOnlyRoute() {
    const { currentUser} = useSelector(state => state.user)
  return currentUser ? <Navigate to='/dashboard'/>  : <Outlet/>
}

export default PublicOnlyRoute