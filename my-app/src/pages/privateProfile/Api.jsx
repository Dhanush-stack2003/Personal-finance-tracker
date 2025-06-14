import axios from 'axios'
import {toast} from 'react-toastify'
const Api = axios.create({
        baseURL:'http://localhost:4000/api',
        withCredentials:true
 })

 Api.interceptors.response.use((response)=>response,
 async (error)=>{
    const originalRequest = error.config

    if(error.response?.status === 403 && !originalRequest._retry){
        originalRequest._retry = true
        try{
            const refreshToken = await Api.post('/auth/refresh-token',{},{withCredentials:true})
            const newToken = refreshToken.data.RefreshedAccessToken
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            return Api(originalRequest)
        }catch(refreshError){
            toast.error(refreshError)
        }
    }

    return Promise.reject(error)
 })

export default Api