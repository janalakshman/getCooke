import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import LoadingScreen from './LoadingScreen'


export default function Header(props){
    console.log(props.recipe.servings)

    return(
        <View style={styles.card}>
            <View style={styles.line}>
                <Text style={styles.heading}>{props.recipe.servings}</Text>
                <Text style={styles.heading}>{props.recipe.servings === 1 ? 'serving' : 'servings'}</Text>
                    {/* <MaterialIcons name="remove" style={styles.icon} onPress={() => servings === 1 ? setServings(1) : setServings(servings - 1)}/> */}
                    {/* <MaterialIcons name="add" style={styles.icon}  onPress={(count) => setServings(count + 1)}/> */}
            </View>
            
            <View style={{margin : 8}}/>

            <View style={styles.container}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Calories</Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.unit}>{props.recipe.calories} calories</Text>
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.text}>Carbohydrates</Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.unit}>{props.recipe.carbohydrate} g</Text>
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.text}>Proteins</Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.unit}>{props.recipe.proteins} g</Text>
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.text}>Fat</Text>
                            <View style={{flexGrow : 1}}></View>
                            <Text style={styles.unit}>{props.recipe.fat} g</Text>
                        </View>
            </View>
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
        color : '#3b3b3b',
        fontFamily : 'Poppins_500Medium',
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
        fontFamily : 'SourceSansPro_400Regular',
        marginHorizontal : 16,
        textAlign : 'left',
        width : '50%',
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
          flexDirection : 'row',
          justifyContent : 'flex-start',
          alignItems : 'flex-end',
          borderColor : '#cfcfcf',
          borderBottomWidth : 0.3,
          padding : 8
      },
  });