import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
      filters : [],
      recipe : {
          name : '',
          dates : [],
          time : [],
          isOvernight : false,
          km : '',
          serving : null
      },
      kitchenMaster : [],
      ingredients:[],
      ingredient : {
          name : '',
          quantity : ''
      }, 
      ingredientList : [],
      user : {
          userID : '',
          password : '',
      },
      token : ''
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
          let newArray
          newArray = [...state.recipe.time, action.payload]
          state.recipe = {
              ...state.recipe,
              time : newArray
          }
      },
      resetData : (state) => {
          state.recipe = {
            name : '',
            dates : [],
            time : [],
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
      },
      addUserID : (state, action) => {
        state.user = {
            ...state.user,
            userID : action.payload
        }
    },
    addUserPassword : (state, action) => {
        state.userID = {
            ...state.user,
            password : action.payload
        }
    },
    setToken : (state, action) => {
        state.token = action.payload
    },
    setIngredient : (state, action) => {
        let newIngredient = [...state.ingredients, action.payload]
        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        state.ingredients = getUniqueListBy(newIngredient)
    },
  }
})

export const { addFilter, removeFilter, addKitchenMaster, removeKitchenMaster,
                addDate, addTime, resetData, addIngredientName, addIngredientQuantity,
                newIngredientList, resetIngredient, addUserID, addUserPassword, setToken, setIngredient} = counterSlice.actions

export default counterSlice.reducer