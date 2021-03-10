import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Heading(props) {

    return(
          <View> 
            <TouchableOpacity  style={styles.button}>
                <Text style={styles.buttonText}>{props.name}</Text>
            </TouchableOpacity>
          </View> 
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#3b3b3b',
      fontSize : 24,
      fontWeight : '500',
      margin : 24,
    },

    button: {
        borderRadius : 16,
        backgroundColor : '#ffc885',
        alignSelf : 'flex-end',
        margin : 8,
        flexDirection : 'row',
        justifyContent : 'center'
           },

    icon : {
        fontSize : 18,
        color : '#3b3b3b',
        padding : 12,
        paddingLeft : 0
    }
  });