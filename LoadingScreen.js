import React from 'react'
import {View, ActivityIndicator, Text, Image} from 'react-native'
import LoadingScreenLogo from './assets/LoadingIcon.png'

export default function LoadingScreen(){
    return(
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#a13e00" />
            <Image src={LoadingScreenLogo} alt="loading" style={styles.image}/>
            <Text>Get ready to cook some amazing food!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  image : {
      maxHeight : 275,
      maxWidth : 90,
      height : '40%',
      width : '100%',
      margin : 4,
      alignSelf : 'center'
  },
  subtitle : {
      fontSize : 14,
      fontWeight : '500',
      color : '#fa9332',
      margin : 8
  },
  container : {
      height : '100vh',
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center'
  }
  });