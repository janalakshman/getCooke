import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import Title from './components/Title'
import maleAvatar from './assets/maleAvatar.png'
import femaleAvatar from './assets/femaleAvatar.png'
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import TertiaryButton from './components/PrimaryButton'
import { useSelector, useDispatch } from 'react-redux';
import { deleteToken } from './redux/counterSlice';
import Welcome from './Welcome'
import NavBar from './components/NavBar'



export default function Profile({navigation}){
      const user = useSelector(state => state.counter.token);

      const dispatch = useDispatch();
    
      const handleLogout = () => {
        dispatch(deleteToken())
        navigation.navigate('Welcome')
      }

    return(
            <View style={{flex : 1}}>
              {user ? (
              <View style={{flex : 1}}>
              <ScrollView style={{backgroundColor : '#ffffff'}}>
                <View style={{flexDirection : 'row', margin : 16, marginTop : 32}}>
                {user.user.profile.gender === 0 ? <Image source={maleAvatar} style={styles.image}/> : user.user.profile.gender === 1 ? <Image source={femaleAvatar} style={styles.image} /> : <View></View>} 
                    <View style={styles.line}>
                        <Text style={styles.text}>{user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)}</Text>
                        <Text style={styles.body}>Member since {moment(user.user.date_joined).format('DD/MM/YYYY')}</Text>
                    </View>   
                </View>

                
            <Title name="Contact"/>
            
                <View style={{backgroundColor : '#fff5e6', paddingVertical : 16}}>
                    <View style={styles.card}>
                        <Text style={styles.para}>Compliments are nice, but critique is better!</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.para}>Drop a mail to jana@getcooke.com!</Text>
                    </View>
                </View>

                <View style={{marginTop : 16}}>
                  <TertiaryButton name="Log out" onPress={handleLogout} />
                </View>

              </ScrollView>
                
              </View>) : (<Welcome/>)}
              <NavBar name="Profile"/>
              

          </View>

    )
}

const styles = StyleSheet.create({
    para : {
        fontSize : 17,
        fontFamily : 'SourceSansPro_400Regular',
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
      fontFamily : 'SourceSansPro_400Regular'
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
        height : 88
    },
}

)