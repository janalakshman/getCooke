import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCardIcon from '../assets/calendarCardIcon.png';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function Header(props){

    const navigation = useNavigation(); 

    return(
        <ScrollView style={styles.breakfastcard}>
            <Pressable onPressIn ={() => navigation.navigate('RecipeFullDetail')}>
            <View style={styles.line}>
                <Image 
                    source={CalendarCardIcon}
                    style={styles.imageIcon} />
                <Text style={styles.text}>Paneer Butter Masala</Text>  
            </View>
            </Pressable>   


            <View style={styles.line}>
                <MaterialIcons name="nights-stay" style={styles.icon} />
                <Text style={styles.smalltext}>Overnight prep</Text> 

                <MaterialIcons name="access-time" style={styles.icon} />
                <Text style={styles.smalltext}>7:30 PM</Text>
            </View>
 
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    breakfastcard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fbfbb6',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
    lunchcard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#b6d2fb',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
    brunchcard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#e5f9d2',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
    snackscard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#edb6fb',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
    dinnercard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fbb6b6',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8
    },
  imageIcon : {
      height : 16,
      width : 21.5,
  },
  icon : {
      fontSize : 16,
      color : '#3b3b3b',
      margin : 4,
  },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      marginLeft : 16
  },
  smalltext : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4
  },
  line : {
      flexDirection : "row",
      margin : 4
  }
  });