import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import DefaultPrepStep from '../assets/DefaultPrepStep.png'

export default function Title() {
    return(
      <View style={styles.container}>
          <Text style={styles.title}>1</Text>
          <View style={styles.line}>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </Text>
            <Image source={DefaultPrepStep} 
                    style={styles.image}/>
          </View>
            
      </View>
        
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 17,
      fontWeight : '400'
    },
    title : {
        color : '#3b3b3b',
        fontSize : 24,
        fontWeight : '600', 
        margin : 16
    },
    container: {
      flexDirection : 'row',
      margin : 16,
      marginBottom : 8,
      width : '90%'
    },
    line : {
        margin : 16
    },
    image : {
        width : '100%',
        resizeMode : 'contain'
    }
  });