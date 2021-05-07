import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList, TextInput} from 'react-native';
import Title from './components/Title';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import RecipeCardHome from './components/RecipeCardHome'
import config from './config';
import LoadingScreen from "./LoadingScreen";
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import error from './assets/error.png'
import NavBar from './components/NavBar'

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState({});
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('')
  const user = useSelector(state => state.counter.token);
  console.log(user.token)
  let panels = []
   if(!user) {
         navigation.navigate('LogIn')
    }

  useEffect(() => {
    fetch(
      config.api + `/v1/dashboard`,
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
        console.log('hi')
        
        })
    .then(([status, response])=> {
          if(status === 200) {
            setRecipes(response['recipes']);
            setEvents([{'title': moment().format('Do MMMM') , 'data':response['events'], 'index':'1'}])
            setLoading(false)
          } else {
            Alert.alert( "Error", "Username/password is incorrect", {text : "OK"} )
          }
          
      })
    .catch((err) => {
     { console.log('12')}
      <View>
        <Text style={styles.text}>Page not found!</Text>
        <Text style={styles.body}>Please refresh and try again. If the issue persists, drop a mail @ jana@getcooke.com!</Text>
      </View> 
    })
  }, []);

  const Item = (event) => {
    return(
      <View>
        <CalendarCard point={0} event={event}/>
      </View>)
  };

  const renderCard = ({ item }) => {
    return (<RecipeCardHome recipe={item} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.id})}/> )
  }

  if(recipes) {
    panels = Object.keys(recipes).map((recipe, key) => {
        return (
          <ScrollView key={key.toString()} style={{backgroundColor : '#fff'}}>
            <Title name={recipe} />
            <View style={{paddingLeft : 16, backgroundColor : '#fff'}}>
              <FlatList
                data={recipes[recipe]}
                renderItem={renderCard}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                />
            </View>
          </ScrollView>
        ) 
    })
}
 return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : (
          <View style={{flex : 1}}>
                <ScrollView style={{backgroundColor : '#ffffff'}}>
                {/* <TextInput  style={styles.textInput}
                            placeholder = "Search recipes"
                            onChangeText={text => setSearch(text)}
                            value={search}
                            clearButtonMode = {('while-editing')} /> */}
                     {/* { events.length > 0 ?
                      <SectionList
                          sections={events}
                          keyExtractor={(item, index) =>index.toString()}
                          renderItem={({ item }) => <Item title={item} />}
                          renderSectionHeader={({ section: { title } }) => (
                            <Title name={title}/>
                          )}
                          renderSectionFooter={({ section : {nutrition}}) => (
                            <View style={{marginTop : 16}}>
                                <NutritionCard nutrition={nutrition} />
                            </View>
                          )}
                        /> : ''} */}

              {panels}

          </ScrollView>

            <NavBar name="Home" />

      </View>

      )}
    </View>

  );
}

const styles = StyleSheet.create({
  image : {
    height : 350,
    width : 350,
    resizeMode : 'contain',
    alignSelf : 'center'
    },
    body : {
      fontSize : 17,
      color : '#3b3b3b',
      fontFamily : 'Poppins_400Regular',
      margin : 16
    },
    text : {
      fontSize : 24,
      color : '#3b3b3b',
      fontFamily : 'Poppins_600SemiBold',
      marginTop : 32,
      marginHorizontal : 16
    },
    textInput : {
      borderRadius : 20,
      borderTopLeftRadius : 0,
      backgroundColor :  '#f1f1f1',
      height : 56,
      width : '90%',
      alignSelf : 'flex-start',
      padding : 16,
      margin : 16,
      fontFamily : 'Poppins_500Medium'
  },
});
