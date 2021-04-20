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
import { useSelector, useDispatch } from 'react-redux';
import toDo from './assets/toDo.png'
import error from './assets/error.png'


export default function GroceryList({navigation}) {
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.counter.token);
  const [grocery, setGrocery] = useState({})
  const [ins, setIns] = useState([])
  
  useEffect(() => {
    fetch(
      config.api + `/v1/grocery`,
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
            setGrocery(response)
            if (response.ingredients) {
              const inst = response.ingredients.map(item => {
                  return {name : item.ingredient.name, amount : item.qty, fraction : item.fraction, unit : item.unit_name, key : item.id}
              })
              setIns(inst);
            }
            setLoading(false)
          } else {
            Alert.alert( "Error", "Username/password is incorrect", {text : "OK"} )
          }
          
      })
    .catch((err) => {
      <View>
        <Text style={styles.text}>Page not found!</Text>
        <Text style={styles.body}>Please refresh and try again. If the issue persists, please drop a mail @ jana@getcooke.com!</Text>
        <Image style={styles.image} source={error} alt="Icon"/> 
      </View> 
    })
  }, []);

  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) : (
          <View style={{flex : 1}}>
          <ScrollView style={{backgroundColor : '#ffffff'}}>
            
              { grocery.ingredients.length > 0 ?
              <View>
                  <Title name="Dates" />
                  <DatePicker DatePicker from={grocery.from_date} to={grocery.to_date}/>
                  <TertiaryButton name="Add ingredient" modalVisible={modalVisible} setModalVisible={setModalVisible} />
                  <Title name= "List" />
                    <View style={{backgroundColor : '#fff5e6', flex : 1}}>
                      { grocery ?
                      <ToBuy ingredients={ins}/>
                      : <View></View>
                      }
                    </View> 
              </View>
              : 
              <View>
                <Text style={styles.text}>Grocery shopping made easy</Text>
                <Text style={styles.body}>Get the grocery list based on the recipes you have added in your calendar! </Text>
                <Image style={styles.image} source={toDo} alt="Icon"/> 
              </View> 
              }
            
            
            
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
  image : {
    height : 350,
    width : 350,
    resizeMode : 'contain',
    alignSelf : 'center'
},
body : {
  fontSize : 17,
  color : '#3b3b3b',
  fontFamily : 'Poppins_400Regular',
  margin : 16
},
text : {
  fontSize : 24,
  color : '#3b3b3b',
  fontFamily : 'Poppins_600SemiBold',
  marginTop : 32,
  marginHorizontal : 16
},
});