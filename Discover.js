import React ,{ useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput , TouchableOpacity, FlatList } from 'react-native';
import Title from './components/Title';
import Tags from './components/Tags';
import TertiaryButton from './components/TertiaryButton'
import SearchModal from './components/SearchModal'
import FilterModal from './components/FilterModal'
import RecipeCard from './components/RecipeCard'
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from './LoadingScreen'
import { addFilter } from './redux/counterSlice';



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
  const filters = useSelector(state => state.counter.filters);
  console.log(filters)

  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }


  const renderItem = ({ item }) => (
    <RecipeCard  />
  );

  const showIngredients = ({ item }) => (
    <TouchableOpacity onPress={() => {  dispatch(addFilter(item.title))
                                        onChangeText('')
                                    }}>
          <Text style={styles.text1}>{item.title}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={{flex : 1}}>
          
        <ScrollView style={{backgroundColor : '#ffffff'}}>

          <Title name="Search with ingredients" />

          <Text style={{marginLeft : 16, fontFamily : 'Poppins_400Regular'}}>Enter up to 3 ingredients</Text>

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

                  <View style={{backgroundColor : '#fff5e6', paddingTop : 16}}>
                    <FlatList
                      numColumns={2} 
                      data={DATA}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      />
                  </View>
                </View> 
                
                :


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

 
          <View style={{flexGrow : 1, backgroundColor : '#fff5e6'}}>
          </View>      
          
        </ScrollView> 

        <View style={styles.navigation}>
                  <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                    <MaterialIcons name="home-filled" style={styles.icon}/>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                      <MaterialIcons name="search" style={styles.selectedIcon}/>
                  </TouchableOpacity> 

                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('MealPlan')} > 
                      <MaterialIcons name="event-note" style={styles.icon}/>
                  </TouchableOpacity> 
                  
                  <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('GroceryList')} >
                      <MaterialIcons name="list-alt" style={styles.icon} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} > 
                    <MaterialIcons name="account-box" style={styles.icon}/>
                  </TouchableOpacity> 
          </View>

    
    </View>
        
  );
}

const styles = StyleSheet.create({
  recipeContainer : {
    alignItems : 'center'
  },
  textInput : {
    borderRadius : 20,
    borderTopLeftRadius : 0,
    backgroundColor :  '#f1f1f1',
    height : 56,
    width : '90%',
    alignSelf : 'flex-start',
    padding : 16,
    margin : 16,
    fontFamily : 'Poppins_500Medium'
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
    margin : 16,
    marginLeft : 32,
    fontFamily : 'Poppins_400Regular'
},
heading : {
  color : '#3b3b3b',
  fontSize : 21,
  fontFamily : 'Poppins_600SemiBold',
  margin : 16
},
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
line : {
  flexDirection : 'row',
  flexWrap : 'wrap',
}
});
