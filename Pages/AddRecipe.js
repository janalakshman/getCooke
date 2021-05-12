import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, Switch, Image} from 'react-native';
import Title from '../components/Title';
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker';
import ImageInput from '../components/ImageInput';



export default function AddRecipe({navigation}) {

const user = useSelector(state => state.counter.token)

const recipe = {
    name : name,
    time : time,
    image : image,
    notes : notes,
    steps : steps,
    ingredients : ingredients,
    carbs : carbs,
    protein : protein,
    fat : fat,
    isVeg : isVeg,
    isOvernight : isOvernight,
}
const [name, setName] = useState(null)
const [time, setTime] = useState(null)
const [image, setImage] = useState(null)
const [notes, setNotes] = useState(null)
const [steps, setSteps] = useState([])
const [servings, setServings] = useState(1)
const [ingredients, setIngredients] = useState([])
const [carbs, setCarbs] = useState(null)
const [protein, setProtein] = useState(null)
const [fat, setFat] = useState(null)
const [isVeg, setIsVeg] = useState(false)
const [isOvernight, setIsOvernight] = useState(false)
const [loading, setLoading] = useState(true)
const toggleVeg = () => setIsVeg(previousState => !previousState);
const toggleOvernight = () => setIsOvernight(previousState => !previousState);

useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
        setImage(result.uri);
      }
    };


  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                              behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
            
            <Text style={styles.main}>Add Recipe</Text>
                
            <Title name ="Recipe Info" />

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

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin : 16, marginBottom : 0 }}>
                        {image ? <View></View> : <ImageInput name="Add a photo of your recipe" onPress={pickImage} /> }
                        {image &&   
                                    <View style={{width: '100%',  alignSelf : 'center'}}>
                                        <Image source={{ uri: image }} style={styles.image} />
                                    
                                    <View style={{margin : 4}} />

                                    <TouchableOpacity style={styles.delete} onPress={() => setImage(null)}>
                                        <MaterialIcons name="delete" style={styles.icon} />
                                        <Text style={styles.text}>Delete</Text>
                                    </TouchableOpacity>
                                    </View>}
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

                    <View style={{margin : 16}}></View>

                    <Title name="Portion size" />

                    <View style={{flexDirection : 'column'}}>
                    <View style={{width : '75%', flexDirection : 'row', alignContent : 'center', margin : 32, marginTop : 16}}>
                        <TextInput style={styles.nutrition}
                            placeholder = "Number of servings"
                            onChangeText={servings => setServings(servings)}
                            value={servings}
                            keyboardType="numeric"
                            name="servings" />
                            <View style={{flexGrow : 1}} />
                        <Text style={styles.text}>Servings</Text>
                    </View>
                    </View>



                <Title name="Ingredients" />

                
                {ingredients ? ingredients.map((ingredient, index) => {
                        return (
                            <View style={styles.box}>
                                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                                    <Text style={styles.servings}>{ingredient.name}</Text>
                                    <View style={{flexGrow : 1}}></View>
                                    <Text style={styles.servingsUnit}>{ingredient.amount} {ingredient.unit}</Text>
                                    <MaterialIcons name="delete" style={{marginHorizontal : 16 }} size={24} color="#3b3b3b" 
                                        onPress={() => {
                                                    setIngredients(prevState => {
                                                        let tempArray = [...prevState]
                                                        tempArray.splice(index, 1)
                                                        return tempArray 
                                                        })}} />
                                </View>
                            </View>
                        )})

             : <View></View>} 


                <Button type="tertiary" name="Add ingredient" onPress={() => navigation.navigate('AddIngredient',{ingredients: ingredients, setIngredients : setIngredients })}/>
                
                <View style={{margin : 16}}></View>


                <Title name="Nutrition Info" />

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
                            <Text style={styles.subheading}>Total Calories: {carbs*4 + protein*4 + fat*9} calories</Text>
                        </View>     

                    </View>
                   
                    <View style={{margin : 16}}></View>


                    <Title name="Preparation" />
                    {steps.map((step, index) => {
                        return (
                            <View>
                                 <TextInput style={styles.notes}
                                        multiline
                                        placeholder = "Add a step"
                                        onChangeText={notes => {
                                            setSteps(prevState => {
                                                let tempArray = [...prevState]
                                                tempArray[index].description = notes
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
                                    <Text style={styles.text}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    
                    <Button type="tertiary" name="Add step" onPress={() => setSteps([...steps, {}])} />

                    <View style={{margin : 16}}></View>


                <Title name="Tags" />

                <View style={{margin : 16}}></View>


                <Button type="primary" name="Submit recipe" onPress={() => handleClick()} />

            </ScrollView>
        </KeyboardAvoidingView>    
    </View>
    
        
  );
}

const styles = StyleSheet.create({
    name : {
        borderRadius : 8,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 60,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'SourceSansPro_400Regular',
        fontSize : 17,
        alignContent : 'flex-start',
    },
    text : {
        fontFamily : 'Poppins_400Regular',
        fontSize : 14,
        alignSelf : 'center',
        margin : 8
    },
    notes : {
        borderRadius : 8,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 108,
        width : '90%',
        margin : 16,
        padding : 16,
        paddingTop : 8,
        fontFamily : 'SourceSansPro_400Regular',
        fontSize : 17,
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
        borderRadius : 8,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 48,
        width : '90%',
        paddingHorizontal : 16,
        fontFamily : 'SourceSansPro_400Regular',
        fontSize : 17,
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
        fontSize : 17,
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
        fontFamily : 'Lora',
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
    buttonText : {
        color : '#A13E00',
        fontSize : 17,
        fontFamily : 'Poppins_600SemiBold',
        margin : 8,
        flexGrow : 1,
        textAlign : 'center'
      },
      button: {
          borderRadius : 4,
          backgroundColor : '#ffc885',
          margin : 16,
          flexDirection : 'row',
          alignSelf : 'center'
             } ,
    servings : {
        fontFamily : 'SourceSansPro_400Regular',
        fontSize : 17,
        marginHorizontal : 16,
        marginVertical : 8,
        width : '40%',
        color : '#3b3b3b'
    },
    servingsUnit : {
        fontFamily : 'SourceSansPro_400Regular',
        fontSize : 17,
        marginHorizontal : 16,
        marginVertical : 8,
        color : '#3b3b3b'
    },
    box : {
        margin : 16,
        marginTop : 0,
        justifyContent : 'flex-start',
        alignItems : 'flex-end',
        borderColor : '#cfcfcf',
    },
    image : {
        width : '100%',
        height : 300,
        borderRadius : 20,
        borderTopLeftRadius : 0
    }

});