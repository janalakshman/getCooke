import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LoadingScreen from '../LoadingScreen'
import { MaterialIcons } from '@expo/vector-icons';

export default function FloatingButton(props) {
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
      fontFamily : 'Poppins_600SemiBold',
      margin : 8,
    },
    button: {
        borderRadius : 8,
        backgroundColor : '#ffc885',
        margin : 16,
        flexDirection : 'row',
        alignItems : 'center',
        elevation : 3,
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
        },
    icon : {
        fontSize : 20,
        color : '#a13e00',
        paddingLeft : 8
    },
  }); 