import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {Calendar} from 'react-native-calendars';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { addDate, resetData, addTime } from '../redux/counterSlice'
import LoadingScreen from '../components/LoadingScreen'
import config from '../config';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '../components/Button'

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
                <TouchableOpacity  style={!isPress ? styles.time : styles.pressedTime} onPress={() => handleClick(props.name)}>
                  <Text style={!isPress ? styles.unpressedText : styles.pressedText}>{props.name}</Text>
                  <Text style={!isPress ? styles.unpressedText : styles.pressedText}>{props.time}</Text>
                </TouchableOpacity> 
    )
}

 

export default function CalendarModal( props ) {

    const [dates, setDates] = useState([])
    const [courses, setCourses] = useState([])
    const [markedDates, setMarkedDates] = useState({});
    const [servings, setServings] = useState(1)
    const user = useSelector(state => state.counter.token);

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
      recipe_id: props.recipe }
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
            handleModal()
            Alert.alert(
                "Recipe added",
                "Recipe added to your meal plan succesfully!",
                {text : "OK"}
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
    }
    
    var minDate = moment().format('YYYY-MM-DD');

    return (
      <ScrollView>
     <View style={styles.centeredView}>
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

            <View  style={styles.time}>
              <Text style={styles.unpressedText}>Servings</Text>
              <View style={{flexGrow : 1}}></View>
              <View style={{flexDirection : 'row', alignItems : 'center', marginHorizontal : 32}}>
                <MaterialIcons name="remove-circle" size={24} color="black" onPress={() => servings === 1 ? setServings(1) : setServings(servings - 1)} />
                <Text style={styles.unpressedText}>{servings}</Text>
                <MaterialIcons name="add-circle" size={24} color="black" onPress={() => setServings(servings + 1)} />
              </View>
            </View> 

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
                    keyExtractor={item => item.index.toString()}
                    numColumns={1}
                    />



                <Button type="primary" name="Schedule" onPress={() => handleClick()} />

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
    fontSize : 17,
    fontFamily : 'Poppins_500Medium',
    margin : 16,
    textAlign : 'center',
    flexGrow : 1
  },
  time: {
    borderRadius : 4,
    borderWidth : 1,
    borderColor : '#3b3b3b',
    backgroundColor : '#ffffff',
    margin : 16,
    flexDirection : 'row',
  },
  pressedText : {
    color : '#fff',
    fontSize : 17,
    margin : 16,
    textAlign : 'center',
    flexGrow : 1,
    fontFamily : 'Poppins_500Medium'
  },
  pressedTime : {
    borderRadius : 4,
    backgroundColor : '#54b8ec',
    margin : 16,
    flexDirection : 'row',
  },
  });