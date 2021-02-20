import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function BottomNav( {navigation} ) {
 
    return(
        <View style={styles.containerNav}>
                <TouchableOpacity style={styles.tab}   onPress={() => navigation.navigate('Home')}> 
                    <MaterialIcons name="home" style={styles.icon} />
                    <Text style={styles.text}>HOME</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Discover')} > 
                    <MaterialIcons name="search" style={styles.icon} />
                    <Text style={styles.text}>DISCOVER</Text>
                </TouchableOpacity> 

                <TouchableOpacity  style={styles.tab} onPress={() => navigation.navigate('MealPlan')} > 
                    <MaterialIcons name="calendar-today" style={styles.icon} fontSize={22}/>
                    <Text style={styles.text}>MEAL PLAN</Text>
                </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    containerNav : {
        flex : 1,
        height : 56,
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
        elevation: 5
    },
    text : {
        fontSize : 11,
        color : '#a13e00',
        fontWeight : '600'    
    },
    tab : {
        alignItems : 'center',
        width : '33.33%'
    },
    icon : {
        color : '#a13e00',
        fontSize : 24,
        paddingBottom : 4,
    }

})