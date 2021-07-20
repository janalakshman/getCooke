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
import Liked from '../assets/Liked.png'
import Welcome from '../Pages/Welcome'
import Avatar from '../assets/avatar.png'
import background from '../assets/background.png'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile({navigation}){
      const user = useSelector(state => state.counter.token);
      const dispatch = useDispatch();

      const [index, setIndex] = useState(0)
      const [favourites, setFavourites] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(false)
      const [cookbook, setCookbook] = useState([])
      const [refreshing, setRefreshing] = React.useState(false);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
      }, []);

      const handleLogout = () => {
        Alert.alert(
          "DANGER!",
          "Are you sure you want to log out?",
          [ 
            { text: "Log out", onPress: () => {
              dispatch(deleteToken());
              navigation.navigate('Welcome');
            } },
            {
              text: "Cancel",
              style: "cancel"
            }            
          ]
        );
        
      }

      const getEvents = () => {
        fetch(
              config.api + `/v1/master-recipes?username=` + user.client.nutrition.username,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json"
                },
                mode: "cors",
              }
            )
            .then((res) => {
              return Promise.all([res.status, res.json()]);        
            })
            .then(([status, response])=> {
                  if(status === 200) {
                    setCookbook(response)
                    setLoading(false)
                    setError(false)
                  } else {
                    Alert.alert( "Error", "Username/password is incorrect", {text : "OK"} )
                  }
                  
              })
            .catch((err) => {
             setLoading(false)
             setError(true)
            })
      }

      const getFavourites = () => {
        fetch(
              config.api + `/v1/fav-recipes`,
              {
                method: "GET",
                headers: {
                  "Authorization":'Token ' + user.token,
                  "Content-Type": "application/json"
                },
                mode: "cors",
              }
            )
            .then((res) => {
              return Promise.all([res.status, res.json()]);        
            })
            .then(([status, response])=> {
                  if(status === 200) {
                    setFavourites(response)
                    setLoading(false)
                    setError(false)
                  } else {
                    Alert.alert( "Error", "Username/password is incorrect", {text : "OK"} )
                  }
              })
            .catch((err) => {
             setLoading(false)
             setError(true)
            })
      }
    
       useEffect(() => {
                getEvents();
                getFavourites();
              }, [refreshing]);

    const Item = ({item}) => {
          return(
            item.image ? 
              <Pressable style={{flex : 1/3}} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.id})}>
                <Image source={{uri : item.image}} style={styles.recipeImage} /> 
              </Pressable> :
              <Pressable style={{flex : 1/3}} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.id})}>
                <View style={styles.imageText}>
                  <Text style={styles.recipeText}>{item.name}</Text> 
                </View>
              </Pressable>
            )
    }

    const Item2 = ({item}) => {
      return(
        item.recipe.image ? 
          <Pressable style={{flex : 1/3}} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.recipe.id})}>
            <Image source={{uri : item.recipe.image}} style={styles.recipeImage} /> 
          </Pressable> :
          <Pressable style={{flex : 1/3}} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.recipe.id})}>
            <View style={styles.imageText}>
              <Text style={styles.recipeText}>{item.recipe.name}</Text> 
            </View>
          </Pressable>
        )
    }

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
                    <View style={{flexDirection : 'row', margin : 16, marginBottom : 0}}>
                    {user.user.profile.gender === 1 ? <Image source={femaleAvatar} style={styles.avatar}/> : user.user.profile.gender === 0 ? <Image source={maleAvatar} style={styles.avatar} /> : <Image source={Avatar} style={styles.avatar} />} 
                        <View style={styles.line}>
                            <Text style={styles.text}>{user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)}</Text>
                            <Text style={styles.body}>Member since {moment(user.user.date_joined).format('DD/MM/YYYY')}</Text>
                        </View>   
                    </View>

                    
                         <View style={{flex : 1, margin : 16, marginBottom : 0}}>
                          <Button type="profile" name="Update personal info" onPress={() => navigation.navigate('UpdateInfo')}/>
                        </View>


                      <View style={{flexDirection : 'row', justifyContent : 'space-evenly', flex : 1, marginTop : 8, margin : 16, marginBottom : 8}} >
                        <View style={{flex : 1, marginRight : 2}}>
                          <Button type="profile" name="Manage payments" onPress={() => navigation.navigate('UpdateInfo')}/>
                        </View>

                        <View style={{flex :1, marginLeft : 2}}>
                          <Button type="profile" name="Contact" onPress={ () => navigation.navigate('Contact')} />
                        </View>
                    </View>



                
                <View style={{marginTop : 16}}> 
                    <SegmentedControlTab
                        values={["Favourite recipes"]}
                        selectedIndex={index}
                        onTabPress={(index) => setIndex(index)}
                        tabStyle={styles.tabStyle}
                        borderRadius={0}
                        tabTextStyle = {{fontFamily : 'ExoMedium', fontSize : 19, color : 'rgba(207, 207, 207, 0.99)'}}
                        activeTabStyle={styles.activeTabStyle}
                        activeTabTextStyle = {{fontFamily : 'ExoMedium', fontSize : 19, color : '#a13e00'}}
                        />
                </View>

                    {index === 0 ?
                        // cookbook ? 
                        //         <View style={{paddingBottom : 16}}>
                        //             <FlatList 
                        //               data = {cookbook.recipes}
                        //               renderItem = {Item}
                        //               numColumns = {3}
                        //               keyExtractor = {item => item.id.toString()}/>
                        //         </View>
                                  
                        //           : 

                        //           <View>
                        //             <Text style={styles.heading}>Loving it!</Text>
                        //             <Text style={styles.subheading}>Don't miss out on your favourite recipes</Text>
                        //             <Image style={styles.image} source={Liked} alt="Icon"/> 
                        //           </View> :
                        
                        favourites && favourites.length > 0 ?       
                                    <FlatList 
                                        data = {favourites}
                                        renderItem = {Item2}
                                        numColumns = {3}
                                        keyExtractor = {item => item.id.toString()}/> :
                                    <View>
                                        <Text style={styles.heading}>Loving it!</Text>
                                        <Text style={styles.subheading}>Let your nutritionist know what recipes you love</Text>
                                        <Image style={styles.image} source={Liked} alt="Icon"/> 
                                    </View> 

                          : <View />
                    }

                  </ScrollView> : <Welcome /> }
                  <NavBar props="Discover"/>
                    
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
        fontSize : 19,
        color : '#3b3b3b',
        fontFamily : 'ExoSemiBold',
        marginLeft : 16,
    },
    body : {
      fontSize : 14,
      color : '#3b3b3b',
      marginLeft : 16,
      marginTop : 4,
      fontFamily : 'ExoRegular'
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
    subheading : {
      fontSize : 17,
      color : '#3b3b3b',
      fontFamily : 'ExoRegular',
      margin : 16,
      marginVertical : 0
    },
    heading : {
      fontSize : 24,
      color : '#3b3b3b',
      fontFamily : 'ExoSemiBoldItalic',
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