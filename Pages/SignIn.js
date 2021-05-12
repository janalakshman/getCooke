import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/counterSlice';
import LoadingScreen from '../components/LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import config from '../config';
import Button from '../components/Button';
import 'crypto-js/lib-typedarrays'; 
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'AP_SOUTH_1', 
        userPoolId: 'ap-south-1_2OlV2qKvl', 
        userPoolWebClientId: '7bccd9sdo9t2qmfh0idoobej3j'
    }
});


const data = [
    {
      label: 'Male'
     },
     {
      label: 'Female'
     }
    ];


export default function SignIn(props) {
    const [userID, onChangeUserID] = useState('');
    const [password, onChangePassword] = useState('');
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.counter.token);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    if(user) {
        navigation.navigate('Home')
    }

    async function LogIn() {
        try {
        const user = await Auth.signIn('sivaprakashniet2@gmail.com', 'Admin@1234');
        console.log(user)
          localStorage.setItem("access_token", user);
          authDispatch({ type: "SIGNIN_SUCCESS" });
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    const handleClick = () => {
        setLoading(true)
        fetch(config.api + `/v1/auth`,
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email:userID, password:password}),
        })
          .then((res) => {
            setLoading(false)
            return Promise.all([res.status, res.json()]);        
            })
          .then(([status, result])=> {
              if(status === 200) {
                dispatch(setToken(result))
                return navigation.navigate('Home')
              } else {
                Alert.alert( "Incorrect credentials", "Username or password is incorrect", 
                                {text : "OK", onPress : () => console.log("")} )
              }
              
          })
          .catch((err) => {
                Alert.alert( "Incorrect credentials", "Username or password is incorrect", {text : "OK"} )
          })
      }    

    return(
        <View style={{flex : 1, backgroundColor : '#fff'}}>
            {loading ? (<LoadingScreen />) :
            (
                <ScrollView style={styles.container}>


                            <KeyboardAvoidingView
                                //behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.container}
                                >
                            
                            <Text style={styles.text}>Your mail</Text>

                            <TextInput style={styles.textInput}
                                        placeholder = "Your mail"
                                        onChangeText={text => onChangeUserID(text)}
                                        value={userID}
                                        autoFocus={true}/>

                            <Text style={styles.text}>Password</Text>

                            <TextInput style={styles.textInput}
                                        placeholder = "Password"
                                        secureTextEntry={true}
                                        onChangeText={text => onChangePassword(text)}
                                        value={password}/>

                            <View style={{margin : 16}}></View>
                            
                            <Button type="primary" name="Log In" onPress={() => LogIn()}/>

                            </KeyboardAvoidingView>
                        </ScrollView>
            )}
        </View>
       
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fff',
        flexGrow : 1
    },
    subtitle : {
        fontFamily : 'Poppins_600SemiBold',
        textAlign : 'center',
        color : '#3b3b3b',
        fontSize : 24,
        margin : 24
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 17,
        margin : 16,
        marginVertical : 8,
        flexGrow : 1,
        textAlign : 'center',
        fontFamily : 'Poppins_600SemiBold'
    },
    button: {
        borderRadius : 8,
        backgroundColor : '#ffc885',
        alignSelf : 'flex-start',
        margin : 12,
        flexDirection : 'row',
        alignSelf : 'center'
            },
    text : {
        fontSize : 19,
        color : '#3b3b3b',
        margin : 16,
        fontFamily : 'Poppins_500Medium'
    },
    textInput : {
        borderRadius : 20,
        borderTopLeftRadius : 0,
        backgroundColor :  '#f1f1f1',
        height : 64,
        width : '90%',
        alignSelf : 'flex-start',
        padding : 16,
        margin : 16,
        fontFamily : 'SourceSansPro_400Regular',
        fontSize : 17
    },
}

)