import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Title(props) {

    return(
      <View style={styles.container}>
            <Text style={styles.heading}>{props.name}</Text>
      </View>
        
    )
}
  
  const styles = StyleSheet.create({
    heading : {
      color : '#333',
      fontSize : 19,
      fontFamily : 'ExoMedium',
      margin : 16,
      marginBottom : 8
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
  });