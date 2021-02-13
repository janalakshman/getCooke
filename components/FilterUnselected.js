import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Heading() {
    return(
          <View> 
            <TouchableOpacity  style={styles.button}>
                <Text style={styles.buttonText}>Breakfast</Text>
            </TouchableOpacity>
          </View> 
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#3b3b3b',
      fontSize : 14,
      fontWeight : '400',
      margin : 12,
    },
    button: {
        borderRadius : 32,
        borderWidth : 1,
        borderColor : '#cfcfcf',
        backgroundColor : '#fff',
        alignSelf : 'flex-start',
        margin : 16,
        flexDirection : 'row',
        justifyContent : 'center'
           },
  });