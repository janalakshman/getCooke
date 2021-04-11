import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SectionList } from 'react-native';
import Title from './components/Title';
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import { MaterialIcons } from '@expo/vector-icons';
import SignUp from './SignUpScreen';
import config from './config';
import moment from 'moment';
import LoadingScreen from "./LoadingScreen";
const DATA = [
  {
    title: "November 10",
    data: ["Pizza", "Burger", "Risotto"],
    index : 1,
    nutrition : 5,
  },
  {
    title: "November 11",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    index : 2,

  },
  {
    title: "November 12",
    data: ["Water", "Coke", "Beer"],
    index : 3,
  },
  {
    title: "November 13",
    data: ["Cheese Cake", "Ice Cream"],
    index : 4,
  }
];

const Item = (event) => {
    return(
      <View>
        <CalendarCard event={event}/>
      </View>)
  };


export default function MealPlan({navigation}) {
  const [events, setEvents] = useState([])

  const [isSigned, setIsSigned] = useState(true)

   useEffect(() => {
            fetch(
              config.api + `/v1/events`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                mode: "cors",
              }
            )
              .then(res => res.json())
              .then(response => {
                setEvents(response)
                setLoading(false)
              })
              .catch(error => console.log(error));
          }, []);

  return (
    <View style={{flex : 1}}>
    {isSigned ? 
          
      <ScrollView style={{backgroundColor : '#ffffff'}}>
        { events ?
                      <SectionList
                          sections={events}
                          keyExtractor={(item, index) =>index.toString()}
                          renderItem={({ item }) => <Item title={item} />}
                          renderSectionHeader={({ section: { title } }) => (
                            <Title name={title}/>
                          )}
                          renderSectionFooter={({ section : {nutrition}}) => (
                            <View style={{marginTop : 16}}>
                                <NutritionCard nutrition={nutrition} />
                            </View>
                          )}
                        /> : ''}
      </ScrollView> 
      : 
      <SignUp /> }
    

            <View style={styles.navigation}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                    <MaterialIcons name="home-filled" style={styles.icon}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.icon}/>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} > 
                      <MaterialIcons name="event-note" style={styles.selectedIcon}/>
                  </TouchableOpacity> 
                  
                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Grocery list')} >
                      <MaterialIcons name="list-alt" style={styles.icon} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} > 
                    <MaterialIcons name="account-box" style={styles.icon}/>
                  </TouchableOpacity> 
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
   navigation : {
    backgroundColor : '#ffffff',
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3
  },
  tab : {
    alignItems : 'center',
    width : '20%',
  },
  icon : {
    color : 'rgba(207, 207, 207, 0.99)',
    fontSize : 32,
    margin : 16
  },
  selectedIcon : {
    color : '#3b3b3b',
    fontSize : 32,
    margin : 16
  },
});
