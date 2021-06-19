import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Alert} from 'react-native';
import Title from '../components/Title';
import NutritionCard from '../components/NutritionCard'
import RecipeData from '../components/RecipeData'
import RecipeDescription from '../components/RecipeDescription'
import IngredientCard from '../components/IngredientCard'
import PrepStep from '../components/PrepStep'
import Button from '../components/Button'
import CalendarModal from '../Modal/CalendarModal'
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from "react-redux";


export default function RecipeFullDetail({navigation, route, props}) {
 
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [count, setCount] = useState(0);
  const { recipeId } = route.params;
  const user = useSelector(state => state.counter.token);

  const handleReport = () => {
    Alert.alert(
        "Report recipe",
        "Are you sure you want to report this recipe because it has obscene/distrubing content?",
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
          { text: "Report", onPress: () => console.log("OK Pressed") }
        ]
      );
  }

  const handleClick = () => {
    fetch(config.api + `/v1/fav-recipe/` + recipeId + `/1`,
       {
        method: 'GET',
        headers: {
          "Authorization":'Token ' +user.token,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          Alert.alert(
              "Recipe added",
              "Recipe added to your favourites succesfully!",
              [
                {text : "Go to profile", onPress : () => { navigation.navigate('Profile')}},
                {text : "OK"},
              ]
              )
            setMarkedDates({})
            setCourses([])    
        })
        .catch((err) => {
      })
    
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
  }, [recipeId]);

    return (
    <View style={{backgroundColor : '#fff', flex : 1}}>
      {loading ? (<LoadingScreen/>) : 
        (
            <View style={{backgroundColor : '#fff'}}>
              
                <ScrollView key={recipe.id.toString()}>
                  <RecipeData recipe = {recipe} />

                    <View style={{margin : 8}}></View>

                  
                    <RecipeDescription recipe = {recipe}/>

                    <View style={{margin : 8}}></View>

                  <Title name="Ingredients" />
                    <IngredientCard ingredients = {recipe.ingredients} servings={recipe.servings}/>
                  
                  {/* <Button type="secondary" name="Add to grocery list" onPress={() => setModalVisible(true)}/> */}

                    <View style={{margin : 8}}></View>


                  {recipe.calories ? 
                  <View style={{marginVertical : 8}}>
                    <Title name="Nutrition info" />
                    <NutritionCard recipe={recipe}/> 
                  </View> : <View></View>}
                  
                  <Button type="secondary" name="Add to favourites" onPress={handleClick}/>

                  
                  <View style={{margin : 8}}></View>


                  <Title name="Preparation" />
                  <View style={{backgroundColor : '#fff'}}>
                      <PrepStep steps={recipe.steps} />
                  </View>


                  <View style={{backgroundColor : '#fff'}}>
                    <Button type="report" onPress={() => handleReport()} />
                  </View>


                </ScrollView> 

                {/* <View style={styles.position}>
                  <Button type="floating" name="Add to grocery list" onPress={() => setModalVisible(true)}/>
                </View> */}

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

