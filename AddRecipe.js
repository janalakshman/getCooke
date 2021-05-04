import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import Title from './components/Title';
import config from './config';
import LoadingScreen from "./LoadingScreen";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import ProfileDescription from './components/RecipeDescription'
import SecondaryButton from './components/SecondaryButton'
import AddPrepStep from "./components/AddPrepStep";

export default function AddRecipe({navigation}) {

  const user = useSelector(state => state.counter.token)
  const [loading, setLoading] = useState(true)
  const [recipe, setRecipe] = useState({name : "", cooking_time : "", notes : "", nutrition : {calories : null, carbohydrate : null, proteins : null, fat : null}})

  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                              behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
            <TextInput style={styles.name}
                    placeholder = "Name of the recipe"
                    onChangeText={name => setRecipe(name)}
                    value={recipe.name}
                    name="name" />

                <View style={{width : '45%', flexDirection : 'row', alignContent : 'center'}}>
                    <TextInput style={styles.name}
                        placeholder = "Cooking time"
                        onChangeText={time => setRecipe(time)}
                        value={recipe.cooking_time}
                        keyboardType="numeric"
                        name="cooking_time" />
                    <Text style={styles.text}>mins</Text>
                </View>

                <ProfileDescription recipe={user} />

                <TextInput style={styles.notes}
                    multiline
                    placeholder = "Tell us more about your recipe."
                    onChangeText={notes => setRecipe(notes)}
                    value={recipe.notes}
                    name="name" />

                <Title name="Ingredients"/>
                    <View style={{margin : 8}}></View>
                    <SecondaryButton name="Ingredient" />


                <Title name="Nutrition" />
                
                <View style={styles.card}>
                    <View style={styles.line}>
                        <TextInput style={styles.nutrition}
                                    placeholder = "Calories"
                                    onChangeText={time => setRecipe(time)}
                                    value={recipe.cooking_time}
                                    keyboardType="numeric"
                                    name="cooking_time" />
                        <Text style={styles.body}>Calories</Text>     

                    </View>

                    <View style={styles.line}>
                    <TextInput style={styles.nutrition}
                                    placeholder = "Carbs in grams"
                                    onChangeText={time => setRecipe(time)}
                                    value={recipe.cooking_time}
                                    keyboardType="numeric"
                                    name="cooking_time" />
                        <Text style={styles.body}>Carbs</Text>     
                    </View>

                    <View style={styles.line}>
                    <TextInput style={styles.nutrition}
                                    placeholder = "Protein in grams"
                                    onChangeText={time => setRecipe(time)}
                                    value={recipe.cooking_time}
                                    keyboardType="numeric"
                                    name="cooking_time" />
                        <Text style={styles.body}>Protein</Text>     
                    </View>

                    <View style={styles.line}>
                    <TextInput style={styles.nutrition}
                                    placeholder = "Fat in grams"
                                    onChangeText={time => setRecipe(time)}
                                    value={recipe.cooking_time}
                                    keyboardType="numeric"
                                    name="cooking_time" />
                        <Text style={styles.body}>Fat</Text>     
                    </View>
                </View>

                <Title name="Preparation" />
                    <View style={{margin : 8}}></View>
                    <AddPrepStep />
                    <SecondaryButton name="Step" />

                <Title name="Tags"/>

            </ScrollView>
        </KeyboardAvoidingView>    
    </View>
    
        
  );
}

const styles = StyleSheet.create({
    name : {
        borderRadius : 20,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 64,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'Poppins_500Medium',
        fontSize : 17,
        alignContent : 'flex-start'
    },
        text : {
            fontFamily : 'Poppins_400Regular',
            fontSize : 14,
            alignSelf : 'center'
        },
        notes : {
            borderRadius : 20,
            borderTopLeftRadius : 0,
            borderColor : '#cfcfcf',
            borderWidth : 1,
            height : 96,
            width : '90%',
            margin : 16,
            padding : 16,
            paddingTop : 8,
            fontFamily : 'Poppins_400Regular',
            fontSize : 17,
            alignContent : 'flex-start'
        },
        card : {
            width : '100%',
            paddingLeft : 32,
            borderRadius : 4,
            alignSelf : 'center',
            backgroundColor : '#ffffff',
            flexDirection : 'column',
        },
        line : {
            flexDirection : 'row',
            flex : 2,
            alignItems : 'center',
            justifyContent : 'flex-start'
        },
        nutrition : {
            borderRadius : 20,
            borderTopLeftRadius : 0,
            borderColor : '#cfcfcf',
            borderWidth : 1,
            height : 56,
            width : '50%',
            margin : 16,
            padding : 16,
            fontFamily : 'Poppins_500Medium',
            fontSize : 14,
            alignContent : 'flex-start'
        },
        body : {
            fontSize : 17,
            color : '#3b3b3b',
            margin : 4,
            fontFamily : 'Poppins_500Medium'
        },
});