import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToBuyItem from './ToBuyItem'

export default function ToBuy(){   
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
        shadowRadius : 3,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    unclicked : {
        color : '#3b3b3b',
        fontSize : 17,
        marginHorizontal : 16,
        fontFamily : 'Poppins_400Regular'
      },
      clicked : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'Poppins_400Regular',
        marginHorizontal : 16,
        textDecorationLine : 'line-through'
      },
      container : {
          margin : 8,
          flexDirection : 'row',
          justifyContent : 'flex-start'
      },
  });