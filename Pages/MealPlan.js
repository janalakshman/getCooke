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

//Calendar Card component

const CalendarCard = (props) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.counter.token);

    return (
          <View>
              <View style={styles.card}> 

                      <Pressable onPressIn ={() => navigation.navigate('RecipeDetail',{recipeId : props.event.title.recipe.id})}>
                        {props.event.title.recipe.image ? 
                            <Image source={{uri : props.event.title.recipe.image}} alt="Recipe" style={styles.recipe}/> :
                            <Image source={RecipeDefault} alt="Recipe" style={styles.recipe}/> }
                      </Pressable> 
                  
                  <View style={{flexDirection : 'column', justifyContent : 'center', height : 120, marginVertical : 4, margin : 16, marginBottom : 0, width : '50%'}}>
                          <Text style={styles.text}>{props.event.title.recipe.name.length > 32 ? props.event.title.recipe.name.slice(0,32)+ '...' : props.event.title.recipe.name}</Text>                       
                          <View style={{flexDirection : 'column', alignContent : 'center', alignItems : 'flex-start', marginRight : 32 }}>

                              <View style={{flexDirection : 'row', justify : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="food-bank" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.event.title.servings === 1 ? '1 serving' : props.event.title.servings + ' servings'}</Text>
                              </View>
                              
                              {props.event.title.recipe.over_night_prep ? 

                              <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="nights-stay" style={styles.icon} />
                                  <Text style={styles.smalltext}>Overnight prep</Text> 
                              </View> 
                              
                              :

                            <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                  <MaterialIcons name="timelapse" style={styles.icon} />
                                  <Text style={styles.smalltext}>{props.event.title.recipe.cooking_time} mins</Text> 
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
  const user = useSelector(state => state.counter.token);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);

  let dummy = {
      title : {
        course : 'Breakfast',
        servings : 1,
        recipe : {
          image : "https://s3.ap-south-1.amazonaws.com/cooke-2021/cooke/Omelette.jpeg",
          name : 'Whey banana protein milk shake',
          cooking_time : 15,
        }
      }
  }

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
      }, []);

  //Get call for calendar events

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
                    }, [refreshing]);

   const Item = (event) => {
    return(
      <View style={{margin : 4}}>
        <CalendarCard point={1} event={event} setEvents={setEvents}/>
      </View>)
  };
  //Return call for the Meal plan page

  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : error ? (<Error/>) : (
          <View style={{flex : 1}}>

          <ScrollView style={{backgroundColor : '#fff'}} refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}>
          

                      {events.length > 0 ?
                          <View>

                              <View style={styles.line}>
                                  <MaterialIcons name="arrow-back-ios" style={{fontSize : 20, color : '#626262', marginTop : 16, marginHorizontal : 32}}/>
                                  <View style={{flexGrow : 1}}></View>
                                  <Text style={styles.header}>27 June</Text>
                                  <View style={{flexGrow : 1}}></View>
                                  <MaterialIcons name="arrow-forward-ios" style={{fontSize : 20, color : '#626262', marginTop : 16, marginHorizontal : 32}}/>
                              </View>



                              <Title name="Breakfast" />


                              <CalendarCard event={dummy}/>
                              <CalendarCard event={dummy}/>

                              <View style={styles.box}>
                                <Text style={styles.ing}>Milk</Text>
                                <View style={{flexGrow : 1}}></View>
                                <Text style={styles.unit}>100 ml </Text>
                              </View>
                              <View style={styles.box}>
                                <Text style={styles.ing}>Whole egg whites</Text>
                                <View style={{flexGrow : 1}}></View>
                                <Text style={styles.unit}>2 numb</Text>
                              </View>

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
