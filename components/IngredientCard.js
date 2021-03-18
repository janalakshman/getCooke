import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';

export default function Header(props){ 
    return(
        <View>
        { props.ingredients  ? 
        <SafeAreaView style={styles.card} >
            <View style={styles.line}>
                <Text style={styles.text}>Servings</Text>
                <View style={styles.line}>
                    <MaterialIcons name="remove-circle-outline" style={styles.icon} onPress={props.decrement}/>
                    <Text style={styles.text}>{props.count}</Text>
                    <MaterialIcons name="add-circle-outline" style={styles.icon} onPress={props.increment}/>
                </View>
            </View>

            <Divider />
                <View style={styles.container}>
                    {props.ingredients.map(ingredient =>
                        <View> 
                            <Text style={styles.smalltext}>{ingredient.qty*props.count} {ingredient.unit_name} {ingredient.ingredient.name}</Text>
                            <Divider />
                        </View>         
                        )}
                </View>
        </SafeAreaView> : <View style={styles.card}></View>}
     </View>
    )
}

const styles = StyleSheet.create({
    card : {
        width : '88%',
        padding : 8,
        margin : 16,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        borderRadius : 4,
        alignSelf : 'center'
    },
    container : {
        width : '90%',
        alignSelf : 'center',
        marginBottom : 16
    },
    icon : {
        fontSize : 24,
        margin : 16,
    },
    text : {
        fontSize : 19,
        color : '#3b3b3b',
        fontWeight : '600',
        margin : 16,
        alignSelf : 'center',
    },
    smalltext : {
        fontSize : 17,
        color : '#3b3b3b',
        margin: 16,
    },
    line : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
    },
  });