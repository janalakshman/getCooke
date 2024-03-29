import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import LoadingScreen from '../LoadingScreen'


export default function Header(props){

    const recipe = props.recipe
    return(
        <View>
                {recipe ? (
                <View style={{backgroundColor : '#fff5e6'}}>
                <View style={styles.card}>
                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.calories}</Text>
                        <Text style={styles.body}>Cals</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.carbohydrate} g</Text>
                        <Text style={styles.body}>Carbs</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.proteins} g</Text>
                        <Text style={styles.body}>Protein</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{recipe.fat} g</Text>
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
        flexDirection : 'row',
        elevation : 3,
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
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
      fontFamily : 'Poppins_500Medium'
  },
  body : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4,
      fontFamily : 'SourceSansPro_400Regular'
  },
  
  });