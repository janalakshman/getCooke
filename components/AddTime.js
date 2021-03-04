import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { addTime } from '../redux/counterSlice'


export default function Filter(props) {
  var [ isPress, setIsPress ] = useState(false);
  const dispatch = useDispatch()

  const handleClick = (props) => {
    isPress = !isPress
    setIsPress(isPress)
    if(isPress){
      dispatch(addTime(props))
    } 
  }


    return(
          <View>
            {
            isPress === false ?
            <TouchableOpacity  style={styles.button} onPress={() => handleClick(props.time)}>
              <Text style={styles.buttonText}>{props.name}</Text>
              <View style={styles.line}>
                <MaterialIcons name="access-time" style={styles.icon} />
                <Text style={styles.timeText}>{props.time}</Text>
              </View>

            </TouchableOpacity> :
             <View> 
              <TouchableOpacity  style={styles.buttonP} onPress={() => handleClick(props.time)}>
                  <Text style={styles.buttonText}>{props.name}</Text>
                    <View style={styles.line}>
                        <MaterialIcons name="access-time" style={styles.icon} />
                        <Text style={styles.timeText}>{props.time}</Text>
                    </View>
              </TouchableOpacity>
            </View> 
            } 
            
          </View> 
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#3b3b3b',
      fontSize : 14,
      fontWeight : '400',
      margin : 8,
      textAlign : 'center',
    },
    timeText : {
        color : '#3b3b3b',
      fontSize : 11,
      fontWeight : '400',
      margin : 8,
      textAlign : 'center',
    },
    button: {
        borderRadius : 8,
        borderWidth : 1,
        borderColor : '#cfcfcf',
        backgroundColor : '#fff',
        margin : 16,
        flexDirection : 'column',
        justifyContent : 'center',
        alignContent : 'center',
        alignSelf : 'center'
           },
           
           buttonTextP : {
            color : '#3b3b3b',
            fontSize : 14,
            fontWeight : '400',
            margin : 12,
            padding : 4,
          },
      
          buttonP : {
              borderRadius : 8,
              backgroundColor : '#ffc885',
              alignSelf : 'center',
              margin : 16,
              flexDirection : 'column',
              justifyContent : 'center'
                 },
      
          icon : {
              fontSize : 16,
              color : '#3b3b3b',
              paddingLeft : 0,
              alignSelf : 'center'
          },
          line : {
              flexDirection : 'row',
              marginHorizontal : 8
            
          },

  });