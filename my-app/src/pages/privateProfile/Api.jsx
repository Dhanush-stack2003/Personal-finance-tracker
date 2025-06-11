import axios from 'axios'

const Api = axios.create({
        baseURL:'http://localhost:4000/api',
        withCredentials:true
 })

 Api.interceptors.response.use((response)=>response,
 async (error)=>{
    const originalRequest = error.config
    console.log("interceptor"+error)

    if(error.response?.status === 403 && !originalRequest._retry){
        originalRequest._retry = true
        try{
            const refreshToken = await Api.post('/auth/refresh-token',{},{withCredentials:true})
            console.log(refreshToken);     
            const newToken = refreshToken.data.RefreshedAccessToken
            console.log(newToken)
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
            console.log(originalRequest)
            return Api(originalRequest)
        }catch(refreshError){
            console.log(refreshError)
        }
    }

    return Promise.reject(error)
 })

export default Api