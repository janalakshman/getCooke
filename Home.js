import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList} from 'react-native';
import Title from './components/Title';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import RecipeCardHome from './components/RecipeCardHome'
import config from './config';

const DATA = [
  {
    title: "10th November",
    data: ["Pizza", "Burger", "Risotto"],
    index : 1,
  },
];

const CARDS = [
  {
    title: "10 November",
    data: ["Pizza", "Burger", "Risotto"],
    index : 1,
  },
  {
    title: "11 November",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    index : 2,

  },
  {
    title: "November 12",
    data: ["Water", "Coke", "Beer"],
    index : 3,

  },
  {
    title: "November 13",
    data: ["Cheese Cake", "Ice Cream"],
    index : 4,
  }
];


const cards = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d58',
    title: 'Third Item',
  },
];

export default function Home( {navigation} ) {
  const [recipes, setRecipes] = useState({});
  const [events, setEvents] = useState({});
  let panels = []
  useEffect(() => {
    fetch(
      config.api + `/v1/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
      }
    )
      .then(res => res.json())
      .then(response => {
        setRecipes(response['recipes']);
        setEvents(response['events'])
      })
      .catch(error => console.log(error));
  }, []);

  const Item = ({ title }) => {
    return(
      <View>
        <CalendarCard events={events} name={title}/>
      </View>)
  };

  const renderCard = ({ item }) => {
    return (<RecipeCardHome recipe={item} onPress={() => navigation.navigate('RecipeDetail', {recipeId: item.id})}/> )
  }

  if(recipes) {
    panels = Object.keys(recipes).map((recipe, key) => {
        return (
          <ScrollView>
            <Title name={recipe} />
            <View style={{paddingLeft : 16, paddingVertical : 8, marginTop:8}}>
            <FlatList
              data={recipes[recipe]}
              renderItem={renderCard}
              keyExtractor={item => item.id}
              horizontal={true}
              />
            </View>
            
          </ScrollView>
        )
    })
}


  return (
    <View style={{flex : 1}}>

        <ScrollView style={{backgroundColor : '#ffffff'}}>
                    <SectionList
                        sections={DATA}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                          <Title name={title}/>
                        )}
                        renderSectionFooter={({ section : {nutrition}}) => (
                          <View style={{marginTop : 16}}>
                              <NutritionCard nutrition={nutrition} />
                          </View>
                        )}
                      />

            {panels}

        </ScrollView>

          <View style={styles.navigation}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name="home-filled" style={styles.selectedIcon}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} >
                      <MaterialIcons name="search" style={styles.icon}/>
                  </TouchableOpacity>

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
  width : '20%',
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
}

});
