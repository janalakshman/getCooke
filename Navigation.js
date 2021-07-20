import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Pages/Home'
import Discover from './Pages/Discover'
import MealPlan from './Pages/MealPlan'
import RecipeDetail from './Pages/RecipeDetail'
import UpdateInfo from './Pages/UpdateInfo'
import Profile from './Pages/Profile'
import SignIn from './Pages/SignIn'
import Welcome from './Pages/Welcome'
import Contact from './Modal/Contact'
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

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
                    },
                  })}  />

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
                      </View>
                    ),
                    headerStyle : {
                      backgroundColor : '#fff',
                    },
                  })}  />

              <Stack.Screen 
                  name="Discover" 
                  component={Discover}
                  options={({ navigation }) => ({
                    headerTitle : () => (
                      <View>
                      </View>
                    ),
                    headerLeft : () => (
                      <View>
                        <Text style={styles.text}>Discover</Text>
                      </View>
                    ),
                    headerStyle : {
                      backgroundColor : '#fff',
                    },
                  })}  />
            
            <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={({ navigation }) => ({
                      headerTitle : () => (
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
                        backgroundColor : '#f1f1f1',
                      },
                    })}  />
              
              <Stack.Screen 
                    name="UpdateInfo" 
                    component={UpdateInfo}
                    options={({ navigation }) => ({
                      headerTitle :  () => (
                        <View>
                            <Text style={styles.text}>Update info</Text>
                        </View>
                      ),
                      headerTintColor : '#3b3b3b',
                      headerBackTitle : ' ',
                      headerStyle : {
                        backgroundColor : '#fff',
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
                     backgroundColor : '#fff',
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
                     backgroundColor : '#fff',
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
      fontFamily : 'ExoSemiBold',
      paddingHorizontal : 16,
  },
  icon : {
    color : '#3b3b3b',
    fontSize : 30,
    margin : 8,
    marginHorizontal : 16
  },
    buttonText : {
      fontFamily : 'ExoSemiBold',
      fontSize : 14,
      color : '#3b3b3b',
      marginHorizontal : 16
    },
  });