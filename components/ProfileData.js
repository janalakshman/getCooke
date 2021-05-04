import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Header(){

    return(
                <View>
                <View style={styles.card}>
                    <View style={styles.line}>
                        <Text style={styles.text}>18</Text>
                        <Text style={styles.body}>Recipes</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>35</Text>
                        <Text style={styles.body}>Calendar Adds</Text>     
                    </View>
                </View>
                </View>
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : '88%',
        padding : 16, 
        margin : 16,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#ffffff',
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