import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import CalendarCard from './components/CalendarCard'
import FloatingButton from './components/FloatingButtonList'
import { MaterialIcons } from '@expo/vector-icons';


export default function MealPlan({navigation}) {
  return (
    <View style={{flex : 1}}>
          
        <ScrollView style={styles.container}>
          <Title name="November 10" />
          <CalendarCard />
          <CalendarCard />
          <CalendarCard />
        </ScrollView> 

        <View style={styles.position}>
          <FloatingButton onPress={() => navigation.navigate('GroceryList')} />
        </View>

        <View style={styles.positionNav}>
          <View style={styles.containerNav}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                      <MaterialIcons name="home" style={styles.icon} />
                      <Text style={styles.text}>HOME</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.icon} />
                      <Text style={styles.text}>DISCOVER</Text>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('MealPlan')} > 
                      <MaterialIcons name="calendar-today" style={styles.icon} fontSize={22}/>
                      <Text style={styles.text}>MEAL PLAN</Text>
                  </TouchableOpacity> 
          </View>
        </View>
    </View>
        
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
  positionNav : {
    position : 'absolute',
    bottom : 0,
   },
   containerNav : {
    flex : 1,
    height : 56,
    backgroundColor : '#fff',
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
    elevation: 5
  },
  text : {
    fontSize : 11,
    color : '#a13e00',
    fontWeight : '600'    
  },
  tab : {
    alignItems : 'center',
    width : '33.33%'
  },
  icon : {
    color : '#a13e00',
    fontSize : 24,
    paddingBottom : 4,
  }

});
