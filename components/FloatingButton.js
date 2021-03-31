import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'
import { MaterialIcons } from '@expo/vector-icons';

export default function FloatingButton(props) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

    return(
            <TouchableOpacity  style={styles.button} onPress={() => props.setModalVisible(true)}>
                <MaterialIcons name="add" style={styles.icon} />
                <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#A13E00',
      fontSize : 17,
      fontFamily : 'Poppins_500Medium',
      margin : 12,
    },
    button: {
        borderRadius : 8,
        backgroundColor : '#ffc885',
        margin : 16,
        flexDirection : 'row',
        },
    icon : {
        fontSize : 20,
        color : '#a13e00',
        padding : 12,
        paddingRight : 0
    },
  }); 