import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function SecondaryButton(props) {
  
    return(
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>{props.name}</Text>
          </View>   
        </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
        color : '#A13E00',
        fontSize : 17,
        fontFamily : 'Poppins_400Regular',
        margin : 4,
        textAlign : 'center',
        width : '50%'
    },
    button: {
      borderRadius : 4,
      backgroundColor : '#fff',
      borderWidth : 1,
      borderColor : '#a13e00',
      alignSelf : 'center',
      flexDirection : 'row',
      },
  });