import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Alert} from 'react-native';
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
import ReportButton from './components/ReportButton'


export default function RecipeFullDetail({navigation, route, props}) {
 
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [count, setCount] = useState(0);
  const { recipeId } = route.params;

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
      .then((res) => {
          return Promise.all([res.status, res.json()]);        
        })
        .then(([status, response])=> {
              if(status === 200) {
                setRecipe(response);
                setLoading(false)
              } else {
                Alert.alert( "Error", "Unable to get recipe. Please try again", {text : "OK"} )
              }
              
          })
        .catch((err) => {
            Alert.alert( "Error", "Unable to get recipe. Please try again", {text : "OK"} )
        });
  }, []);

  

  return (
    <View style={{backgroundColor : '#fff', flex : 1}}>
      {loading ? (<LoadingScreen/>) : 
        (
            <View style={{backgroundColor : '#fff'}}>
              
                <ScrollView key={recipe.id.toString()}>
                  <RecipeData recipe = {recipe} />

                  <RecipeDescription recipe = {recipe}/>

                  <Title name="Ingredients" />
                  <View style={{backgroundColor : '#fff5e6'}}>
                    <IngredientCard ingredients = {recipe.ingredients} servings={recipe.servings}/>
                  </View>

                  {recipe.calories ? 
                  <View>
                    <Title name="Nutrition" />
                    <NutritionCard recipe={recipe} count={count}/> 
                  </View> : <View></View>}
                  

                  <Title name="Preparation" />
                  <View style={{backgroundColor : '#fff5e6'}}>
                      <PrepStep steps={recipe.steps} />
                  </View>

                  <View style={{backgroundColor : '#fff5e6'}}>
                    <ReportButton/>
                  </View>


                </ScrollView> 

                <View style={styles.position}>
                  <FloatingButton modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                </View>

                <CalendarModal recipe={recipe.id} modalVisible={modalVisible} setModalVisible={setModalVisible}/>


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

