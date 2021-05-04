import React from 'react';
import { StyleSheet, TextInput , View, Image } from 'react-native';


export default function AddPrepStep() {

    return(
        <View style={styles.container}>
                <TextInput style={styles.text}/>
        </View>

            
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'SourceSansPro_400Regular',
      margin : 4
      },
    title : {
        color : '#3b3b3b',
        fontSize : 17,
        marginHorizontal : 16,
        marginVertical : 6,
        fontFamily : 'Poppins_600SemiBold',
    },
    container: {
        padding : 16, 
        margin : 16,
        backgroundColor : '#ffffff',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        borderColor : '#cfcfcf',
        borderWidth : 1
    },
  });