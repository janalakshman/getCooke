import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FilterUnselected from './FilterUnselected'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionList } from 'react-native';


const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"],
    index : 1,
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    index : 2,

  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"],
    index : 3,

  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"],
    index : 4,

  }
];

const Item = ({ title }) => {
  return(
    <View>
      <FilterUnselected name={title}/>
    </View>)
};

export default function FilterModal( props ) {


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
                        <Text style={styles.heading}>Add filters</Text>
                        <AntDesign name="closecircle" size={24} color="#3b3b3b" style={{margin : 16}}/>
                      </View>
                    </Pressable>

                  <ScrollView style={styles.row}>
                  <SectionList
                        sections={DATA}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                          <Text style={styles.text}>{title}</Text>
                        )}
                      />
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
      height : '90 %',
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
  