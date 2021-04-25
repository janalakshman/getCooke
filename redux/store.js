import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, counterReducer)

export default configureStore({
  reducer: {
    counter: persistedReducer
  },
  middleware: [thunk],
})