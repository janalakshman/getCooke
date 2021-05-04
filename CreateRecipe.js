import React from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import LoadingScreen from './LoadingScreen'
import Icon from './assets/Chef.png'

export default function CreateRecipe({navigation}) {

    _handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync('http://getcooke.com/login');
      };

    return(
        <View style={{backgroundColor : '#ffffff', flex : 1}}>
                       
            <Text style={styles.text}>Upload recipes and get your free food blog!</Text>

            <Text style={styles.body}>Create a profile, upload your recipes and share it to the world!</Text>

            <Image style={styles.image} source={Icon} alt="Icon"/>

            <View style={{flexGrow : 1}}>
            </View>

            <TouchableOpacity  style={styles.button}  onPress={_handleOpenWithWebBrowser} >
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    image : {
        height : 280,
        width : 300,
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'SourceSansPro_400Regular',
        margin : 16
    },
    text : {
        fontSize : 19,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        marginTop : 32,
        marginHorizontal : 16
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 17,
        fontFamily : 'Poppins_600SemiBold',
        margin : 8,
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