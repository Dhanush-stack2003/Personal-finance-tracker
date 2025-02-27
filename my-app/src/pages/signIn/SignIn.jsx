import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [Loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const formHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
     setLoading(true)
      const user = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      const res = await user.json();

      if(res.success === false){
        setLoading(false)
        setError(res.message)
        console.log(res.message)
      }
      setLoading(false) 
    }
    catch (error) {
        setLoading(false)
        setError(error)
        console.log(error)
    }
  };
  return (
    <div className="signin">
   {Loading ? "Loading..." : <form onSubmit={submitHandler}>
        <div className="email">
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={formHandler}
            value={userCredentials.email}
            required
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={formHandler}
            value={userCredentials.password}
            required
          />
        </div>
        <p>
          Don't have an account <Link to="/sign-up">sign up</Link>
        </p>
        <button onClick={submitHandler}>Sign In</button>
      </form>}
      {error ? error : " "}
    </div>
  );
}

export default SignIn;
