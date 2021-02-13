import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Title from './components/Title';
import * as Font from 'expo-font';
import HeaderBack from './components/HeaderBack';
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import RecipeCardHome from './components/RecipeCardHome'
import TertiaryButton from './components/TertiaryButton'
import FilterSelected from './components/FilterSelected'
import FilterUnselected from './components/FilterUnselected'
import RecipeCard from './components/RecipeCard'
import RecipeDetail from './components/RecipeDetail'
import RecipeDescription from './components/RecipeDescription'
import IngredientCard from './components/IngredientCard'
import PrepStep from './components/PrepStep'
import Tags from './components/Tags'
import FloatingButton from './components/FloatingButtonCalendar'

export default function App() {
  return (
    <View style={{flex : 1}}>
          <View style={styles.header}>
            <HeaderBack />
          </View>
          
        <ScrollView style={styles.container}>
          
          <RecipeDetail />
          <RecipeDescription />
          <Title name="Ingredients" />
          <IngredientCard />
          <Title name="Nutrition" />
          <NutritionCard />
          <Title name="Prepration" />
          <PrepStep />
          <Title name="Tags" />
          <Tags/>
         
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

