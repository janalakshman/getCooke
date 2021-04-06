import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import { addTime } from '../redux/counterSlice'
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Filter(props) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

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
            {!fontsLoaded ? <LoadingScreen /> :
            (
              <View>
              {
                !isPress ?
                <TouchableOpacity  style={styles.button} onPress={() => handleClick(props.time)}>
                  <Text style={styles.text}>{props.name}</Text>
                  <Text style={styles.text}>{props.time}</Text>
                </TouchableOpacity> 
                :
                 <View> 
                  <TouchableOpacity  style={styles.pressedButton} onPress={() => handleClick(props.time)}>
                      <Text style={styles.pressedText}>{props.name}</Text>
                      <Text style={styles.pressedText}>{props.time}</Text>
                  </TouchableOpacity>
                </View> 
                }
              </View> 
            )}

          </View> 
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'Poppins_500Medium',
      margin : 16,
      textAlign : 'center',
      flexGrow : 1
    },
    button: {
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
    pressedButton : {
      borderRadius : 4,
      backgroundColor : '#54b8ec',
      margin : 16,
      flexDirection : 'row',
    },
  });