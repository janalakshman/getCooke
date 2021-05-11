import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import LoadingScreen from './LoadingScreen'
import Icon from './assets/Chef.png'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileDescription from './components/RecipeDescription'
import TertiaryButton from './components/PrimaryButton'
import { useSelector } from 'react-redux'
import config from './config';
import error from './assets/error.png'
import ProfileData from './components/ProfileData'
import Title from './components/Title'
import NavBar from './components/NavBar'


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
            
                       
           <NavBar name="Create Recipe" />

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
})