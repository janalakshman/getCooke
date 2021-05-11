import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import config from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { typeOf } from 'mathjs';

export default function Header(props){
    const navigation = useNavigation();
    const user = useSelector(state => state.counter.token);


      const handleDelete = () => {
        Alert.alert(
            "Delete recipe",
            "Are you sure you want to delete the recipe from your meal plan?",
            [ {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Delete", onPress: () => {
                fetch(
                    config.api + `/v1/event/`+props.event.title.id,
                    {
                      method: "DELETE",
                      headers: {
                        "Authorization":'Token ' +user.token,
                        "Content-Type": "application/json"
                      },
                      mode: "cors",
      
                    }
                  )
                    .then(res => res.json())
                    .then(response => {
                        navigation.navigate('Meal plan')
                    })
                    .catch(error => console.log(error));
              } }
            ]
          );
        
      }

      const course = (props.event.title.course).split(",")[0]

      return (
            <View>
                <View style={ course === 'Breakfast' ? styles.breakfastcard : course === 'Brunch' ? 
                styles.brunchcard : course === 'Lunch' ? styles.lunchcard : course=== 'Snacks' ? styles.snackscard : styles.dinnercard}>  
                    <Pressable onPressIn ={() => navigation.navigate('RecipeDetail',{recipeId : props.event.title.recipe.id})}>
                        <View>
                            <Text style={styles.text}>{props.event.title.recipe.name}</Text>  
                        </View>
                    </Pressable> 
                    <View style={{flexDirection : 'column', marginTop : 4}}>
                        
                        <View style={{flexDirection : 'row', alignItems : 'center'}}>
                            <MaterialIcons name="access-time" style={styles.icon} />
                            {props.event.title.course.includes(',') ? 
                                <Text style={styles.smalltext}>{props.event.title.course.split(',').join('  |  ')}</Text> :
                                <Text style={styles.smalltext}>{props.event.title.course}</Text>
                            }
                            
                        </View>

                    {props.event.title.recipe.over_night_prep ? (
                            <View style={{flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', marginRight : 32 }}>
                                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                    <MaterialIcons name="food-bank" style={styles.icon} />
                                    <Text style={styles.smalltext}>{props.event.title.servings === 1 ? '1 serving' : props.event.title.servings + ' servings'}</Text>
                                </View>

                                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                    <MaterialIcons name="nights-stay" style={styles.icon} />
                                    <Text style={styles.smalltext}>Overnight prep</Text> 
                                </View> 
                            </View>
                            
                        ) : 
                        <View style={{flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', marginRight : 32 }}>
                                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                    <MaterialIcons name="food-bank" style={styles.icon} />
                                    <Text style={styles.smalltext}>{props.event.title.servings === 1 ? '1 serving' : props.event.title.servings + ' servings'}</Text>
                                </View>

                                <View style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center', marginRight : 32 }}>
                                    <MaterialIcons name="timelapse" style={styles.icon} />
                                    <Text style={styles.smalltext}>{props.event.title.recipe.cooking_time} mins</Text> 
                                </View> 
                            </View>
                    }

                    </View>

                </View>
                { props.point == 1 ? 
                <TouchableOpacity style={styles.delete} onPress={handleDelete}> 
                    <MaterialIcons name="delete" style={styles.icon} />
                    <Text style={styles.smalltext}>Delete</Text>
                </TouchableOpacity>
                : <View></View> }
            </View>

        )    
}

const styles = StyleSheet.create({
    breakfastcard : {
        backgroundColor : '#ffe484',
        flexDirection : 'column',
        width : '88%',
        padding : 16, 
        margin : 8,
        borderRadius : 4,
        alignSelf : 'center',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    lunchcard : {
        flexDirection : 'column',
        width : '88%',
        padding : 16, 
        margin : 8,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#b6d2fb',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    brunchcard : {
        backgroundColor : '#e0fdcd',
        flexDirection : 'column',
        width : '88%',
        padding : 16, 
        margin : 8,
        borderRadius : 4,
        alignSelf : 'center',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    snackscard : {
        backgroundColor : '#9ed2ea',
        flexDirection : 'column',
        width : '88%',
        padding : 16, 
        margin : 8,
        borderRadius : 4,
        alignSelf : 'center',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    dinnercard : {
        backgroundColor : '#fbb6b6',
        flexDirection : 'column',
        width : '88%',
        padding : 16, 
        margin : 8,
        borderRadius : 4,
        alignSelf : 'center',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
  imageIcon : {
      height : 16,
      width : 21.5,
  },
  icon : {
      fontSize : 16,
      color : '#3b3b3b',
  },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      fontFamily : 'Poppins_500Medium'
  },
  smalltext : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 8,
      fontFamily : 'Poppins_400Regular'
  },
  delete : {
    flexDirection : 'row', 
    alignItems : 'center', 
    justifyContent : 'flex-start', 
    marginBottom : 8,
    marginHorizontal : 32
  },
  });