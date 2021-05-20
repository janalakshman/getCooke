import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import MealPlan from './MealPlan'
import GroceryList from './GroceryList'
import RecipeDetail from './RecipeDetail'
import AddRecipe from './AddRecipe'
import Profile from './Profile'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Welcome from './Welcome'
import useSelector from 'react-redux'
import AddIngredient from '../Modal/AddIngredient'
import Contact from '../Modal/Contact'
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';


export default function Navigation() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <>
        <Stack.Screen 
            name="Home" 
            component={Home}
            options={({ navigation }) => ({
              headerTitle : () => (
                <View>
                    <Text style={styles.text}>Home</Text>
                </View>
              ),
              headerLeft : () => (
                <View>
                  <Text style={styles.text}></Text>
                </View>
              ),
              headerStyle : {
                backgroundColor : '#fff',
                height : 64
              },
            })} />
      <Stack.Screen 
              name="Meal plan" 
              component={MealPlan}
              options={({ navigation }) => ({
                headerTitle : () => (
                  <View>
                      <Text style={styles.text}>Meal Plan</Text>
                  </View>
                ),
                headerLeft : () => (
                  <View>
                  </View>
                ),
                headerStyle : {
                  backgroundColor : '#fff',
                  height : 64
                },
               })}  />
      <Stack.Screen 
                name="Grocery list" 
                component={GroceryList}
                options={({ navigation }) => ({
                  headerTitle :  () => (
                    <View>
                      <Text style={styles.text}>Grocery List</Text>
                    </View>
                  ),
                  headerLeft : () => (
                    <View>
                    </View>
                  ),
                  headerStyle : {
                    backgroundColor : '#fff',
                    height : 64
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
                    height : 64
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
                    height : 64
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
                    height : 64
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
                 
              </>
  
              <>
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
                     height : 64
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
                     height : 64
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
                     height : 64
                   },
                  })}  />
            </>
                   
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