import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Discover from './Discover'
import MealPlan from './MealPlan'
import GroceryList from './GroceryList'
import CreateRecipe from './CreateRecipe'
import RecipeDetail from './RecipeDetail'
import { MaterialIcons } from '@expo/vector-icons';
import AddRecipe from './AddRecipe'
import Profile from './Profile'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Welcome from './Welcome'
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import LoadingScreen from './LoadingScreen'
import Logo from './assets/CookeLogo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import useSelector from 'react-redux'
import AddIngredient from './components/AddIngredient'



export default function App() {
  const [loaded] = useFonts({
    'Poppins_600SemiBold' : require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins_500Medium' : require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins_400Regular' : require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'SourceSansPro_400Regular' :  require('./assets/fonts/SourceSansPro/SourceSansPro-Regular.ttf'),
    'SourceSerifPro' : require('./assets/fonts/SourceSerifPro/SourceSerifPro.ttf'),
  });

  if(!loaded) {
    return (<LoadingScreen />)
  }
  const Stack = createStackNavigator();
  let persistor = persistStore(store);


  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Stack.Navigator initialRouteName="Welcome">  
        <Stack.Screen 
              name="Home" 
              component={Home}
              options={({ navigation }) => ({
                headerTitle : () => (
                  <View>
                  </View>
                ),
                headerLeft : () => (
                  <View>
                    <Text style={styles.text}>Home</Text>
                  </View>
                ),
                headerStyle : {
                  backgroundColor : '#fff',
                  height : 92
                },
              })} />
        {/* <Stack.Screen 
                name="Discover" 
                component={Discover}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <View>
                    </View>
                  ),
                  headerLeft : () => (
                    <View style={{flexDirection : 'row', alignItems : 'center', justify : 'center'}}>
                      <Image source={Logo} alt="Logo"
                        style={{ width: 50, height: 50, marginLeft : 16 }}
                      />
                      <Text style={styles.text}>Discover</Text>
                    </View>
                  ),
                  headerRight : () => (
                    <TouchableOpacity onPress={() => navigation.navigate('CreateRecipe')}>
                      <Text style={styles.buttonText}>CREATE</Text>
                    </TouchableOpacity>
                  ),
                  headerStyle : {
                    backgroundColor : '#ffffff',
                    elevation : 5,
                    shadowOpacity : 3,
                    shadowColor : 'rgba(0, 0, 0, 0.10)',
                    shadowRadius : 2,
                    shadowOffset : {width : 0, height : 4},
                    height : 84
                  },
                 })} /> */}
        <Stack.Screen 
                name="Meal plan" 
                component={MealPlan}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <View>
                    </View>
                  ),
                  headerLeft : () => (
                    <View>
                      <Text style={styles.text}>Meal plan</Text>
                    </View>
                  ),
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 92
                  },
                 })}  />
        <Stack.Screen 
                  name="Grocery list" 
                  component={GroceryList}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <View></View>
                    ),
                    headerLeft : () => (
                      <View>
                        <Text style={styles.text}>Grocery list</Text>
                      </View>
                    ),
                    headerStyle : {
                      backgroundColor : '#fff',
                      height : 92
                    },
                   })}  />
          <Stack.Screen 
                  name="CreateRecipe" 
                  component={CreateRecipe}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <View></View>
                    ),
                    headerLeft : () => (
                      <View style={{flexDirection : 'row', alignItems : 'center', justify : 'center', marginVertical : 16}}>
                        <Image source={Logo} alt="Logo"
                          style={{ width: 50, height: 50, marginLeft : 16 }}
                        />
                        <Text style={styles.text}>Create recipe</Text>
                      </View>
                    ),
                    headerStyle : {
                      backgroundColor : '#ffffff',
                      elevation : 5,
                      shadowOpacity : 3,
                      shadowColor : 'rgba(0, 0, 0, 0.10)',
                      shadowRadius : 2,
                      shadowOffset : {width : 0, height : 4},
                      height : 92
                    },
                   })}  />
          <Stack.Screen 
                  name="Profile" 
                  component={Profile}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <View></View>
                    ),
                    headerLeft : () => (
                      <View>
                        <Text style={styles.text}>Profile</Text>
                      </View>
                    ),
                    headerStyle : {
                      backgroundColor : '#fff',
                      height : 92
                    },
                   })}  />
            <Stack.Screen 
                  name="RecipeDetail" 
                  component={RecipeDetail}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <View></View>
                    ),
                    headerTintColor : '#3b3b3b',
                    headerBackTitle : ' ',
                    headerStyle : {
                      backgroundColor : '#fff',
                      height : 92,
                    },
                   })}  />
             <Stack.Screen 
                  name="AddRecipe" 
                  component={AddRecipe}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <View></View>
                    ),
                    headerTintColor : '#3b3b3b',
                    headerBackTitle : ' ',
                    headerStyle : {
                      backgroundColor : '#fff',
                    },
                   })}  />
            <Stack.Screen 
                  name="AddIngredient" 
                  component={AddIngredient}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <View></View>
                    ),
                    headerTintColor : '#3b3b3b',
                    headerBackTitle : ' ',
                    headerStyle : {
                      backgroundColor : '#fff',
                    },
                   })}  />
            <Stack.Screen 
                name="SignUp" 
                component={SignUp}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <View>
                    </View>
                  ),
                  headerLeft : () => (
                    <View>
                      <Text style={styles.text}>Sign Up</Text>
                    </View>
                  ),
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 92
                  },
                 })}  />
            <Stack.Screen 
                name="SignIn" 
                component={SignIn}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <View>
                    </View>
                  ),
                  headerLeft : () => (
                    <View style={{flexDirection : 'row', alignItems : 'center', justify : 'center', marginVertical : 16}}>
                      <Text style={styles.text}>Log In</Text>
                    </View>
                  ),
                  headerStyle : {
                    backgroundColor : '#ffffff',
                    height : 92
                  },
                 })}  />
            <Stack.Screen 
                name="Welcome" 
                component={Welcome}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <View>
                    </View>
                  ),
                  headerLeft : () => (
                    <View style={{flexDirection : 'row', alignItems : 'center', justify : 'center', marginVertical : 16}}>
                      <Text style={styles.text}>Cook-e</Text>
                    </View>
                  ),
                  headerStyle : {
                    backgroundColor : '#ffffff',
                    height : 92
                  },
                 })}  />
      </Stack.Navigator>
      </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text : {
    color : '#3b3b3b',
    fontSize : 32,
    fontFamily : 'SourceSerifPro',
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
  fontFamily : 'Poppins_600SemiBold',
  fontSize : 14,
  color : '#3b3b3b',
},
});