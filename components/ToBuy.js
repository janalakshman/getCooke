import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToBuyItem from './ToBuyItem'

export default function ToBuy(props){  

    return(
        <SafeAreaView style={styles.card} >
            <FlatList 
                data={props.ingredients}
                keyExtractor={item => item.key}
                renderItem={( {item} ) => (
                    <ToBuyItem item={item}/>
                )
                }/>
        </SafeAreaView>
     
    )
}

const styles = StyleSheet.create({
    card : {
        width : '92%',
        paddingHorizontal : 16, 
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