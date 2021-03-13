import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Title from './Title';
import RecipeCardPic from '../assets/RecipeCardPic.png';
import config from '../config';

export default function RecipeDetail(props){
    const recipe = props.recipe
    return(
        <ScrollView>
                
                <Title name={recipe.name} />
                { recipe.over_night_prep ? ( 
                <View style={styles.line}>
                    <MaterialIcons name="nights-stay" style={styles.icon} />
                    <Text style={styles.smalltext}>Overnight prep</Text> 
                </View> )
                : <View style={styles.line}></View>
                }   

                <View style={styles.line}>
                        <MaterialIcons name="access-time" style={styles.icon} />
                        <Text style={styles.smalltext}>{recipe.cooking_time} mins</Text>       
                </View>  
                
                { recipe.image ? <Image source={config.api + recipe.image}  style={styles.image}/> : <Image source={RecipeCardPic} style={styles.image}/>
                      } 
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
  image : {
      height : 343,
      width : '90%',
      margin : 16,
      alignSelf : 'center'
  },
  icon : {
      height : 16,
      width : 16,
      margin : 4,
      marginLeft : 8,
      fontSize : 16
  },
  smalltext : {
    fontSize : 14,
    color : '#3b3b3b',
    marginLeft : 8,
    marginTop : 4
},
line : {
    flexDirection : "row",
    marginLeft : 16,
    margin : 4
}
  });