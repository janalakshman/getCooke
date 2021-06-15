import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function SecondaryButton(props) {
  
    return(
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.button}>
              <MaterialIcons name="image" size={24} color="#3b3b3b" style={{paddingHorizontal : 16}}/>
              <Text style={styles.buttonText}>{props.name}</Text>
          </View>   
        </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
        color : '#3b3b3b',
        fontSize : 16,
        fontFamily : 'ExoRegular',
        margin : 16,
        marginVertical : 12,
        flexGrow : 1,
        textAlign : 'center'
    },
    button: {
      backgroundColor : '#f1f1f1',
      borderWidth : 1,
      borderColor : '#cfcfcf',
      borderStyle : 'dashed',
      margin : 8,
      flexDirection : 'row',
      paddingHorizontal : 16,
      paddingVertical : 120,
      alignItems : 'center',
      width : '100%',
      justifyContent : 'center',
      borderRadius : 8
      },

  });