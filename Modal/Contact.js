import React, { useState, useEffect, useReducer} from "react";
import { StyleSheet, ScrollView, Text, View, KeyboardAvoidingView, Alert} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from 'react-redux'
import Title from '../components/Title'
import Button from '../components/Button'
import config from '../config';
import LoadingScreen from "../components/LoadingScreen";

export default function AddIngredient({navigation}) {
    const [problem, setProblem] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.counter.token)

    const handleClick = () => {
        if(problem || suggestions){
            const payload = { issues : problem, likes : suggestions, user : user.user.id}
            setLoading(true)

            return(
                fetch(config.api + `/v1/feedback`,
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
                    setLoading(false)
                    Alert.alert(
                        "Feedback submitted",
                        "Thank you for your feedback. We will address them as soon as possible!",
                        [
                            {text : "Ok"},
                        ]
                        )
                        setMarkedDates({})
                        setCourses([])    
                    })
                    .catch((err) => {
                    console.log('error')
                })
                    )
                }
                else 
                    setError(true)

            }

 

  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                              behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {loading ? (<LoadingScreen/>) : (
            <ScrollView>
                            
            <Title name="Feedback" />

                <TextInput style={styles.name}
                    multiline
                    placeholder = "Spare no details"
                    onChangeText={name => setProblem(name)}
                    value={problem}
                    name="problem" />
                {error ?  <Text style={styles.error}>*Both fields cannot be empty</Text> : <View/>}


            <Title name="Emotional state" />

                <TextInput style={styles.name}
                    multiline
                    placeholder = "Are you angry/upset/happy/confused?"
                    onChangeText={amount => setSuggestions(amount)}
                    value={suggestions}
                    name="suggestions" />
                {error ?  <Text style={styles.error}>*Both fields cannot be empty</Text> : <View/>}


                <View style={{flexGrow : 1}} />
 
            <Title name="Want to chat?" />

                <Text style={styles.contact}>Mail us at hello@getcooke.com</Text>


                <Button type="primary" name="Send Feedback" onPress={() => handleClick()} />

            </ScrollView>
        )}
            
        </KeyboardAvoidingView>    
    </View>
  );
}

const styles = StyleSheet.create({
    name : {
        borderRadius : 4,
        borderTopLeftRadius : 0,
        height : 96,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'ExoRegular',
        fontSize : 17,
        alignContent : 'flex-start',
        backgroundColor : '#f1f1f1'
    },
    contact : {
        fontFamily : 'ExoRegular',
        margin : 16,
        marginBottom : 32,
        color : '#3b3b3b',
        fontSize : 17
    },
    error : {
        fontFamily : 'ExoRegular',
        fontSize : 14,
        color : '#B00020',
        marginLeft : 16
    }
});