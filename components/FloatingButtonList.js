import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Heading() {
    return(
          <View style={styles.position}>  
            <TouchableOpacity  style={styles.button}>
                <FontAwesome name="shopping-cart" style={styles.icon} />
                <Text style={styles.buttonText}>Grocery List</Text>
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
        backgroundColor : '#ffc885',
        alignSelf : 'flex-start',
        margin : 16,
        flexDirection : 'row',
           },

    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingTop : 12,
        paddingBottom : 12,
        paddingLeft : 12,
    },

  }); 