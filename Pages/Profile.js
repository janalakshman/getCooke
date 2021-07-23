import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, ImageBackground, Pressable, FlatList, RefreshControl} from 'react-native'
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
import background from '../assets/background.png'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile({navigation}){
      const user = useSelector(state => state.counter.token);
      const dispatch = useDispatch();

      const [index, setIndex] = useState(0)
      const [favourites, setFavourites] = useState([])
      const [loading, setLoading] = useState(false)
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
        dispatch(deleteToken());
        navigation.navigate('Welcome');
      }

      const getEvents = () => {
        fetch(
              config.api + `/v1/recipes`,
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
                    
                    <View style={{margin : 16}} />
                    
                    <View style={{flexDirection : 'row', margin : 16, marginBottom : 0}}>
                    {user.user.profile.gender === 1 ? <Image source={femaleAvatar} style={styles.avatar}/> : user.user.profile.gender === 0 ? <Image source={maleAvatar} style={styles.avatar} /> : <Image source={Cooke} style={styles.avatar} />} 
                        <View style={styles.line}>
                            <Text style={styles.text}>{user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)}</Text>
                            <Text style={styles.body}>Member since {moment(user.user.date_joined).format('DD/MM/YYYY')}</Text>
                        </View>   
                    </View>

                    
                <ProfileData user={user}/>

                <View style={{flexDirection : 'row', justifyContent : 'space-evenly', marginVertical : 16}} >
                    <Button type="profile" name="Contact" onPress={() => navigation.navigate('Contact')}/>
                    <Button type="profile" name="Log Out" onPress={ () =>handleLogout()} />
                </View>

                
                <View style={{marginVertical : 8}}> 
                    <SegmentedControlTab
                        values={["Cookbook", "Favourites"]}
                        selectedIndex={index}
                        onTabPress={(index) => setIndex(index)}
                        tabStyle={styles.tabStyle}
                        borderRadius={0}
                        tabTextStyle = {{fontFamily : 'ExoSemiBold', fontSize : 17, color : 'rgba(207, 207, 207, 0.99)'}}
                        activeTabStyle={styles.activeTabStyle}
                        activeTabTextStyle = {{fontFamily : 'ExoSemiBold', fontSize : 17, color : '#a13e00'}}
                        />
                </View>

                    {index === 0 ?
                        cookbook && cookbook.length > 0 ? 
                                  <FlatList 
                                    data = {cookbook}
                                    renderItem = {Item}
                                    numColumns = {3}
                                    keyExtractor = {item => item.id.toString()}/>
                                  
                                    : 

                                    <View>
                                        <Text style={styles.heading}>Get started!</Text>
                                        <Text style={styles.subheading}>Add recipes and create your own cookbook. </Text>
                                        
                                        <Pressable onPress={() => navigation.navigate('AddRecipe')}>
                                            <Image style={styles.image} source={Cookbook} alt="Icon"/> 
                                        </Pressable>
                                    </View> :
                        favourites && favourites.length > 0 ?       
                                    <FlatList 
                                        data = {favourites}
                                        renderItem = {Item2}
                                        numColumns = {3}
                                        keyExtractor = {item => item.id.toString()}/> :
                                    <View>
                                        <Text style={styles.heading}>Loving it!</Text>
                                        <Text style={styles.subheading}>View your cooked recipes here.</Text>
                                        <Image style={styles.image} source={Liked} alt="Icon"/> 
                                    </View>
                    }

                  </ScrollView> : <Welcome /> }
                  <NavBar props="Profile" />
                    
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
        fontSize : 17,
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
      fontFamily : 'ExoLightItalic',
      margin : 16,
      marginVertical : 0
    },
    heading : {
      fontSize : 24,
      color : '#3b3b3b',
      fontFamily : 'ExoSemiBold',
      margin : 16,
    },
    recipeImage : {
      flex : 1,
      aspectRatio : 1,
      resizeMode : 'contain',
      margin : 1,
      borderRadius : 2,
    },
    imageText : {
      margin : 1,
      height : 110,
      borderRadius : 0,
      alignItems : 'center',
      justifyContent : 'center',
      backgroundColor : '#fffafa'
    },
    recipeText : {
      fontFamily : 'ExoBoldItalic',
      fontSize : 17,
      color : '#626262'
    }
}

)