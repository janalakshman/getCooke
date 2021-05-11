import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function SecondaryButton(props) {
  
    return(
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.button}>
              <MaterialIcons name="image" size={24} color="#3b3b3b" />
              <Text style={styles.buttonText}>{props.name}</Text>
          </View>   
        </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
        color : '#3b3b3b',
        fontSize : 14,
        fontFamily : 'Poppins_400Regular',
        margin : 16,
        marginVertical : 12,
        flexGrow : 1,
        textAlign : 'center'
    },
    button: {
      borderRadius : 8,
      backgroundColor : '#fff',
      borderWidth : 1,
      borderColor : '#cfcfcf',
      borderStyle : 'dashed',
      alignSelf : 'center',
      margin : 8,
      flexDirection : 'row',
      padding : 16,
      alignItems : 'center',
      width : '100%'
      },

  });