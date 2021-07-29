import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import maleAvatar from '../assets/maleAvatar.png'
import femaleAvatar from '../assets/femaleAvatar.png'
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

import LoadingScreen from './LoadingScreen'

export default function RecipeDescription(props){

    const navigation = useNavigation();
    const recipe = props.recipe
    

    return(
       
                <View>
                    <View style={styles.container}>
                            {recipe.user.profile.gender === 0 ? 
                            <Image source={femaleAvatar} style={styles.image}/>  
                            :
                            <Image source={maleAvatar} style={styles.image}/>   }
                                      

                        <View style={styles.line}>
                                {recipe.user.first_name ? 
                                <Text style={styles.title}>{recipe.user.first_name}</Text>
                                : <Text style={styles.title}>{recipe.user.username}</Text>
                                }
                                <Text style={styles.body}>Community member</Text>
                        </View>
                    </View>
                
                {recipe.notes ? 
                <View style={styles.container}>
                        <Text style={styles.text}>
                            {recipe.notes}
                        </Text>
                    </View>
              : <View></View>}
                    
            </View>      
    )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        margin : 16,
        marginTop : 8
    },
    image : {
        height : 72,
        width : 72,
        resizeMode : 'contain',
    },
    text : {
        fontSize : 14,
        color : '#3b3b3b',
        marginLeft : 16,
        fontFamily : 'ExoRegular'
    },
    title : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'ExoSemiBold',
        marginLeft : 16,
    },
    body : {
      fontSize : 14,
      color : '#626262',
      marginLeft : 16,
      fontFamily : 'ExoRegular'
    },
    line : {
        flexDirection : "column",
        marginLeft : 8,
        justifyContent : 'center'
    },
 
    });