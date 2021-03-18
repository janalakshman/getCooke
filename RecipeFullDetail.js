import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
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
import config from './config';

export default function RecipeFullDetail(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1)
  const [recipe, setRecipe] = useState({});
  function increment(){
    setCount(count+1)
    }
  
  function decrement(){
      count === 1 ? setCount(count) :  setCount(count-1); 
  }
  useEffect(() => {
    fetch(
      config.api + `/v1/recipe/`+ `102`,
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
        setRecipe(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={{flex : 1}}>
      
        <ScrollView style={styles.container}>
          
          <RecipeDetail recipe = {recipe} />
          <RecipeDescription recipe = {recipe}/>
          <Title name="Ingredients" />
          <IngredientCard ingredients = {recipe.ingredients} count={count} increment={increment} decrement={decrement}/>
          <Title name="Nutrition" />
          <NutritionCard recipe={recipe} count={count}/>
          <Title name="Prepration" />
          <PrepStep steps={recipe.steps} />

         
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

