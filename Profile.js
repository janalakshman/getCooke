import React from 'react'
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native'
import UserCard from './components/UserCard'
import Title from './components/Title'
import DefaultProfilePic from './assets/DefaultProfilePic.png'
import RecipeDescription from './components/RecipeDescription'
import { FlatList } from 'react-native-gesture-handler'


const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d58',
      title: 'Third Item',
    },
  ];

export default function Profile(){
    const renderItem = ({ item }) => (
        <RecipeDescription  />
      );

    return(
        <ScrollView style={styles.container1}>
            <View style={styles.container}>
                <Image source={DefaultProfilePic}
                        style={styles.image}/>
                <View style={styles.line}>
                    <Text style={styles.text}>Jana Lakshman</Text>
                    <Text style={styles.smalltext}>Member since 12/12/2020</Text>
                </View>   
            </View>
            <UserCard />

            <Title name="Following" />
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />


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

        </ScrollView>
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
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fff',
        padding : 8,
        margin : 16,
        borderRadius : 8,
        borderWidth : 1,
        borderColor : '#cfcfcf'

    },
}

)