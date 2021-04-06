import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AddTime from './AddTime'
import {Calendar} from 'react-native-calendars';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { addDate, resetData } from '../redux/counterSlice'
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

const DATA = [
  {
    title: "Breakfast",
    time : '9:00 AM',
    index : 1,
  },
  {
    title: "Brunch",
    time : '11:00 AM',
    index : 2,
  },
  {
    title: "Lunch",
    time : '2:00 PM',
    index : 3,
  },
  {
    title: "Snacks",
    time : '5:00 PM',
    index : 4,
  },
  {
    title: "Dinner",
    time : '8:00 PM',
    index : 5,
  },
];

const Item = ({item}) => (
  <View>
    <AddTime name={item.title} time={item.time}/>
  </View>
);

export default function CalendarModal( props ) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

    const [dates, setDates ] = useState([])
    const [markedDates, setMarkedDates] = useState({});
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.counter.recipe)

    const getSelectedDates = (date) => {
      if (date in markedDates) { 
        delete markedDates[date] 
     } else { 
        markedDates[date] = { selected : true, color :'#ffc885', textColor : '#3b3b3b'}

     } 
      let serviceData = moment(date);
      setDates([...dates, serviceData])
      setMarkedDates({...markedDates})
    }

    const handleClick = () => {
      dispatch(addDate(Object.keys(markedDates)))
      setMarkedDates({})
        Alert.alert(
          "Recipe added",
          "Grocery list updated.",
          {text : "OK"}
          ) 
      
    }

    const handleModal = () => {
      props.setModalVisible(false)
    }
    
    var minDate = moment().format('YYYY-MM-DD');

    return (
      <View>
      { !fontsLoaded ? (<LoadingScreen />) : 
        (<View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              props.setModalVisible(!props.modalVisible);
            }}
          >

              <View style={styles.modalView}>
                <Pressable
                    onPress={() => props.setModalVisible(!props.modalVisible)}
                    >
                  <View style={styles.header}>
                    <Text style={styles.heading}>Calendar</Text>
                    <AntDesign name="closecircle" size={24} color="#3b3b3b" style={{margin : 16, marginTop : 32}}/>
                  </View>
                </Pressable>


            <ScrollView style={{width : '100%'}}>

             <Calendar 
                  theme={{
                    indicatorColor : '#ffc885',
                    textMonthFontWeight : '600',
                    arrowColor : '#3b3b3b',
                    textDayFontFamily : 'Poppins_400Regular',
                    textDayHeaderFontFamily : 'Poppins_500Medium',
                    textMonthFontFamily : 'Poppins_600SemiBold'
                  }}
                  minDate={minDate}
                  markedDates={markedDates}
                  disableMonthChange={true}
                  monthFormat={"MMMM yyyy "}
                  onDayPress={day => {
                    getSelectedDates(day.dateString);
                  }}
                  />

                <FlatList 
                    data={DATA}
                    renderItem={Item}
                    keyExtractor={item => item.index}
                    numColumns={1}
                    />

                <TouchableOpacity  style={styles.button} onPress={() => handleClick()}>
                    <Text style={styles.buttonText}>Schedule</Text>
                </TouchableOpacity>

              </ScrollView>
                                            
              </View>
          </Modal>
              
  </View>)
      }
     </View> 
          
    );
  }
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      width : '100%',
      height : '100%',
      paddingBottom : 64
    },
    modalView: {
      backgroundColor: "#fff",
      borderTopRightRadius: 20,
      borderTopLeftRadius : 20,
      alignItems: "flex-start",
      justifyContent : 'flex-start',
      width : '100%',
      height : '100%',
      position : 'absolute',
      bottom : 0,
      margin : 'auto',
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
      fontSize : 19,
      color : '#3b3b3b',
      fontWeight : '500',
      margin : 16,
  },
  heading : {
    color : '#3b3b3b',
    fontSize : 21,
    margin : 16,
    marginTop : 32,
    flexGrow : 1,
    fontFamily : 'Poppins_600SemiBold'
  },
  header : {
      backgroundColor : '#fff5e6',
      flexDirection : 'row',
      width : '100%',
      alignItems : 'center'
  },
  buttonText : {
    color : '#A13E00',
    fontSize : 19,
    fontFamily : 'Poppins_600SemiBold',
    margin : 16,
    flexGrow : 1,
    textAlign : 'center'
  },
  button: {
      borderRadius : 4,
      backgroundColor : '#ffc885',
      margin : 16,
      flexDirection : 'row',
      alignSelf : 'center'
         }   
  });
  