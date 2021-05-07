import React from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity , Modal, Pressable, SectionList, FlatList, TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function NavBar(props) {

    const navigation = useNavigation();

 return (
            <View style={styles.navigation}>
                    <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}>
                      <MaterialIcons name="home-filled" style={props.name == 'Home' ? styles.selectedIcon : styles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Meal plan')} >
                        <MaterialIcons name="event-note" style={props.name == 'Meal plan' ? styles.selectedIcon : styles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('AddRecipe')} >
                      <MaterialIcons name="create" style={props.name == 'Create Recipe' ? styles.selectedIcon : styles.icon}/>
                    </TouchableOpacity>

                    <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('Grocery list')} >
                        <MaterialIcons name="list-alt" style={props.name == 'Grocery list' ? styles.selectedIcon : styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')} >
                        <MaterialIcons name="account-box" style={props.name == 'Profile' ? styles.selectedIcon : styles.icon}/>
                    </TouchableOpacity>

                    
            </View>
  );
}

const styles = StyleSheet.create({
 navigation : {
  backgroundColor : '#ffffff',
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
},
tab : {
  alignItems : 'center',
  width : '20%',
  marginVertical : 4
},
icon : {
  color : 'rgba(207, 207, 207, 0.99)',
  fontSize : 30,
  margin : 16
},
selectedIcon : {
  color : '#3b3b3b',
  fontSize : 30,
  margin : 16
},
 
});
