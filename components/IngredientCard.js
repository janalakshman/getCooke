import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from 'react-native-elements';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Header(props){ 
    var [ isPress, setIsPress ] = useState(false);

    let [fontsLoaded] = useFonts({
      Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
    });

    if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    return(
        <View style={{backgroundColor : '#fff5e6'}}>
        { props.ingredients  ? 
        <SafeAreaView style={styles.card} >
            <View style={styles.line}>
                <Text style={styles.heading}>Servings</Text>
                <View style={styles.line}>
                    <MaterialIcons name="remove-circle-outline" style={styles.icon} onPress={props.decrement}/>
                    <Text style={styles.heading}>{props.count}</Text>
                    <MaterialIcons name="add-circle-outline" style={styles.icon} onPress={props.increment}/>
                </View>
            </View>

            <View style={{margin : 8}} />

                <View style={styles.container}>
                    {props.ingredients.map(ingredient =>
                            <View style={styles.box}>
                                <Text style={styles.text}>{ingredient.ingredient.name} </Text>
                                <View style={{flexGrow : 1}}></View>
                                <Text style={styles.text}>{ingredient.qty*props.count} {ingredient.unit_name} </Text>
                            </View>
                        )}
                </View>
        </SafeAreaView> : 
        <View style={styles.card}>
        </View>}
     </View>
    )
}

const styles = StyleSheet.create({
    card : {
        width : '88%',
        paddingRight : 32, 
        margin : 32,
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
        margin : 16,
        alignSelf : 'center',
    },
    line : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
    },
    text : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'Poppins_400Regular',
        marginHorizontal : 16,
        maxWidth : '50%',
      },
      box : {
          margin : 8,
          flexDirection : 'row',
          justifyContent : 'flex-start'
      },
  });