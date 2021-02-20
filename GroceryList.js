import { StatusBar } from 'expo-status-bar';
import React , {useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import DatePicker from './components/DatePicker'
import FloatingButton from './components/FloatingButtonPlan'
import ToBuy from './components/ToBuy'
import AddToBuy from './components/AddTobuy'
import PrimaryButton from './components/PrimaryButton'
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import SetStartDateModal from './components/SetStartDateModal'
import SetEndDate from './components/SetEndDate'
import AddIngredientModal from './components/AddIngredientModal'


export default function GroceryList({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ingModalVisible, setIngModalVisible] = useState(false);


  return (
    <View style={{flex : 1}}>
          
        <ScrollView style={styles.container}>
          <Title name="Dates" />

            <DatePicker onPressIn={() => setModalVisible(true)} />

          <Title name= "List" /> 

          <ToBuy />

          <PrimaryButton name="Add ingredient" onPressIn={() => setIngModalVisible(true)} />

          <View style={{height : 128}}>
          </View>  

        </ScrollView> 

        <SetStartDateModal  modalVisible={modalVisible} setModalVisible={setModalVisible}/>

        <SetEndDate  modalVisible={modalVisible} setModalVisible={setModalVisible}/>

        <AddIngredientModal modalVisible={ingModalVisible} setModalVisible={setIngModalVisible}/>

        <View style={styles.position}>
          <FloatingButton onPress={() => navigation.navigate('MealPlan')}/>
        </View>

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
    backgroundColor : '#fff',
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