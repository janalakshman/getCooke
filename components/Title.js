import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts,  Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'


export default function Title(props) {
    let [fontsLoaded] = useFonts({
      Poppins_600SemiBold
    });

    if (!fontsLoaded) {
      return (<LoadingScreen />);
    }

    return(
      <View style={styles.container}>
          <View style={styles.border}> 
            <Text style={styles.heading}>{props.name}</Text>
          </View>
      </View>
        
    )
}
  
  const styles = StyleSheet.create({
    heading : {
      color : '#3b3b3b',
      fontSize : 19,
      fontFamily : 'Poppins_600SemiBold',
    },
    border : {
        borderBottomColor : '#ffcd4c',
        borderBottomWidth : 8,
        borderRadius : 8,
        margin : 16
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });