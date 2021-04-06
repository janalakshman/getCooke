import React from 'react'
import {View, ActivityIndicator, Text, Image, StyleSheet} from 'react-native'
import CookeLogo from './assets/CookeLogo.png'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>
            <Image source={CookeLogo} alt="loading" style={styles.image}/>
            <ActivityIndicator size="small" color="#a13e00" />
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
    backgroundColor : '#fff'
  }
  });