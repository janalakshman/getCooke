import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Discover from './Discover'
import MealPlan from './MealPlan'
import GroceryList from './GroceryList'
import CreateRecipe from './CreateRecipe'
import RecipeFullDetail from './RecipeFullDetail'
import LogoTitle from './components/LogoTitle'
import { MaterialIcons } from '@expo/vector-icons';
import Profile from './Profile'
import KitchenMaster from './KitchenMaster'
import store from './redux/store'
import { Provider } from 'react-redux'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
              name="Home" 
              component={Home}
              options={({ navigation }) => ({
                headerTitle : () => (
                  <Text style={styles.text}>Cooke</Text>
                ),
                headerLeft : () => (
                  <MaterialIcons name="add-circle" style={styles.icon} onPress={() => navigation.navigate('CreateRecipe')}/>
                ),
                headerRight : () => (
                  <MaterialIcons name="account-circle" style={styles.icon} onPress={() => navigation.navigate('Profile')}/>
                ),
                headerStyle : {
                  backgroundColor : '#fa9332',
                  height : 84
                },
              })} />
        <Stack.Screen 
                name="Discover" 
                component={Discover}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <Text style={styles.text}>Discover</Text>
                  ),
                  headerLeft : () => (
                    <MaterialIcons name="add-circle" style={styles.icon} onPress={() => navigation.navigate('CreateRecipe')} />
                  ),
                  headerRight : () => (
                    <MaterialIcons name="account-circle" style={styles.icon} onPress={() => navigation.navigate('Profile')}/>
                  ),
                  headerStyle : {
                    backgroundColor : '#fa9332',
                    height : 84
                  },
                 })} />
        <Stack.Screen 
                name="MealPlan" 
                component={MealPlan}
                options={({ navigation }) => ({
                  headerTitle : () => (
                    <Text style={styles.text}>Meal plan</Text>
                  ),
                  headerLeft : () => (
                    <MaterialIcons name="add-circle" style={styles.icon} onPress={() => navigation.navigate('CreateRecipe')}/>
                  ),
                  headerRight : () => (
                    <MaterialIcons name="account-circle" style={styles.icon} onPress={() => navigation.navigate('Profile')}/>
                  ),
                  headerStyle : {
                    backgroundColor : '#fa9332',
                    height : 84
                  },
                 })}  />
        <Stack.Screen 
                  name="GroceryList" 
                  component={GroceryList}
                  options={({ navigation }) => ({
                    headerTitle :  () => (
                      <Text style={styles.text}>Grocery list</Text>
                    ),
                    headerLeft : () => (
                      <MaterialIcons name="add-circle" style={styles.icon} onPress={() => navigation.navigate('CreateRecipe')}/>
                    ),
                    headerRight : () => (
                      <MaterialIcons name="account-circle" style={styles.icon} onPress={() => navigation.navigate('Profile')}/>
                    ),
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                   })}  />
          <Stack.Screen 
                  name="RecipeFullDetail" 
                  component={RecipeFullDetail}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                    headerTintColor : '#fff',
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                   }}
              />
          <Stack.Screen 
                  name="KitchenMaster" 
                  component={KitchenMaster}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                    headerTintColor : '#fff',
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                   }}
              />
          <Stack.Screen 
                  name="CreateRecipe" 
                  component={CreateRecipe}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                    headerTintColor : '#fff',
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                    gestureDirection : 'horizontal-inverted'
                   }}
              />
          <Stack.Screen 
                  name="Profile" 
                  component={Profile}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                  headerTintColor : '#ffffff',
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                   }}
              />
      </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  position : {
    position : 'absolute',
    bottom : 64,
    right : 8
  },
  header : {
    top : 0
  },
  text : {
    flex : 1,
    color : '#fff',
    fontWeight : 'bold',
    fontSize : 24,
    padding : 20
},
icon : {
  padding : 16,
  color : '#fff',
  fontSize : 24,
  paddingTop : 24
},
line : {
  flexDirection : 'row',
  marginRight : 8
}
});

