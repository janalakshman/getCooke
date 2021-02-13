import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HeaderBack(props){
    return(
        <View style={styles.position}>
                <View style={styles.bar}></View>

                <View style={styles.header}>
                    <MaterialIcons name="arrow-back-ios" style = {styles.iconRight} />
                    <MaterialIcons name="calendar-today" style = {styles.icon} />
                    <MaterialIcons name="favorite" style = {styles.icon} />
                </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    bar : {
        backgroundColor : '#fa9332',
        width : '100%',
        height : 32, 
    },
    header : {
        flexDirection : 'row',
        backgroundColor : '#fa9332',
        width : '100%',
        height : 52,
        alignItems : 'center',
    },
    icon : {
        paddingRight : 16,
        paddingLeft : 16,
        color : '#fff',
        fontSize : 24
    },
    iconRight : {
        paddingRight : 16,
        paddingLeft : 16,
        color : '#fff',
        fontSize : 24,
        flex : 1
    }

  });