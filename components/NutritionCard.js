import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCardIcon from '../assets/calendarCardIcon.png';

export default function Header(props){
    let calroies = 420
    let carbs = 12
    let protein = 24
    let fat = 10
    const recipe = props.recipe
    return(
      <View>
      {recipe ? (
        <View style={styles.card}>
            <View style={styles.line}>
                <Text style={styles.text}>{recipe.calories*props.count}</Text>
                <Text style={styles.smalltext}>Calories</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>{recipe.carbohydrate*props.count}g</Text>
                <Text style={styles.smalltext}>Carbs</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>{recipe.proteins*props.count}g</Text>
                <Text style={styles.smalltext}>Protein</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>{recipe.fat*props.count}g</Text>
                <Text style={styles.smalltext}>Fat</Text>     
            </View>
        </View>
        ): <View></View>}
        </View>
        
    )
}

const styles = StyleSheet.create({
    card : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fff5e6',
        padding : 8,
        margin : 16,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        borderWidth : 2,
        borderRightColor : '#ffffff',
        borderColor : '#cfcfcf'
    },
    line : {
        flexDirection : "column",
        flex : 1,
        alignItems : 'center'
    },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      margin : 8,
      fontWeight : '600'
  },
  smalltext : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4
  },
  
  });