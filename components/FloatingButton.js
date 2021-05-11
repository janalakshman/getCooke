import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LoadingScreen from '../LoadingScreen'
import { MaterialIcons } from '@expo/vector-icons';

export default function FloatingButton(props) {
    return(
            <TouchableOpacity  style={styles.button} onPress={() => props.setModalVisible(true)}>
                <Text style={styles.buttonText}>Add to Calendar</Text>
            </TouchableOpacity>
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#A13E00',
      fontSize : 17,
      fontFamily : 'Poppins_500Medium',
      margin : 8,
      marginVertical : 12,
      textAlign : 'center'
    },
    button: {
        borderRadius : 8,
        backgroundColor : '#ffc885',
        margin : 8,
        flexDirection : 'row',
        alignItems : 'center',
        elevation : 3,
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
        },
  }); 