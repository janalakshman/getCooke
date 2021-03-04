import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToBuyItem from './ToBuyItem'
import BoughtItem from './BoughtItem'


export default function Header(){   
    const [count, setCount] = useState(1)
    const [tobuy, setTobuy] = useState([
        {name : 'Onion', amount : '200', fraction : '', unit : 'g', key : '1'},
        {name : 'Onion', amount : '200', fraction : '', unit : 'g', key : '2'},
        {name : 'Onion', amount : '200', fraction : '', unit : 'g', key : '3'},
        ]);


    return(
        <SafeAreaView style={styles.card} >
            <FlatList 
                data={tobuy}
                renderItem={( {item} ) => (
                    <ToBuyItem item={item}/>
                )
                }/>
        </SafeAreaView>
     
    )
}

const styles = StyleSheet.create({
    card : {
        width : '88%',
        padding : 8,
        margin : 16,
        paddingBottom : 8,
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