import React from 'react'
import {View, ActivityIndicator, Text, Image, StyleSheet} from 'react-native'
import loading from '../assets/CookeLogo.png'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>

            <View style={{flexDirection : 'column', justifyContent : 'flex-start', marginHorizontal : 16}}>
                <Image source={loading} style={styles.image} />
                <View style={{flexGrow : 0.5}} />

                <ActivityIndicator size="large" color="#a13e00"/>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
  image : {
      maxHeight : 350,
      maxWidth : 350,
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