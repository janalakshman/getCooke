import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Title from './components/Title';
import NutritionCard from './components/NutritionCard'
import RecipeDetail from './components/RecipeDetail'
import RecipeDescription from './components/RecipeDescription'
import IngredientCard from './components/IngredientCard'
import PrepStep from './components/PrepStep'
import Tags from './components/Tags'
import CalendarModal from './components/CalendarModal'
import config from './config';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from './LoadingScreen'

export default function RecipeFullDetail(props) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

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
          <TouchableOpacity  style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
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
  },
  buttonText : {
    color : '#A13E00',
    fontSize : 17,
    fontWeight : '400',
    margin : 12,
  },

  button: {
      borderRadius : 8,
      backgroundColor : '#ffc885',
      alignSelf : 'flex-start',
      margin : 16,
      flexDirection : 'row',
      },

  icon : {
      fontSize : 20,
      color : '#a13e00',
      paddingTop : 12,
      paddingBottom : 12,
      paddingLeft : 12,
  },
});

