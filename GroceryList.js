import { StatusBar } from 'expo-status-bar';
import React , {useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import Title from './components/Title';
import DatePicker from './components/DatePicker'
import ToBuy from './components/ToBuy'
import PrimaryButton from './components/PrimaryButton'
import { MaterialIcons } from '@expo/vector-icons';
import AddIngredientModal from './components/AddIngredientModal'
import SignUp from './SignUpScreen';
import TertiaryButton from './components/TertiaryButton'


export default function GroceryList({navigation}) {
  const [isSigned, setIsSigned] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={{flex : 1}}>
      { isSigned ?  
        <ScrollView style={{backgroundColor : '#ffffff'}}>
          <Title name="Dates" />
            <DatePicker/>
          
          <TertiaryButton name="Add ingredient" modalVisible={modalVisible} setModalVisible={setModalVisible} />

          <Title name= "List" />
            <View style={{backgroundColor : '#fff5e6', flex : 1}}>
              <ToBuy/>
            </View> 
          
          <AddIngredientModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>

        </ScrollView> 
        : 
        <SignUp />
      }
    
          <View style={styles.navigation}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                    <MaterialIcons name="home-filled" style={styles.icon}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.icon}/>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('MealPlan')} > 
                      <MaterialIcons name="event-note" style={styles.icon}/>
                  </TouchableOpacity> 
                  
                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('GroceryList')} >
                      <MaterialIcons name="list-alt" style={styles.selectedIcon} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} > 
                    <MaterialIcons name="account-box" style={styles.icon}/>
                  </TouchableOpacity> 
          </View>
      </View>


      
    
                    
  )        
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
    fontSize : 32,
    margin : 16
  },
  selectedIcon : {
    color : '#3b3b3b',
    fontSize : 32,
    margin : 16
  },
});