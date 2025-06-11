import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userSlice  from './userSlice/userSlice.js'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const userConfig = combineReducers({user:userSlice})

const persistConfig = {
  key:'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig,userConfig)

export const store =  configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>{
    return getDefaultMiddleware({
      serializableCheck:false
    })
  }
});

export const persistor = persistStore(store)
