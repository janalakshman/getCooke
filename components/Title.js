import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Title(props) {
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
      fontSize : 24,
      fontWeight : '600'
    },
    border : {
        borderBottomColor : '#ffcd4c',
        borderBottomWidth : 6
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin : 16,
      marginBottom : 8
    },
  });