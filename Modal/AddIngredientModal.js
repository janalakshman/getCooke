import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector} from 'react-redux'
import LoadingScreen from '../components/LoadingScreen'

export default function AddIngredientModal(props) {

  
    const [name, onChangeName] = useState('');
    const [quantity, onChangeQuantity] = useState('');
    const [ingredient, setIngredient] = useState({})

    const dispatch = useDispatch();

    // const handleClick = () => {
    //   setTimeout(handleModal, 2000)
    //   console.log(ingredient)
    //   dispatch(setIngredient(ingredient))
    //   dispatch(resetIngredient)
    //   onChangeName('')
    //   onChangeQuantity('')
    //   Alert.alert(
    //     "Ingredient added",
    //     "Good job remembering this one!",
    //     {text : "OK"}
    //     )
    // }

    const handleModal = () => {
      props.setModalVisible(false)
    }

    
    return (
      <View>
        
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
                            <Text style={styles.heading}>Add Ingredient</Text>
                            <AntDesign name="closecircle" size={24} color="#3b3b3b" style={{margin : 16, marginTop : 32}}/>
                          </View>
                        </Pressable>
    
                    
                        <Text style={styles.text}>Ingredient</Text>
    
                        <TextInput style={styles.textInput}
                                    placeholder = "Ingredient name"
                                     onChangeText={text => setIngredient(text)}
                                     value={name}/>
    
                        <Text style={styles.text}>Quantity</Text>
    
                        <TextInput style={styles.textInput}
                                    placeholder = "Quantity"
                                     onChangeText={text => setIngredient(text)}
                                     value={quantity}
                                     autoFocus/>
    
                        
                      <TouchableOpacity  style={styles.button} onPress={() => handleClick(props)}>
                          <Text style={styles.buttonText}>DONE</Text>
                      </TouchableOpacity>
    
                                                    
                      </View>
                  </Modal>
                      
          </View>
          </ScrollView>
        
      </View>
     
    )}
  
  const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
    },
    modalView: {
      backgroundColor: "#fff",
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
      fontFamily : 'Poppins_500Medium'
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
  },
  row : {
    width : '100%'
  },
  textInput : {
    borderRadius : 20,
    borderTopLeftRadius : 0,
    backgroundColor :  '#f1f1f1',
    height : 64,
    width : '90%',
    alignSelf : 'flex-start',
    padding : 16,
    margin : 16,
    fontFamily : 'Poppins_500Medium'
  },
  buttonText : {
    color : '#A13E00',
    fontSize : 17,
    margin : 8,
    flexGrow : 1,
    textAlign : 'center',
    fontFamily : 'Poppins_600SemiBold'
  },
  button: {
      borderRadius : 8,
      backgroundColor : '#ffc885',
      alignSelf : 'flex-start',
      margin : 16,
      flexDirection : 'row',
      alignSelf : 'center'
         },
      icon : {
          fontSize : 24,
          color : '#a13e00',
          paddingTop : 12,
          paddingBottom : 12,
          paddingLeft : 12,
          alignSelf : 'center'
      }, container: {
        flex: 1
      },
  });
  