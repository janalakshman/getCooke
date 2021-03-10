import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import Logo from './assets/Logo.png'

export default function SignUp() {
    return(
        <View style={styles.container1}>
                <View style={styles.logo}>
                    <Image source={Logo}
                            style={   {height : 150,
                                width : 150, marginVertical : 16}}/>
                    <Text style={styles.text2}>We're psyched you decided to give us a chance.</Text>

                    <Text style={styles.text2}>Sign up to start using all our features!!</Text>

                    <TouchableOpacity  style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ flexGrow : 1}}></View>
                </View>
            </View> 
    )
}

const styles = StyleSheet.create({
    container1 : {
        backgroundColor : '#fff',
        flexGrow : 1
    },
    text2 : {
        margin : 16,
        fontSize : 17,
        textAlign : 'center'
    },
    logo : {
     
        alignSelf : 'center',
        justifyContent : 'center',
        alignItems : 'center',
        alignContent : 'center'
    },
    image : {
        height : 56,
        width : 56,
        resizeMode : 'contain',
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 19,
        fontWeight : '500',
        margin : 16,
        flexGrow : 1,
        textAlign : 'center'
      },
      button: {
          borderRadius : 8,
          backgroundColor : '#ffc885',
          alignSelf : 'flex-start',
          margin : 16,
          flexDirection : 'row',
          alignSelf : 'center'
             },
}

)