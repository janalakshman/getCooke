import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Button(props) {

    return(
      <View>
          {props.type === "report" ? 
            (<TouchableOpacity style={styles.button} onPress={props.onPress} >
                  <MaterialIcons name="report-problem" style={styles.icon} />
                  <Text style={styles.buttonText}>Report recipe</Text>
            </TouchableOpacity>) 
            : props.type === "tertiary" ? (
              <TouchableOpacity style={styles.button} onPress={props.onPress}>
                  <MaterialIcons name="add" style={styles.icon} />
                  <Text style={styles.buttonText}>{props.name}</Text>
            </TouchableOpacity>
            )
            : 
          (<TouchableOpacity  style={props.type === 'primary' ? styles.primary : 
                                      props.type === 'secondary' ? styles. secondary :
                                      props.type === 'profile' ? styles.profile : styles.floating} onPress={props.onPress}>
              <Text style={props.type === 'primary' ? styles.primaryText : 
                          props.type === 'secondary' ? styles.secondaryText : 
                          props.type === 'profile' ? styles.profileText : styles.floatingText}>{props.name}</Text>
            </TouchableOpacity>) }
      </View>
      
        
    );
}
  
  const styles = StyleSheet.create({
    profileText : {
        color : '#A13E00',
        fontSize : 17,
        fontFamily : 'Poppins_400Regular',
        margin : 4,
        textAlign : 'center',
        width : '50%'
    },
    profile: {
      borderRadius : 4,
      backgroundColor : '#fff',
      borderWidth : 1,
      borderColor : '#a13e00',
      alignSelf : 'center',
      flexDirection : 'row',
    },
    floatingText : {
      color : '#A13E00',
      fontSize : 17,
      fontFamily : 'Poppins_500Medium',
      margin : 8,
      marginVertical : 12,
      textAlign : 'center'
    },
    floating : {
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
    primaryText : {
      color : '#A13E00',
      fontSize : 19,
      fontFamily : 'Poppins_500Medium',
      margin : 8,
      marginVertical : 12,
      flexGrow : 1,
      textAlign : 'center'
    },
    primary : {
      borderRadius : 8,
      backgroundColor : '#ffc885',
      alignSelf : 'center',
      margin : 8,
      flexDirection : 'row',
      borderWidth : 1,
      borderColor : '#ffc885',
    },
    secondaryText : {
      color : '#A13E00',
      fontSize : 19,
      fontFamily : 'Poppins_500Medium',
      margin : 8,
      marginVertical : 12,
      flexGrow : 1,
      textAlign : 'center'
    },
    secondary : {
      borderRadius : 8,
      backgroundColor : '#fff',
      borderWidth : 1,
      borderColor : '#a13e00',
      alignSelf : 'center',
      margin : 8,
      flexDirection : 'row',
      },
    buttonText : {
      color : '#A13E00',
      fontSize : 14,
      fontFamily : 'Poppins_400Regular',
      margin : 8,
      marginHorizontal : 16
    },
    button: {
        alignSelf : 'flex-start',
        marginRight : 16,
        marginTop : 0,
        flexDirection : 'row',
        margin : 16,
        marginHorizontal : 16
      },
    icon : {
        fontSize : 14,
        color : '#a13e00',
        paddingTop : 10,
        paddingBottom : 10,
        paddingLeft : 10,
    }
  });