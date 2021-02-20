import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Discover from './Discover'
import MealPlan from './MealPlan'
import GroceryList from './GroceryList'
import RecipeFullDetail from './RecipeFullDetail'
import LogoTitle from './components/LogoTitle'
import { MaterialIcons } from '@expo/vector-icons';
import Profile from './Profile'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
              name="Home" 
              component={Home}
              options={({ navigation }) => ({
                headerTitle : props => <LogoTitle {...props} />,
                headerLeft : () => (
                  <Text style={styles.text}>Home</Text>
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
                  headerTitle : props => <LogoTitle {...props} />,
                  headerLeft : () => (
                    <Text style={styles.text}>Discover</Text>
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
                  headerTitle : props => <LogoTitle {...props} />,
                  headerLeft : () => (
                    <Text style={styles.text}>Meal plan</Text>
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
                    headerTitle : props => <LogoTitle {...props} />,
                    headerLeft : () => (
                      <Text style={styles.text}>Grocery list</Text>
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
                  name="Profile" 
                  component={Profile}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                  headerTintColor : '#fa9332',
                    headerStyle : {
                      backgroundColor : '#fff',
                      height : 84
                    },
                   }}
              />
      </Stack.Navigator>
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

