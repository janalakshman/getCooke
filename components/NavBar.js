import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function Home(props) {

    const navigation = useNavigation();

 return (
     
            <View style={styles.navigation}>

                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')} >
                      <MaterialIcons name="home-filled" style={props.props === 'Home' ? styles.selectedIcon : styles.icon}/>
                      <Text style={props.props === 'Home' ? styles.selectedText : styles.text}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Discover')}>
                      <MaterialIcons name="search" style={props.props === 'Discover' ? styles.selectedIcon : styles.icon}/>
                      <Text style={props.props === 'Discover' ? styles.selectedText : styles.text}>Discover</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} >
                        <MaterialIcons name="event-note" style={props.props === 'Meal plan' ? styles.selectedIcon : styles.icon}/>
                        <Text style={props.props === 'Meal plan' ? styles.selectedText : styles.text}>Meal plan</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Profile')} >
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
  elevation: 3
},
tab : {
  alignItems : 'center',
  width : '25%',
},
icon : {
  color : 'rgba(207, 207, 207, 0.99)',
  fontSize : 30,
  margin : 4,
  paddingTop : 4
},
selectedIcon : {
  color : '#3b3b3b',
  fontSize : 30,
  margin : 4,
  paddingTop : 4
},
text : {
  fontFamily : 'ExoBold',
  fontSize : 10,
  color : 'rgba(207, 207, 207, 0.99)',
  paddingBottom : 4
},
selectedText : {
  fontFamily : 'ExoBold',
  fontSize : 10,
  color : '#3b3b3b',
  paddingBottom : 4
}
  
});
