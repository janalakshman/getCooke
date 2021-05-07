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
import Error from './Error'
import NavBar from './components/NavBar'

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [recipes, setRecipes] = useState({});
  const [events, setEvents] = useState([]);
  const user = useSelector(state => state.counter.token);
  let panels = []
   
  if(!user) {
         navigation.navigate('Welcome')
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
            setError(false)
          } else {
            Alert.alert( "Error", "Username/password is incorrect", {text : "OK"} )
          }
          
      })
    .catch((err) => {
      setLoading(false)
      setError(true)
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
      {loading ? (<LoadingScreen/>) : error ? (<Error />) : (
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

          <NavBar props="Home"/>

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
  
});
