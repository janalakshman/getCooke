import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'
import { useLinkProps } from '@react-navigation/native';

export default function TertiaryButton() {
  
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

  const handleReport = () => {
    Alert.alert(
        "Report recipe",
        "Recipe has been reported due to the presence of obscene content. It will be reviewed shortly. Thank you!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
  }
    return(
        <TouchableOpacity style={styles.button} onPress={handleReport} >
              <MaterialIcons name="report-problem" style={styles.icon} />
              <Text style={styles.buttonText}>Report recipe</Text>
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
        margin : 16,
        flexDirection : 'row',
        alignItems : 'center',
      },
    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 10,
    }
  });