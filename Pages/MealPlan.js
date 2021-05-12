import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SectionList, Image, Alert } from 'react-native';
import Title from '../components/Title';
import NutritionCard from '../components/NutritionCard'
import { MaterialIcons } from '@expo/vector-icons';
import config from '../config';
import moment from 'moment';
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from 'react-redux'
import Calendar from '../assets/Calendar.png'
import { Pressable } from 'react-native';
import Error from '../components/Error'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';


const CalendarCard = (props) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.counter.token);

    const handleDelete = () => {
      Alert.alert(
          "Delete recipe",
          "Are you sure you want to delete the recipe from your meal plan?",
          [ {
              text: "Cancel",
              style: "cancel"
            },
            { text: "Delete", onPress: () => {
              fetch(
                  config.api + `/v1/event/`+props.event.title.id,
                  {
                    method: "DELETE",
                    headers: {
                      "Authorization":'Token ' +user.token,
                      "Content-Type": "application/json"
                    },
                    mode: "cors",
    
                  }
                )
                  .then(res => res.json())
                  .then(response => {
                      props.setEvents(response)
                      navigation.navigate('Meal plan')
                  })
                  .catch(error => console.log(error));
            } }
          ]
        );
      
    }

    const course = (props.event.title.course).split(",")[0]

    return (
          <View>
              <View style={ course === 'Breakfast' ? styles.breakfastcard : course === 'Brunch' ? 
              styles.brunchcard : course === 'Lunch' ? styles.lunchcard : course=== 'Snacks' ? styles.snackscard : styles.dinnercard}>  
                  <Pressable onPressIn ={() => navigation.navigate('RecipeDetail',{recipeId : props.event.title.recipe.id})}>
                      <View>
                          <Text style={styles.text}>{props.event.title.recipe.name}</Text>  
                      </View>
                  </Pressable> 
                  <View style={{flexDirection : 'column', marginTop : 4}}>
                      
                      <View style={{flexDirection : 'row', alignItems : 'center'}}>
                          <MaterialIcons name="access-time" style={styles.icon} />
                          {props.event.title.course.includes(',') ? 
                              <Text style={styles.smalltext}>{props.event.title.course.split(',').join('  |  ')}</Text> :
                              <Text style={styles.smalltext}>{props.event.title.course}</Text>
                          }
                          
                      </View>

                  {props.event.title.recipe.over_night_prep ? (
                          <View style={{flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', marginRight : 32 }}>
                              <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="food-bank" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.event.title.servings === 1 ? '1 serving' : props.event.title.servings + ' servings'}</Text>
                              </View>

                              <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="nights-stay" style={styles.icon} />
                                  <Text style={styles.smalltext}>Overnight prep</Text> 
                              </View> 
                          </View>
                          
                      ) : 
                      <View style={{flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', marginRight : 32 }}>
                              <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="food-bank" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.event.title.servings === 1 ? '1 serving' : props.event.title.servings + ' servings'}</Text>
                              </View>

                              <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="timelapse" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.event.title.recipe.cooking_time} mins</Text> 
                              </View> 
                          </View>
                  }

                  </View>

              </View>
              { props.point == 1 ? 
              <TouchableOpacity style={styles.delete} onPress={handleDelete}> 
                  <MaterialIcons name="delete" style={styles.icon} />
                  <Text style={styles.smalltext}>Delete</Text>
              </TouchableOpacity>
              : <View></View> }
          </View>

      )    
}


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
        <CalendarCard point={1} event={event} setEvents={setEvents}/>
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
                              // renderSectionFooter={({ section : {nutrition}}) => (
                              //   <View style={{marginTop : 16}}>
                              //       <NutritionCard nutrition={nutrition} />
                              //   </View>
                              // )}
                            /> :
                            <View>
                              <Text style={styles.heading}>Such empty!</Text>
                              <Text style={styles.subheading}>Start adding by going to a recipe page, and clicking on the add to calendar button.</Text>
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
subheading : {
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
heading : {
  fontSize : 24,
  color : '#3b3b3b',
  fontFamily : 'Poppins_600SemiBold',
  marginTop : 32,
  marginHorizontal : 16
},
breakfastcard : {
  backgroundColor : '#ffe484',
  flexDirection : 'column',
  width : '88%',
  padding : 16, 
  margin : 8,
  borderRadius : 4,
  alignSelf : 'center',
  flexGrow : 1,
  borderTopLeftRadius : 0,
  borderRadius : 20,
  elevation : 3,
  shadowRadius : 2,
  shadowOpacity : 0.5,
  shadowColor : 'rgba(0, 0, 0, 0.25)',
  shadowOffset : {width : 0, height : 4},
},
lunchcard : {
  flexDirection : 'column',
  width : '88%',
  padding : 16, 
  margin : 8,
  borderRadius : 4,
  alignSelf : 'center',
  backgroundColor : '#b6d2fb',
  flexGrow : 1,
  borderTopLeftRadius : 0,
  borderRadius : 20,
  elevation : 3,
  shadowRadius : 2,
  shadowOpacity : 0.5,
  shadowColor : 'rgba(0, 0, 0, 0.25)',
  shadowOffset : {width : 0, height : 4},
},
brunchcard : {
  backgroundColor : '#e0fdcd',
  flexDirection : 'column',
  width : '88%',
  padding : 16, 
  margin : 8,
  borderRadius : 4,
  alignSelf : 'center',
  flexGrow : 1,
  borderTopLeftRadius : 0,
  borderRadius : 20,
  elevation : 3,
  shadowRadius : 2,
  shadowOpacity : 0.5,
  shadowColor : 'rgba(0, 0, 0, 0.25)',
  shadowOffset : {width : 0, height : 4},
},
snackscard : {
  backgroundColor : '#9ed2ea',
  flexDirection : 'column',
  width : '88%',
  padding : 16, 
  margin : 8,
  borderRadius : 4,
  alignSelf : 'center',
  flexGrow : 1,
  borderTopLeftRadius : 0,
  borderRadius : 20,
  elevation : 3,
  shadowRadius : 2,
  shadowOpacity : 0.5,
  shadowColor : 'rgba(0, 0, 0, 0.25)',
  shadowOffset : {width : 0, height : 4},
},
dinnercard : {
  backgroundColor : '#fbb6b6',
  flexDirection : 'column',
  width : '88%',
  padding : 16, 
  margin : 8,
  borderRadius : 4,
  alignSelf : 'center',
  flexGrow : 1,
  borderTopLeftRadius : 0,
  borderRadius : 20,
  elevation : 3,
  shadowRadius : 2,
  shadowOpacity : 0.5,
  shadowColor : 'rgba(0, 0, 0, 0.25)',
  shadowOffset : {width : 0, height : 4},
},
imageIcon : {
height : 16,
width : 21.5,
},
icon : {
fontSize : 16,
color : '#3b3b3b',
},
text : {
fontSize : 17,
color : '#3b3b3b',
fontFamily : 'Poppins_500Medium'
},
smalltext : {
fontSize : 14,
color : '#3b3b3b',
margin : 8,
fontFamily : 'Poppins_400Regular'
},
delete : {
flexDirection : 'row', 
alignItems : 'center', 
justifyContent : 'flex-start', 
marginBottom : 8,
marginHorizontal : 32
},
});
