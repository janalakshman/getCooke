import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RecipeCard from '../assets/RecipeCardPic.png';
import veg from '../assets/veg.png'
import nonVeg from '../assets/nonVeg.png'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Header(props){
let array = ['200 g Onion', '2 Tomatoes', '1 cup Panner', '1 tsp Rasam powder', '1 cup Butter']

let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

const navigation = useNavigation(); 

    return(
        <View style={styles.shadow}>
                <View style={styles.card} >

                        <Image source={RecipeCard} alt="Card" style={styles.image} />
                        <Image source={veg} alt="icon"style={styles.icon}/>

                        <Pressable onPressIn ={() => navigation.navigate('RecipeDetail')}>
                            <Text style={styles.text}>Paneer Butter Masala</Text>
                            
                        </Pressable>

                        <View style={styles.line}>
                            <MaterialIcons name="nights-stay" style={styles.smallIcon} />
                            <Text style={styles.body}>Overnight prep</Text> 
                        </View>     

                        <View style={styles.line}>
                            <MaterialIcons name="access-time" style={styles.smallIcon} />
                            <Text style={styles.body}>25 mins</Text>
                        </View> 


                        <Text style={styles.subtitle}>Ingredients</Text>
                        {array.map(ingredient =>
                            <Text style={styles.body}>{ingredient}</Text>
                            )
                        }


                </View>
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    shadow : {
        elevation : 3,
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
        width : '45%',
        padding : 8,
        margin : '2.5%',
        backgroundColor : '#fff',
        borderRadius : 20,
        borderTopLeftRadius : 0,
    },
  image : {
      height : 140,
      width : 140,
      borderRadius : 20,
      borderTopLeftRadius : 0,
      margin : 4,
      alignSelf : 'center'
  },
  icon : {
      height : 16,
      width : 16,
      marginLeft : 8,
      marginTop : 4
  },
  smallIcon : {
      height : 12,
      width : 12,
      marginTop : 2
  },
  subtitle : {
      fontSize : 14,
      color : '#fa9332',
      margin : 8,
      fontFamily : 'Poppins_500Medium'
  },
  body : {
      fontSize : 14,
      color : '#626262',
      marginLeft : 8,
      fontFamily : 'Poppins_400Regular'
  },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      margin : 8,
      fontFamily : 'Poppins_500Medium'
  },
line : {
    flexDirection : "row",
    marginLeft : 8
}
  });