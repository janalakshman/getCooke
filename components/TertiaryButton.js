import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Heading() {
    return(
          <View> 
            <TouchableOpacity  style={styles.button}>
                <MaterialIcons name="add" style={styles.icon} />
                <Text style={styles.buttonText}>Filters</Text>
            </TouchableOpacity>
          </View> 
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#A13E00',
      fontSize : 17,
      fontWeight : '400',
      margin : 12,
    },

    button: {
        borderRadius : 8,
        borderColor : '#a13e00',
        borderWidth : 1,
        backgroundColor : '#fff5e6',
        alignSelf : 'flex-start',
        margin : 16,
        flexDirection : 'row'
           },

    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingTop : 12,
        paddingBottom : 12,
        paddingLeft : 12,
    }
  });