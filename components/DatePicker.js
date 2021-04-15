import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'


export default function DatePicker(props) {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });

      let fromDate = props.from.split(/\s/)[0]
      let fromMonth = props.from.split(/\s/)[1]
      let fromDay = props.from.split(/\n/)

      let toDate = props.to.split(/\s/)[0]
      let toMonth = props.to.split(/\s/)[1]
      let toDay = props.from.split(/\n/)

      console.log(fromDay[1])

    
      if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    return(
        <View style={styles.container}>
            
            <View style={styles.line} >  
                <Text style={styles.text}>{fromDate} {fromMonth.substring(0,3)}</Text>
                <Text style={styles.body}>{fromDay[1]}</Text>
            </View> 

            <Text style={styles.body}>to</Text>

            <View style={styles.line}>  
                <Text style={styles.text}>{toDate} {toMonth.substring(0,3)}</Text>
                <Text style={styles.body}>{toDay[1]}</Text>
            </View> 

        </View>
          
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 19,
      fontFamily : 'Poppins_500Medium',
    },
    body : {
        color : '#3b3b3b',
        fontSize : 14,
        fontFamily : 'Poppins_400Regular'
    },
    line : {
        flexDirection : 'column',
        alignItems : 'center',
        width : '30%',
        marginVertical : '5%',
        marginHorizontal : '8%',
        padding : '3%',
        backgroundColor : '#f1f1f1',
        borderRadius : 20,
        borderTopLeftRadius : 0
    },
    container : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    }
  }); 