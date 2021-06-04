import React, { useState, useEffect, useCallback} from "react";
import { StyleSheet, ScrollView, Text, View, RefreshControl, TouchableOpacity , Modal, Pressable, SectionList, FlatList, TextInput} from 'react-native';
import Title from '../components/Title';
import { MaterialIcons } from '@expo/vector-icons';
import NutritionCard from '../components/NutritionCard'
import RecipeCardHome from '../components/RecipeCard'
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import Error from '../components/Error'
import NavBar from '../components/NavBar'

export default function Home({navigation}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [recipes, setRecipes] = useState({});
  const [events, setEvents] = useState([]);
  const user = useSelector(state => state.counter.token);
  const [refreshing, setRefreshing] = React.useState(false);
  console.log(user)

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  
  if(!user) {
    navigation.navigate('Welcome')
    }

    const getRecipes = () => {
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
    }

    useEffect(() => {
      getRecipes()
    }, [refreshing])


  const Item = (event) => {
    return(
      <View>
        <CalendarCard point={0} event={event}/>
      </View>)
  };

  const renderCard = ({ item }) => {
    return (<RecipeCardHome recipe={item} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.id})}/> )
  }

   const panels = Object.keys(recipes).map((recipe, key) => {
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



 return (
    <View style={{flex : 1,}}>
      {loading ? (<LoadingScreen/>) : error ? (<Error />) : (
          <View style={{flex : 1,  backgroundColor : '#fff'}}>
                <ScrollView style={{backgroundColor : '#fff'}} 
                refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                          />
                        } >
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

          <NavBar props="Home"/>

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
      fontFamily : 'ExoMedium',
      margin : 16
    },
    text : {
      fontSize : 24,
      color : '#3b3b3b',
      fontFamily : 'ExoSemiBold',
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
      fontFamily : 'ExoSemiBold'
  },
});
