import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import DefaultProfilePic from '../assets/DefaultProfilePic.png'
import Title from './Title'

export default function RecipeDescription(){
    return(
        <ScrollView>

            <View style={styles.container}>
                <Image source={DefaultProfilePic}
                        style={styles.image}/>
                <View style={styles.line}>
                    <Text style={styles.text}>Jana Lakshman</Text>
                    <Text style={styles.smalltext}>Kitchen Master @ Cooke</Text>
                </View>   
            </View>

            <View style={styles.container}>
                <Text style={styles.smalltext}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus sed commodo nisl, nec imperdiet mauris.
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
        color : '#3b3b3b',
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
        marginLeft : 16,
        justifyContent : 'center'
    }
    });