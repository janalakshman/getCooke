import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '../redux/counterSlice'


export default function Filter(props) {
  let [isPress, setIsPress] = useState(false)
  const dispatch = useDispatch()
  const filters = useSelector(state => state.counter.filters)
  let selected = filters.filter(word => word === props.name)
  

  const handleClick = (props) => {
    isPress = !isPress
    setIsPress(isPress)
    if(isPress){
      dispatch(addFilter(props))
    } else {
      dispatch(removeFilter(props))
    }
  }


    return(
          <View>
            {
            isPress === false ?
            <TouchableOpacity  style={styles.button} onPress={() => handleClick(props.name)}>
              <Text style={styles.buttonText}>{props.name}</Text>
            </TouchableOpacity> :
             <View> 
              <TouchableOpacity  style={styles.buttonP} onPress={() => handleClick(props.name)}>
                  <Text style={styles.buttonTextP}>{props.name}</Text>
                  <MaterialIcons name="close" style={styles.icon} />
              </TouchableOpacity>
            </View> 
            } 
            
          </View> 
    )
}
  
  const styles = StyleSheet.create({
    buttonText : {
      color : '#3b3b3b',
      fontSize : 16,
      fontWeight : '400',
      margin : 12,
      padding : 4,
      textAlign : 'center',
      flexGrow : 0.5
    },
    button: {
        borderRadius : 32,
        borderWidth : 1,
        borderColor : '#cfcfcf',
        backgroundColor : '#fff',
        alignSelf : 'flex-start',
        margin : 16,
        flexDirection : 'row',
        justifyContent : 'center',
        alignContent : 'center',
        alignSelf : 'center'
           },
           
           buttonTextP : {
            color : '#3b3b3b',
            fontSize : 16,
            fontWeight : '400',
            margin : 12,
            padding : 4,
          },
      
          buttonP : {
              borderRadius : 32,
              backgroundColor : '#ffc885',
              alignSelf : 'flex-start',
              margin : 16,
              flexDirection : 'row',
              justifyContent : 'center'
                 },
      
          icon : {
              fontSize : 20,
              color : '#3b3b3b',
              padding : 12,
              paddingLeft : 0,
              alignSelf : 'center'
          }

  });