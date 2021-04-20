import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { SourceSansPro_400Regular, SourceSansPro_600SemiBold } from '@expo-google-fonts/source-sans-pro';
import LoadingScreen from '../LoadingScreen'


export default function PrepStep(props) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, SourceSansPro_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

  let count = 0;
    return(
      <View>
        {props.steps ? 
          <View style={{backgroundColor : 'fff5e6', paddingBottom : 80}}>
              {props.steps.map(step => 
                <View key={step.id.toString()} style={styles.container}>
                  <Text style={styles.title}>{++count}</Text>

                  <View style={{paddingLeft : 8, paddingRight : 8}}>
                    <Text style={styles.text}>{step.step}</Text>
                  </View>

                </View>
                )}
          </View>: 
          <View style={{paddingBottom : 32}}>
          </View>}
      </View>       
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 19,
      fontFamily : 'SourceSansPro_400Regular',
      margin : 4
      },
    title : {
        color : '#3b3b3b',
        fontSize : 19,
        marginHorizontal : 16,
        marginVertical : 4,
        fontFamily : 'Poppins_600SemiBold',
    },
    container: {
        padding : 16, 
        margin : 16,
        backgroundColor : '#ffffff',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
  });