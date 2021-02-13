import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCardIcon from '../assets/calendarCardIcon.png';

export default function Header(props){
    return(
        <View style={styles.card}>
            <View style={styles.line}>
                <Text style={styles.text}>458</Text>
                <Text style={styles.smalltext}>Calories</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>12g</Text>
                <Text style={styles.smalltext}>Carbs</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>20g</Text>
                <Text style={styles.smalltext}>Protein</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>25g</Text>
                <Text style={styles.smalltext}>Fat</Text>     
            </View>

        </View>
        
    )
}

const styles = StyleSheet.create({
    card : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fff5e6',
        padding : 8,
        margin : 16,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        borderWidth : 2,
        borderRightColor : '#ffffff',
        borderColor : '#cfcfcf'
    },
    line : {
        flexDirection : "column",
        flex : 1,
        alignItems : 'center'
    },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      margin : 8,
      fontWeight : '600'
  },
  smalltext : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4
  },
  
  });