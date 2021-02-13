import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Heading() {
    return(
          <View> 
            <TouchableOpacity  style={styles.button}>
                <Text style={styles.buttonText}>Filters</Text>
                <MaterialIcons name="close" style={styles.icon} />
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
        backgroundColor : '#ffc885',
        alignSelf : 'flex-start',
        margin : 16,
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