import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import DefaultPrepStep from '../assets/DefaultPrepStep.png'

export default function Title(props) {
  let count = 0;
    return(
      <View>
        {props.steps ? 
          <View>
              {props.steps.map(step => 
                <View style={styles.container}>
                  <Text style={styles.title}>{++count}</Text>
                  <View style={styles.line}>
                    <Text style={styles.text}>{step.step}</Text>
                    <Image source={DefaultPrepStep} style={styles.image}/>
                  </View>
                </View>
                )}
          </View>: <View></View>}
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