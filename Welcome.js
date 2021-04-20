import React from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';
import LoadingScreen from './LoadingScreen'
import Icon from './assets/Assistant.png'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';


export default function Welcome() {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular, SourceSansPro_400Regular
      });
    
    const user = useSelector(state => state.counter.token);
    const navigation = useNavigation();

    if(user) {
        navigation.navigate('Home')
    }
    return(
        <ScrollView style={{backgroundColor : '#ffffff', flex : 1}}>
            {!fontsLoaded ? (<LoadingScreen />) : (
            <View >

            <Text style={styles.text}>Hire a personal kitchen assistant</Text>

            <Text style={styles.body}>Search for recipes, add them to an inbuilt calendar that automatically generates a grocery list</Text>

            <Image style={styles.image} source={Icon} alt="Icon"/>

            <TouchableOpacity  style={styles.button}  onPress={() => navigation.navigate('SignUp')} >
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.secondarybutton}  onPress={() => navigation.navigate('SignIn')} >
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>

        </View>
        )}
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    image : {
        height : 270,
        width : 300,
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'SourceSansPro_400Regular',
        margin : 4,
        marginHorizontal : 16
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        marginTop : 16,
        marginHorizontal : 16
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 17,
        fontFamily : 'Poppins_600SemiBold',
        margin : 8,
        marginHorizontal : 16,
        flexGrow : 1,
        textAlign : 'center'
      },
      button: {
          borderRadius : 8,
          backgroundColor : '#ffc885',
          alignSelf : 'flex-start',
          margin : 16,
          flexDirection : 'row'
},
        secondarybutton: {
            borderRadius : 8,
            backgroundColor : '#fff',
            borderWidth : 1,
            borderColor : '#a13e00',
            alignSelf : 'flex-start',
            margin : 16,
            flexDirection : 'row'
        },

        })
