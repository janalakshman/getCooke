import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native'
import Icon from '../assets/Assistant.png'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Button from '../components/Button'



export default function Welcome() {

    const navigation = useNavigation();
    
    return(

        <View style={{backgroundColor : '#ffffff', flex : 1, flexDirection : 'column'}}>
            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.container}
                                >

            <View style={{flexGrow : 1}}></View>
            
            <Text style={styles.text}>Your personal kitchen assistant.</Text>
            
            <Text style={styles.body}>Find recipes, add them to an inbuilt calendar that automatically generates a grocery list</Text>

            <View style={{flexGrow : 1}}></View>
            
            <Image style={styles.image} source={Icon} alt="Icon"/>

            <View style={{flexGrow : 1}}></View>

            <Button type="primary" name="Sign Up" onPress={() => navigation.navigate('SignUp')} />

            <Button type="secondary" name="Log In" onPress={() => navigation.navigate('SignIn')} />

            <View style={{flexGrow : 1}}></View>

            </KeyboardAvoidingView>

        </View>

    )
}

const styles = StyleSheet.create({
    image : {
        height : '45%',
        width : '100%',
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'ExoLightItalic',
        marginRight : 32,
        marginLeft : 16
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'ExoSemiBold',
        margin : 16,
    },
    heading : {
        color : '#3b3b3b',
        fontSize : 24,
        fontFamily : 'ExoBold',
        marginHorizontal : 16
    },
        })
