import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading:false,
  currentUser:null,
  error:null,
}


export const userSlice = createSlice({
    name:"user",
     initialState,
     reducers:{
      SignInStart:(state,action)=>{
        state.loading = true
      },
      SignInFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
        state.currentUser = null
      },
      SignInSuccess:(state,action)=>{
        state.loading = false
        state.currentUser = action.payload
        state.error = null
      },
      SignUpStart:(state,action)=>{
        state.loading = true
        state.currentUser = action.payload
        state.error = null
      },
      SignUpFailure:(state,action)=>{
        state.loading = false
        state.error = action.payload
        state.currentUser = null
      },
      SignUpSuccess:(state,action)=>{
        state.loading = false
        state.currentUser = action.payload
        state.error = null
      },
      SignOutStart:(state,action)=>{
        state.loading=true
        state.currentUser=null
        state.error=null
      },
      SignOutFailure:(state,action)=>{
        state.loading=false
        state.currentUser=null
        state.error=action.payload
      },
      SignOutSuccess:(state,action)=>{
        state.loading=false
        state.currentUser=null
        state.error=null
      },
      
     }

    })
    export const {
      SignInStart,SignInFailure,SignInSuccess,
      SignUpStart,SignUpFailure,SignUpSuccess,
      SignOutStart,SignOutSuccess,SignOutFailure
    } = userSlice.actions

export default userSlice.reducer