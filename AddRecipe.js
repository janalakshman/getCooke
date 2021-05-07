import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, Switch} from 'react-native';
import Title from './components/Title';
import config from './config';
import LoadingScreen from "./LoadingScreen";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import ProfileDescription from './components/RecipeDescription'
import AddPrepStep from "./components/AddPrepStep";
import TertiaryButton from './components/TertiaryButton'



export default function AddRecipe({navigation}) {

const user = useSelector(state => state.counter.token)
const [name, setName] = useState(null)
const [time, setTime] = useState(null)
const [notes, setNotes] = useState(null)
const [steps, setSteps] = useState([])
const [ingredients, setIngredients] = useState([])
const [carbs, setCarbs] = useState(null)
const [protein, setProtein] = useState(null)
const [fat, setFat] = useState(null)
const [isVeg, setIsVeg] = useState(false)
const [isOvernight, setIsOvernight] = useState(false)
const [loading, setLoading] = useState(true)
const toggleVeg = () => setIsVeg(previousState => !previousState);
const toggleOvernight = () => setIsOvernight(previousState => !previousState);


  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                              behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
            
            <Text style={styles.main}>Add Recipe</Text>
                
            <Text style={styles.heading}>Recipe Info</Text>

                <TextInput style={styles.name}
                    placeholder = "Name of the recipe"
                    onChangeText={name => setName(name)}
                    value={name}
                    name="name" />

                <View style={{flexDirection : 'column'}}>
                    <View style={{width : '85%', flexDirection : 'row', alignContent : 'center'}}>
                        <TextInput style={styles.name}
                            placeholder = "Cooking time"
                            onChangeText={time => setTime(time)}
                            value={time}
                            keyboardType="numeric"
                            name="time" />
                        <Text style={styles.text}>mins</Text>
                    </View>

                    <View style={{flexDirection : 'row', margin : 16, justifyContent : 'space-around'}}>
                        <Text style={styles.text}>Is your recipe vegetarian?</Text>
                        <Switch trackColor={{ false: "#f7f7f7", true: "#5BC236" }}
                                thumbColor={isVeg ? "#ffffff" : "#ffffff"}
                                ios_backgroundColor="#f7f7f7"
                                onValueChange={toggleVeg}
                                value={isVeg}/>
                    </View>
                </View>
                

                <View style={{flexDirection : 'row', margin : 16, justifyContent : 'space-around'}}>
                    <Text style={styles.text}>Is overnight prep required?</Text>
                    <Switch trackColor={{ false: "#f7f7f7", true: "#5BC236" }}
                            thumbColor={isOvernight ? "#ffffff" : "#ffffff"}
                            ios_backgroundColor="#f7f7f7"
                            onValueChange={toggleOvernight}
                            value={isOvernight}/>
                </View>

                <TextInput style={styles.notes}
                    multiline
                    placeholder = "Tell us more about your recipe."
                    onChangeText={notes => setNotes(notes)}
                    value={notes}
                    name="notes" />


                <Text style={styles.heading}>Ingredients</Text>
                
                <TertiaryButton name="Add ingredient" />

                <Text style={styles.heading}>Nutrition</Text>

                <View style={styles.card}>


                    <View style={{flexDirection : 'row', marginHorizontal : 16}}>
                    <View style={styles.line}>
                        <Text style={styles.body}>Carbs</Text>     
                        <TextInput style={styles.nutrition}
                                        placeholder = "Grams"
                                        onChangeText={carbs => setCarbs(carbs)}
                                        value={carbs}
                                        keyboardType="numeric"
                                        name="carbs" />
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.body}>Protein</Text>     
                        <TextInput style={styles.nutrition}
                                        placeholder = "Grams"
                                        onChangeText={protein => setProtein(protein)}
                                        value={protein}
                                        keyboardType="numeric"
                                        name="protein" />
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.body}>Fat</Text>     
                        <TextInput style={styles.nutrition}
                                        placeholder = "Grams"
                                        onChangeText={fat => setFat(fat)}
                                        value={fat}
                                        keyboardType="numeric"
                                        name="fat" />
                    </View>
                </View>
                    
                        <View style={styles.calories}>
                            <Text style={styles.subheading}>Total Calories: {(carbs+protein)*4 + fat*9} calories</Text>
                        </View>     

                    </View>
                   

                <Text style={styles.heading}>Preparation</Text>
                    {steps.map((step, index) => {
                        return (
                            <View>
                                 <TextInput style={styles.notes}
                                        multiline
                                        placeholder = "Add a step"
                                        onChangeText={notes => {
                                            setSteps(prevState => {
                                                let tempArray = [...prevState]
                                                tempArray[index] = notes
                                                return tempArray
                                            })}}
                                        value={step}
                                        name="name" />
                            
                                <TouchableOpacity style={styles.delete} onPress={() => {
                                                                setSteps(prevState => {
                                                                    let tempArray = [...prevState]
                                                                    tempArray.splice(index, 1)
                                                                    return tempArray 
                                                                    })}}> 
                                    <MaterialIcons name="delete" style={styles.icon} />
                                    <Text style={styles.smalltext}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    
                    <TertiaryButton name="Add step" onPress={() => setSteps([...steps, ''])} />

                <Text style={styles.heading}>Tags</Text>



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
        height : 56,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'Poppins_500Medium',
        fontSize : 14,
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
        fontFamily : 'Poppins_500Medium',
        fontSize : 14,
        alignContent : 'flex-start'
    },
    card : {
        width : '100%',
        borderRadius : 4,
        backgroundColor : '#ffffff',
        flexDirection : 'column',
    },
    line : {
        flexDirection : 'column',
        flex : 1,
        alignItems : 'flex-start',
        width : '30%',
        marginHorizontal : '2.5%'
    },
    nutrition : {
        borderRadius : 20,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 48,
        width : '90%',
        paddingHorizontal : 16,
        fontFamily : 'Poppins_500Medium',
        fontSize : 14,
        alignContent : 'flex-start'
    },
    calories : {
        borderRadius : 20,
        width : '75%',
        borderTopLeftRadius : 0,
        paddingHorizontal : 16,
        paddingVertical : 8,
        alignContent : 'center',
        alignSelf : 'center',
        margin : 32,
        backgroundColor : '#f1f1f1'
    },
    body : {
        fontSize : 14,
        color : '#3b3b3b',
        margin : 4,
        fontFamily : 'Poppins_400Regular',
    },
    heading : {
        fontFamily : 'Poppins_600SemiBold',
        fontSize : 19,
        margin : 16
    },
    subheading : {
        fontFamily : 'Poppins_500Medium',
        fontSize : 14,
        margin : 8,
        textAlign : 'center'
    },
    main : {
        color : '#3b3b3b',
        fontSize : 32,
        fontFamily : 'SourceSerifPro',
        margin : 16
    },
    smalltext : {
        fontSize : 14,
        color : '#3b3b3b',
        margin : 8,
        fontFamily : 'SourceSansPro_400Regular'
    },
    delete : {
      flexDirection : 'row', 
      alignItems : 'center', 
      justifyContent : 'flex-start', 
      marginBottom : 8,
      marginHorizontal : 32
    },
    icon : {
        fontSize : 16,
        color : '#3b3b3b',
    },
});