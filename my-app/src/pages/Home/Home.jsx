import {useEffect, useState} from 'react'

function Home() {
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);
const [data,setData] = useState({});

  // useEffect(()=>{
  // try {

  //   setLoading(true)
  //   async function userData(){
  //     const user = await fetch('/api/user/user-data',{
  //       method:'GET'
  //     })

  //   const res = await user.json()
  //     if(res.success === false){
  //       setLoading(false)
  //       setError(res.message)
  //    }}
  //    setLoading(false)
  //    setData(res)
  //    userData()
  //   }catch (error) {
  //     setLoading(false)
  //     setError(error)
  //   }
   
  // },[])
  return (
    <div className="home">
      {loading ? 'Loading...' : <div className="hom_container">
        <p>Hello <span>{data.username}</span></p>
        <p>Welcome to AI Translator</p>
      </div>}
      {!loading && error ? error : ''}
    </div>
  );
}

export default Home