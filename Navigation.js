import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MealPlan from './Pages/MealPlan'
import RecipeDetail from './Pages/RecipeDetail'
import EditProfile from './Pages/EditProfile'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Welcome from './Pages/Welcome'
import Contact from './Modal/Contact'
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function Navigation() {
    const Stack = createStackNavigator();
    const user = useSelector(state => state.counter.token);

    // It will resolve most of the redirect 
    const  defaultlandingPage = user ? 'Meal plan' : 'Welcome';

    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName={defaultlandingPage}>
        {user ? (
          <>            
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
                      height : 104
                    },
                  })}  />
            
            <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={({ navigation }) => ({
                      headerTitle :  () => (
                        <View>
                        </View>
                      ),
                      headerLeft : () => (
                        <View>
                            <Text style={styles.text}>Profile</Text>
                        </View>
                      ),
                      headerStyle : {
                        backgroundColor : '#fff',
                        height : 104
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
                    name="editProfile" 
                    component={EditProfile}
                    options={({ navigation }) => ({
                      headerTitle :  () => (
                        <View>
                            <Text style={styles.text}>Edit Profile</Text>
                        </View>
                      ),
                      headerTintColor : '#3b3b3b',
                      headerBackTitle : ' ',
                      headerStyle : {
                        backgroundColor : '#fff',
                        height : 104
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
                        height : 104
                      },
                    })}  /> 
          </>
        ) : (
          <>
                       
            <Stack.Screen 
                 name="SignIn" 
                 component={SignIn}
                 options={({ navigation }) => ({
                   headerTitle : () => (
                     <View>
                        
                     </View>
                   ),
                   headerLeft : () => (
                     <View>
                       <Text style={styles.text}>Log In</Text>
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
                     </View>
                   ),
                   headerLeft : () => (
                     <View>
                     </View>
                   ),
                   headerStyle : {
                     backgroundColor : '#ffffff',
                   },
                  })}  />           
          </>
        )}
                
    </Stack.Navigator>
    </NavigationContainer>
    )
  }

  const styles = StyleSheet.create({
    text : {
      color : '#333333',
      fontSize : 24,
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