import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import CalendarCard from './components/CalendarCard'
import FloatingButton from './components/FloatingButtonList'

export default function App() {
  return (
    <View style={{flex : 1}}>
          <View style={styles.header}>
            <Header name="Meal plan"/>
          </View>
          
        <ScrollView style={styles.container}>
          <Title name="November 10" />
          <CalendarCard />
          <CalendarCard />
          <CalendarCard />
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
