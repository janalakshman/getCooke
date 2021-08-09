import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function Home(props) {

    const navigation = useNavigation();

 return (
     
            <View style={styles.navigation}>
                    <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}>
                      <MaterialIcons name="home-filled" style={props.props === 'Home' ? styles.selectedIcon : styles.icon}/>
                      <Text style={props.props === 'Home' ? styles.selectedText : styles.text}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} >
                        <MaterialIcons name="event-note" style={props.props === 'Meal plan' ? styles.selectedIcon : styles.icon}/>
                        <Text style={props.props === 'Meal plan' ? styles.selectedText : styles.text}>Meal plan</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('AddRecipe')} >
                        <MaterialIcons name="create" style={props.props === 'AddRecipe' ? styles.selectedIcon : styles.icon}/>
                        <Text style={props.props === 'AddRecipe' ? styles.selectedText : styles.text}>Create</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} >
                      <MaterialIcons name="account-box" style={props.props === 'Profile' ? styles.selectedIcon : styles.icon}/>
                      <Text style={props.props === 'Profile' ? styles.selectedText : styles.text}>Profile</Text>
                    </TouchableOpacity>
            </View>

  );
}

const styles = StyleSheet.create({
 navigation : {
  backgroundColor : '#fff',
  flexDirection : 'row',
  justifyContent : 'center',
  alignItems : 'center',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 3,
  paddingBottom : 8
},
tab : {
  alignItems : 'center',
  width : '25%',
},
icon : {
  color : 'rgba(207, 207, 207, 0.99)',
  fontSize : 30,
  paddingVertical : 8,
  paddingBottom : 4
},
selectedIcon : {
  color : '#333',
  fontSize : 30,
  paddingVertical : 8,
  paddingBottom : 4
},
selectedText : {
  color : '#333',
  fontSize : 10,
  paddingVertical : 2,
  fontFamily : 'ExoSemiBold'
},
text : {
  color : 'rgba(207, 207, 207, 0.99)',
  fontSize : 10,
  paddingVertical : 2,
  fontFamily : 'ExoSemiBold'
},

  
});
