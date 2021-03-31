import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import Title from './components/Title'
import maleAvatar from './assets/maleAvatar.png'
import femaleAvatar from './assets/femaleAvatar.png'
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from './LoadingScreen'
import { MaterialIcons } from '@expo/vector-icons';


export default function Profile({navigation}){
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    return(
            <View style={{backgroundColor : '#ffffff', flexGrow : 1}}>
                <View style={{flexDirection : 'row', margin : 16, marginTop : 32}}>
                    <Image source={maleAvatar}
                            style={styles.image}/>
                    <View style={styles.line}>
                        <Text style={styles.text}>Jana Lakshman</Text>
                        <Text style={styles.body}>Member since 12/12/2020</Text>
                    </View>   
                </View>
                
            <Title name="Contact"/>
            
                <View style={{backgroundColor : '#fff5e6', paddingTop : 16}}>
                    <View style={styles.card}>
                        <Text style={styles.para}>
                            Compliments are nice, but criticisms are better! 
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.para}>Drop a mail to jana@getcooke.com</Text>
                    </View>

                </View>
                
                <View style={{flexGrow : 1, backgroundColor : '#fff5e6'}}></View>

                <View style={styles.navigation}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                    <MaterialIcons name="home-filled" style={styles.icon}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.icon}/>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} > 
                      <MaterialIcons name="event-note" style={styles.icon}/>
                  </TouchableOpacity> 
                  
                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Grocery list')} >
                      <MaterialIcons name="list-alt" style={styles.icon} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} > 
                    <MaterialIcons name="account-box" style={styles.selectedIcon}/>
                  </TouchableOpacity> 
          </View>

            </View>

    )
}

const styles = StyleSheet.create({
    para : {
        fontSize : 17,
        fontFamily : 'Poppins_400Regular',
        margin : 16
    },
    image : {
        height : 72,
        width : 72,
        resizeMode : 'contain',
    },
    text : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'Poppins_500Medium',
        marginLeft : 16,
    },
    body : {
      fontSize : 14,
      color : '#3b3b3b',
      marginLeft : 16,
      marginTop : 4,
      fontFamily : 'Poppins_400Regular'
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
        margin : 16,
        borderRadius : 20,
        borderTopLeftRadius : 0,
        elevation : 5,
        shadowOpacity : 3,
        shadowColor : 'rgba(0, 0, 0, 0.10)',
        shadowRadius : 2,
        shadowOffset : {width : 0, height : 4},
        height : 84
    },
    navigation : {
        backgroundColor : '#ffffff',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3
      },
      tab : {
        alignItems : 'center',
        width : '20%',
      },
      icon : {
        color : 'rgba(207, 207, 207, 0.99)',
        fontSize : 32,
        margin : 16
      },
      selectedIcon : {
        color : '#3b3b3b',
        fontSize : 32,
        margin : 16
      },
}

)