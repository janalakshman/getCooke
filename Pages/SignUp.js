import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../redux/counterSlice';
import LoadingScreen from '../components/LoadingScreen'
import { useNavigation } from '@react-navigation/native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import config from '../config';
import Button from '../components/Button';
import Amplify, { Auth } from 'aws-amplify';
Amplify.configure({
    Auth: {
        region: 'AP_SOUTH_1', 
        userPoolId: 'ap-south-1_2OlV2qKvl', 
        userPoolWebClientId: '7bccd9sdo9t2qmfh0idoobej3j',
    }
});
 var radio_props = [
  {label: 'Male', value: 0 },
  {label: 'Female', value: 1 },
  {label : "Don't want to say", value: 2 }
];


export default function SignUp() {
    const [userID, onChangeUserID] = useState('');
    const [password, onChangePassword] = useState('');
    const [radioGender, setRadioGender ] = useState(0);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.counter.token);

    if(user) {
        navigation.navigate('Home')
    }

async function signup() {
    try {
        const { user } = await Auth.signUp({
            username:userID,
            password:password,
            attributes: {
                name: 'Prakash',
                locale:'en',
                email:userID,
                gender: 'male',

                phone_number: '+14325551212'
            }
        });
        console.log(user)
      //dispatch(setItem(user))
      authDispatch({ type: "SIGNIN_SUCCESS" });
    } catch (error) {
        console.log('error signing up:', error);
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
                Alert.alert( "Incorrect credentials", "Username or password is incorrect", {text : "OK"} )
              }
              
          })
        .catch((err) => {
            Alert.alert( "Incorrect credentials", "Username or password is incorrect", {text : "OK"} )
        })
      }
    return(
        <View style={{flex : 1}}> 
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

                            <Text style={styles.text}>Gender</Text>
                                <View style={{marginHorizontal : 32, margin : 16}}>
                                    <RadioForm
                                    radio_props={radio_props}
                                    initial={radioGender}
                                    animation={true}
                                    onPress={(value) => {setRadioGender(value)}}
                                    labelStyle={{fontFamily : 'ExoRegular', color : '#3b3b3b'}}
                                    />
                                </View>

                                
                            <Button type="primary" name="Sign Up" onPress={() => handleClick()} />

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
        fontFamily : 'ExoSemiBold',
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
        fontFamily : 'ExoSemiBold'
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
        fontSize : 17,
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
        fontFamily : 'ExoRegular',
        fontSize : 17
    },
}

)