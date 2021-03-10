import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, SectionList } from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import CalendarCard from './components/CalendarCard'
import NutritionCard from './components/NutritionCard'
import FloatingButton from './components/FloatingButtonList'
import { MaterialIcons } from '@expo/vector-icons';
import SignUp from './SignUpScreen';

const DATA = [
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

const Item = ({ title }) => {
  return(
    <View>
      <CalendarCard name={title}/>
    </View>)
};


export default function MealPlan({navigation}) {
  const [isSigned, setIsSigned] = useState(true)

  return (
    <View>
    {isSigned ? 
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
              <View style={{margin : 64}}></View>
      </ScrollView> 

      <View style={styles.position}>
        <FloatingButton onPress={() => navigation.navigate('GroceryList')} />
      </View> 
      </View> : 
      <SignUp /> }
    

        <View style={styles.positionNav}>
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
  position : {
    position : 'absolute',
    bottom : 64,
    right : 8
  },
  header : {
    top : 0
  },
  positionNav : {
    position : 'absolute',
    bottom : 0,
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
