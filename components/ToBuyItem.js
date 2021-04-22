import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Title(props) {
  var [ isPress, setIsPress ] = useState(false);

    return(
        <View style={{padding : 0}}>
          {
          isPress ? 
            <View style={styles.container}>
                <Feather name="check-circle" size={20} color="#3b3b3b" onPress={() => setIsPress(!isPress)} />
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Text style={styles.clicked}>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)} </Text>
                    <View style={{flexGrow : 1}}></View>
                    {Object.keys(props.item.qty).map((key) => (
                      <View style={{flexDirection : 'column', width : '50%'}}>
                        <Text style={styles.clicked}>{props.item.qty[key]} {key.length > 4 ? key.substring(0,4) : key}</Text>
                      </View>
                        ))}
                </View>
            </View> 
          :
            <View style={styles.container}>
                <Feather name="circle" size={20} color="#3b3b3b" onPress={() => setIsPress(!isPress)} />
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <Text style={styles.unclicked}>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)}</Text>
                    <View style={{flexGrow : 1}}></View>
                    {Object.keys(props.item.qty).map((key) => (
                      <View style={{flexDirection : 'column', width : '50%'}}>
                        <Text style={styles.unclicked}>{props.item.qty[key]} {key.length > 4 ? key.substring(0,4) : key}</Text>
                      </View>
                        ))}
                      
                </View>
          </View>  
          }
          <View style={{margin : 8}}></View>
            
        </View>
       
    )
}
  
  const styles = StyleSheet.create({
    unclicked : {
      color : '#3b3b3b',
      fontSize : 17,
      marginHorizontal : 8,
      fontFamily : 'SourceSansPro_400Regular',
      width : '50%'
    },
    clicked : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'SourceSansPro_400Regular',
      marginHorizontal : 12,
      textDecorationLine : 'line-through',
      width : '50%'
    },
    container : {
        paddingHorizontal : 4,
        paddingVertical : 8,
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
    },
  });