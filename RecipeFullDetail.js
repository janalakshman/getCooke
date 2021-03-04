import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import Title from './components/Title';
import HeaderBack from './components/HeaderBack';
import NutritionCard from './components/NutritionCard'
import RecipeDetail from './components/RecipeDetail'
import RecipeDescription from './components/RecipeDescription'
import IngredientCard from './components/IngredientCard'
import PrepStep from './components/PrepStep'
import Tags from './components/Tags'
import FloatingButton from './components/FloatingButtonCalendar'
import CalendarModal from './components/CalendarModal'

export default function RecipeFullDetail() {
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1)
    
  function increment(){
    setCount(count+1)
    }
  
    function decrement(){
        count === 1 ? setCount(count) :  setCount(count-1); 
    }

  return (
    <View style={{flex : 1}}>
      
        <ScrollView style={styles.container}>
          
          <RecipeDetail />
          <RecipeDescription />
          <Title name="Ingredients" />
          <IngredientCard count={count} increment={increment} decrement={decrement}/>
          <Title name="Nutrition" />
          <NutritionCard count={count}/>
          <Title name="Prepration" />
          <PrepStep />

         
        </ScrollView> 

        <View style={styles.position}>
          <FloatingButton onPressIn ={() => setModalVisible(true)}/>
        </View>

        <CalendarModal  modalVisible={modalVisible} setModalVisible={setModalVisible}/>

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

