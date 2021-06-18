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


export default function MealPlan({navigation}) {
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


    //GET call for grocery list
          
          const [grocery, setGrocery] = useState({})
          const [ins, setIns] = useState([])
         
          const getGrocery = () => {
            fetch(
              config.api + `/v1/grocery-for-week`,
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


  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : error ? (<Error/>) : (
          <View style={{flex : 1}}>

          <ScrollView style={{backgroundColor : '#fff'}} refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}>
          
          
                      {ins.length > 0 ?
                        <View>
                            {/* {events.length < 1 ? 
                              <View>
                                <Title name="Dates" />
                                <DatePicker DatePicker from={grocery.from_date} to={grocery.to_date}/>
                              </View> : <View/>
                              } */}
                            
                            {/* <TertiaryButton name="Add ingredient" modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
                              <View style={{backgroundColor : '#fff', flex : 1, marginTop : 16}}>
                              <Title name="Weekly shopping list" />
                                { grocery ?
                                <ToBuy ingredients={ins}/>
                                : <View></View>
                                }
                              </View> 
                        </View>
                        : 
                        <View>
                          <Text style={styles.heading}>Grocery shopping made easy</Text>
                          <Text style={styles.subheading}>Automatically get the grocery list based on the recipes you have in your calendar</Text>
                          <Image style={styles.image} source={toDo} alt="Icon"/>
                        </View> 
                        
          }
            
          </ScrollView>


          <NavBar props="GroceryList"/>

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
  paddingBottom : 0, 
  alignSelf : 'center',
  flexGrow : 1,
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
  fontSize : 19,
  color : '#3b3b3b',
  fontFamily : 'ExoSemiBold'
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
    width : 180,
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
});
