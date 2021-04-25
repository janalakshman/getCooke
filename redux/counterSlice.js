import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    token : ''
  },
  reducers: {
   setToken : (state, action) => {
        state.token = action.payload
   },
   deleteToken : (state) => {
       state.token = ''
   }
  }
})



export const { setToken } = counterSlice.actions

export default counterSlice.reducer

