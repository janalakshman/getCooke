import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';


export default function Header(props){

    

    return(
        <View style={styles.card}>
        {props.ingredients  ?
        <View>
            <View style={styles.line}>
                <Text style={styles.heading}>{props.servings}</Text>
                <Text style={styles.heading}>{props.servings === 1 ? 'serving' : 'servings'}</Text>
                    {/* <MaterialIcons name="remove" style={styles.icon} onPress={() => servings === 1 ? setServings(1) : setServings(servings - 1)}/> */}
                    {/* <MaterialIcons name="add" style={styles.icon}  onPress={(count) => setServings(count + 1)}/> */}
            </View>
            
            <View style={{margin : 8}}/>

            <View style={styles.container}>
                {props.ingredients.map(ingredient =>
                        <View key={ingredient.id.toString()} style={styles.box}>
                            <Text style={styles.text}>{ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)} </Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.unit}>{Math.round(ingredient.qty)} {ingredient.unit_name ? (ingredient.unit_name.length > 4 ? ingredient.unit_name.substring(0,4) : ingredient.unit_name) : ''} </Text>
                        </View>
                    )}
            </View>
        </View>
             : 
        <View style={{margin : 32}}>
        </View>}
     </View>
    )
}

const styles = StyleSheet.create({
    card : {
        width : '100%',
        margin : 16,
        marginTop : 0,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#fff',
        flexGrow : 1,
        // borderTopLeftRadius : 0,
        // borderRadius : 20,
        // borderWidth : 1,
        // borderColor : '#cfcfcf'
        // elevation : 3,
        // shadowRadius : 3,
        // shadowOpacity : 0.5,
        // shadowColor : 'rgba(0, 0, 0, 0.25)',
        // shadowOffset : {width : 0, height : 4},
    },
    container : {
        width : '100%',
        marginBottom : 16,
        paddingHorizontal : 4
    },
    icon : {
        fontSize : 24,
        margin : 16,
    },
    heading : {
        fontSize : 17,
        color : '#333333',
        fontFamily : 'ExoRegular',
        textAlign : 'center',
        marginHorizontal : 4,
        margin : 0
    },
    line : {
        flexDirection : "row",
        justifyContent : 'flex-end',
        marginHorizontal : 16,
        marginTop : 0,
    },
    text : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'ExoRegular',
        marginHorizontal : 16,
        textAlign : 'left',
        width : '50%',
      },
      unit : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'ExoRegular',
        marginHorizontal : 16,
        textAlign : 'right',
        marginVertical : 4
      },
      box : {
          flexDirection : 'row',
          justifyContent : 'flex-start',
          alignItems : 'flex-end',
          borderColor : '#cfcfcf',
          borderBottomWidth : 0.5,
          padding : 8
      },
  });