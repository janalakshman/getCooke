import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import DatePicker from './components/DatePicker'
import FloatingButton from './components/FloatingButtonPlan'
import ToBuy from './components/ToBuy'
import AddToBuy from './components/AddTobuy'
import PrimaryButton from './components/PrimaryButton'

export default function App() {
  return (
    <View style={{flex : 1}}>
          <View style={styles.header}>
            <Header name="Grocery List"/>
          </View>
          
        <ScrollView style={styles.container}>
          <Title name="Dates" />
          <DatePicker />
          <Title name= "List" /> 

          <ToBuy />

          <PrimaryButton name="Add ingredient" />

 
        </ScrollView> 

        <View style={styles.position}>
          <FloatingButton />
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
  }
});