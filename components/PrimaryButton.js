import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'


export default function PrimaryButton(props) {
  
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
      fontSize : 19,
      fontFamily : 'Poppins_500Medium',
      margin : 8,
      marginVertical : 12,
      flexGrow : 1,
      textAlign : 'center'
    },
    button: {
      borderRadius : 8,
      backgroundColor : '#ffc885',
      alignSelf : 'center',
      margin : 8,
      flexDirection : 'row',
      borderWidth : 1,
      borderColor : '#ffc885',
    },
  });