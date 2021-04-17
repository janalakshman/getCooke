import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Header(props){
    const [count, setCount] = useState(props.servings)

    const increment = () => {
        setCount(count + 1)
        
    }

    const decrement = () => {
       {count === 1 ? setCount(1) : setCount(count - 1) } 
    }

    let [fontsLoaded] = useFonts({
      Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
    });

    if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    return(
        <View>
        {props.ingredients  ?
        <View> 
        <SafeAreaView style={styles.card} >
            <View style={styles.line}>
                <Text style={styles.heading}>Servings</Text>
                <View style={styles.line}>
                    <MaterialIcons name="remove-circle-outline" style={styles.icon} onPress={decrement}/>
                    <Text style={styles.heading}>{count}</Text>
                    <MaterialIcons name="add-circle-outline" style={styles.icon} onPress={increment}/>
                </View>
            </View>
            
            <View style={{margin : 8}} />

            <View style={styles.container}>
                {props.ingredients.map(ingredient =>
                        <View key={ingredient.id.toString()} style={styles.box}>
                            <Text style={styles.text}>{ingredient.ingredient.name.charAt(0).toUpperCase() + ingredient.ingredient.name.slice(1)} </Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.text}>{ingredient.qty == 0 ? '' : Math.round(ingredient.qty)} {(ingredient.fraction)} {ingredient.unit_name} </Text>
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
        width : '88%',
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
        margin : 16,
        textAlign : 'left'
    },
    line : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
    },
    text : {
        color : '#3b3b3b',
        fontSize : 17,
        fontFamily : 'SourceSansPro_400Regular',
        marginHorizontal : 16,
        textAlign : 'left',
        maxWidth : '55%',
        marginVertical : 8
      },
      box : {
          margin : 8,
          flexDirection : 'row',
          justifyContent : 'flex-start'
      },
  });