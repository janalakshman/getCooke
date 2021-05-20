import React ,{ useState, useEffect }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SelectMultiple from 'react-native-select-multiple'
import config from '../config';
import Button from '../components/Button'

const Item = ( props ) => {
    const [press, setPress] = useState(true);
    const setSelect = props.setSelect
    const select = props.select

    const handleClick = (item) => {

      if(press){
        setSelect((obj) => [...obj, item]) 
      }
        setPress(!press)
      }

    return (
        <TouchableOpacity style={styles.checkbox} onPress={() => handleClick(props.name)}>
            <MaterialIcons name={press ? "check-box-outline-blank" : "check-box"} size={24} color="black" /> 
            <Text style={styles.text}>{props.name.name}</Text>
        </TouchableOpacity>
    )
   
}
    
  


export default function TagModal( props ) {

    let appliances = props.tags['apps']
    let cuisine = props.tags['cuisine']
    let course = props.tags['course']

    let data = props.name === 'Cuisine' ? cuisine : props.name === 'Course' ? course : appliances

    let select = props.select
    let setSelect = props.setSelect


    const renderItem = ({item}) => (
        <View>
            <Item name={item} select={select} setSelect={setSelect}/>
        </View>
      );
    
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

              <View style={styles.modalView}>
                <Pressable onPress={() => props.setModalVisible(!props.modalVisible)}>
                  <View style={styles.header}>
                    <Text style={styles.heading}>{props.name}</Text>
                    <MaterialIcons name="close" size={24} color="#3b3b3b" style={{margin : 16, marginTop : 32}} />
                  </View>
                </Pressable>


              <ScrollView style={{width : '100%'}}>
                
              <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

              <View style={{margin : 8}} />

              <Button type="secondary" name = "Done" onPress={() => props.setModalVisible(!props.modalVisible)} />

              </ScrollView>
                                            
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
    fontSize : 21,
    margin : 16,
    marginTop : 32,
    flexGrow : 1,
    fontFamily : 'ExoSemiBold'
  },
  header : {
      backgroundColor : '#fff5e6',
      flexDirection : 'row',
      width : '100%',
      alignItems : 'center'
  },
  checkbox : {
      flexDirection : 'row', 
      alignItems : 'center',
      margin : 8,
      borderColor : '#cfcfcf',
      borderBottomWidth : 0.5
  }

  });