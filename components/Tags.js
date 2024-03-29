import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFilter } from '../redux/counterSlice'
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Tags(props) {
  const dispatch = useDispatch();
  const name = props.name

  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

  const handleClick = () => (
    dispatch(removeFilter(name))
  );
    return(
          <View> 
            <TouchableOpacity  style={styles.button} onPress={() => handleClick()}>
                <Text style={styles.buttonText}>{props.name}</Text>
                <MaterialIcons name="close" style={styles.icon} />
            </TouchableOpacity>
          </View> 
    )
}
  
  const styles = StyleSheet.create({ 
    buttonText: {
      color : '#3b3b3b',
      fontSize : 14,
      fontFamily : 'Poppins_400Regular',
      margin : 8,
      padding : 4,
    },

    button : {
        borderRadius : 20,
        borderTopLeftRadius : 0,
        backgroundColor : '#ffc885',
        alignSelf : 'flex-start',
        margin : 4,
        marginLeft : 16,
        flexDirection : 'row',
        justifyContent : 'center'
           },
           icon : {
            fontSize : 16,
            color : '#3b3b3b',
            padding : 12,
            paddingLeft : 0,
            alignSelf : 'center'
        }
  });