import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, Switch, FlatList} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    item : 'g',
    index : 1,
  },
  {
    item : 'ml',
    index : 2,
  },
  {
    item : 'cup',
    index : 3,
  },
  {
    item : 'tbsp',
    index : 4,
  },
  {
    item : 'tsp',
    index : 5,
  },
  {
    item : 'number',
    index : 5,
  },
];

const UnitButton = (props) => {
  const [isPress, setIsPress] = useState(false)
  const setUnit = props.setUnit
  const unit = props.unit
  const item = props.item

  const handleClick = (item) => {
    setUnit(item)
    setIsPress(() => !isPress)
  }

  return (
    <TouchableOpacity style={isPress ? styles.unitbuttonPressed : styles.unitbutton} onPress={() => handleClick(item)}>
      <Text style={isPress ? styles.unitOnPress : styles.unit}>{item}</Text>
    </TouchableOpacity>
  )
}

export default function AddIngredient({route, navigation}) {

  const {ingredients, setIngredients} = route.params;
  const handleClick = () => {
    var ing = {
      name : name,
      amount : amount,
      unit : unit,
      isKey : isKey
    }
      setIngredients(prevState => {
          let tempArray = [...prevState, ing]
          return tempArray
        })
    navigation.navigate('AddRecipe')
  }
  
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null)
  const [unit, setUnit] = useState(null)
  const [isKey, setIsKey] = useState(false)
  const toggleisKey = () => setIsKey(previousState => !previousState);

  const Item = ({item}) => (
    <UnitButton item={item.item} unit={unit} setUnit={setUnit} />
  )
  

  return (
    <View style={{backgroundColor : '#fff', flex : 1}} >
        <KeyboardAvoidingView style={{backgroundColor : '#fff', flex : 1}}
                              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
                              behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView>
            
            <Text style={styles.main}>Add Ingredient</Text>
                
            <Text style={styles.heading}>Ingredient name</Text>

                <TextInput style={styles.name}
                    placeholder = "Ingredient name"
                    onChangeText={name => setName(name)}
                    value={name}
                    name="name" />

            <Text style={styles.heading}>Amount</Text>

                <TextInput style={styles.name}
                    numeric
                    placeholder = "Amount"
                    onChangeText={amount => setAmount(amount)}
                    keyboardType="numeric"
                    value={amount}
                    name="amount" />
                
                <View style={styles.group}>
                    <FlatList 
                      data={DATA}
                      renderItem={Item}
                      keyExtractor={item => item.index.toString()}
                      numColumns={3}
                      />
                </View>

                <View style={{flexDirection : 'row', margin : 16, justifyContent : 'space-around'}}>
                    <Text style={styles.text}>Is this a major ingredient?</Text>
                    <Switch trackColor={{ false: "#f7f7f7", true: "#5BC236" }}
                            thumbColor={isKey ? "#ffffff" : "#ffffff"}
                            ios_backgroundColor="#f7f7f7"
                            onValueChange={toggleisKey}
                            value={isKey}/>
                </View>

                <TouchableOpacity  style={styles.button} onPress={() => handleClick()}>
                    <Text style={styles.buttonText}>Add ingredient</Text>
                </TouchableOpacity>

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
    heading : {
        fontFamily : 'Poppins_600SemiBold',
        fontSize : 19,
        margin : 16
    },
    unit : {
      fontFamily : 'Poppins_500Medium',
      fontSize : 14,
      margin : 8,
      color : '#626262',
      textAlign : 'center'
    },
    unitbutton : {
      borderColor : '#cfcfcf',
      borderWidth : 0.25,
      flex : 1,
    },
    unitbuttonPressed : {
      flex : 1,
      backgroundColor : '#54b8ec'
    },
    unitOnPress : {
      fontFamily : 'Poppins_500Medium',
      fontSize : 14,
      margin : 8,
      color : '#ffffff',
      textAlign : 'center',
    },
    group : {
      flexDirection : 'row',
      margin : 16,
      marginVertical : 8,
      flexWrap : 'wrap'
    },
    main : {
        color : '#3b3b3b',
        fontSize : 32,
        fontFamily : 'SourceSerifPro',
        margin : 16
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
});