import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Title(props) {
  var [ isPress, setIsPress ] = useState(false);

  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }


    return(
        <View>
          {
          isPress ? 
          <View>
            <View style={styles.container}>
                <Feather name="check-circle" size={20} color="#3b3b3b" onPress={() => setIsPress(!isPress)} />
                <Text style={styles.clicked}>{props.item.name} </Text>
                <Text style={styles.clicked}>{props.item.amount} {props.item.unit} </Text>
            </View> 
          </View>
          :
          <View>
            <View style={styles.container}>
                <Feather name="circle" size={20} color="#3b3b3b" onPress={() => setIsPress(!isPress)} />
                <Text style={styles.unclicked}>{props.item.name}</Text>
                <Text style={styles.unclicked}>{props.item.amount} {props.item.unit}</Text>
            </View> 
          </View>  
          }
          <View style={{margin : 8}}></View>
            
        </View>
       
    )
}
  
  const styles = StyleSheet.create({
    unclicked : {
      color : '#3b3b3b',
      fontSize : 17,
      marginHorizontal : 16,
      fontFamily : 'Poppins_400Regular'
    },
    clicked : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'Poppins_400Regular',
      marginHorizontal : 16,
      textDecorationLine : 'line-through'
    },
    container : {
        margin : 8,
        flexDirection : 'row',
        justifyContent : 'flex-start'
    },
  });