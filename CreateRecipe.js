import React from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import SecondaryButton from './components/SecondaryButton'
import Title from './components/Title'
import Icon from './assets/LoadingIcon.png'




export default function CreateRecipe() {
    _handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync('http://getcooke.com/KitchenMaster');
      };

    return(
        <View style={styles.container}>
                       
         <Title name="Become a Kitchen Master" />

         <Image style={styles.image} source={Icon} alt="Icon"/>


            <View style={{margin : 16}}>

                    <Text style={styles.text}>
                        We can't wait to see your recipes! </Text>
                    
            <View style={{marginTop : 32}}>
                <Text style={styles.text2}>
                        Create your free food blog and start earning in mins!
                </Text>
            </View>

            </View>

            <View> 
                <TouchableOpacity  style={styles.button}           
                onPress={_handleOpenWithWebBrowser}
                    >
                    <Text style={styles.buttonText}>Click here</Text>
                </TouchableOpacity>
            </View> 

            <View style={{flexGrow : 1}}>
            </View>

    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#fff',
        justifyContent : 'center',
        alignContent : 'center',
        flex : 1
    },
    image : {
        height : 200,
        width : 200,
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    text2 : {
        fontSize : 17,
        color : '#3b3b3b',
        fontWeight : '400',
    },
    text : {
        fontSize : 19,
        color : '#3b3b3b',
        fontWeight : '400',
    },
    card : {
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fff',
        padding : 8,
        margin : 8,
        borderRadius : 8,
        borderWidth : 1,
        borderColor : '#fff'
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
          flexDirection : 'row'
},

})