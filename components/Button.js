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
            ) : props.type === "delete" ? (
              <TouchableOpacity style={styles.button} onPress={props.onPress}>
                  <MaterialIcons name="delete" style={styles.delete} />
                  <Text style={styles.deleteText}>{props.name}</Text>
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
        color : '#3b3b3b',
        fontSize : 14,
        fontFamily : 'ExoMedium',
        margin : 4,
        textAlign : 'center',
        flexGrow : 1
    },
    profile: {
      borderRadius : 4,
      backgroundColor : '#fff',
      borderWidth : 1,
      borderColor : '#999999',
      alignSelf : 'center',
      flexDirection : 'row',
      padding : 2,
      flexGrow : 1
    },
    floatingText : {
      color : '#A13E00',
      fontSize : 19,
      fontFamily : 'ExoMedium',
      margin : 12,
      marginVertical : 12,
      textAlign : 'center'
    },
    floating : {
        borderRadius : 8,
        backgroundColor : '#fff',
        borderWidth : 1,
        borderColor : '#a13e00',
        margin : 8,
        flexDirection : 'row',
        alignItems : 'center',
        elevation : 5,
        shadowRadius : 5,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 8},
    }, 
    primaryText : {
      color : '#A13E00',
      fontSize : 19,
      fontFamily : 'ExoSemiBold',
      margin : 8,
      marginVertical : 12,
      flexGrow : 1,
      textAlign : 'center'
    },
    primary : {
      borderRadius : 4,
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
      fontFamily : 'ExoMedium',
      margin : 8,
      marginVertical : 12,
      flexGrow : 1,
      textAlign : 'center'
    },
    secondary : {
      borderRadius : 4,
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
      fontFamily : 'ExoMedium',
      margin : 8,
      marginHorizontal : 16
    },
    button: {
        alignSelf : 'flex-start',
        marginTop : 0,
        flexDirection : 'row',
        margin : 16,
      },
    icon : {
        fontSize : 14,
        color : '#a13e00',
        paddingTop : 10,
        paddingBottom : 10,
    },
  delete : {
      fontSize : 14,
      color : '#3b3b3b',
      paddingTop : 10,
      paddingBottom : 10,
  },
  deleteText : {
    color : '#3b3b3b',
    fontSize : 14,
    fontFamily : 'ExoRegular',
    margin : 8,
    marginHorizontal : 16
  },
  });