import React, { useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, Switch, Image, ImageBackground} from 'react-native';
import Title from '../components/Title';
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button'
import * as ImagePicker from 'expo-image-picker';
import ImageInput from '../components/ImageInput';
import TagModal from "../Modal/TagModal";
import { Alert } from "react-native";
import * as ImageManipulator from 'expo-image-manipulator';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 },
    {label : "Don't want to say", value: 2 }
  ];
  

export default function AddRecipe({navigation}) {

const user = useSelector(state => state.counter.token)

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
const [appliances, setAppliances] = useState('')
const [appliancesModal, setAppliancesModal] = useState(false)
const [cuisine, setCuisine] = useState('')
const [cuisineModal, setCuisineModal] = useState(false)
const [course, setCourse] = useState('')
const [courseModal, setCourseModal] = useState(false)
const [diet, setDiet] = useState('')
const [dietModal, setDietModal] = useState(false)
const [tags, setTags] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(false)
const toggleVeg = () => setIsVeg(previousState => !previousState);
const toggleOvernight = () => setIsOvernight(previousState => !previousState);
let calories = carbs*4 + protein*4 + fat*9
let courseID, cuisineID, appliancesID, dietID

if(course) {courseID = course.map(c => c.id)}
if(cuisine) {cuisineID = cuisine.map(c => c.id)}
if(appliances) {appliancesID = appliances.map(c => c.id)}
if(diet) {dietID = diet.map(c=>c.id)}

const [radioGender, setRadioGender ] = useState(0);

useEffect(() => {
    getTags();
  }, []);

const getTags = () => {
    fetch(
          config.api + `/v1/meta`,
          {
            method: "GET",
            mode: "cors",
          }
        )
        .then((res) => {
          return res.json();        
        }).then((response) => {
            setTags(response)
        }).catch(error => console.log(error));
  }


    const onSubmit = () => {
        setLoading(true)
        const recipe = {
            user : user.user.id,
            name : name ? name : '',
            servings : servings ? servings : 1,
            cooking_time : time ? time : 0,
            image_url : image,
            notes : notes ? notes : '',
            steps : steps,
            ingredients : ingredients,
            carbs : carbs ? carbs : 0,
            protein : protein ? protein : 0,
            fat : fat ? fat : 0,
            calories : calories ? calories : 0,
            isVeg : isVeg,
            over_night_prep : isOvernight,
            cooking_appliance : appliancesID ? appliancesID : [],
            course : courseID ? courseID : [],
            cuisine : cuisineID ? cuisineID : [],
            type_of_meals : dietID ? dietID : []
        }
        if((name && time && ingredients && steps)){
            return(
                fetch(config.api + `/v1/recipes`,
                    {
                    method: 'POST',
                    headers: {
                        "Authorization":'Token ' +user.token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(recipe),
                    })
                    .then((res) => res.text())
                    .then((result) => {
                        setName(null), setCarbs(null), setProtein(null), setFat(null),
                        setTime(null), setIsVeg(false), setIsOvernight(false), setAppliances(''),
                        setImage(null), setCuisine(''), setCourse(''), setDiet(''), setNotes(null), setIngredients([]), setServings(1)
                        setLoading(false), setSteps([]);
                        setError(false)
                        Alert.alert(
                            "Recipe Added",
                            "Thanks for adding your recipe!",
                            [{ text: "OK", onPress : () => navigation.navigate('Home')}]
                        )
                    })
                    .catch((err) => {
                        setLoading(false);
                    })
                )
            }else{
                setLoading(false)
                setError(true)
                return(
                    Alert.alert(
                        "Input fields missing!",
                        "Please add all the required fields and try again.",
                        [{ text: "OK"}]
                    )
                )
            } 
    };


  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        {loading ? (<LoadingScreen />) : (

            <View style={{backgroundColor : '#fff', flex : 1}} >
            <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView>

                    <View style={{margin : 8}} />

                        <Text style={styles.text}>Name</Text>

                        <TextInput style={styles.name}
                            placeholder = "Or the name you have always wanted"
                            onChangeText={name => setName(name)}
                            value={name}
                            name="name" />

                    <View style={{margin : 8}} />

                    
                        <Text style={styles.text}>Gender</Text>


                        <View style={{marginHorizontal : 32, margin : 16}}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={radioGender}
                                animation={true}
                                onPress={(value) => {setRadioGender(value)}}
                                labelStyle={{fontFamily : 'ExoRegular', color : '#3b3b3b'}}
                                />
                        </View>

                    <View style={{margin : 8}} />        
                    
                        <Text style={styles.text}>Physical info</Text>

                            <View style={styles.card}>

                                <View style={{flexDirection : 'row', marginHorizontal : 16}}>
                                <View style={styles.line}>
                                    <Text style={styles.body}>Weight</Text>     
                                    <TextInput style={styles.nutrition}
                                                    placeholder = "kg"
                                                    onChangeText={carbs => setCarbs(carbs)}
                                                    value={carbs}
                                                    keyboardType="numeric"
                                                    name="carbs" />
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.body}>Height</Text>     
                                    <TextInput style={styles.nutrition}
                                                    placeholder = "cm"
                                                    onChangeText={protein => setProtein(protein)}
                                                    value={protein}
                                                    keyboardType="numeric"
                                                    name="protein" />
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.body}>Age</Text>     
                                    <TextInput style={styles.nutrition}
                                                    placeholder = "years"
                                                    onChangeText={fat => setFat(fat)}
                                                    value={fat}
                                                    keyboardType="numeric"
                                                    name="fat" />
                                </View>
                            </View>
                                
                                    <View style={styles.calories}>
                                        <Text style={styles.subheading}>Body Mass Index : {protein ? carbs ? Math.round(carbs*10000/(protein*protein), 2) : 0 : 0}</Text>
                                    </View>     

                                </View>
                    
                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Medical history</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "We care about this a lot. Spare no details!"
                                    onChangeText={notes => setNotes(notes)}
                                    value={notes}
                                    name="notes" />

                    <View style={{margin : 8}} />


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Workout schedule</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "Couch potato / Gym freak / In between?"
                                    onChangeText={notes => setNotes(notes)}
                                    value={notes}
                                    name="notes" />

                    <View style={{margin : 8}} />

                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Food you love</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "The dishes you can't help but salivate"
                                    onChangeText={notes => setNotes(notes)}
                                    value={notes}
                                    name="notes" />

                    <View style={{margin : 8}} /> 


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Food you hate</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "You will rather fast than eat this"
                                    onChangeText={notes => setNotes(notes)}
                                    value={notes}
                                    name="notes" />

                    <View style={{margin : 8}} />

                     <View style={{margin : 8}} />

                            <Text style={styles.text}>Time per day</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "Describe your cooking schedule/ arrangement"
                                    onChangeText={notes => setNotes(notes)}
                                    value={notes}
                                    name="notes" />

                    <View style={{margin : 8}} />  



                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Special note</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "Ooooh! More information. We love it!"
                                    onChangeText={notes => setNotes(notes)}
                                    value={notes}
                                    name="notes" />

                    <View style={{margin : 8}} />

                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Preferred cuisine</Text>

                            {cuisine ? 
                                    <View style={styles.selectedTags}>
                                        {cuisine.map((c, index) =>
                                            <Text key={index.toString()} style={styles.selectedTagsText}>{c.name}</Text>
                                        )}
                                    </View>
                                            :
                                        <TouchableOpacity style={styles.tags}  onPress = {() => setCuisineModal(true)}>
                                            <Text style={styles.placeholder}>Cuisine</Text>
                                        </TouchableOpacity>
                                }
                            {cuisine ? 
                                <Button type="delete" name="Delete" onPress={() => setCuisine('')}/>
                                : <View/>}

                    <View style={{margin : 8}} />


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Cooking appliances you have</Text>

                            {appliances ? 
                                    <View style={styles.selectedTags}>
                                        {appliances.map((c, index) =>
                                            <Text key={index.toString()} style={styles.selectedTagsText}>{c.name}</Text>
                                        )}
                                    </View>
                                            :
                                        <TouchableOpacity style={styles.tags}  onPress = {() => setAppliancesModal(true)}>
                                            <Text style={styles.placeholder}>Cooking Appliances</Text>
                                        </TouchableOpacity>
                                }
                            {appliances ? 
                                <Button type="delete" name="Delete" onPress={() => setAppliances('')}/>
                                : <View/>}


                    <View style={{margin : 8}} />

                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Preferred diet</Text>

                            {diet ? 
                                    <View style={styles.selectedTags}>
                                        {diet.map((c, index) =>
                                            <Text key={index.toString()} style={styles.selectedTagsText}>{c.name}</Text>
                                        )}
                                    </View>
                                            :
                                        <TouchableOpacity style={styles.tags}  onPress = {() => setDietModal(true)}>
                                            <Text style={styles.placeholder}>Diet</Text>
                                        </TouchableOpacity>
                                }
                            {diet ? 
                                <Button type="delete" name="Delete" onPress={() => setDiet('')}/>
                                : <View/>}


                    <View style={{margin : 16}} />            

                    <Button type="primary" name="Save Profile" onPress={() => onSubmit()} />
                    

                </ScrollView>

                {cuisineModal || courseModal || appliancesModal || dietModal ? 
                    <TagModal tags={tags} modalVisible={cuisineModal ? cuisineModal : courseModal ? courseModal : appliancesModal ? appliancesModal : dietModal}
                    setModalVisible={cuisineModal ? setCuisineModal : courseModal ? setCourseModal : appliancesModal ? setAppliancesModal : setDietModal}
                    name={cuisineModal ? 'Cuisine' : courseModal ? 'Course' : appliancesModal ? 'Cooking Appliances' : 'Diet'}
                    select={cuisineModal ? cuisine : courseModal ? course : appliancesModal ? appliances : diet}
                    setSelect={cuisineModal ? setCuisine : courseModal ? setCourse : appliancesModal ? setAppliances : setDiet}/> : <View></View>}
                
            </KeyboardAvoidingView>    
            </View>  

        )}
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
        fontFamily : 'ExoMedium',
        fontSize : 14,
        alignContent : 'flex-start',
        backgroundColor : '#fff',
    },
    text : {
        fontFamily : 'ExoSemiBold',
        fontSize : 19,
        alignSelf : 'center',
        margin : 8,
        marginHorizontal : 16,
        color : '#3b3b3b'
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
        fontFamily : 'ExoMedium',
        fontSize : 14,
        alignContent : 'flex-start',
        backgroundColor : '#fff'
    },
    card : {
        width : '100%',
        borderRadius : 4,
        backgroundColor : '#ffffff',
        flexDirection : 'column',
        marginTop : 16
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
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 48,
        width : '100%',
        paddingHorizontal : 16,
        fontFamily : 'ExoRegular',
        fontSize : 16,
        alignContent : 'flex-start',
        backgroundColor : '#fff',
        borderTopLeftRadius : 0,
    },
    calories : {
        borderRadius : 8,
        width : '75%',
        borderTopLeftRadius : 0,
        paddingHorizontal : 16,
        paddingVertical : 8,
        alignContent : 'center',
        alignSelf : 'center',
        margin : 32,
        borderColor : '#a13e00',
        borderWidth : 1,
        marginBottom : 16
    },
    body : {
        fontSize : 16,
        color : '#3b3b3b',
        margin : 4,
        fontFamily : 'ExoRegular',
    },
    heading : {
        fontFamily : 'ExoSemiBold',
        fontSize : 17,
        margin : 16
    },
    subheading : {
        fontFamily : 'ExoMedium',
        fontSize : 17,
        color : '#a13e00',
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
        fontSize : 16,
        color : '#3b3b3b',
        margin : 8,
        fontFamily : 'ExoRegular'
    },
    delete : {
      flexDirection : 'row', 
      alignItems : 'center', 
      justifyContent : 'flex-start', 
      marginBottom : 8,
      marginHorizontal : 16
    },
    icon : {
        fontSize : 16,
        color : '#626262',
    },
    buttonText : {
        color : '#A13E00',
        fontSize : 19,
        fontFamily : 'ExoSemiBold',
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
        fontFamily : 'ExoRegular',
        fontSize : 17,
        marginHorizontal : 16,
        marginVertical : 8,
        width : '40%',
        color : '#3b3b3b'
    },
    servingsUnit : {
        fontFamily : 'ExoRegular',
        fontSize : 17,
        marginHorizontal : 16,
        marginVertical : 8,
        color : '#3b3b3b'
    },
    box : {
        margin : 16,
        marginTop : 0,
        justifyContent : 'flex-start',
        alignItems : 'flex-start',
        borderColor : '#cfcfcf',
    },
    image : {
        flex : 1,
        aspectRatio : 1,
        borderRadius : 20,
        borderTopLeftRadius : 0,
        resizeMode : 'contain'
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    placeholder : {
        fontFamily : 'ExoRegular',
        fontSize : 17,
        paddingHorizontal : 16,
        color : '#626262',
    },
    tags : {
        borderRadius : 8,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        alignItems : 'center',
        backgroundColor : '#fff',
        marginVertical : 8,
        paddingVertical : 16,
        marginHorizontal : 16,
        justifyContent : 'flex-start',
        flexDirection : 'row',
        flexWrap : 'wrap'
    },
    selectedTags : {
        borderRadius : 8,
        borderTopLeftRadius : 0,
        borderWidth : 1,
        borderColor : '#a13e00',
        alignItems : 'center',
        marginVertical : 8,
        paddingVertical : 16,
        marginHorizontal : 16,
        justifyContent : 'flex-start',
        flexDirection : 'row',
        flexWrap : 'wrap'
    },
    selectedTagsText : {
        fontFamily : 'ExoRegular',
        fontSize : 17,
        paddingHorizontal : 16,
        paddingVertical : 8,
        color : '#a13e00',
    },
    error : {
        fontFamily : 'ExoRegular',
        fontSize : 14,
        color : '#3b3b3b',
        margin : 16,
        alignSelf : 'center'
    }

});