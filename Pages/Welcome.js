import React from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import Icon from '../assets/Assistant.png'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Button from '../components/Button'



export default function Welcome() {

    const user = useSelector(state => state.counter.token);
    const navigation = useNavigation();

    if(user) {
        navigation.navigate('Home')
    }
    
    return(

        <View style={{backgroundColor : '#ffffff', flex : 1, flexDirection : 'column'}}>

            <View style={{flexGrow : 1}}></View>
            
            <Text style={styles.text}>Your personal kitchen assistant.</Text>
            
            <Text style={styles.body}>Find recipes, add them to an inbuilt calendar that automatically generates a grocery list</Text>

            <View style={{flexGrow : 1}}></View>
            
            <Image style={styles.image} source={Icon} alt="Icon"/>

            <View style={{flexGrow : 1}}></View>

            <Button type="primary" name="Sign Up" onPress={() => navigation.navigate('SignUp')} />

            <Button type="secondary" name="Log In" onPress={() => navigation.navigate('SignIn')} />

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
        fontFamily : 'ExoRegular',
        marginHorizontal : 16,
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
