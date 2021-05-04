import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import LoadingScreen from './LoadingScreen'
import Icon from './assets/Chef.png'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileDescription from './components/RecipeDescription'
import TertiaryButton from './components/TertiaryButton'
import { useSelector } from 'react-redux'
import config from './config';
import error from './assets/error.png'
import ProfileData from './components/ProfileData'
import Title from './components/Title'


export default function CreateRecipe({navigation}) {
    const [recipes,setRecipes] = useState([])
    const user = useSelector(state => state.counter.token);


    useEffect(() => {
        fetch(
          config.api.baseURL + `/v1/recipes`,
          {
            method: "GET",
            headers: {
              "Authorization":'Token ' +user.token,
              "Content-Type": "application/json"
            },
            mode: "cors",
          }
        )
        .then((res) => {
            return Promise.all([res.status, res.json()]);        
            })
        .then(([status, response])=> {
                setRecipes(response['recipes']);   
                console.log(recipes)          
          })
        .catch((err) => {
          <View>
            <Text style={styles.text}>Page not found!</Text>
            <Text style={styles.body}>Please refresh and try again. If the issue persists, drop a mail @ jana@getcooke.com!</Text>
            <Image style={styles.image} source={error} alt="Icon"/> 
          </View> 
        })
      }, []);



      return(
        <View style={{backgroundColor : '#ffffff', flex : 1}}>
            {recipes ? (
                <ScrollView>
                    <ProfileDescription recipe={user}/>
                    <ProfileData />
                    <TertiaryButton name="Add recipe" onPress={() => navigation.navigate('AddRecipe')} />
                    <Title name="Recipes" />

                </ScrollView>
            ) : (
                    <ScrollView>
                        <Text style={styles.text}>Upload recipes and start earning in minutes</Text>
                        <Text style={styles.body}>Create a profile, upload your recipes and earn whenever someone cooks your recipe</Text>
                        <Image style={styles.image} source={Icon} alt="Icon"/>
                        <TouchableOpacity  style={styles.button}>
                            <Text style={styles.buttonText}>UPLOAD RECIPES</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )
            }
            
                       
            
            <View style={styles.navigation}>
                    <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}>
                      <MaterialIcons name="home-filled" style={styles.icon}/>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} >
                        <MaterialIcons name="search" style={styles.icon}/>
                    </TouchableOpacity> */}
  
                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} >
                        <MaterialIcons name="event-note" style={styles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Grocery list')} >
                        <MaterialIcons name="list-alt" style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('CreateRecipe')} >
                      <MaterialIcons name="add-box" style={styles.selectedIcon}/>
                    </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    image : {
        height : 280,
        width : 300,
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        fontFamily : 'SourceSansPro_400Regular',
        margin : 16
    },
    text : {
        fontSize : 24,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        marginTop : 32,
        marginHorizontal : 16
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 17,
        fontFamily : 'Poppins_600SemiBold',
        margin : 8,
        flexGrow : 1,
        textAlign : 'center'
      },
      button: {
          borderRadius : 8,
          backgroundColor : '#ffc885',
          alignSelf : 'flex-start',
          margin : 16,
          flexDirection : 'row'
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
            width : '25%',
        },
        icon : {
            color : 'rgba(207, 207, 207, 0.99)',
            fontSize : 30,
            margin : 16
        },
        selectedIcon : {
            color : '#3b3b3b',
            fontSize : 30,
            margin : 16
        },

})