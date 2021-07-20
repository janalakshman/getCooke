import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, Alert, Pressable, FlatList, RefreshControl} from 'react-native'
import maleAvatar from '../assets/maleAvatar.png'
import femaleAvatar from '../assets/femaleAvatar.png'
import Cooke from '../assets/CookeLogo.png'
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteToken } from '../redux/counterSlice';
import config from '../config'
import LoadingScreen from '../components/LoadingScreen'
import NavBar from '../components/NavBar'
import ProfileData from '../components/ProfileData'
import Button from '../components/Button'
import SegmentedControlTab from "react-native-segmented-control-tab";
import Cookbook from '../assets/Cookbook.png'
import Thoughts from '../assets/Thoughts.png'
import Welcome from '../Pages/Welcome'
import Title from '../components/Title'
import NutritionCard from '../components/NutritionCard'


export default function Profile({navigation}){
      const user = useSelector(state => state.counter.token);
      const dispatch = useDispatch();

      const [index, setIndex] = useState(0)
      const [info, setInfo] = useState(1)
      const [down, setDown] = useState(true)
      const [loading, setLoading] = useState(false)
      const [refreshing, setRefreshing] = React.useState(false);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
      }, []);


    
       useEffect(() => {
               
              }, [refreshing]);


    return(
            <View style={{flex : 1}}>
              {loading ? (<LoadingScreen/>) : (
              <View style={{flex : 1}}>
              {user ? 
                  <ScrollView style={{backgroundColor : '#ffffff'}} refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}>
                    
                        <Text style={styles.text}>Hey {user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)},</Text>
                        {
                            info ? 
                                <View>
                                    <Title name="Your fitness goals" />
                                    <ProfileData />

                                    <View style={{margin : 8}} />

                                    <View style={{ flexDirection : 'row', alignItems : 'center'}}>
                                      <Text style={styles.heading}>Daily nutrition goals</Text>
                                      {down ? 
                                        <MaterialIcons onPress={() => setDown(previousState => !previousState)} name="arrow-drop-down-circle" style={styles.icon} /> :
                                        <MaterialIcons onPress={() => setDown(previousState => !previousState)} name="arrow-drop-up" style={styles.icon} />
                                      }
                                    </View>
                                      {!down ? <NutritionCard /> : <View />}
                                </View>
                                :
                                <View>
                                    <Text style={styles.para}>You will receive your personalised meal plans in 24 hours!</Text>

                                    <View style={{flex : 1, margin : 16, marginBottom : 0}}>
                                        <Button type="profile" name="Update personal info" onPress={() => navigation.navigate('UpdateInfo')}/>
                                    </View> 
                                </View>

                        }
                        

                        <View style={{marginTop : 16}}> 
                            <SegmentedControlTab
                                values={["Breakfast", "Lunch", "Snacks", "Dinner"]}
                                selectedIndex={index}
                                onTabPress={(index) => setIndex(index)}
                                tabStyle={styles.tabStyle}
                                borderRadius={0}
                                tabTextStyle = {{fontFamily : 'ExoRegular', fontSize : 14, color : 'rgba(207, 207, 207, 0.99)'}}
                                activeTabStyle={styles.activeTabStyle}
                                activeTabTextStyle = {{fontFamily : 'ExoRegular', fontSize : 14, color : '#a13e00'}}
                                />
                        </View>

                        <View>
                            <Text style={styles.subheading}>See your meal options here!</Text>
                            <Image style={styles.image} source={Thoughts} alt="Icon"/> 
                        </View> 


                  </ScrollView> : <Welcome /> }
                  <NavBar props="Home" />
                    
                  </View>)}
                  

              </View>

        )
    }

const styles = StyleSheet.create({
    para : {
        fontSize : 17,
        fontFamily : 'ExoRegular',
        margin : 16
    },
    avatar : {
        height : 72,
        width : 72,
        resizeMode : 'contain',
    },
    text : {
        fontSize : 32,
        color : '#333',
        fontFamily : 'ExoSemiBold',
        margin : 16,
    },
    body : {
      fontSize : 14,
      color : '#3b3b3b',
      marginLeft : 16,
      marginTop : 4,
      fontFamily : 'ExoRegular'
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
        marginTop : 8,
        backgroundColor : '#fff',
        borderColor : '#fff',
        borderBottomColor : 'rgba(207, 207, 207, 0.99)'
    },
    activeTabStyle : {
        borderBottomWidth : 1,
        height : 40,
        marginTop : 8,
        marginVertical : 16,
        backgroundColor : '#fff',
        borderBottomColor : '#a13e00',
    },
    image : {
        height : 350,
        width : 350,
        resizeMode : 'contain',
        alignSelf : 'center',
    },
    icon : {
      fontSize : 30,
      color : '#333',
      margin : 16,
      marginBottom : 8
    },
    heading : {
      color : '#333',
      fontSize : 19,
      fontFamily : 'ExoMedium',
      margin : 16,
      marginBottom : 8
    },
    subheading : {
      fontSize : 17,
      color : '#3b3b3b',
      fontFamily : 'ExoRegular',
      margin : 16,
    },
    recipeImage : {
      flex : 1,
      aspectRatio : 1,
      resizeMode : 'contain',
      margin : 0.25,
    },
    imageText : {
      margin : 1,
      height : 110,
      borderRadius : 4,
      borderTopLeftRadius : 0,
      borderWidth : 0.5,
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#fff'
    },
    recipeText : {
      fontFamily : 'ExoSemiBoldItalic',
      fontSize : 14,
      color : '#333',
      margin : 16
    }
}

)