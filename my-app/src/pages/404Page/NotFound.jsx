import { useNavigate } from "react-router-dom"

function NotFound() {

  const navigate = useNavigate();

  const GoHomeHandler = () => {
    return navigate('/')
  }
  
  return (
    <div style={{padding:'2rem',textAlign:'center'}}>
        <h1 style={{color:'red', fontWeight:'bolder'}}>404 - Page not found</h1>
        <p>the page you're looking does't exist.</p>
        <button onClick={GoHomeHandler} style={{padding:'10px 15px'}}>Home</button>
    </div>
  )
}

export default NotFound