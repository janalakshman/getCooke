import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function PrimaryButton(props) {
    return(
          <View> 
            <TouchableOpacity  style={styles.button} onPressIn={props.onPressIn}>
                <MaterialIcons name="add" style={styles.icon} />
                <Text style={styles.buttonText}>{props.name}</Text>
            </TouchableOpacity>
          </View> 
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#A13E00',
      fontSize : 19,
      fontWeight : '500',
      margin : 16,
    },
    button: {
        borderRadius : 8,
        backgroundColor : '#fff5e6',
        borderWidth : 1,
        borderColor : '#a13e00',
        alignSelf : 'flex-start',
        margin : 16,
        flexDirection : 'row',
        alignSelf : 'center'
           },
        icon : {
            fontSize : 24,
            color : '#a13e00',
            paddingTop : 12,
            paddingBottom : 12,
            paddingLeft : 12,
            alignSelf : 'center'
        }
  });