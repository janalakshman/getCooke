import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
      filters : [],
      recipe : {
          name : '',
          dates : [],
          time : '',
          isOvernight : false,
          km : '',
          serving : null
      },
      kitchenMaster : [],
      ingredient : {
          name : '',
          quantity : ''
      }, 
      ingredientList : [],
      startDate : [],
      endDate : []
  },
  reducers: {
      addFilter : (state, action) => {
          let newArray 
          newArray = [...state.filters, action.payload]
          state.filters = newArray
      },
      removeFilter : (state, action) => {
          let newArray = [...state.filters]
          let editedArray = newArray.filter(word => word !== action.payload)
          state.filters = [...editedArray]
      },
      resetFilter : (state) => {
          state.filters = []
      },
      addKitchenMaster : (state, action) => {
            let newArray
            newArray = [...state.kitchenMaster, action.payload]
            state.kitchenMaster = newArray
      },
      removeKitchenMaster : (state, action) => {
          let newArray = [...state.kitchenMaster]
          let editedArray = newArray.filter(word => word !== action.payload)
          state.kitchenMaster = [...editedArray] 
      },
      addDate : (state, action) => {
          let newArray 
          newArray= [...state.recipe.dates, action.payload]
          state.recipe = {
              ...state.recipe,
              dates : newArray
          }
      },
      addTime : (state, action) => {
          state.recipe = {
              ...state.recipe,
              time : action.payload
          }
      },
      resetData : (state) => {
          state.recipe = {
            name : '',
            dates : [],
            time : '',
            isOvernight : false,
            km : '',
            serving : null
          }
      },
      addIngredientName : (state, action) => {
          state.ingredient = {
              ...state.ingredient,
              name : action.payload
          }
      },
      addIngredientQuantity : (state, action) => {
          state.ingredient = {
              ...state.ingredient,
              quantity : action.payload
          }
      },
      newIngredientList : (state, action) => {
          let newArray = [...state.ingredientList, action.payload]
          state.ingredientList = newArray
      },
      resetIngredient : (state) => {
          state.ingredient = {
              name : '',
              quantity : ''
          }
      }
  }
})

export const { addFilter, removeFilter, addKitchenMaster, removeKitchenMaster,
                addDate, addTime, resetData, addIngredientName, addIngredientQuantity,
                newIngredientList, resetIngredient} = counterSlice.actions

export default counterSlice.reducer