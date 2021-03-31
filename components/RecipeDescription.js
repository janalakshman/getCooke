import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import DefaultProfilePic from '../assets/DefaultProfilePic.png'
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function RecipeDescription(props){
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    const navigation = useNavigation();
    const recipe = props.recipe
 

    return(
        <View>
            <View style={styles.container}>
                <Image source={DefaultProfilePic} style={styles.image}/>

                <View style={styles.line}>
                        {recipe.user ? 
                        <Text style={styles.text}>{recipe.user.username}</Text>
                        : <Text style={styles.text}>Cooke</Text>
                        }
                        <Text style={styles.body}>Kitchen Master @ Cook-e</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.smalltext}>
                    {recipe.note}
                </Text>
            </View>
        </View>      
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        margin : 16,
    },
    image : {
        height : 56,
        width : 56,
        resizeMode : 'contain',
    },
    text : {
        fontSize : 19,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        marginLeft : 16,
    },
    body : {
      fontSize : 14,
      color : '#3b3b3b',
      marginLeft : 16,
      fontFamily : 'Poppins_400Regular'
    },
    line : {
        flexDirection : "column",
        marginLeft : 8,
        justifyContent : 'center'
    },
 
    });