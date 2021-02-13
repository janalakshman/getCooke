import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

export default function Title(props) {
    const [text, setText] = useState('')

    const changeHandler = (val) => {
        setText(val)
    }

    return(
            <View style={styles.container}>
                <TextInput
                    style = {styles.input}
                    placeholder = 'Add ingredient'
                    onChangeText = {changeHandler}
                    autoFocus 
                />
            </View> 
    )
}
  
  const styles = StyleSheet.create({
    input : {
      margin : 12,
      padding : 12
    },
    container : {
        margin : 8,
        flexDirection : 'row',
        alignItems : 'center'
    }
  });