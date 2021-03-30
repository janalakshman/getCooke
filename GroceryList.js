import { StatusBar } from 'expo-status-bar';
import React , {useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import Title from './components/Title';
import Logo from './assets/Logo.png';
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
import SignUp from './SignUpScreen';



export default function GroceryList({navigation}) {
  const [isSigned, setIsSigned] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);
  const [ingModalVisible, setIngModalVisible] = useState(false);


  return (
    <View>
      { isSigned ?  
      <View>
        <ScrollView style={styles.container}>
          <Title name="Dates" />
            <DatePicker onPressIn={() => setModalVisible(true)} />

          <Title name= "List" /> 
            <ToBuy />

          <PrimaryButton name="Add ingredient" onPressIn={() => setIngModalVisible(true)} />

          <View style={{height : 128}}>
          </View>  

        </ScrollView> 

        {/*<SetStartDateModal  modalVisible={modalVisible} setModalVisible={setModalVisible}/>*/}

        <AddIngredientModal modalVisible={ingModalVisible} setModalVisible={setIngModalVisible}/>

        <View style={styles.position}>
          <FloatingButton onPress={() => navigation.navigate('MealPlan')}/>
        </View> 
      </View>
        : 
        <SignUp />
      }
    


    <View style={styles.containerNav}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                    <MaterialIcons name="home-filled" style={styles.selectedIcon}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.icon}/>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('MealPlan')} > 
                      <MaterialIcons name="event-note" style={styles.icon}/>
                  </TouchableOpacity> 
                  
                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('CreateRecipe')} > 
                    <MaterialIcons name="add-box" style={styles.icon}/>
                  </TouchableOpacity> 
          </View>
      </View>


      
    
                    
  )        
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
  },
  container1 : {
    backgroundColor : '#fff',
    flexGrow : 1
},
text2 : {
    margin : 16,
    fontSize : 17,
    textAlign : 'center'
},
buttonText : {
  color : '#A13E00',
  fontSize : 19,
  fontWeight : '500',
  margin : 16,
  flexGrow : 1,
  textAlign : 'center'
},
button: {
    borderRadius : 8,
    backgroundColor : '#ffc885',
    alignSelf : 'flex-start',
    margin : 16,
    flexDirection : 'row',
    alignSelf : 'center'
       },
});