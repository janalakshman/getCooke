import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList} from 'react-native';
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

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState({});
  const [events, setEvents] = useState([]);
  const user = useSelector(state => state.counter.token);
  let panels = []
  if(!user) {
        navigation.navigate('SignIn')
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
      <View>
        <Text style={styles.text}>Page not found!</Text>
        <Text style={styles.body}>Please refresh and try again. If the issue persists, drop a mail @ jana@getcooke.com!</Text>
        <Image style={styles.image} source={error} alt="Icon"/> 
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
            <View style={{paddingLeft : 16, paddingVertical : 8, marginTop:8, backgroundColor : '#fff'}}>
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

            <View style={styles.navigation}>
                    <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}>
                      <MaterialIcons name="home-filled" style={styles.selectedIcon}/>
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

                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} >
                      <MaterialIcons name="account-box" style={styles.icon}/>
                    </TouchableOpacity>
            </View>

      </View>

      )}
    </View>

  );
}

const styles = StyleSheet.create({
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
    }
});
