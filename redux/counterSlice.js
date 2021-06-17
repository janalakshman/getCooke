import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';


const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    token : '',
    profile : {}
  },
  reducers: {
   setToken : (state, action) => {
        state.token = action.payload
   },
   deleteToken : (state) => {
        state.token = ''
   },
  }
})



export const { setToken, deleteToken } = counterSlice.actions

export default counterSlice.reducer

