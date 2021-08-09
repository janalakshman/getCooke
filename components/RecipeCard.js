import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import RecipeCardPic from '../assets/RecipeCardDefault.png';
import veg from '../assets/veg.png'
import nonVeg from '../assets/nonVeg.png'
import { Pressable } from 'react-native';


export default function Header(props){


    return(
        <Pressable onPress={props.onPress}>
            <View style={styles.card}>

                {props.recipe.image ? <Image source={{uri : props.recipe.image}} style={styles.image} />: <Image source={RecipeCardPic} style={styles.default} /> }
                
                <Text style={styles.text}>{props.recipe.name.length > 28 ? props.recipe.name.slice(0,28)+'...' : props.recipe.name}</Text>

                    {/* {props.recipe.user.first_name ? 
                        <Text style={styles.body}>{props.recipe.user.first_name.length > 20 ? (props.recipe.user.first_name.charAt(0).toUpperCase() + props.recipe.user.first_name.slice(1)).slice(0, 20) + '...' : (props.recipe.user.first_name.charAt(0).toUpperCase() + props.recipe.user.first_name.slice(1))}</Text>
                        : <Text style={styles.body}>{props.recipe.user.username.length > 20 ? (props.recipe.user.username.charAt(0).toUpperCase() + props.recipe.user.username.slice(1)).slice(0, 20) + '...' : (props.recipe.user.username.charAt(0).toUpperCase() + props.recipe.user.username.slice(1))}</Text>
                        } */}

                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    {props.recipe.isVeg ? <Image source={veg} style={styles.icon} /> : <Image source={nonVeg} style={styles.icon} /> }
                    <Text style={styles.body}>{props.recipe.cooking_time} mins</Text> 
                </View>

                </View>       
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : 166,
        padding : 4,
        margin : 8,
        borderRadius : 20,
        borderTopLeftRadius : 0,
        backgroundColor : '#fff',
        marginHorizontal : 2
        // borderWidth : 1,
        // borderColor : '#cfcfcf'
        // elevation : 3,
        // shadowRadius : 3,
        // shadowOpacity : 0.5,
        // shadowColor : 'rgba(0, 0, 0, 0.25)',
        // shadowOffset : {width : 0, height : 4},
    },
  image : {
      resizeMode : 'stretch',
      aspectRatio : 0.75,
      width : 150,
      marginBottom : 4,
      borderTopLeftRadius : 0,
      borderRadius : 8
  },
  default : {
    resizeMode : 'stretch',
    width : 150,
    height : 200,
    marginBottom : 4,
    borderTopLeftRadius : 0,
    borderRadius : 8
},
  icon : {
      height : 12,
      width : 12,
      margin : 4,
  },
  text : {
      fontSize : 14,
      color : '#a13e00',
      margin : 4,
      fontFamily : 'ExoSemiBold'
  },
body : {
    fontSize : 12,
    color : '#626262',
    margin : 4,
    fontFamily : 'ExoRegular'
  }
  });