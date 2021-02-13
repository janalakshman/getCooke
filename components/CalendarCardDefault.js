import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCardIcon from '../assets/calendarCardIcon.png';

export default function Header(props){
    return(
        <ScrollView style={styles.card}>
           <Text style={styles.text}>Add recipes to your calendar from the recipe page</Text>
 
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    card : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#FBFBB6',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      marginLeft : 16
  },

  });