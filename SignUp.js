import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Logo from './assets/CookeLogo.png'
import { useSelector, useDispatch } from 'react-redux';
import { addUserID, addUserPassword } from './redux/counterSlice';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from './LoadingScreen'
import RadioButtonRN from 'radio-buttons-react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


const data = [
    {
      label: 'Male'
     },
     {
      label: 'Female'
     }
    ];


export default function SignUp() {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });

    const [userID, onChangeUserID] = useState('');
    const [password, onChangePassword] = useState('');
    const [gender, setGender ] = useState('Male');

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addUserID(userID))
        dispatch(addUserPassword(password))
        navigation.navigate('Home')
      }

    

    return(
        <View>
            {!fontsLoaded ? (<LoadingScreen />) :
            (
                <ScrollView style={styles.container}>

                            <Text style={styles.subtitle}>Hire a personal kitchen assistant!</Text>

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

                            <Text style={styles.text}>Password</Text>

                            <TextInput style={styles.textInput}
                                        placeholder = "Password"
                                        secureTextEntry={true}
                                        onChangeText={text => onChangePassword(text)}
                                        value={password}
                                        autoFocus={true}/>

                            <Text style={styles.text}>Gender</Text>
                            
                            <RadioButtonRN 
                                data={data}  
                                selectedBtn={(e) => setGender(e)}
                                textStyle={{fontFamily : 'Poppins_400Regular'}}
                                box = {false}
                                animationType={['pulse']}
                                 />

                                <TouchableOpacity  style={styles.button} onPress={() => handleClick()}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
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
        fontSize : 19,
        margin : 16,
        flexGrow : 1,
        textAlign : 'center',
        fontFamily : 'Poppins_600SemiBold'
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
        margin : 16,
        fontFamily : 'Poppins_500Medium'
    },
    textInput : {
        borderRadius : 20,
        borderTopLeftRadius : 0,
        backgroundColor :  '#f1f1f1',
        height : 56,
        width : '90%',
        alignSelf : 'flex-start',
        padding : 16,
        margin : 16,
        fontFamily : 'Poppins_500Medium'
    },
}

)