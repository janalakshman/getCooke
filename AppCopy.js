import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import CalendarCard from './components/CalendarCard'
import FloatingButton from './components/FloatingButtonList'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Discover from './Discover'
import MealPlan from './MealPlan'
import GroceryList from './GroceryList'
import RecipeFullDetail from './RecipeFullDetail'
import LogoTitle from './components/LogoTitle'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
              name="Home" 
              component={Home}
              options={{
                headerTitle : props => <LogoTitle {...props} />,
                headerLeft : () => (
                  <Text style={styles.text}>Home</Text>
                ),
                headerRight : () => (
                  <MaterialIcons name="account-circle" style={styles.icon} />
                ),
                headerStyle : {
                  backgroundColor : '#fa9332',
                  height : 84
                },
              }} />
        <Stack.Screen 
                name="Discover" 
                component={Discover}
                options={{
                  headerTitle : props => <LogoTitle {...props} />,
                  headerLeft : () => (
                    <Text style={styles.text}>Discover</Text>
                  ),
                  headerRight : () => (
                    <MaterialIcons name="account-circle" style={styles.icon} />
                  ),
                  headerStyle : {
                    backgroundColor : '#fa9332',
                    height : 84
                  },
                 }} />
        <Stack.Screen 
                name="MealPlan" 
                component={MealPlan}
                options={{
                  headerTitle : props => <LogoTitle {...props} />,
                  headerLeft : () => (
                    <Text style={styles.text}>Meal plan</Text>
                  ),
                  headerRight : () => (
                    <MaterialIcons name="account-circle" style={styles.icon} />
                  ),
                  headerStyle : {
                    backgroundColor : '#fa9332',
                    height : 84
                  },
                 }}  />
        <Stack.Screen 
                  name="GroceryList" 
                  component={GroceryList}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                    headerLeft : () => (
                      <Text style={styles.text}>Grocery list</Text>
                    ),
                    headerRight : () => (
                      <MaterialIcons name="account-circle" style={styles.icon} />
                    ),
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                   }}  />
          <Stack.Screen 
                  name="RecipeFullDetail" 
                  component={RecipeFullDetail}
                  options={{
                    headerTitle : props => <LogoTitle {...props} />,
                    headerRight : () => (
                      <View style={styles.line}>
                         <MaterialIcons name="calendar-today" style={styles.icon} />
                         <Feather name="heart" style={styles.icon} />
                      </View>     
                    ),
                  headerTintColor : '#fff',
                    headerStyle : {
                      backgroundColor : '#fa9332',
                      height : 84
                    },
                   }}  />
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
  fontSize : 24
},
line : {
  flexDirection : 'row',
  marginRight : 8
}
});
