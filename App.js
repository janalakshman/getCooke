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
import RecipeFullDetail from './RecipeFullDetail'
import { MaterialIcons } from '@expo/vector-icons';
import Profile from './Profile'
import KitchenMaster from './KitchenMaster'
import store from './redux/store'
import { Provider } from 'react-redux'
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import LoadingScreen from './LoadingScreen'
import Logo from './assets/CookeLogo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }


  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
              name="Home" 
              component={Home}
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
                    <Text style={styles.text}>Cook-e</Text>
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
              })} />
        <Stack.Screen 
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
                    backgroundColor : '#f7f7f7',
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
                      backgroundColor : '#f7f7f7',
                      height : 84
                    },
                   })}  />
          <Stack.Screen 
                  name="RecipeFullDetail" 
                  component={RecipeFullDetail}
                  options={{
                    headerTintColor : '#a13e00',
                    headerStyle : {
                      backgroundColor : '#f7f7f7',
                      height : 84
                    },
                   }}
              />
          <Stack.Screen 
                  name="KitchenMaster" 
                  component={KitchenMaster}
                  options={{
                    headerTintColor : '#a13e00',
                    headerStyle : {
                      backgroundColor : '#f7f7f7',
                      height : 84
                    },
                   }}
              />
          <Stack.Screen 
                  name="CreateRecipe" 
                  component={CreateRecipe}
                  options={{
                    headerTintColor : '#a13e00',
                    headerStyle : {
                      backgroundColor : '#f7f7f7',
                      height : 84
                    },
                    gestureDirection : 'horizontal-inverted'
                   }}
              />
          <Stack.Screen 
                  name="Profile" 
                  component={Profile}
                  options={{
                  headerTintColor : '#a13e00',
                    headerStyle : {
                      backgroundColor : '#f7f7f7',
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
  text : {
    color : '#3b3b3b',
    fontSize : 19,
    fontFamily : 'Poppins_700Bold',
    marginLeft : 8,
    marginTop : 8
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

