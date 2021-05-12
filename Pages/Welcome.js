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

        <View style={{backgroundColor : '#ffffff', flex : 1}}>

            <Text style={styles.text}>Hire a personal kitchen assistant</Text>

            <Text style={styles.body}>Find recipes, add them to an inbuilt calendar that automatically generates a grocery list</Text>

            <Image style={styles.image} source={Icon} alt="Icon"/>
           
            <Button type="primary" name="Sign Up" onPress={() => navigation.navigate('SignUp')} />

            <Button type="secondary" name="Log In" onPress={() => navigation.navigate('SignIn')} />

        </View>



    )
}

const styles = StyleSheet.create({
    image : {
        height : '48%',
        width : '80%',
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'SourceSansPro_400Regular',
        margin : 4,
        marginHorizontal : 16,
        width : '75%'
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        marginTop : 16,
        marginHorizontal : 16,
        width : '90%'
    },
        })
