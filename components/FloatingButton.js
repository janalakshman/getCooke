import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function FloatingButton(props) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

    return(
          <View>  
            <TouchableOpacity  style={styles.button} onPress={props.onPressIn}>
                <FontAwesome name="calendar-plus-o" style={styles.icon} />
                <Text style={styles.buttonText}>Calendar</Text>
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