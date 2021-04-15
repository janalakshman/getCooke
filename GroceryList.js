import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect }from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import Title from './components/Title';
import DatePicker from './components/DatePicker'
import ToBuy from './components/ToBuy'
import { MaterialIcons } from '@expo/vector-icons';
import AddIngredientModal from './components/AddIngredientModal'
import TertiaryButton from './components/TertiaryButton'
import config from './config';
import moment from 'moment'
import LoadingScreen from './LoadingScreen'

export default function GroceryList({navigation}) {
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [grocery, setGrocery] = useState({})
  const [ins, setIns] = useState([])
  
  useEffect(() => {
    fetch(
      config.api + `/v1/grocery`,
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
        setGrocery(response)
        const inst = response.ingredients.map(item => {
            return {name : item.ingredient.name, amount : item.qty, fraction : item.fraction, unit : item.unit_name, key : item.id}
        })
        setIns(inst);
        setLoading(false)
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : (
          <View style={{flex : 1}}>
          <ScrollView style={{backgroundColor : '#ffffff'}}>
            <Title name="Dates" />
              { grocery ?
              <DatePicker DatePicker from={grocery.from_date} to={ grocery.to_date}/>
              : <DatePicker from={moment().format('Do MMMM')} to={moment().format('Do MMMM')} />
              }
            
            <TertiaryButton name="Add ingredient" modalVisible={modalVisible} setModalVisible={setModalVisible} />
  
            <Title name= "List" />
              <View style={{backgroundColor : '#fff5e6', flex : 1}}>
                { grocery ?
                <ToBuy ingredients={ins}/>
                : <View></View>
                }
              </View> 
            
            <AddIngredientModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
  
          </ScrollView> 
      
            <View style={styles.navigation}>
                    <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                      <MaterialIcons name="home-filled" style={styles.icon}/>
                    </TouchableOpacity>
  
                    {/* <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                        <MaterialIcons name="search" style={styles.icon}/>
                    </TouchableOpacity>  */}
  
                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} > 
                        <MaterialIcons name="event-note" style={styles.icon}/>
                    </TouchableOpacity> 
                    
                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Grocery list')} >
                        <MaterialIcons name="list-alt" style={styles.selectedIcon} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} > 
                      <MaterialIcons name="account-box" style={styles.icon}/>
                    </TouchableOpacity> 
            </View>
        </View>
  
      )}
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
    width : '25%',
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