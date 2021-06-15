import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView} from 'react-native'
import Icon from '../assets/nutrition.png'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Button from '../components/Button'



export default function Welcome() {

    const navigation = useNavigation();
    
    return(
    <View style={{flex : 1, backgroundColor : '#fff'}}>
        <ScrollView style={{backgroundColor : '#ffffff', flex : 1, flexDirection : 'column', height : '100%'}}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            
                <Text style={styles.text}>Your personal dietitian!</Text>

                <Text style={styles.body}>Get your meal plan, nutritional info and a grocery list from your nutritionist!</Text>
                
                <Image style={styles.image} source={Icon} alt="Icon"/>

                <View style={{flexDirection : 'column', flexGrow : 1, backgroundColor : '#fff'}} />
            
                {/* <Button type="primary" name="Sign Up" onPress={() => navigation.navigate('SignUp')} /> */}

            </KeyboardAvoidingView>

        </ScrollView>
        <Button type="primary" name="Log In" onPress={() => navigation.navigate('SignIn')} />

    </View>
        

    )
}

const styles = StyleSheet.create({
    image : {
        height : '100%',
        width : '100%',
        resizeMode : 'contain',
        alignSelf : 'center',
        marginVertical : 8
    },
    body : {
        fontSize : 19,
        color : '#3b3b3b',
        fontFamily : 'ExoRegular',
        marginRight : 32,
        marginLeft : 16,
        margin : 16
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'ExoBoldItalic',
        margin : 16,
    },
    heading : {
        color : '#3b3b3b',
        fontSize : 24,
        fontFamily : 'ExoBold',
        marginHorizontal : 16
    },
        })
