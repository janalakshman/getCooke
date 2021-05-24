import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, Switch, FlatList} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title'
import Button from '../components/Button'


export default function AddIngredient({navigation}) {
    const [problem, setProblem] = useState();
    const [suggestions, setSuggestions] = useState();

 

  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                              behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
                            
            <Title name="Problems faced on the app" />

                <TextInput style={styles.name}
                    multiline
                    placeholder = "Spare no details"
                    onChangeText={name => setProblem(name)}
                    value={problem}
                    name="problem" />

            <Title name="Recipes you would like" />

                <TextInput style={styles.name}
                    multiline
                    placeholder = "Vegan dishes like..."
                    onChangeText={amount => setSuggestions(amount)}
                    value={suggestions}
                    name="suggestions" />
                

                <View style={{flexGrow : 1}} />

            <Title name="For everything else" />

                <Text style={styles.contact}>Send a mail to jana@getcooke.com</Text>


                <Button type="primary" name="Send Feedback" onPress={() => handleClick()} />

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
        height : 100,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'ExoRegular',
        fontSize : 17,
        alignContent : 'flex-start'
    },
    contact : {
        fontFamily : 'ExoRegular',
        margin : 16,
        color : '#3b3b3b',
        fontSize : 17
    }
});