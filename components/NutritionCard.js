import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'


export default function Header(props){
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
  
      if (!fontsLoaded) {
          return (<LoadingScreen />);
        }

    const recipe = props.recipe
    return(
        <View>
                {recipe ? (
                <View style={{backgroundColor : '#fff5e6'}}>
                <View style={styles.card}>
                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.calories*props.count}</Text>
                        <Text style={styles.body}>Calories</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.carbohydrate*props.count}g</Text>
                        <Text style={styles.body}>Carbs</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.proteins*props.count}g</Text>
                        <Text style={styles.body}>Protein</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.fat*props.count}g</Text>
                        <Text style={styles.body}>Fat</Text>     
                    </View>
                </View>
                </View>
                ): 
                <View>
                </View>}
        </View>
      
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : '88%',
        padding : 16, 
        margin : 32,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#ffffff',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
        flexDirection : 'row'
    },
    line : {
        flexDirection : "column",
        flex : 1,
        alignItems : 'center',
    },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      margin : 8,
      fontFamily : 'Poppins_600SemiBold'
  },
  body : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4,
      fontFamily : 'Poppins_400Regular'
  },
  
  });