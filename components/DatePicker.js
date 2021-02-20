import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DatePicker(props) {
    return(
        <View style={styles.container}>
            
            <View style={styles.line} >  
                <Text style={styles.smallText}>Start date</Text>
                <TouchableOpacity  style={styles.button} onPress={props.onPressIn}>
                    <Text style={styles.buttonText}>15 Sep</Text>
                </TouchableOpacity>
                <Text style={styles.smallText}>Wednesday</Text>
            </View> 

            <Text style={styles.smallText} >to</Text>

            <View style={styles.line}>  
                <Text style={styles.smallText}>End date</Text>
                <TouchableOpacity  style={styles.button} onPress={props.onPressIn}>
                    <Text style={styles.buttonText}>17 Sep</Text>
                </TouchableOpacity>
                <Text style={styles.smallText}>Friday</Text>
          </View> 

        </View>
          
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#A13E00',
      fontSize : 19 ,
      fontWeight : '400',
      margin : 12,
    },
    smallText : {
        color : '#3b3b3b',
        fontSize : 14,
        fontWeight : '400',
    },
    button: {
        borderRadius : 8,
        borderColor : '#a13e00',
        borderWidth : 1,
        backgroundColor : '#fff5e6',
        alignContent : 'center',
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
    line : {
        flexDirection : 'column',
        alignItems : 'center',
        width : '40%',
        margin : '2%'
    },
    container : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        padding : '2%'
    }

  }); 