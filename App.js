import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Pages/Home'
import MealPlan from './Pages/MealPlan'
import GroceryList from './Pages/GroceryList'
import RecipeDetail from './Pages/RecipeDetail'
import { MaterialIcons } from '@expo/vector-icons';
import AddRecipe from './Pages/AddRecipe'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Welcome from './Pages/Welcome'
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import LoadingScreen from './components/LoadingScreen'
import Logo from './assets/CookeLogo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import useSelector from 'react-redux'
import AddIngredient from './Modal/AddIngredient'
import Contact from './Modal/Contact'
import Navigation from './Pages/Navigation';


export default function App() {
  
  const [loaded] = useFonts({
    'ExoBoldItalic' : require('./assets/fonts/Exo/Exo-BoldItalic.ttf'),
    'ExoBold' : require('./assets/fonts/Exo/Exo-Bold.ttf'),
    'ExoSemiBold' : require('./assets/fonts/Exo/Exo-SemiBold.ttf'),
    'ExoMedium' : require('./assets/fonts/Exo/Exo-Medium.ttf'),
    'ExoRegular' : require('./assets/fonts/Exo/Exo-Regular.ttf'),
    'ExoMediumItalic' : require('./assets/fonts/Exo/Exo-MediumItalic.ttf'),
    'ExoBlack' : require('./assets/fonts/Exo/Exo-Black.ttf')
  });

  if(!loaded) {
    return (<LoadingScreen />)
  }

  let persistor = persistStore(store);


  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  text : {
    color : '#3b3b3b',
    fontSize : 19,
    fontFamily : 'ExoBold',
    marginHorizontal : 16
},
icon : {
    padding : 16,
    color : '#fa9332',
    fontSize : 32,
    paddingTop : 16
  },
  buttonText : {
    margin : 16,
    marginTop : 24,
    fontFamily : 'ExoSemiBold',
    fontSize : 14,
    color : '#3b3b3b',
  },
});