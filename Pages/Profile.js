import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Image, ScrollView, ImageBackground, Pressable, FlatList} from 'react-native'
import Title from '../components/Title'
import maleAvatar from '../assets/maleAvatar.png'
import femaleAvatar from '../assets/femaleAvatar.png'
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteToken } from '../redux/counterSlice';
import config from '../config'
import Welcome from './Welcome'
import NavBar from '../components/NavBar'
import ProfileData from '../components/ProfileData'
import Button from '../components/Button'
import SegmentedControlTab from "react-native-segmented-control-tab";
import Cookbook from '../assets/Cookbook.png'
import Liked from '../assets/Liked.png'
import background from '../assets/background.png'


export default function Profile({navigation}){
      const user = useSelector(state => state.counter.token);
      const [index, setIndex] = useState(0)
      const [events, setEvents] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(false)
      const [cookbook, setCookbook] = useState(null)
      const [liked, setLiked] = useState(null)

    // if(events){
    //     events.map(event => (
    //         console.log(event.data[0].recipe.id)
    //     ))
    // }

     

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
    
       useEffect(() => {
                getEvents();
              }, []);

      
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
                {user.user.profile.gender === 1 ? <Image source={maleAvatar} style={styles.avatar}/> : user.user.profile.gender === 1 ? <Image source={femaleAvatar} style={styles.image} /> : <View></View>} 
                    <View style={styles.line}>
                        <Text style={styles.text}>{user.user.username.charAt(0).toUpperCase() + user.user.username.slice(1)}</Text>
                        <Text style={styles.body}>Member since {moment(user.user.date_joined).format('DD/MM/YYYY')}</Text>
                    </View>   
                </View>

                
            <ProfileData user={user}/>

            <View style={{flexDirection : 'row', justifyContent : 'space-evenly', marginVertical : 16}} >
                <Button type="profile" name="Contact" onPress={() => navigation.navigate('Contact')}/>
                <Button type="profile" name="Log Out" onPress={handleLogout} />
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
                    cookbook ? 
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
                    liked ? <Text>Liked recipes</Text> :
                                <View>
                                    <Text style={styles.heading}>Loving it!</Text>
                                    <Text style={styles.subheading}>View your cooked recipes here.</Text>
                                    <Image style={styles.image} source={Liked} alt="Icon"/> 
                                </View>
                }

              </ScrollView>
              <NavBar props="Profile" />
                

                </View>) : (<Welcome/>)}
              

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
      fontFamily : 'ExoMediumItalic',
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
      height : 110,
      margin : 1,
      borderRadius : 0,
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