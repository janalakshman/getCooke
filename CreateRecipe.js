import React from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from './LoadingScreen'
import Icon from './assets/Chef.png'

export default function CreateRecipe({navigation}) {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    _handleOpenWithWebBrowser = () => {
        WebBrowser.openBrowserAsync('http://getcooke.com/login');
      };

    return(
        <View style={{backgroundColor : '#ffffff'}}>
                       
            <Text style={styles.text}>Upload recipes and start earning in minutes</Text>

            <Text style={styles.body}>Create a profile, upload your recipes and earn whenever someone cooks your recipe</Text>

            <Image style={styles.image} source={Icon} alt="Icon"/>

            <View style={{flexGrow : 1}}>
            </View>

            <TouchableOpacity  style={styles.button}  onPress={_handleOpenWithWebBrowser} >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    image : {
        height : 300,
        width : 300,
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'Poppins_400Regular',
        margin : 16
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        marginTop : 32,
        marginHorizontal : 16
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 19,
        fontFamily : 'Poppins_500Medium',
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