import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function PrepStep(props) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

  let count = 0;
    return(
      <View style={{backgroundColor : 'fff5e6', margin : 32}}>
        {props.steps ? 
          <View>
              {props.steps.map(step => 
                <View style={styles.container}>
                  <Text style={styles.title}>{++count}</Text>

                  <View style={{margin : 16}}>
                    <Text style={styles.text}>{step.step}</Text>
                  </View>
                </View>
                )}
          </View>: <View style={{margin : 32, backgroundColor : '#fff5e6'}}></View>}
      </View>       
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'Poppins_400Regular'
      },
    title : {
        color : '#3b3b3b',
        fontSize : 24,
        margin : 16,
        fontFamily : 'Poppins_600SemiBold'
    },
    container: {
      flexDirection : 'row',
      margin : 16,
      marginBottom : 8,
      width : '90%'
    },
  });