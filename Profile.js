import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import UserCard from './components/UserCard'
import Title from './components/Title'
import DefaultProfilePic from './assets/DefaultProfilePic.png'
import RecipeDescription from './components/RecipeDescription'
import { FlatList } from 'react-native-gesture-handler'
import Logo from './assets/Logo.png'
import SecondaryButton from './components/SecondaryButton'


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
    const [isSigned, setIsSigned] = useState(false)
    const renderItem = ({ item }) => (
        <RecipeDescription  />
      );

    return(
        <View>
            {isSigned === false ? 
            <View style={styles.container1}>
                <View style={styles.logo}>
                    <Image source={Logo}
                            style={   {height : 150,
                                width : 150, marginVertical : 16}}/>
                    <Text style={styles.text2}>We're psyched you decided to give us a chance.</Text>

                    <Text style={styles.text2}>Sign up to start using all our features!!</Text>

                    <TouchableOpacity  style={styles.button} onPress={setIsSigned(true)}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={{ flexGrow : 1}}></View>
                </View>
            </View> : 

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
                    <Text style={styles.text2}>Drop a mail to jana@getcooke.com</Text>
                </View>

                <View style={{flexGrow : 1}}>
                </View>

            </ScrollView>
            }
        

        
    </View>
    )
}

const styles = StyleSheet.create({
    container1 : {
        backgroundColor : '#fff',
        flexGrow : 1
    },
    text2 : {
        margin : 16,
        fontSize : 17,
        textAlign : 'center'
    },
    container : {
        flexDirection : 'row',
        margin : 16,
    },
    logo : {
     
        alignSelf : 'center',
        justifyContent : 'center',
        alignItems : 'center',
        alignContent : 'center'
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
          flexDirection : 'row',
          alignSelf : 'center'
             },
}

)