import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function TertiaryButton(props) {
  
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  
  }
    return(
        <TouchableOpacity onPress={props.function}>
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
      margin : 8,
      marginHorizontal : 16
    },
    button: {
        alignSelf : 'flex-end',
        marginRight : 16,
        marginTop : 0
      },
    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 10,
    }
  });