import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Pages/Home'
import MealPlan from './Pages/MealPlan'
import RecipeDetail from './Pages/RecipeDetail'
import AddRecipe from './Pages/AddRecipe'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Welcome from './Pages/Welcome'
import AddIngredient from './Modal/AddIngredient'
import Contact from './Modal/Contact'
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function Navigation() {
    const Stack = createStackNavigator();
    const user = useSelector(state => state.counter.token);

    // It will resolve most of the redirect 
    const  defaultlandingPage = user ? 'Home' : 'Welcome';

    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName={defaultlandingPage}>
        <Stack.Screen 
            name="Home" 
            component={Home}
            options={({ navigation }) => ({
              headerTitle : () => (
                <View>
                    <Text style={styles.text}>Discover</Text>
                </View>
              ),
              headerLeft : () => (
                <View>
                </View>
              ),
              headerStyle : {
                backgroundColor : '#fff',
                height : 80
              },
            })} />
        
        <Stack.Screen 
              name="Meal plan" 
              component={MealPlan}
              options={({ navigation }) => ({
                headerTitle : () => (
                  <View>
                      <Text style={styles.text}>Calendar</Text>
                  </View>
                ),
                headerLeft : () => (
                  <View>
                  </View>
                ),
                headerStyle : {
                  backgroundColor : '#fff',
                  height : 80
                },
               })}  />
        
        <Stack.Screen 
                name="Profile" 
                component={Profile}
                options={({ navigation }) => ({
                  headerTitle :  () => (
                    <View>
                      <Text style={styles.text}>Profile</Text>
                    </View>
                  ),
                  headerLeft : () => (
                    <View>
                    </View>
                  ),
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 80
                  },
                 })}  />
          
          <Stack.Screen 
                name="RecipeDetail" 
                component={RecipeDetail}
                options={({ navigation }) => ({
                  headerTitle :  () => (
                    <View></View>
                  ),
                  headerRight : () => (
                    <View style={{flexDirection : 'row', justifyContent : 'space-around', marginRight : 4}}>
                    </View>
                  ),
                  headerTintColor : '#3b3b3b',
                  headerBackTitle : ' ',
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 80
                  },
                 })}  />
          
          <Stack.Screen 
                name="AddRecipe" 
                component={AddRecipe}
                options={({ navigation }) => ({
                  headerTitle :  () => (
                    <View>
                      <Text style={styles.text}>Add Recipe</Text>
                    </View>
                  ),
                  headerTintColor : '#3b3b3b',
                  headerBackTitle : ' ',
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 80
                  },
                 })}  />
          
          <Stack.Screen 
                name="AddIngredient" 
                component={AddIngredient}
                options={({ navigation }) => ({
                  headerTitle :  () => (
                    <View>
                      <Text style={styles.text}>Add Ingredient</Text>
                    </View>
                  ),
                  headerTintColor : '#3b3b3b',
                  headerBackTitle : ' ',
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 80
                  },
                 })}  />
          
          <Stack.Screen 
                name="Contact" 
                component={Contact}
                options={({ navigation }) => ({
                  headerTitle :  () => (
                    <View>
                      <Text style={styles.text}>Contact</Text>
                    </View>
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
                        <Text style={styles.text}>Sign Up</Text>
                     </View>
                   ),
                   headerLeft : () => (
                     <View>
                     </View>
                   ),
                   headerStyle : {
                     backgroundColor : '#fff',
                     height : 80
                   },
                  })}  />
             
            <Stack.Screen 
                 name="SignIn" 
                 component={SignIn}
                 options={({ navigation }) => ({
                   headerTitle : () => (
                     <View>
                        <Text style={styles.text}>Log In</Text>
                     </View>
                   ),
                   headerLeft : () => (
                     <View>
                     </View>
                   ),
                   headerStyle : {
                     backgroundColor : '#ffffff',
                     height : 80
                   },
                  })}  />
             
            <Stack.Screen 
                 name="Welcome" 
                 component={Welcome}
                 options={({ navigation }) => ({
                   headerTitle : () => (
                     <View>
                        <Text style={styles.text}>Cook-e</Text>
                     </View>
                   ),
                   headerLeft : () => (
                     <View>
                     </View>
                   ),
                   headerStyle : {
                     backgroundColor : '#ffffff',
                     height : 0
                   },
                  })}  />                   
    </Stack.Navigator>
    </NavigationContainer>
    )
  }

  const styles = StyleSheet.create({
    text : {
      color : '#626262',
      fontSize : 19,
      fontFamily : 'ExoBoldItalic',
      marginHorizontal : 16
  },
  icon : {
    color : '#3b3b3b',
    fontSize : 30,
    margin : 16,
  },
    buttonText : {
      margin : 16,
      marginTop : 24,
      fontFamily : 'ExoSemiBold',
      fontSize : 14,
      color : '#3b3b3b',
    },
  });