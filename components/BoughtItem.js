import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

export default function Title(props) {

    return(
        <View>
            <View style={styles.container}>
                <Feather name="check-circle" size={20} color="#3b3b3b" onPress={handlePress} />
                <Text style={styles.heading}>{props.item.amount} {props.item.unit} {props.item.name} </Text>
            </View> 
            <Divider style={{margin : 4}} />
        </View>
       
    )
}
  
  const styles = StyleSheet.create({
    heading : {
      color : '#3b3b3b',
      fontSize : 17,
      fontWeight : '400',
      margin : 12
    },
    container : {
        margin : 8,
        flexDirection : 'row',
        alignItems : 'center'
    }
  });