import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

export default function Title(props) {
  var [ isPress, setIsPress ] = React.useState(false);

  const handleClick = () => {
    setIsPress(!isPress)
  }

    return(
        <View>
          {
          isPress ? 
          <View>
            <View style={styles.container}>
                <Feather name="check-circle" size={20} color="#3b3b3b" onPress={() => handleClick()} />
                <Text style={styles.heading2}>{props.item.amount} {props.item.unit} {props.item.name} </Text>
            </View> 
            <Divider style={{margin : 4}} /> 
          </View>
          :
          <View>
            <View style={styles.container}>
                <Feather name="circle" size={20} color="#3b3b3b" onPress={() => handleClick()} />
                <Text style={styles.heading}>{props.item.amount} {props.item.unit} {props.item.name} </Text>
            </View> 
            <Divider style={{margin : 4}} /> 
          </View>  
          }
            
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
    heading2 : {
      color : '#3b3b3b',
      fontSize : 17,
      fontWeight : '400',
      margin : 12,
      textDecorationLine : 'line-through'
    },
    container : {
        margin : 8,
        flexDirection : 'row',
        alignItems : 'center'
    }
  });