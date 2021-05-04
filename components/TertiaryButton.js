import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'


export default function TertiaryButton(props) {
  
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
      fontFamily : 'Poppins_500Medium',
      margin : 8,
      marginHorizontal : 16
    },
    button: {
        alignSelf : 'center',
        margin : 16,
        backgroundColor : '#ffc885',
        borderRadius : 8
      },
    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 10,
    }
  });