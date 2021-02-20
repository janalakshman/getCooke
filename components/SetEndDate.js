import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AddTime from './AddTime'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment'
import SecondaryButton from './SecondaryButton'



export default function CalendarModal( props ) {
    const [enddate, setEndDate ] = useState([])
    const [markedDates, setMarkedDates] = useState({});

    const getSelectedDates = (date) => {
      let markedDates = {};
      markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
      let serviceData = moment(date);
      setEndDate(serviceData)
      setMarkedDates(markedDates)
    }
    
    var minDate = moment().format('YYYY-MM-DD');

    return (
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
  
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                      <View style={styles.header}>
                        <Text style={styles.heading}>Set end date</Text>
                        <AntDesign name="closecircle" size={24} color="#3b3b3b" style={{margin : 16}}/>
                      </View>
                    </Pressable>


                  <ScrollView style={styles.row}>

                 <Calendar 
                      theme={{
                        indicatorColor : '#ffc885',
                        textMonthFontWeight : '600',
                        arrowColor : '#3b3b3b',
                      }}
                      minDate={minDate}
                      markedDates={markedDates}
                      disableMonthChange={true}
                      monthFormat={"MMMM yyyy "}
                      onDayPress={day => {
                        getSelectedDates(day.dateString);
                      }}
                      />

                      <SecondaryButton name="Submit" />
                  </ScrollView>
                                                
                  </View>
                </View>
              </Modal>
                  
      </View>
          
    );
  }
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      width : '100%',
      height : '60%'
    },
    modalView: {
      backgroundColor: "#fff",
      borderTopRightRadius: 20,
      borderTopLeftRadius : 20,
      alignItems: "flex-start",
      justifyContent : 'flex-start',
      width : '100%',
      height : '75 %',
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
    fontWeight : '600',
    margin : 16,
    flexGrow : 1
  },
  header : {
      backgroundColor : '#fff5e6',
      flexDirection : 'row',
      borderTopLeftRadius : 20,
      borderTopRightRadius : 20,
      width : '100%',
      alignItems : 'center'
  },
  row : {
    width : '100%'
  }
  });