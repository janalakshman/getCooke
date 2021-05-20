import React from 'react'
import { ScrollView } from 'react-native'
import {View, Text, Image, StyleSheet} from 'react-native'
import error from '../assets/error.png'
import { useNavigation } from '@react-navigation/native';
import Button from './Button'


export default function Error(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>Page not found!</Text>
                <Text style={styles.body}>Please refresh and try again. If the issue persists, drop a mail @ jana@getcooke.com!</Text>
                <Image style={styles.image} source={error} alt="Icon"/>
                <Button type="primary" name="Sign Up again" onPress={() => navigation.navigate("Welcome")} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#fff',
    flex : 1
  },
  image : {
    height : 350,
    width : 350,
    resizeMode : 'contain',
    alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'ExoRegular',
        margin : 16,
        marginRight : 32
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'ExoSemiBold',
        marginTop : 32,
        marginHorizontal : 16
    }
  });