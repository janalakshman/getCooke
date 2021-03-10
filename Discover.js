import React ,{ useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput , TouchableOpacity, Pressable, FlatList } from 'react-native';
import Title from './components/Title';
import Tags from './components/Tags';
import TertiaryButton from './components/TertiaryButton'
import SearchModal from './components/SearchModal'
import FilterModal from './components/FilterModal'
import BottomNav from './components/BottomNav'
import RecipeCard from './components/RecipeCard'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useLinkProps } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';



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
  const [value, onChangeText] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const filters = useSelector(state => state.counter.filters)
  console.log(filters)


  const renderItem = ({ item }) => (
    <RecipeCard  />
  );

  const showIngredients = ({ item }) => (
    <TouchableOpacity onPress={()=> onChangeText('')}>
          <Text style={styles.text1}>{item.title}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={{flex : 1}}>
          
        <ScrollView style={styles.container}>
          <Title name="Search with ingredients" />

          <Text style={{marginLeft : 16, margin : 8}}>Enter up to 3 ingredients</Text>

              <TextInput
                style={styles.textInput}
                placeholder = "Add Ingredient"
                onChangeText={text => {
                  onChangeText(text)}}
                value={value}
              />

              {
              value === '' ?
              <View>
                <TertiaryButton modalVisible={filterVisible} setModalVisible={setFilterVisible} />
                <View style={styles.line}>
                 {filters.map(filter => <Tags name={filter}/>)}
                </View>
                <Text style={styles.heading}>Recipes</Text>
                <FlatList
                  numColumns={2} 
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  />
                </View> :
              <ScrollView> 
                  <Text style={styles.heading}>Ingredients</Text>
                  <FlatList
                    data={DATA}
                    renderItem={showIngredients}
                    keyExtractor={item => item.id}
                    />
              </ScrollView>
              }

          <SearchModal  modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                     
          <FilterModal modalVisible={filterVisible} setModalVisible={setFilterVisible} />

 
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
    alignItems : 'center'
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
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 0,
    alignItems: "flex-start",
    justifyContent : 'flex-start',
    width : '100%',
    height : '60%',
    position : 'absolute',
    bottom : 0,
    margin : 'auto'
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
line : {
  flexDirection : 'row',
  marginVertical : 8,
  flexWrap : 'wrap'
}
});
