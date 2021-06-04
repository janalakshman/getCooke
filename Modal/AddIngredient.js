import React, { useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, KeyboardAvoidingView, Switch, FlatList, ImageBackground} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title'
import Button from '../components/Button'


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
    index : 6,
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
  const [error, setError] = useState(false)


  const {ingredients, setIngredients} = route.params;
  const handleClick = () => {
    var ing = {
      name : name,
      amount : amount,
      unit_name : unit,
      isKey : isKey
    }
    if(ing.name && ing.amount && ing.unit_name){
      setIngredients(prevState => {
        let tempArray = [...prevState, ing]
        return tempArray
      })
      navigation.navigate('AddRecipe')
    }else{
      setError(true)
    }
     
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
                            
            <Title name="Name of the ingredient" />

                <TextInput style={styles.name}
                    placeholder = "Ingredient name"
                    onChangeText={name => setName(name)}
                    value={name}
                    name="name" />
                  
                  {error ? name ? <View/> : <Text style={styles.error}>*This is a required field</Text> : <View/>}

            <Title name="Amount" />

                <TextInput style={styles.name}
                    numeric
                    placeholder = "Amount"
                    onChangeText={amount => setAmount(amount)}
                    keyboardType="numeric"
                    value={amount}
                    name="amount" />

                  {error ? amount ? <View/> : <Text style={styles.error}>*This is a required field</Text> : <View/>}

                
                <View style={styles.group}>
                    <FlatList 
                      data={DATA}
                      renderItem={Item}
                      keyExtractor={item => item.index.toString()}
                      numColumns={3}
                      />
                </View>

                  {error ? unit ? <View/> : <Text style={styles.error}>*This is a required field</Text> : <View/> }


                <View style={{flexDirection : 'row', margin : 16, justifyContent : 'space-around'}}>
                    <Text style={styles.text}>Is this a major ingredient?</Text>
                    <Switch trackColor={{ false: "#f7f7f7", true: "#5BC236" }}
                            thumbColor={isKey ? "#ffffff" : "#ffffff"}
                            ios_backgroundColor="#f7f7f7"
                            onValueChange={toggleisKey}
                            value={isKey}/>
                </View>

                <View style={{flexGrow : 1}} />

                <Button type="primary" name="Add Ingredient" onPress={() => handleClick()} />

            </ScrollView>
        </KeyboardAvoidingView>    
    </View>
    
        
  );
}

const styles = StyleSheet.create({
    name : {
        borderRadius : 8,
        backgroundColor : '#fff',
        borderColor : '#cfcfcf',
        borderWidth : 1,
        height : 56,
        width : '90%',
        margin : 16,
        padding : 16,
        fontFamily : 'ExoRegular',
        fontSize : 16,
        alignContent : 'flex-start'
    },
    text : {
        fontFamily : 'ExoRegular',
        fontSize : 14,
        alignSelf : 'center'
    },
    heading : {
        fontFamily : 'ExoSemiBold',
        fontSize : 17,
        margin : 16
    },
    unit : {
      fontFamily : 'ExoSemiBold',
      fontSize : 14,
      margin : 8,
      color : '#626262',
      textAlign : 'center'
    },
    unitbutton : {
      borderColor : '#cfcfcf',
      borderWidth : 0.25,
      flex : 1,
      backgroundColor : '#fff'
    },
    unitbuttonPressed : {
      flex : 1,
      backgroundColor : '#54b8ec'
    },
    unitOnPress : {
      fontFamily : 'ExoSemiBold',
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
    background: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    error : {
        fontFamily : 'ExoRegular',
        fontSize : 14,
        color : '#B00020',
        marginLeft : 16
    }
});