import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToBuyItem from './ToBuyItem'
import BoughtItem from './BoughtItem'


export default function Header(){   
    const [count, setCount] = useState(1)
    const [tobuy, setTobuy] = useState([
        {name : 'Onionpotatot', amount : '200', fraction : '', unit : 'g', key : '1'},
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
        paddingHorizontal : 32, 
        margin : 32,
        paddingBottom : 8,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#ffffff',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
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