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

var radio_props = [
    {label: 'Male', value: 0 },
    {label: 'Female', value: 1 },
    {label : "Don't want to say", value: 2 }
  ];
  

export default function EditProfile({navigation}) {

const user = useSelector(state => state.counter.token)

const [refreshing, setRefreshing] = React.useState(false);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
      }, []);

const [name, setName] = useState(name ? name : null)
const [gender, setGender ] = useState(gender ? gender : null);
const [weight, setWeight] = useState(weight ? weight : null)
const [height, setHeight] = useState(height ? height : null)
const [age, setAge] = useState(null)
const [history, setHistory] = useState(null)
const [workout, setWorkout] = useState(null)
const [love, setLove] = useState(null)
const [hate, setHate] = useState(null)
const [time, setTime] = useState(null)
const [goals, setGoals] = useState(null)
const [special, setSpecial] = useState(null)
const [appliances, setAppliances] = useState('')
const [appliancesModal, setAppliancesModal] = useState(false)
const [cuisine, setCuisine] = useState('')
const [cuisineModal, setCuisineModal] = useState(false)
const [diet, setDiet] = useState('')
const [dietModal, setDietModal] = useState(false)
const [tags, setTags] = useState(null)
const [loading, setLoading] = useState(false)
let cuisineID, appliancesID, dietID
let bmi = Math.round(weight*10000/(height*height), 2)

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

                    <View style={{margin : 8}} />

                        <Text style={styles.text}>Name</Text>

                        <TextInput style={styles.name}
                            placeholder = "Or the name you have always wanted"
                            onChangeText={note => setName(note)}
                            value={name}
                            name="name" />

                    <View style={{margin : 8}} />

                    
                        <Text style={styles.text}>Gender</Text>


                        <View style={{marginHorizontal : 32, margin : 16}}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={gender}
                                animation={true}
                                onPress={(value) => setGender(value)}
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
                                        onChangeText={weight => setWeight(weight)}
                                        value={weight}
                                        keyboardType="numeric"
                                        name="weight" />
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.body}>Height</Text>     
                                    <TextInput style={styles.nutrition}
                                        placeholder = "cm"
                                        onChangeText={height => setHeight(height)}
                                        value={height}
                                        keyboardType="numeric"
                                        name="height" />
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.body}>Age</Text>     
                                    <TextInput style={styles.nutrition}
                                        placeholder = "years"
                                        onChangeText={age => setAge(age)}
                                        value={age}
                                        keyboardType="numeric"
                                        name="age" />
                                </View>
                            </View>
                                
                                <View style={styles.calories}>
                                    <Text style={styles.subheading}>Body Mass Index : {height ? weight ? Math.round(weight*10000/(height*height), 2) : 0 : 0}</Text>
                                </View>     

                    </View>
                    

                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Medical history</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "We care about this a lot. Spare no details!"
                                    onChangeText={notes => setHistory(notes)}
                                    value={history}
                                    name="history" />

                    <View style={{margin : 8}} />


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Workout schedule</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "Couch potato / Gym freak / In between?"
                                    onChangeText={notes => setWorkout(notes)}
                                    value={workout}
                                    name="workout" />

                    <View style={{margin : 8}} />


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Food you love</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "The dishes you can't help but salivate"
                                    onChangeText={notes => setLove(notes)}
                                    value={love}
                                    name="love" />

                    <View style={{margin : 8}} /> 


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Food you hate</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "You will rather fast than eat this"
                                    onChangeText={notes => setHate(notes)}
                                    value={hate}
                                    name="hate" />

                    <View style={{margin : 8}} />


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Time available to cook per day</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "Describe your cooking schedule/ arrangement"
                                    onChangeText={notes => setTime(notes)}
                                    value={time}
                                    name="time" />

                    <View style={{margin : 8}} />

                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Your fitness goals</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "It's okay to be ambitious!"
                                    onChangeText={notes => setGoals(notes)}
                                    value={goals}
                                    name="goals" />

                    <View style={{margin : 8}} />  


                    <View style={{margin : 8}} />

                            <Text style={styles.text}>Special note</Text>

                            <TextInput style={styles.notes}
                                    multiline
                                    placeholder = "Ooooh! More information. We love it!"
                                    onChangeText={notes => setSpecial(notes)}
                                    value={special}
                                    name="special" />

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
        borderRadius : 8,
        borderTopLeftRadius : 0,
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 60,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'ExoRegular',
        fontSize : 17,
        color : '#626262',
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
    },
    body : {
        fontSize : 16,
        color : '#3b3b3b',
        margin : 4,
        fontFamily : 'ExoRegular',
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
    subheading : {
        fontFamily : 'ExoMedium',
        fontSize : 17,
        color : '#a13e00',
        alignSelf : 'center',
        margin : 8,
        marginHorizontal : 16,
    }

});