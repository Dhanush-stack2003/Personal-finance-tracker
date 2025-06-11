import { signInWithPopup,GoogleAuthProvider, getAuth} from 'firebase/auth'
import { app } from "../../firebase"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { SignInSuccess,SignInStart,SignInFailure } from '../../store/userSlice/userSlice';
import Api from '../../pages/privateProfile/Api';

const Oauth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const googleAuth = async (e) => {
        e.preventDefault()
        try {
            const Provider = new GoogleAuthProvider();
            const Auth = getAuth(app)
            const result = await signInWithPopup(Auth,Provider)
            console.log(result)
            if(result.user){
                dispatch(SignInStart())
             const user = await Api.post('/auth/google-auth',{
                email:result.user.email,
                username:result.user.displayName,
                photoURL:result.user.photoURL
                },{withCredentials:true})
            if(user.data.success){
                dispatch(SignInSuccess(user.data.message))
                console.log("user verified")
                console.log("user"+ user.data)
                navigate('/')
            }}
            else{
            dispatch(SignInFailure(result.error))
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
        dispatch(SignInFailure(error.message))
        }
    }

    return (

        <button onClick={googleAuth} style={{background:'red'}} >Sign In With Google</button>
    )
}

export default Oauth