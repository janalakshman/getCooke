import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Title from './Title'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment'
import SecondaryButton from './SecondaryButton'
import { TextInput } from 'react-native-gesture-handler';



export default function CalendarModal( props ) {
    const [name, onChangeName] = React.useState('');
    const [quantity, onChangeQuantity] = React.useState('');


    
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
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                      <View style={styles.header}>
                        <Text style={styles.heading}>Add Ingredient</Text>
                        <AntDesign name="closecircle" size={24} color="#3b3b3b" style={{margin : 16}}/>
                      </View>
                    </Pressable>

                    <Text style={styles.text} > Ingredient</Text>

                    <TextInput style={styles.textInput}
                                placeholder = "Ingredient name"
                                 onChangeText={text => onChangeName(text)}
                                 value={name}/>

                    <Text style={styles.text} > Quantity</Text>

                    <TextInput style={styles.textInput}
                                placeholder = "Quantity"
                                 onChangeText={text => onChangeQuantity(text)}
                                 value={quantity}
                                 autoFocus/>



                    <SecondaryButton name="Done" />

                                                
                  </View>
              </Modal>
                  
      </View>
      </ScrollView>
          
    );
  }
  
  const styles = StyleSheet.create({
    centeredView: {
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
      height : '95 %',
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
  },
  textInput : {
      width : '80%',
      backgroundColor : "#f1f1f1",
      borderRadius : 10,
      height : 38,
      alignSelf : 'center',
      paddingLeft : 16,
      margin : 16
  }
  });
  