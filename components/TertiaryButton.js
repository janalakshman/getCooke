import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function TertiaryButton(props) {
  
    return(
        <TouchableOpacity onPress={props.onPress}>
          <View style={styles.button}>
              <MaterialIcons name="add" style={styles.icon} />
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
      margin : 8,
      marginHorizontal : 16
    },
    button: {
        alignSelf : 'flex-start',
        marginRight : 16,
        marginTop : 0,
        flexDirection : 'row',
        margin : 16,
        marginHorizontal : 32
      },
    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 10,
    }
  });