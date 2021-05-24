import React from 'react'
import {View, ActivityIndicator, Text, Image, StyleSheet} from 'react-native'
import { DotIndicator } from 'react-native-indicators'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>
            <View style={{flexGrow : 0.5}} />

            <View style={{flexDirection : 'column', justifyContent : 'center', marginHorizontal : 16}}>
                <Text style={styles.text}>Loading</Text>
                <DotIndicator size={14} count={4} color="#626262" />
            </View>

            <View style={{flexGrow : 1}} />

        </View>
    )
}

const styles = StyleSheet.create({
  image : {
      maxHeight : 275,
      maxWidth : 275,
      margin : 4,
      alignSelf : 'center'
  },
  container : {
    flex : 1,
    backgroundColor : '#fff',
  },
  text : {
      fontFamily : 'ExoBoldItalic',
      fontSize : 48,
      margin : 16,
      color : '#626262',
      textAlign : 'center'
  }
  });