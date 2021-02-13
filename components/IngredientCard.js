import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';

const ingredient = [{name : 'Onion',
                        amount : '200',
                        fraction : '',
                        unit : 'g'},
                        {name : 'Onion',
                        amount : '200',
                        fraction : '',
                        unit : 'g'},
                        {name : 'Onion',
                        amount : '200',
                        fraction : '',
                        unit : 'g'},];

export default function Header(){   
    const [count, setCount] = useState(1)
    
    function increment(){
    setCount(count+1)
    }

    function decrement(){
        count === 1 ? setCount(count) :  setCount(count-1); 
    }

    return(
        <SafeAreaView style={styles.card} >
            <View style={styles.line}>
                <Text style={styles.text}>Servings</Text>
                <View style={styles.line}>
                    <MaterialIcons name="remove-circle-outline" style={styles.icon} onPress={decrement}/>
                    <Text style={styles.text}>{count}</Text>
                    <MaterialIcons name="add-circle-outline" style={styles.icon} onPress={increment}/>
                </View>
            </View>

            <Divider />
                <View style={styles.container}>
                    {ingredient.map(ingredient =>
                        <View> 
                            <Text style={styles.smalltext}>{ingredient.amount*count} {ingredient.unit} {ingredient.name}</Text>
                            <Divider />
                        </View>         
                        )}
                </View>
        </SafeAreaView>
     
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