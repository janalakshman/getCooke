import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default function Tags(props) {
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
      color : '#a13e00',
      fontSize : 14,
      fontWeight : '500',
      margin : 12,
    },
    button: {
        borderRadius : 5,
        borderWidth : 1,
        borderColor : '#a13e00',
        backgroundColor : '#fff',
        alignSelf : 'flex-start',
        margin : 16,
        flexDirection : 'row',
        justifyContent : 'center'
        },
  });