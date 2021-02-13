import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RecipeCardPic from '../assets/RecipeCardPic.png';
import veg from '../assets/veg.png'

export default function Header(props){
let array = ['200 g Onion', '2 Tomatoes', '1 cup Panner', '1 tsp Rasam powder', '1 cup Butter']

    return(
        <ScrollView style={styles.card}>
                <Image 
                    source={RecipeCardPic}
                    style={styles.image} />
                 <Image 
                    source={veg}
                    style={styles.icon} /> 
                <Text style={styles.text}>Paneer Butter Masala</Text>

                <View style={styles.line}>
                    <MaterialIcons name="nights-stay" style={styles.smallIcon} />
                    <Text style={styles.smalltext}>Overnight prep</Text> 
                </View>     

                <View style={styles.line}>
                    <MaterialIcons name="access-time" style={styles.smallIcon} />
                    <Text style={styles.smalltext}>25 mins</Text>
                </View>  

                <Text style={styles.subtitle}>Ingredients</Text>
                {array.map(ingredient =>
                    <Text style={styles.body}>{ingredient}</Text>
                    )
                }
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : '44%',
        padding : 8,
        margin : 8,
        borderRadius : 8,
        borderColor : '#cfcfcf',
        borderWidth : 1,
    },
  image : {
      height : 135,
      width : 135,
      margin : 4,
      alignSelf : 'center'
  },
  icon : {
      height : 16,
      width : 16,
      margin : 4,
      marginLeft : 8
  },
  smallIcon : {
      height : 12,
      width : 12,
      marginTop : 2
  },
  subtitle : {
      fontSize : 14,
      fontWeight : '500',
      color : '#fa9332',
      margin : 8
  },
  body : {
      fontSize : 14,
      fontWeight : '400',
      color : '#626262',
      marginLeft : 8,
  },
  text : {
      fontSize : 14,
      color : '#3b3b3b',
      fontWeight : '600',
      margin : 8
  },
  smalltext : {
    fontSize : 14,
    color : '#3b3b3b',
    marginLeft : 8,
},
line : {
    flexDirection : "row",
    marginLeft : 8
}
  });