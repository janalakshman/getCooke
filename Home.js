import { StatusBar } from 'expo-status-bar';
import React ,{ useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList} from 'react-native';
import Title from './components/Title';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNav from './components/BottomNav'
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import RecipeCardHome from './components/RecipeCardHome'

const DATA = [
  {
    title: "November 10",
    data: ["Pizza", "Burger", "Risotto"],
    index : 1,
  },
];

const CARDS = [
  {
    title: "November 10",
    data: ["Pizza", "Burger", "Risotto"],
    index : 1,
  },
  {
    title: "November 11",
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

  const Item = ({ title }) => {
    return(
      <View>
        <CalendarCard name={title}/>
      </View>)
  };

  const renderCard = ({ item }) => (
    <RecipeCardHome onPress={() => navigation.navigate('RecipeFullDetail')}/> );



  return (
    <View>
          
        <ScrollView style={styles.container}>
                    <SectionList
                        sections={DATA}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                          <Title name={title}/>
                        )}
                        renderSectionFooter={({ section : {nutrition}}) => (
                          <NutritionCard nutrition={nutrition} />
                        )}
                      />


        <Title name="Popular recipes" />

        <ScrollView style={styles.recipe}>
          <FlatList 
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            horizontal
            />
        </ScrollView>

        <Title name="Breakfast" />

        <ScrollView style={styles.recipe}>
          <FlatList 
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            horizontal
            />
        </ScrollView>

        <Title name="Main course" />

        <ScrollView style={styles.recipe}>
          <FlatList 
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            horizontal
            />
        </ScrollView>

        <Title name="Desserts" />

        <ScrollView style={styles.recipe}>
          <FlatList 
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            horizontal
            />
        </ScrollView>

        <Title name="Appetizers" />

        <ScrollView style={styles.recipe}>
          <FlatList 
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            horizontal
            />
        </ScrollView>

        <Title name="Drinks" />

        <ScrollView style={styles.recipe}>
          <FlatList 
            data={cards}
            renderItem={renderCard}
            keyExtractor={item => item.id}
            horizontal
            />
        </ScrollView>
        
          <View style={{height : 64}}>
          </View>      
          
        </ScrollView> 

        <View style={styles.position}>
          <View style={styles.containerNav}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                      <MaterialIcons name="home" style={styles.icon} />
                      <Text style={styles.text}>HOME</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.icon} />
                      <Text style={styles.text}>DISCOVER</Text>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('MealPlan')} > 
                      <MaterialIcons name="calendar-today" style={styles.icon} fontSize={22}/>
                      <Text style={styles.text}>MEAL PLAN</Text>
                  </TouchableOpacity> 
          </View>
        </View>

    </View>
        
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header : {
    top : 0,
  },
position : {
  position : 'absolute',
  bottom : 0,
 },
 recipe : {
   marginLeft : 32,
 },
 containerNav : {
  flex : 1,
  height : 56,
  backgroundColor : '#f7f7f7',
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
  elevation: 5
},
text : {
  fontSize : 11,
  color : '#a13e00',
  fontWeight : '600'    
},
tab : {
  alignItems : 'center',
  width : '33.33%'
},
icon : {
  color : '#a13e00',
  fontSize : 24,
  paddingBottom : 4,
}

});
