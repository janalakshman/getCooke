import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function ProfileData(props){

    return(
                <View style={styles.card}>
                    <View style={styles.line}>
                        <Text style={styles.text}>{props.user.cooked ? props.user.cooked : 0}</Text>
                        <Text style={styles.body}>Cooked meals</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{props.user.total}</Text>
                        <Text style={styles.body}>Recipes</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>{props.user.events}</Text>
                        <Text style={styles.body}>Calendar Adds</Text>     
                    </View>
                </View>
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : '100%',
        borderRadius : 4,
        alignContent : 'center',
        justifyContent : 'space-around',
        backgroundColor : '#ffffff',
        flexDirection : 'row',
    },
    line : {
        flexDirection : "column",
        alignItems : 'center',
        justifyContent : 'center',
        borderTopLeftRadius : 0,
        borderRadius : 20,
        margin : 8,
        padding : 8,
    },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      margin : 8,
      fontFamily : 'ExoSemiBold',
  },
  body : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4,
      fontFamily : 'ExoRegular'
  },
  
  });