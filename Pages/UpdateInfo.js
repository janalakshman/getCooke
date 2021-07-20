import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, RefreshControl, Image, ImageBackground} from 'react-native';
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";
import { TextInput } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';
import Button from '../components/Button'
import TagModal from "../Modal/TagModal";
import { Alert } from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import Title from '../components/Title'
import { setToken } from "../redux/counterSlice";
import SegmentedControlTab from "react-native-segmented-control-tab";

var genderTypes = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 },
    {label : "Don't want to say", value: 2 }
  ];

  var fitnessGoal = [
    {label: 'Lose weight', value: 0 },
    {label: 'Gain muscle mass', value: 1 },
    {label : 'Maintain weight', value: 2 }
  ];

  var activityLevel = [
      {label : 'Sedantary : little or no exercise', value : 0},
      {label : 'Light : exercise 1-3 times/week', value : 1},
      {label : 'Moderate : exercise 4-5 times/week', value : 2},
      {label : 'Active : daily exercise or intense exercise 3-4 times/week', value : 3},
      {label : 'Very Active : intense exercise 6-7 times/week', value : 4},
      {label : 'Extra Active : very intense exercise daily, or physical job', value : 5}
  ];

export default function EditProfile({navigation}) {

const dispatch = useDispatch()
const user = useSelector(state => state.counter.token)
const [index, setIndex] = useState(0)

const [refreshing, setRefreshing] = React.useState(false);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
      }, []);

const [name, setName] = useState(user.user.first_name ? user.user.first_name : null)
const [gender, setGender ] = useState(user.user.profile.gender ? user.user.profile.gender : 0);
const [weight, setWeight] = useState(user.user.profile.weight ? user.user.profile.weight : null)
const [height, setHeight] = useState(user.user.profile.height ? user.user.profile.height : null)
const [age, setAge] = useState(user.user.profile.age ? user.user.profile.age : 0)
const [history, setHistory] = useState(user.user.profile.medical_history ? user.user.profile.medical_history : null)
const [workout, setWorkout] = useState(user.user.profile.workout_schedule ? user.user.profile.workout_schedule : 0)
const [love, setLove] = useState(user.user.profile.food_you_love ? user.user.profile.food_you_love : null)
const [hate, setHate] = useState(user.user.profile.food_you_hate ? user.user.profile.food_you_hate : null)
const [time, setTime] = useState(user.user.profile.time_availability ? user.user.profile.time_availability : null)
const [goals, setGoals] = useState(user.user.profile.fitness_goal ? user.user.profile.fitness_goal : 0)
const [special, setSpecial] = useState(user.user.profile.special_note ? user.user.profile.special_note : null)
const [appliances, setAppliances] = useState(user.user.profile.cooking_appliance ? user.user.profile.cooking_appliance : '')
const [appliancesModal, setAppliancesModal] = useState(false)
const [cuisine, setCuisine] = useState(user.user.profile.preferred_cuisine ? user.user.profile.preferred_cuisine : '')
const [cuisineModal, setCuisineModal] = useState(false)
const [diet, setDiet] = useState(user.user.profile.type_of_meal ? user.user.profile.type_of_meal : '')
const [dietModal, setDietModal] = useState(false)
const [tags, setTags] = useState(null)
const [loading, setLoading] = useState(false)
let cuisineID, appliancesID, dietID
let w = weight, h = height
let bmi = Math.round(w*10000/(h*h), 2)

if(cuisine) {cuisineID = cuisine.map(c => c.id)}
if(appliances) {appliancesID = appliances.map(c => c.id)}
if(diet) {dietID = diet.map(c=>c.id)}


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
        const payload = {
            "first_name" : name,
            "gender": gender,
            "type_of_meal": dietID,
            "cooking_appliance": appliancesID,
            "preferred_cuisine": cuisineID,
            "special_note": special,
            "fitness_goal": goals,
            "time_availability": time,
            "food_you_hate": hate,
            "food_you_love": love,
            "workout_schedule": workout,
            "medical_history": history,
            "bmi": bmi,
            "age": age,
            "height": height,
            "weight": weight
        }
        fetch(config.api + `/v1/profile`,
             {  
              method: 'POST',
              headers: {
                "Authorization":'Token ' +user.token,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload),
            })
            .then((res) => res.json())
            .then((result) => {
                dispatch(setToken(result))
                setLoading(false)
              Alert.alert(
                  "Saved!",
                  "Thank you. We will pass this on to your nutritionist.",
                  [
                    {text : "OK"},
                  ]
                  )
            })
            .catch((err) => {
              console.log(err)
          })
        } 


  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        {loading ? (<LoadingScreen />) : (

            <View style={{backgroundColor : '#fff', flex : 1}} >
                <KeyboardAvoidingView 
                        style={{backgroundColor : '#fff', flex : 1}} 
                        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                        behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <ScrollView  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />}>

                    <SegmentedControlTab
                        values={["Personal info", "Food preferences"]}
                        selectedIndex={index}
                        onTabPress={(index) => setIndex(index)}
                        tabStyle={styles.tabStyle}
                        borderRadius={0}
                        tabTextStyle = {{fontFamily : 'ExoMedium', fontSize : 17, color : 'rgba(207, 207, 207, 0.99)'}}
                        activeTabStyle={styles.activeTabStyle}
                        activeTabTextStyle = {{fontFamily : 'ExoMedium', fontSize : 17, color : '#a13e00'}}
                        />

                {index === 0 ? 
                    <View>
                        <Title name="Name"/>

                        <TextInput style={styles.name}
                            placeholder = "Or the name you have always wanted"
                            onChangeText={note => setName(note)}
                            value={name}
                            name="name" />



                        <Title name="Gender"/>


                        <View style={{marginHorizontal : 32, margin : 16}}>
                            <RadioForm
                                radio_props={genderTypes}
                                initial={gender}
                                animation={true}
                                onPress={(value) => setGender(value)}
                                labelStyle={{fontFamily : 'ExoRegular', fontSize : 17, margin : 8, color : '#3b3b3b'}}
                                />
                        </View>


                        <Title name="Physical info"/>

                        <View style={{margin : 8}} /> 
                                <View style={{flexDirection : 'row', marginHorizontal : 16}}>
                                <View style={styles.line}>
                                    <Text style={styles.body}>Weight</Text>     
                                    <TextInput style={styles.nutrition}
                                        placeholder = "kg"
                                        onChangeText={notes => setWeight(notes)}
                                        value={weight ? weight.toString() : null}
                                        keyboardType="numeric"
                                        name="weight"
                                        />
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.body}>Height</Text>     
                                    <TextInput style={styles.nutrition}
                                        placeholder = "cm"
                                        onChangeText={height => setHeight(height)}
                                        value={height ? height.toString() : null}
                                        keyboardType="numeric"
                                        name="height" />
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.body}>Age</Text>     
                                    <TextInput style={styles.nutrition}
                                        placeholder = "years"
                                        onChangeText={age => setAge(age)}
                                        value={age ? age.toString() : null}
                                        keyboardType="numeric"
                                        name="age" />
                                </View>
                            </View>
                                
                                <View style={styles.calories}>
                                    <Text style={styles.subheading}>Body Mass Index : {bmi ? bmi : 0}</Text>
                                </View>     


                        <Title name="Fitness goals"/>

                            <View style={{marginHorizontal : 32, margin : 16}}>
                                <RadioForm
                                    radio_props={fitnessGoal}
                                    initial={goals}
                                    animation={true}
                                    onPress={(value) => setGoals(value)}
                                    labelStyle={{fontFamily : 'ExoRegular', fontSize : 17, margin : 8, color : '#3b3b3b'}}
                                    />
                            </View>
                        
                            <Title name="Activity level"/>

                                <View style={{marginHorizontal : 32, margin : 16}}>
                                    <RadioForm
                                        radio_props={activityLevel}
                                        initial={workout}
                                        animation={true}
                                        onPress={(value) => setWorkout(value)}
                                        labelStyle={{fontFamily : 'ExoRegular', fontSize : 17, margin : 8, color : '#3b3b3b'}}
                                        />
                                </View>
                                                        
                            <Title name="Medical history"/>

                                <TextInput style={styles.notes}
                                        multiline
                                        placeholder = "Spare no details!"
                                        onChangeText={notes => setHistory(notes)}
                                        value={history}
                                        name="history" />

                    </View>
                :

                <View>


                    <Title name="Number of meals per day"/>

                    <TextInput style={styles.name}
                            keyboardType = "numeric"
                            onChangeText={notes => setTime(notes)}
                            value={time}
                            name="time" />


                {/* <Title name="Preferred cuisine"/>

                {cuisine.length > 0 ? 
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

                {cuisine.length > 0 ? 
                    <Button type="delete" name="Delete" onPress={() => setCuisine('')}/>
                    : <View/>} */}


                    <Title name="Protein sources"/>

                    {appliances.length > 0 ? 
                            <View style={styles.selectedTags}>
                                {appliances.map((c, index) =>
                                    <Text key={index.toString()} style={styles.selectedTagsText}>{c.name}</Text>
                                )}
                            </View>
                                    :
                                <TouchableOpacity style={styles.tags}  onPress = {() => setAppliancesModal(true)}>
                                    <Text style={styles.placeholder}>Appliances</Text>
                                </TouchableOpacity>
                        }

                    {appliances.length > 0 ? 
                        <Button type="delete" name="Delete" onPress={() => setAppliances('')}/>
                        : <View/>}

                    <Title name="Allergens"/>

                        {appliances.length > 0 ? 
                                <View style={styles.selectedTags}>
                                    {appliances.map((c, index) =>
                                        <Text key={index.toString()} style={styles.selectedTagsText}>{c.name}</Text>
                                    )}
                                </View>
                                        :
                                    <TouchableOpacity style={styles.tags}  onPress = {() => setAppliancesModal(true)}>
                                        <Text style={styles.placeholder}>Appliances</Text>
                                    </TouchableOpacity>
                            }

                        {appliances.length > 0 ? 
                            <Button type="delete" name="Delete" onPress={() => setAppliances('')}/>
                            : <View/>}



                    <Title name="Diet"/>

                    {diet.length > 0 ? 
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

                    {diet.length > 0 ? 
                        <Button type="delete" name="Delete" onPress={() => setDiet('')}/>
                        : <View/>}

                    
                    <Title name="Cooking appliances"/>

                    {appliances.length > 0 ? 
                            <View style={styles.selectedTags}>
                                {appliances.map((c, index) =>
                                    <Text key={index.toString()} style={styles.selectedTagsText}>{c.name}</Text>
                                )}
                            </View>
                                    :
                                <TouchableOpacity style={styles.tags}  onPress = {() => setAppliancesModal(true)}>
                                    <Text style={styles.placeholder}>Appliances</Text>
                                </TouchableOpacity>
                        }

                    {appliances.length > 0 ? 
                        <Button type="delete" name="Delete" onPress={() => setAppliances('')}/>
                        : <View/>}


                                        



                </View>
                 
                }
                    

                    <View style={{margin : 16}} />            


                    <Button type="primary" name="Save Profile" onPress={() => onSubmit()} />
                    

                </ScrollView>

                        {cuisineModal || appliancesModal || dietModal ? 
                            
                                <TagModal   
                                    tags={tags} modalVisible={cuisineModal ? cuisineModal : appliancesModal ? appliancesModal : dietModal}
                                    setModalVisible={cuisineModal ? setCuisineModal : appliancesModal ? setAppliancesModal : setDietModal}
                                    name={cuisineModal ? 'Cuisine' : appliancesModal ? 'Cooking Appliances' : 'Diet'}
                                    select={cuisineModal ? cuisine : appliancesModal ? appliances : diet}
                                    setSelect={cuisineModal ? setCuisine : appliancesModal ? setAppliances : setDiet}
                                /> 
                                    
                                    : 
                            
                                <View></View>

                        }
                
            </KeyboardAvoidingView>    
            </View>  

        )}
    </View>
    
  );
}

const styles = StyleSheet.create({
    name : {
        borderRadius : 4,
        borderTopLeftRadius : 0,
        height : 48,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'ExoRegular',
        fontSize : 17,
        color : '#000',
        alignContent : 'flex-start',
        backgroundColor : '#f1f1f1',
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
        borderRadius : 4,
        borderTopLeftRadius : 0,
        height : 96,
        width : '90%',
        margin : 16,
        padding : 16,
        paddingTop : 8,
        fontFamily : 'ExoRegular',
        fontSize : 17,
        alignContent : 'flex-start',
        backgroundColor : '#f1f1f1'
    },
    line : {
        flex : 1,
        width : '30%',
        marginHorizontal : '2.5%',
        backgroundColor : '#fff'
    },
    nutrition : {
        borderRadius : 4,
        borderTopLeftRadius : 0,
        height : 48,
        width : '100%',
        paddingHorizontal : 16,
        fontFamily : 'ExoRegular',
        fontSize : 17,
        backgroundColor : '#f1f1f1',
        flex : 1,
        alignContent : 'flex-start',
    },
    calories : {
        borderRadius : 4,
        width : '90%',
        borderTopLeftRadius : 0,
        paddingHorizontal : 16,
        paddingVertical : 8,
        alignSelf : 'center',
        margin : 32,
        borderColor : '#a13e00',
        borderWidth : 1,
    },
    body : {
        fontSize : 17,
        color : '#3b3b3b',
        margin : 4,
        fontFamily : 'ExoRegular',
    },
    placeholder : {
        fontFamily : 'ExoRegular',
        fontSize : 17,
        paddingHorizontal : 16,
        color : '#626262',
        paddingVertical : 2,
    },
    tags : {
        borderRadius : 4,
        borderTopLeftRadius : 0,
        alignItems : 'center',
        backgroundColor : '#f1f1f1',
        marginVertical : 8,
        paddingVertical : 16,
        marginHorizontal : 16,
        justifyContent : 'flex-start',
        flexDirection : 'row',
        flexWrap : 'wrap'
    },
    selectedTags : {
        borderRadius : 4,
        borderTopLeftRadius : 0,
        alignItems : 'flex-start',
        marginVertical : 8,
        paddingVertical : 16,
        marginHorizontal : 16,
        justifyContent : 'flex-start',
        flexDirection : 'column',
        flexWrap : 'wrap',
        backgroundColor : '#f1f1f1'
    },
    selectedTagsText : {
        fontFamily : 'ExoRegular',
        fontSize : 17,
        paddingHorizontal : 16,
        paddingVertical : 8,
        color : '#000',
    },
    subheading : {
        fontFamily : 'ExoRegular',
        fontSize : 17,
        color : '#a13e00',
        alignSelf : 'center',
        margin : 8,
        marginHorizontal : 16,
    },
    tabStyle : {
        borderBottomWidth : 1,
        height : 40,
        marginVertical : 8,
        marginTop : 8,
        backgroundColor : '#fff',
        borderColor : '#fff',
        borderBottomColor : 'rgba(207, 207, 207, 0.99)'
    },
    activeTabStyle : {
        borderBottomWidth : 1,
        height : 40,
        marginTop : 8,
        marginVertical : 8,
        backgroundColor : '#fff',
        borderBottomColor : '#a13e00',
    },

});