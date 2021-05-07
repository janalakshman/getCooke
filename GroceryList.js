import { StatusBar } from 'expo-status-bar';
import React , {useState, useEffect }from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import Title from './components/Title';
import DatePicker from './components/DatePicker'
import ToBuy from './components/ToBuy'
import { MaterialIcons } from '@expo/vector-icons';
import AddIngredientModal from './components/AddIngredientModal'
import TertiaryButton from './components/PrimaryButton'
import config from './config';
import moment from 'moment'
import LoadingScreen from './LoadingScreen'
import { useSelector, useDispatch } from 'react-redux';
import toDo from './assets/toDo.png'
import error from './assets/error.png'
import { Pressable } from 'react-native';
import Error from './Error'
import NavBar from './components/NavBar'


export default function GroceryList({navigation}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
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
  }, []);

  return (
    <View style={{flex : 1}}>
      {loading ? (<LoadingScreen/>) :  error ? (<Error/>) : (
          <View style={{flex : 1}}>
          <ScrollView style={{backgroundColor : '#ffffff'}}>
            
              { ins.length > 0 ?
              <View>
                  <Title name="Dates" />
                  <DatePicker DatePicker from={grocery.from_date} to={grocery.to_date}/>
                  {/* <TertiaryButton name="Add ingredient" modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}
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
                <Text style={styles.body}>Automatically get the grocery list based on the recipes you have added in your calendar! </Text>
                <Pressable onPress={() => navigation.navigate('Home')}>
                  <Image style={styles.image} source={toDo} alt="Icon"/>
                </Pressable> 
              </View> 
              }
            
            
            
            <AddIngredientModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
  
          </ScrollView> 

          <NavBar props="Grocery list" />

        </View>
  
      )}
    </View>
    

      
    
                    
  )        
}

const styles = StyleSheet.create({
  image : {
    height : 350,
    width : 350,
    resizeMode : 'contain',
    alignSelf : 'center',
},
body : {
  fontSize : 17,
  color : '#3b3b3b',
  fontFamily : 'SourceSansPro_400Regular',
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