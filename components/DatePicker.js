import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { ExoRegular} from '@expo-google-fonts/source-sans-pro';
import LoadingScreen from './LoadingScreen'


export default function DatePicker(props) {


      let fromDate = props.from.split(/\s/)[0]
      let fromMonth = props.from.split(/\s/)[1]
      let fromDay = props.from.split(/\n/)

      let toDate = props.to.split(/\s/)[0]
      let toMonth = props.to.split(/\s/)[1]
      let toDay = props.from.split(/\n/)


    return(
        <View style={styles.container}>
            
            <View style={styles.line} >  
                <Text style={styles.text}>{fromDate} {fromMonth.substring(0,3)}</Text>
                <Text style={styles.body}>{fromDay[1].substring(0,3)}</Text>
            </View> 

            <Text style={styles.body}>to</Text>

            <View style={styles.line}>  
                <Text style={styles.text}>{toDate} {toMonth.substring(0,3)}</Text>
                <Text style={styles.body}>{toDay[1].substring(0,3)}</Text>
            </View> 

        </View>
          
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'ExoSemiBold',
    },
    body : {
        color : '#3b3b3b',
        fontSize : 14,
        fontFamily : 'ExoRegular'
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