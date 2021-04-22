import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function TertiaryButton() {
  

  const handleReport = () => {
    Alert.alert(
        "Report recipe",
        "Are you sure you want to report this recipe because it has obscene/distrubing content?",
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
          { text: "Report", onPress: () => console.log("OK Pressed") }
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
      fontSize : 14,
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