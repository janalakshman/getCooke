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
            {/* <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={{backgroundColor : '#ffffff', flex : 1, flexDirection : 'column'}}
                                > */}

            <View style={{margin : 16}} />
            
            <Text style={styles.text}>Your personal kitchen assistant</Text>

            <Image style={styles.image} source={Icon} alt="Icon"/>
            
            <Text style={styles.body}>Find recipes, add them to an inbuilt calendar that automatically generates a grocery list</Text>

            <View style={{flexGrow : 1}}></View>
            
            <Button type="primary" name="Sign Up" onPress={() => navigation.navigate('SignUp')} />

            <Button type="secondary" name="Log In" onPress={() => navigation.navigate('SignIn')} />

            {/* </KeyboardAvoidingView> */}

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
        color : '#626262',
        fontFamily : 'ExoRegular',
        marginHorizontal : 32,
        textAlign : 'center'
    },
    text : {
        fontSize : 32,
        color : '#333',
        fontFamily : 'ExoSemiBold',
        margin : 32,
        marginVertical : 8,
        textAlign : 'center'
    },
    })
