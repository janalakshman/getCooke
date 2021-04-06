import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import DefaultProfilePic from '../assets/DefaultProfilePic.png'
import maleAvatar from '../assets/maleAvatar.png'
import femaleAvatar from '../assets/femaleAvatar.png'
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function RecipeDescription(props){
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
    
    const navigation = useNavigation();
    const recipe = props.recipe
    

    return(
        <View>
            {!fontsLoaded ? (<LoadingScreen/>) :
            (
                <View>
                    <View style={styles.container}>
                            {recipe.user.profile.gender === 1 ? 
                            <Image source={femaleAvatar} style={styles.image}/>  
                            :
                            <Image source={maleAvatar} style={styles.image}/>   }
                                      

                        <View style={styles.line}>
                                {recipe.user.first_name ? 
                                <Text style={styles.title}>{recipe.user.first_name}</Text>
                                : <Text style={styles.title}>{recipe.user.username}</Text>
                                }
                                <Text style={styles.body}>Kitchen Master @ Cook-e</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.text}>
                            {recipe.notes}
                        </Text>
                    </View>
                </View>
            )}
        </View>
              
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        margin : 16,
    },
    image : {
        height : 72,
        width : 72,
        resizeMode : 'contain',
    },
    text : {
        fontSize : 17,
        color : '#3b3b3b',
        marginLeft : 16,
        fontFamily : 'Poppins_400Regular'
    },
    title : {
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