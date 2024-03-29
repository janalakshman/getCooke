import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Title from './Title';
import RecipeCardPic from '../assets/RecipeCardDefault.png';
import config from '../config';

export default function RecipeData(props){

    const recipe = props.recipe
    
    return(
        <ScrollView>
                
                <Text style={{fontFamily : 'Poppins_600SemiBold', fontSize : 24, margin : 16}}>{recipe.name}</Text>

                { recipe.over_night_prep ? ( 
                <View style={styles.line}>
                    <MaterialIcons name="nights-stay" style={styles.icon} />
                    <Text style={styles.body}>Overnight prep</Text> 
                </View> )
                : <View style={styles.line}></View>
                }   

                <View style={styles.line}>
                        <MaterialIcons name="access-time" style={styles.icon} />
                        <Text style={styles.body}>{recipe.cooking_time} mins</Text>       
                </View>  
                
                { recipe.image ? <Image source={{uri:config.api + recipe.image}}  style={styles.image}/> : <Image source={RecipeCardPic} style={styles.image}/>
                      } 
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
  image : {
      height : 343,
      width : '90%',
      margin : 16,
      alignSelf : 'center',
    borderTopLeftRadius : 0,
    borderRadius : 20
  },
  icon : {
      fontSize : 16,
      margin : 4,
      marginLeft : 8,
  },
  body : {
    fontSize : 14,
    color : '#3b3b3b',
    fontFamily : 'Poppins_400Regular',
    marginLeft : 8,
    marginTop : 4
},
line : {
    flexDirection : "row",
    marginLeft : 16,
    margin : 4
}
  });