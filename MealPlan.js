import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SectionList, Image } from 'react-native';
import Title from './components/Title';
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import { MaterialIcons } from '@expo/vector-icons';
import config from './config';
import moment from 'moment';
import LoadingScreen from "./LoadingScreen";
import { useSelector } from 'react-redux'
import Calendar from './assets/Calendar.png'
import error from './assets/error.png'
import { Pressable } from 'react-native';
import Error from './Error'
import NavBar from './components/NavBar'


export default function MealPlan({navigation}) {
  const [events, setEvents] = useState([])
  const user = useSelector(state => state.counter.token);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getEvents = () => {
    fetch(
          config.api + `/v1/events`,
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
                setEvents(response)
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

          
   const Item = (event) => {
    return(
      <View>
        <CalendarCard point={1} event={event}/>
      </View>)
  };

  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : error ? (<Error/>) : (
          <View style={{flex : 1}}>

          <ScrollView style={{backgroundColor : '#fff'}}>
            { events.length > 0 ?
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
                            /> :
                            <View>
                              <Text style={styles.text}>Such empty!</Text>
                              <Text style={styles.body}>Start adding by going to a recipe page, and clicking on the add to calendar button.</Text>
                              <Pressable onPress={() => navigation.navigate('Home')}>
                                <Image style={styles.image} source={Calendar} alt="Icon"/> 
                              </Pressable>
                            </View> 
                            }
          </ScrollView>

          <NavBar props="Meal plan"/>      
          
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
    alignSelf : 'center',
    margin : 32
},
body : {
  fontSize : 17,
  color : '#3b3b3b',
  fontFamily : 'SourceSansPro_400Regular',
  margin : 16,
  marginBottom : 4
},
body1 : {
  fontSize : 17,
  color : '#3b3b3b',
  fontFamily : 'SourceSansPro_400Regular',
  marginHorizontal : 16,
  marginVertical : 4
},
text : {
  fontSize : 24,
  color : '#3b3b3b',
  fontFamily : 'Poppins_600SemiBold',
  marginTop : 32,
  marginHorizontal : 16
},
});
