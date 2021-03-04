import React ,{ useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput , TouchableOpacity, Pressable, FlatList } from 'react-native';
import Title from './components/Title';
import Header from './components/Header';
import TertiaryButton from './components/TertiaryButton'
import SearchModal from './components/SearchModal'
import FilterModal from './components/FilterModal'
import BottomNav from './components/BottomNav'
import RecipeCard from './components/RecipeCard'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useLinkProps } from '@react-navigation/native';
import RecipeDescription from './components/RecipeDescription';
import { addKitchenMaster, removeKitchenMaster } from './redux/counterSlice';


const DATA = [
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

export default function Discover( {navigation} ) {

  var [ isPress, setIsPress ] = React.useState(false);

  const handleClick = (props) => {
    isPress = !isPress
    setIsPress(isPress)
    if(isPress){
      dispatch(addKitchenMaster(props))
    } else {
      dispatch(removeKitchenMaster(props))
    }
  }


  const renderItem = ({ item }) => (
    <RecipeCard  />
  );

  

  return (
    <View style={{flex : 1}}>
          
        <ScrollView style={styles.container}>

            <RecipeDescription />

            {
            isPress === false ?
            <TouchableOpacity  style={styles.button} onPress={() => handleClick()}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity> :
             <View> 
              <TouchableOpacity  style={styles.buttonP} onPress={() => handleClick()}>
                  <Text style={styles.buttonTextP}>Following</Text>
              </TouchableOpacity>
            </View> 
            } 

  
              <View style={styles.recipeContainer}>
                <Text style={styles.heading}>Recipes</Text>
                <FlatList
                  numColumns={2} 
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  />
                </View> 


 
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
  recipeContainer : {
    alignContent : 'center',
  },
  textInput : {
    borderRadius : 10,
    backgroundColor :  '#f1f1f1',
    height : 48,
    width : '90%',
    alignSelf : 'center',
    padding : 10,
    margin : 16
  },  
  header : {
    top : 0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    width : '100%',
    height : '75%'
  },
  text1 : {
    fontSize : 17,
    color : '#3b3b3b',
    fontWeight : '400',
    margin : 16,
    marginLeft : 32
},
heading : {
  color : '#3b3b3b',
  fontSize : 21,
  fontWeight : '600',
  margin : 16
},
position : {
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
},
buttonText : {
  color : '#3b3b3b',
  fontSize : 14,
  fontWeight : '400',
  margin : 8,
  padding : 4,
},
button: {
    borderRadius : 32,
    borderWidth : 1,
    borderColor : '#cfcfcf',
    backgroundColor : '#fff',
    alignSelf : 'flex-start',
    marginLeft : 24,
    margin : 4,
    flexDirection : 'row',
    justifyContent : 'center',
    alignContent : 'flex-start',
       },
       
       buttonTextP : {
        color : '#3b3b3b',
        fontSize : 14,
        fontWeight : '400',
        margin : 8,
        padding : 4,
      },
  
      buttonP : {
          borderRadius : 32,
          backgroundColor : '#ffc885',
          alignSelf : 'flex-start',
          margin : 4,
          marginLeft : 24,
          flexDirection : 'row',
          justifyContent : 'center'
             },

});
