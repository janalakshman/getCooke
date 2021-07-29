import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView, TouchableOpacity, Alert, Switch} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import config from '../config';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button'
import Title from '../components/Title'
import { useNavigation } from '@react-navigation/native';


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

const AddTime = (props) => {
  var [ isPress, setIsPress ] = useState(false);
  const setCourses = props.setCourses
  const courses = props.courses

  const handleClick = (item) => {
    if(courses.includes(item)) {
      const i  = courses.indexOf(item)
      if ( i!== -1) {
        courses.splice(i, 1); 
        setCourses(courses)
      }
    }else{
      setCourses([...courses, item])
    }
    // courses.includes(item) ? setCourses(courses) : setCourses([...courses, item])
    setIsPress(!isPress)
  }


    return( 
              <View>
                  <TouchableOpacity  style={styles.checkbox} onPress={() => handleClick(props.name)}>
                      <MaterialIcons name={!isPress ? "check-box-outline-blank" : "check-box"} size={24} color="black" /> 
                      <Text style={styles.text}>{props.name}</Text>
                      <View style={{flexGrow : 1}}/>
                      <Text style={styles.text}>{props.time}</Text>
                  </TouchableOpacity> 
              </View>
                
    )
}

 

export default function CalendarModal( props ) {

    const [dates, setDates] = useState([])
    const [courses, setCourses] = useState([])
    const [markedDates, setMarkedDates] = useState({});
    const [servings, setServings] = useState(1)
    const user = useSelector(state => state.counter.token);
    const [schedule, setSchedule] = useState(false)
    const toggleSchedule = () => setSchedule(previousState => !previousState);
    const navigation = useNavigation()

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

    const Item = ({item}) => (
      <View>
        <AddTime name={item.title} time={item.time} courses={courses} setCourses={setCourses}/>
      </View>
    );

    const handleClick = () => {
      const payload = {'event_date':Object.keys(markedDates), 'servings': servings, 'course':Array.from(new Set(courses)), 
      recipe_id: props.recipe, is_schedule : schedule}
      fetch(config.api + `/v1/events`,
         {
          method: 'POST',
          headers: {
            "Authorization":'Token ' +user.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((result) => {
            Alert.alert(
                "Recipe added",
                "Recipe added to your meal plan succesfully!",
                [
                  {text : "Check calendar", onPress : () => {
                                                              props.setModalVisible(false)
                                                              navigation.navigate('Meal plan')
                                                            }},
                  {text : "Continue meal planning", onPress : () => {
                                                              props.setModalVisible(false)
                                                              navigation.navigate('Home')
                                                            }},
                  {text : "Go back to recipe", onPress : () => props.setModalVisible(false)},
                ]
                )
              setMarkedDates({})
              setCourses([])    
          })
          .catch((err) => {
            console.log('error')
        })
      
    }

    const handleModal = () => {
      props.setModalVisible(false)
      navigation.navigate('Meal plan')
    }

    
    var minDate = moment().format('YYYY-MM-DD');

    return (
      <ScrollView>
     <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
          >

              <View style={styles.modalView}>
                <Pressable onPress={() => props.setModalVisible(!props.modalVisible)} >
                  <View style={styles.header}>
                    <Text style={styles.heading}>Grocery List</Text>
                    <MaterialIcons name="close" size={24} color="#3b3b3b" style={{margin : 16, marginTop : 32}} />
                  </View>
                </Pressable>


            <ScrollView style={{width : '100%'}}>


          <Title name="Number of servings" />
            <View style={{flexDirection : 'row', alignItems : 'center', marginHorizontal : 64}}>
              <MaterialIcons name="remove" size={24} color="black" onPress={() => servings === 1 ? setServings(1) : setServings(servings - 1)} />
              <Text style={styles.unpressedText}>{servings}</Text>
              <MaterialIcons name="add" size={24} color="black" onPress={() => setServings(servings + 1)} />
            </View>

            <View style={{margin : 8}}/>


            <View style={{flexDirection : 'row', margin : 16, justifyContent : 'space-around', alignItems : 'center'}}>
                <Text style={styles.text}>Schedule this recipe</Text>
                <Switch trackColor={{ false: "#f7f7f7", true: "#5BC236" }}
                        thumbColor={schedule ? "#ffffff" : "#ffffff"}
                        ios_backgroundColor="#f7f7f7"
                        onValueChange={toggleSchedule}
                        value={schedule}/>
            </View>

            {schedule ? (
              <View>
                <Title name="Pick dates" />

                  <Calendar 
                      theme={{
                        indicatorColor : '#ffc885',
                        textMonthFontWeight : '600',
                        arrowColor : '#3b3b3b',
                        textDayFontFamily : 'ExoRegular',
                        textDayHeaderFontFamily : 'ExoSemiBold',
                        textMonthFontFamily : 'ExoSemiBold'
                      }}
                      minDate={minDate}
                      markedDates={markedDates}
                      disableMonthChange={true}
                      monthFormat={"MMMM yyyy "}
                      onDayPress={day => {
                        getSelectedDates(day.dateString);
                      }}
                      />

                <View style={{margin : 8}}/>
  
              
                {/* <Title name="Choose course"/>
  
                  <FlatList 
                      data={DATA}
                      renderItem={Item}
                      keyExtractor={item => item.index.toString()}
                      numColumns={1}
                      /> */}
            </View>
 
            ) : <View></View>}
            

                <Button type="primary" name="Add to Grocery list" onPress={() => handleClick()} />

              </ScrollView>
                                            
              </View>
          </Modal>
              
      </View>
     </ScrollView> 
          
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
      fontSize : 17,
      color : '#3b3b3b',
      margin : 16,
      fontFamily : 'ExoRegular'
  },
  heading : {
    color : '#3b3b3b',
    fontSize : 19,
    margin : 16,
    marginTop : 32,
    flexGrow : 1,
    fontFamily : 'ExoMedium'
  },
  header : {
      backgroundColor : '#fff5e6',
      flexDirection : 'row',
      width : '100%',
      alignItems : 'center'
  },
  time: {
      borderRadius : 4,
      borderWidth : 1,
      borderColor : '#3b3b3b',
      backgroundColor : '#ffffff',
      margin : 16,
      flexDirection : 'row',
    },  
  unpressedText : {
    color : '#3b3b3b',
    fontSize : 19,
    fontFamily : 'ExoMedium',
    margin : 16,
    textAlign : 'center',
    flexGrow : 1
  },
  time: {
    backgroundColor : '#ffffff',
    margin : 16,
    flexDirection : 'row',
  },
  pressedText : {
    color : '#fff',
    fontSize : 19,
    margin : 16,
    textAlign : 'center',
    flexGrow : 1,
    fontFamily : 'ExoMedium'
  },
  pressedTime : {
    borderRadius : 4,
    backgroundColor : '#54b8ec',
    margin : 16,
    flexDirection : 'row',
  },
  checkbox : {
    flexDirection : 'row', 
    alignItems : 'center',
    margin : 8,
    borderColor : '#cfcfcf',
    borderBottomWidth : 0.5
},
text : {
  fontSize : 17,
  color : '#3b3b3b',
  margin : 16,
  fontFamily : 'ExoRegular'
},
  });