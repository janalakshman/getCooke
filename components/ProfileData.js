import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function ProfileData(props){

    return(
                <View style={styles.card}>
                    <View style={styles.line}>
                        <Text style={styles.text}>76 kg</Text>
                        <Text style={styles.body}>Second week</Text>     
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.text}>75 kg</Text>
                        <Text style={styles.body}>Fourth week</Text>     
                    </View>
                </View>
        
    )
}

const styles = StyleSheet.create({
    card : {
        width : '100%',
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
      fontSize : 19,
      color : '#333',
      margin : 8,
      fontFamily : 'ExoMedium',
  },
  body : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4,
      fontFamily : 'ExoRegular'
  },
  });