import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RecipeCardPic from '../assets/RecipeCardDefault.png';
import veg from '../assets/veg.png'
import nonVeg from '../assets/nonVeg.png'
import { Pressable } from 'react-native';
import config from '../config';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Header(props){
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    return(
        <Pressable onPress={props.onPress}>
            <View style={styles.card}>
                <View>
                {props.recipe.image ? <Image source={{uri:config.api+props.recipe.image}} style={styles.image} />: <Image source={RecipeCardPic} style={styles.image} /> }
                {props.recipe.isVeg ? <Image source={veg} style={styles.icon} /> : <Image source={nonVeg} style={styles.icon} /> } 

                <Text style={styles.text}>{props.recipe.name}</Text>
                {props.recipe.user.first_name ? 
                                <Text style={styles.body}>{props.recipe.user.first_name.charAt(0).toUpperCase() + props.recipe.user.first_name.slice(1)}</Text>
                                : <Text style={styles.body}>{props.recipe.user.username.charAt(0).toUpperCase() + props.recipe.user.username.slice(1)}</Text>
                                }
                </View>       
        </View>
        </Pressable>
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : 116,
        padding : 8,
        margin : 8,
        borderRadius : 20,
        borderTopLeftRadius : 0,
        backgroundColor : '#fff',
        elevation : 3,
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
  image : {
      height : 100,
      width : 100,
      marginBottom : 4,
      borderTopLeftRadius : 0,
      borderRadius : 20
  },
  icon : {
      height : 16,
      width : 16,
      margin : 4,
  },
  text : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4,
      fontFamily : 'Poppins_500Medium'
  },
body : {
    fontSize : 14,
    color : '#a13e00',
    marginTop : 8,
    margin : 4,
    fontFamily : 'Poppins_400Regular'
}
  });