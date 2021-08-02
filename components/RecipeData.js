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
                            
                { recipe.image ? <Image source={{uri : recipe.image}}  style={styles.image}/> : <Image source={RecipeCardPic} style={styles.image}/>
                      } 
                 <Text style={{fontFamily : 'ExoSemiBold', color : '#a13e00', fontSize : 24, margin : 16, marginBottom : 4}}>{recipe.name}</Text>

                { recipe.over_night_prep ? ( 
                <View style={styles.line}>
                    <MaterialIcons name="nights-stay" style={styles.icon} />
                    <Text style={styles.body}>Overnight prep</Text> 
                </View> )
                : <View></View>
                }   

                <View style={styles.line}>
                        <MaterialIcons name="access-time" style={styles.icon} />
                        <Text style={styles.body}>{recipe.cooking_time} mins</Text>       
                </View> 
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
  image : {
    flex: 1,
    aspectRatio: 1,
    width : '100%',
    alignSelf : 'center', 
    resizeMode: 'contain',
    borderTopLeftRadius : 0,
    borderTopRightRadius : 0,
    borderRadius : 20
  },
  icon : {
      fontSize : 16,
      margin : 4,
      marginHorizontal : 0
  },
  body : {
    fontSize : 14,
    color : '#3b3b3b',
    fontFamily : 'ExoRegular',
    marginLeft : 8,
    margin : 4
},
line : {
    flexDirection : "row",
    marginLeft : 16,
    margin : 4,
    alignContent :'center'
}
  });