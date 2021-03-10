import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Logo from './assets/Logo.png'
import { useSelector, useDispatch } from 'react-redux';
import { addUserID, addUserPassword } from './redux/counterSlice';



export default function SignUp() {
    const [userID, onChangeUserID] = useState('');
    const [password, onChangePassword] = useState('');

    const dispatch = useDispatch();

    const handleClick = () => {
        setTimeout(handleModal, 2000)
        dispatch(addUserID(userID))
        dispatch(addUserPassword(password))
      }

    

    return(
        <ScrollView style={styles.container1}>
                <View style={styles.logo}>
                    <Image source={Logo}
                            style={   {height : 150,
                                width : 150, marginVertical : 16}}/>

                    <Text style={styles.text2}>Sign up to start using all our features!</Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                    >
                <Text style={styles.text}>Your mail</Text>

                <TextInput style={styles.textInput}
                            placeholder = "Your mail"
                            onChangeText={text => onChangeUserID(text)}
                            value={userID}
                            autoFocus={true}/>

                <Text style={styles.text} >Password</Text>

                <TextInput style={styles.textInput}
                            placeholder = "Password"
                            secureTextEntry={true}
                            onChangeText={text => onChangePassword(text)}
                            value={password}
                            autoFocus={true}/>

                    <TouchableOpacity  style={styles.button} onPress={() => handleClick()}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

               
            


            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container1 : {
        backgroundColor : '#fff',
        flexGrow : 1,
        height : '100%'
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
             text : {
                fontSize : 19,
                color : '#3b3b3b',
                fontWeight : '500',
                margin : 16,
            },
            textInput : {
                width : '80%',
                backgroundColor : "#f7f7f7",
                borderRadius : 10,
                borderWidth : 2,
                borderColor : '#cfcfcf',
                height : 48,
                alignSelf : 'center',
                paddingLeft : 16,
                margin : 16
            },
}

)