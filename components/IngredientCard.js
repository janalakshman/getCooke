import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Header(props){

    return(
        <View>
        {props.ingredients  ?
        <View> 
        <SafeAreaView style={styles.card} >
            <View style={styles.line}>
                <Text style={styles.heading}>Servings</Text>
                <View style={{flexGrow : 1}}></View>
                    {/* <MaterialIcons name="remove-circle-outline" style={styles.icon}/> */}
                        <Text style={styles.heading}>{props.servings}</Text>
                    {/* <MaterialIcons name="add-circle-outline" style={styles.icon}/> */}
            </View>
            
            <View style={{margin : 8}} />

            <View style={styles.container}>
                {props.ingredients.map(ingredient =>
                        <View key={ingredient.id.toString()} style={styles.box}>
                            <Text style={styles.text}>{ingredient.ingredient.name.charAt(0).toUpperCase() + ingredient.ingredient.name.slice(1)} </Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.unit}>{ingredient.qty == 0 && ingredient.fraction ? '' : Math.round(ingredient.qty)} {ingredient.fraction} {ingredient.unit_name ? (ingredient.unit_name.length > 4 ? ingredient.unit_name.substring(0,4) : ingredient.unit_name) : ''} </Text>
                        </View>
                    )}
            </View>
        </SafeAreaView>
        </View> : 
        <View style={{margin : 32}}>
        </View>}
     </View>
    )
}

const styles = StyleSheet.create({
    card : {
        width : '92%',
        margin : 32,
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
        fontSize : 19,
        color : '#3b3b3b',
        fontFamily : 'Poppins_600SemiBold',
        textAlign : 'right',
        marginHorizontal : 16
    },
    line : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
        marginHorizontal : 8
    },
    text : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'SourceSansPro_400Regular',
        marginHorizontal : 16,
        textAlign : 'left',
        width : '50%',
        marginVertical : 8
      },
      unit : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'SourceSansPro_400Regular',
        marginHorizontal : 16,
        textAlign : 'right',
        marginVertical : 8
      },
      box : {
          margin : 8,
          flexDirection : 'row',
          justifyContent : 'flex-start',
          alignItems : 'flex-end'
      },
  });