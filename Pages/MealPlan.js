import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SectionList, Image, Alert, RefreshControl } from 'react-native';
import Title from '../components/Title';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import { useSelector } from 'react-redux'
import Calendar from '../assets/Calendar.png'
import { Pressable } from 'react-native';
import Error from '../components/Error'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import RecipeDefault from '../assets/RecipeCardDefault.png'
import SegmentedControlTab from "react-native-segmented-control-tab";
import toDo from '../assets/toDo.png'
import ToBuy from '../components/ToBuy'
import NutritionCard from '../components/NutritionCard'

//Calendar Card component

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
                  })
                  .catch(error => console.log(error));
            } }
          ]
        );
      
    }


    return (
          <View style={{marginBottom : 16, justifyContent :'center'}}>
              <View style={styles.card}> 

                  <View style={{width : '40%'}}>
                      <Pressable onPressIn ={() => navigation.navigate('RecipeDetail',{recipeId : props.event.title.recipe.id})}>
                        {props.event.title.recipe.image ? 
                            <Image source={{uri : props.event.title.recipe.image}} alt="Recipe" style={styles.recipe}/> :
                            <Image source={RecipeDefault} alt="Recipe" style={styles.recipe}/> }
                      </Pressable>
                  </View> 
                  
                  <View style={{flexDirection : 'column', justifyContent : 'flex-start', alignContent : 'flex-start', alignSelf : 'flex-start', marginVertical : 4, margin : 16, width : '60%'}}>
                          <Text style={styles.text}>{props.event.title.recipe.name.length > 24 ? props.event.title.recipe.name.slice(0,24)+ '...' : props.event.title.recipe.name}</Text>                       
                          <View style={{flexDirection : 'column', alignContent : 'center', alignItems : 'flex-start', marginRight : 32 }}>
                          { props.event.title.course ? 
                             <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'flex-start'}}>
                                 <MaterialIcons name="access-time" style={styles.icon} />
                                 {props.event.title.course.includes(',') ? 
                                     <Text style={styles.smalltext}>{props.event.title.course.split(',').join('  |  ')}</Text> :
                                     <Text style={styles.smalltext}>{props.event.title.course}</Text>
                                 }
                             </View>
                           : <View></View> }

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

              { props.point == 1 ? 
              <TouchableOpacity style={styles.delete} onPress={handleDelete}> 
                  <MaterialIcons name="delete" style={styles.icon} />
                  <Text style={styles.smalltext}>Delete</Text>
              </TouchableOpacity>
              : <View></View> }
          </View>

      )    
}

//Calendar card compenent ends


export default function MealPlan({navigation}) {
  const [events, setEvents] = useState([])
  const [cards, setCards] = useState([])
  const user = useSelector(state => state.counter.token);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [index, setIndex] = useState(0)
  const [refreshing, setRefreshing] = React.useState(false);
  const [hide, setHide] = useState(true)

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
                    }, [refreshing]);

    
    //GET call for grocery list
          
          const [grocery, setGrocery] = useState({})
          const [ins, setIns] = useState([])
         
          const getGrocery = () => {
            fetch(
              config.api + `/v1/grocery`,
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
                    setGrocery(response)
                    if (response.ingredients) {
                      const inst = Object.values(response.ingredients).map(item => {
                          return {name : item.name, qty : item.data}
                      })
                      setIns(inst);
                    }
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
           getGrocery();
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

          
          <View> 
                <SegmentedControlTab
                    values={["Calendar", "Grocery list"]}
                    selectedIndex={index}
                    onTabPress={(index) => setIndex(index)}
                    tabStyle={styles.tabStyle}
                    borderRadius={0}
                    tabTextStyle = {{fontFamily : 'ExoMedium', fontSize : 17, color : 'rgba(207, 207, 207, 0.99)'}}
                    activeTabStyle={styles.activeTabStyle}
                    activeTabTextStyle = {{fontFamily : 'ExoMedium', fontSize : 17, color : '#a13e00'}}
                    />
            </View>

        {index === 0 ? 
                      (events.length > 0 ?
                        <View>
                          <SectionList
                            sections={events}
                            keyExtractor={(item, index) =>index.toString()}
                            renderItem={({ item }) => <Item title={item} />}
                            renderSectionHeader={({ section: { title } }) => {
                              return(
                                <Title name={title}/>
                              )
                            }}
                            renderSectionFooter={({ section : {nutritions}}) => (
                              Object.keys(nutritions).length > 0 ? (
                                <View>
                                  <View style={{flexDirection : 'row', justifyContent : 'space-evenly', marginBottom : 16, alignItems : 'center'}}>
                                    <Text style={styles.nutrition}>Nutrition info for the day</Text>
                                    <MaterialIcons name={hide ? "arrow-drop-down-circle" : "keyboard-arrow-up"}  onPress={() => setHide(prevState => !prevState)} size={24} color="#a13e00" />
                                  </View>
                                  {!hide ? 
                                      <NutritionCard nutrition={nutritions} /> :
                                      <View />
                                  }
                              </View>
                              ) : <View />
                              
                            )}
                          />
                          </View> :
                          <View>
                            <Text style={styles.heading}>Plan your cooking in minutes!</Text>
                            
                            <Pressable style={{flexGrow : 1}} onPress={() => navigation.navigate('Home')}>
                              <Image style={styles.image} source={Calendar} alt="Icon"/> 
                            </Pressable>
                            
                            <Text style={styles.subheading}>Start adding by going to a recipe page, and clicking on the add to grocery list button.</Text>
                            
                          </View> )
                   : 
                    (
                      ins.length > 0 ?
                        <View>
                            {/* {events.length < 1 ? 
                              <View>
                                <Title name="Dates" />
                                <DatePicker DatePicker from={grocery.from_date} to={grocery.to_date}/>
                              </View> : <View/>
                              } */}
                            
                            {/* <TertiaryButton name="Add ingredient" modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
                              <View style={{backgroundColor : '#fff', flex : 1}}>
                              <Title name="Shopping list" />
                                { grocery ?
                                <ToBuy ingredients={ins}/>
                                : <View></View>
                                }
                              </View> 
                        </View>
                        : 
                        <View>
                          <Text style={styles.heading}>Grocery shopping made easy</Text>

                          <Pressable onPress={() => navigation.navigate('Home')}>
                            <Image style={styles.image} source={toDo} alt="Icon"/>
                          </Pressable>
                           
                          <Text style={styles.subheading}>Automatically get the grocery list based on the recipes you have added in your calendar! </Text>
                        </View> 
                        )
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
    height : 300,
    width : '100%',
    resizeMode : 'contain',
    alignSelf : 'center',
},
subheading : {
  fontSize : 14,
  color : '#626262',
  fontFamily : 'ExoRegular',
  marginHorizontal : 32,
  textAlign : 'center',
  margin : 16
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
  color : '#333',
  fontFamily : 'ExoSemiBold',
  margin : 32,
  marginVertical : 8,
  textAlign : 'center'
},
card : {
  flexDirection : 'row',
  width : '100%',
  paddingHorizontal : 16,
  alignSelf : 'center',
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
  color : '#333',
  fontFamily : 'ExoMedium',
  marginVertical : 8
  },
smalltext : {
  fontSize : 14,
  color : '#626262',
  margin : 8,
  fontFamily : 'ExoRegular',
  marginVertical : 4
  },
delete : {
  flexDirection : 'row', 
  alignItems : 'center', 
  justifyContent : 'flex-start', 
  marginHorizontal : 16,
  marginVertical : 4
  },
recipe : {
    flex : 1,
    aspectRatio : 1,
    resizeMode : 'contain',
    width : '100%',
    borderTopLeftRadius : 0,
    borderRadius : 8,
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
nutrition : {
  fontSize : 14,
  color : '#a13e00',
  margin : 4,
  fontFamily : 'ExoRegular',
}
});
