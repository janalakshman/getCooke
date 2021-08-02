import React from 'react'
import { ScrollView } from 'react-native'
import {View, Text, Image, StyleSheet} from 'react-native'
import error from '../assets/error.png'
import { useNavigation } from '@react-navigation/native';
import Button from './Button'
import { useSelector, useDispatch } from 'react-redux';
import { deleteToken } from '../redux/counterSlice';


export default function Error(){
    const user = useSelector(state => state.counter.token)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleError = () => {
        dispatch(deleteToken())
        navigation.navigate('Welcome')
    }

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.text}>Something went wrong!</Text>
                <Text style={styles.body}>Please login again. If the issue persists, drop a mail @ jana@getcooke.com!</Text>
                <Image style={styles.image} source={error} alt="Icon"/>
                <Button type="primary" name="Sign In" onPress={handleError} />
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