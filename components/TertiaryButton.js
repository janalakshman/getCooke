import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function TertiaryButton(props) {
    return(
        <TouchableOpacity onPress={() => props.setModalVisible(true)}>
          <View style={styles.button}>
              <MaterialIcons name="add" style={styles.icon} />
              <Text style={styles.buttonText}>Filters</Text>
          </View>   
        </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#A13E00',
      fontSize : 17,
      fontWeight : '400',
      margin : 10,
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
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 10,
    }
  });