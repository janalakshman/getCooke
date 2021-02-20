import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCardIcon from '../assets/calendarCardIcon.png';

export default function Header(props){
    return(
        <View style={styles.card}>
            <View style={styles.line}>
                <Text style={styles.text}>458</Text>
                <Text style={styles.smalltext}>Cooked meals</Text>     
            </View>

            <View style={styles.line}>
                <Text style={styles.text}>1252</Text>
                <Text style={styles.smalltext}>Cooking mins</Text>     
            </View>

         


        </View>
        
    )
}

const styles = StyleSheet.create({
    card : {
        flexDirection : 'row',
        padding : 8,
        margin : 32,
        borderRadius : 8,
        borderWidth : 2,
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
      margin : 4,
  },
  
  });