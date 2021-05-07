import React ,{ useState }from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput , Modal, Pressable} from 'react-native';

export default function SearchModal( props ) {
    return (
      <View>
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
                    <Text style={styles.heading}>Ingredients</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => props.setModalVisible(!props.modalVisible)}
                    >
                      <Text style={styles.text}>Onion</Text>
                      <Text style={styles.text}>Onion</Text>
                      <Text style={styles.text}>Onion</Text>
                    </Pressable>
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
      height : '100%'
    },
    modalView: {
      backgroundColor: "#fff",
      borderRadius: 0,
      alignItems: "flex-start",
      justifyContent : 'flex-start',
      width : '100%',
      height : '100%',
      position : 'absolute',
      bottom : 0,
      margin : 'auto'
    },
    text : {
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
  });
  