import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Title from './components/Title';
import NutritionCard from './components/NutritionCard'
import RecipeData from './components/RecipeData'
import RecipeDescription from './components/RecipeDescription'
import IngredientCard from './components/IngredientCard'
import PrepStep from './components/PrepStep'
import FloatingButton from './components/FloatingButton'
import Tags from './components/Tags'
import CalendarModal from './components/CalendarModal'
import config from './config';
import LoadingScreen from "./LoadingScreen";


export default function RecipeFullDetail({navigation, route, props}) {
 
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1)
  const [recipe, setRecipe] = useState({});
  const { recipeId } = route.params;

  function increment(){
    setCount(count+1)
    }
  
  function decrement(){
      count === 1 ? setCount(count) :  setCount(count-1); 
  }

  useEffect(() => {
    fetch(
      config.api + `/v1/recipe/`+ recipeId,
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
        setLoading(false)
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={{backgroundColor : '#fff', flex : 1}}>
      {loading ? (<LoadingScreen/>) : 
        (
            <View style={{backgroundColor : '#fff'}}>
              
                <ScrollView>
                  <RecipeData recipe = {recipe} />

                  <RecipeDescription recipe = {recipe}/>

                  <Title name="Ingredients" />
                    <IngredientCard ingredients = {recipe.ingredients} servings={recipe.servings} increment={increment} decrement={decrement}/>
                  
                  {recipe.calories ? 
                  <View>
                    <Title name="Nutrition" />
                    <NutritionCard recipe={recipe} count={count}/>
                  </View> : <View></View>}
                  

                  <Title name="Preparation" />
                    <PrepStep steps={recipe.steps} />

                
                </ScrollView> 

                <View style={styles.position}>
                  <FloatingButton modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                </View>

                <CalendarModal  modalVisible={modalVisible} setModalVisible={setModalVisible}/>


            </View>
    
    )}
    </View>
    
        
  );
}

const styles = StyleSheet.create({
  position : {
    position : 'absolute',
    bottom : 120,
    right : 8,
  },
});

