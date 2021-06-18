import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SectionList, Image, Alert, RefreshControl } from 'react-native';
import Title from '../components/Title';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from 'react-redux'
import Calendar from '../assets/Calendar.png'
import NutritionCard from '../components/NutritionCard'
import { Pressable } from 'react-native';
import Error from '../components/Error'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import RecipeDefault from '../assets/RecipeCardDefault.png'
import SegmentedControlTab from "react-native-segmented-control-tab";
import toDo from '../assets/toDo.png'
import ToBuy from '../components/ToBuy'
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import get from 'lodash/get';
//Calendar Card component

const CalendarCard = (props) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.counter.token);

    return (
          <View>
              <View style={styles.card}> 

                      <Pressable onPressIn ={() => navigation.navigate('RecipeDetail',{recipeId : props.recipe.recipe.id})}>
                        {props.recipe.recipe.image ? 
                            <Image source={{uri : props.recipe.recipe.image}} alt="Recipe" style={styles.recipe}/> :
                            <Image source={RecipeDefault} alt="Recipe" style={styles.recipe}/> }
                      </Pressable> 
                  
                  <View style={{flexDirection : 'column', justifyContent : 'center', height : 120, marginVertical : 4, margin : 16, marginBottom : 0, width : '50%'}}>
                          <Text style={styles.text}>{props.recipe.recipe.name}</Text>                       
                          <View style={{flexDirection : 'column', alignContent : 'center', alignItems : 'flex-start', marginRight : 32 }}>

                              <View style={{flexDirection : 'row', justify : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="food-bank" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.recipe.servings === 1 ? '1 serving' : props.recipe.servings + ' servings'}</Text>
                              </View>
                              
                              {props.recipe.recipe.over_night_prep ? 

                              <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="nights-stay" style={styles.icon} />
                                  <Text style={styles.smalltext}>Overnight prep</Text> 
                              </View> 
                              
                              :

                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="timelapse" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.recipe.recipe.cooking_time} mins</Text> 
                            </View> }

                            </View>

                          </View>

                  </View>
          </View>

      )    
}

//Calendar card compenent ends
export default function MealPlan({navigation}) {
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState({})
  const [active, setActive] = useState(0)

  const user = useSelector(state => state.counter.token);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //Get call for calendar events
  function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key].date === value);
  }
  const getEvents = () => {
    fetch(
          config.api + `/v1/meal-plan`,
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
                //Filter logic
                const today = moment(new Date()).format("YYYY-MM-DD")
                const obj = Object.assign({}, response);
                const current = getKeyByValue(obj, today)
                setActive(current)
                setEvents(obj)
                setEvent(obj[current])  
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
    }, [refreshing]);

  const pagePrev = () => {
    if(active > 0) {
      setActive(active-1)
      setEvent(events[active-1])
    } else{
      setActive(0)
      setEvent(events[0])
    }  
  }     
   const pageNext= () => {
      if(active < events.length-1 ){
        setActive(active+1)
        setEvent(events[active+1])
      } else { 
        setActive(active) 
        setEvent(events[active])
      }
   }         

  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : error ? (<Error/>) : (
          <View style={{flex : 1}}>

          <ScrollView style={{backgroundColor : '#fff'}} refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}>
          

                      {event?.meals?
                          <View>

                        {/* Date header */}
                              <View style={styles.line}>
                                  <MaterialIcons onPress={pagePrev} name="arrow-back-ios" style={{fontSize : 24, color : '#626262', marginTop : 16, marginHorizontal : 32, paddingHorizontal : 16}}/>
                                  <View style={{flexGrow : 1}}></View>
                                  <Text style={styles.header}>{ moment(event.date).format('MMM DD, YYYY') }</Text>
                                  <View style={{flexGrow : 1}}></View>
                                  <MaterialIcons onPress={pageNext} name="arrow-forward-ios" style={{fontSize : 24, color : '#626262', marginTop : 16, marginHorizontal : 32, paddingHorizontal : 16}}/>
                              </View>

                              { event.meals.map((m, i) =>(
                                <View key={i}>
                                  <Title name={m.meal} />
                                  { m.recipe_for_meal.map((r, j) =>(
                                    <CalendarCard key={j} recipe={r}/>
                                  ))}
                                  { m.ingredient_for_meal.map((ig, k) =>(
                                    <View key={k} style={styles.box}>
                                      <Text style={styles.ing}>{ig.ingredient.name}</Text>
                                      <View style={{flexGrow : 1}}></View>
                                      <Text style={styles.unit}>{ig.qty} {ig.unit.name}</Text>
                                    </View>
                                  ))}
                                </View>  
                                ))}
                          </View>
                          
                          :
                          <View>
                            <Text style={styles.heading}>Such empty!</Text>
                            <Text style={styles.subheading}>Get your nutritionist to fill up your personal meal plan</Text>
                            <Image style={styles.image} source={Calendar} alt="Icon"/> 
                          </View> }
                   
            
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
  fontFamily : 'ExoRegular',
  margin : 16,
  marginBottom : 4
},
body1 : {
  fontSize : 17,
  color : '#3b3b3b',
  fontFamily : 'ExoRegular',
  marginHorizontal : 16,
  marginVertical : 4
},
heading : {
  fontSize : 24,
  color : '#3b3b3b',
  fontFamily : 'ExoSemiBoldItalic',
  marginTop : 32,
  marginHorizontal : 16
},
card : {
  flexDirection : 'row',
  width : '100%',
  padding : 16,
  alignSelf : 'center',
  marginBottom : 8
},
imageIcon : {
  height : 16,
  width : 21.5,
  },
icon : {
  fontSize : 16,
  color : '#626262',
  },
text : {
  fontSize : 17,
  color : '#3b3b3b',
  fontFamily : 'ExoMedium',
  marginVertical : 8
  },
  header : {
    fontSize : 19,
    color : '#626262',
    fontFamily : 'ExoBold',
    marginTop : 16,
    paddingVertical : 8
    },
smalltext : {
  fontSize : 14,
  color : '#626262',
  margin : 8,
  fontFamily : 'ExoRegular',
  },
delete : {
  flexDirection : 'row', 
  alignItems : 'center', 
  justifyContent : 'flex-start', 
  marginHorizontal : 16,
  marginBottom : 4
  },
recipe : {
    flex : 1,
    aspectRatio : 1,
    resizeMode : 'contain',
    borderTopLeftRadius : 0,
    borderRadius : 20
},
tabStyle : {
  borderBottomWidth : 1,
  height : 40,
  marginVertical : 16,
  backgroundColor : '#fff',
  borderColor : '#fff',
  borderBottomColor : 'rgba(207, 207, 207, 0.99)',
},
activeTabStyle : {
  borderBottomWidth : 1,
  height : 40,
  marginVertical : 16,
  backgroundColor : '#fff',
  borderBottomColor : '#a13e00',
},
ing : {
    color : '#626262',
    fontSize : 17,
    fontFamily : 'ExoRegular',
    marginHorizontal : 16,
    textAlign : 'left',
    width : '50%',
  },
  unit : {
    color : '#626262',
    fontSize : 17,
    fontFamily : 'ExoRegular',
    marginHorizontal : 16,
    textAlign : 'right',
  },
  box : {
      flexDirection : 'row',
      justifyContent : 'flex-start',
      alignItems : 'flex-end',
      borderColor : '#cfcfcf',
      borderBottomWidth : 0.5,
      padding : 8
  },
  line : {
    flexDirection : "row",
    justifyContent : 'center',
    alignItems : 'center',
    paddingBottom : 8,
    marginBottom : 8,
    backgroundColor : '#fffafa'
},
});
