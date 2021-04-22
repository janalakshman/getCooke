import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { addTime } from '../redux/counterSlice'
import LoadingScreen from '../LoadingScreen'

export default function Filter(props) {


  var [ isPress, setIsPress ] = useState(false);
  const setCourses = props.setCourses

  const handleClick = (props) => {
    setCourses(courses => [...courses, props])
    setIsPress(!isPress)
  }


    return(
              <View>
              {
                !isPress ?
                <TouchableOpacity  style={styles.time} onPress={() => handleClick(props.name)}>
                  <Text style={styles.unpressedText}>{props.name}</Text>
                  <Text style={styles.unpressedText}>{props.time}</Text>
                </TouchableOpacity> 
                :
                 <View> 
                  <TouchableOpacity  style={styles.pressedTime} onPress={() => handleClick(props.name)}>
                      <Text style={styles.pressedText}>{props.name}</Text>
                      <Text style={styles.pressedText}>{props.time}</Text>
                  </TouchableOpacity>
                </View> 
                }
              </View> 
    )
}
  
  const styles = StyleSheet.create({
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