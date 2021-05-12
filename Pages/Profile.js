import React, { useState } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native'
import Title from '../components/Title'
import maleAvatar from '../assets/maleAvatar.png'
import femaleAvatar from '../assets/femaleAvatar.png'
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteToken } from '../redux/counterSlice';
import Welcome from './Welcome'
import NavBar from '../components/NavBar'
import ProfileData from '../components/ProfileData'
import Button from '../components/Button'
import SegmentedControlTab from "react-native-segmented-control-tab";


export default function Profile({navigation}){
      const user = useSelector(state => state.counter.token);
      const [index, setIndex] = useState(0)

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
                <View style={{flexDirection : 'row', margin : 16, marginBottom : 0}}>
                {user.user.profile.gender === 1 ? <Image source={maleAvatar} style={styles.image}/> : user.user.profile.gender === 1 ? <Image source={femaleAvatar} style={styles.image} /> : <View></View>} 
                    <View style={styles.line}>
                        <Text style={styles.text}>{user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)}</Text>
                        <Text style={styles.body}>Member since {moment(user.user.date_joined).format('DD/MM/YYYY')}</Text>
                    </View>   
                </View>

                
            <ProfileData />

            <View style={{flexDirection : 'row', justifyContent : 'space-evenly', marginVertical : 16}} >
                <Button type="profile" name="Contact" onPress={() => navigation.navigate('Contact')}/>
                <Button type="profile" name="Log Out" onPress={handleLogout} />
            </View>

            
            <View style={{marginVertical : 8}}> 
                <SegmentedControlTab
                    values={["Cookbook", "Liked recipes"]}
                    selectedIndex={index}
                    onTabPress={(index) => setIndex(index)}
                    tabStyle={styles.tabStyle}
                    borderRadius={0}
                    tabTextStyle = {{fontFamily : 'Poppins_500Medium', fontSize : 14, color : 'rgba(207, 207, 207, 0.99)'}}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle = {{fontFamily : 'Poppins_500Medium', fontSize : 16, color : '#a13e00'}}
                    />
            </View>

                {index === 0 ? 
                    <Text>Cookbook</Text> : <Text>Liked recipes</Text>}

              </ScrollView>
              <NavBar props="Profile" />
                

                </View>) : (<Welcome/>)}
              

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
        borderWidth : 1,
        borderColor : '#cfcfcf',
        // elevation : 5,
        // shadowOpacity : 3,
        // shadowColor : 'rgba(0, 0, 0, 0.10)',
        // shadowRadius : 2,
        // shadowOffset : {width : 0, height : 4},
        height : 88
    },
    tabStyle : {
        borderBottomWidth : 1,
        height : 40,
        marginVertical : 16,
        backgroundColor : '#fff',
        borderColor : '#fff',
        borderBottomColor : 'rgba(207, 207, 207, 0.99)'
    },
    activeTabStyle : {
        borderBottomWidth : 1,
        height : 40,
        marginVertical : 16,
        backgroundColor : '#fff',
        borderBottomColor : '#a13e00',
    }
}

)