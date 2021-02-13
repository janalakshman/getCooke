import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header(props){
    return(
        <View>
                <View style={styles.bar}></View>

                <View style={styles.header}>
                    <Text style={styles.text}>{props.name}</Text>
                    <MaterialIcons name="account-circle" style = {styles.icon} />
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
    text : {
        flex : 1,
        color : '#fff',
        fontWeight : 'bold',
        fontSize : 24,
        paddingLeft : 16
    },
    icon : {
        paddingRight : 16,
        color : '#fff',
        fontSize : 24
    }

  });