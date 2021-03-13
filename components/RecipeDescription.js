import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import DefaultProfilePic from '../assets/DefaultProfilePic.png'
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';


export default function RecipeDescription(props){
    const navigation = useNavigation();
    const recipe = props.recipe
 

    return(
        <ScrollView>

            <View style={styles.container}>
                <Image source={DefaultProfilePic}
                        style={styles.image}/>
                <View style={styles.line}>
                <Pressable onPress={() => navigation.navigate('KitchenMaster')}>
                    {recipe.user ? 
                    <Text style={styles.text}>{recipe.user.username}</Text>
                    : <Text style={styles.text}>Cooke</Text>
                    }
                    <Text style={styles.smalltext}>Kitchen Master @ 
                        {recipe.user ? ' ' +recipe.user.username : ' Cooke'}

                    </Text>
                </Pressable>   
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.smalltext}>
                {recipe.note}
                </Text>
            </View>

  

        </ScrollView>
        
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
        fontSize : 17,
        color : '#a13e00',
        fontWeight : '600',
        marginLeft : 16,
    },
    smalltext : {
      fontSize : 14,
      color : '#3b3b3b',
      marginLeft : 16,
      marginTop : 4
    },
    line : {
        flexDirection : "column",
        marginLeft : 8,
        justifyContent : 'center'
    },
 
    });