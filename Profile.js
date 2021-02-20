import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import UserCard from './components/UserCard'
import Title from './components/Title'
import DefaultProfilePic from './assets/DefaultProfilePic.png'

export default function Profile(){
    return(
        <View style={styles.container1}>
            <View style={styles.container}>
                <Image source={DefaultProfilePic}
                        style={styles.image}/>
                <View style={styles.line}>
                    <Text style={styles.text}>Jana Lakshman</Text>
                    <Text style={styles.smalltext}>Member since 12/12/2020</Text>
                </View>   
            </View>
            <UserCard />

            <Title name="Contact"/>
            <View style={styles.card}>
                <Text style={styles.text2}>
                    Compliments are nice, but 
                    criticisms are better! </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.text2}>Drop a message to jana@getcooke.com</Text>
            </View>

            <View style={{flexGrow : 1}}>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container1 : {
        backgroundColor : '#fff',
        flex : 1
    },
    text2 : {
        margin : 16,
        fontSize : 17
    },
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
    },
    card : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fff',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
    },
}

)