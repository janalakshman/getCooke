import React, {useState} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, VirtualizedList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const ToBuyItem = (props) => {
    var [ isPress, setIsPress ] = useState(false);
  
      return(
          <View style={{padding : 0}}>
            {
            isPress ? 
              <Pressable style={styles.box}  onPress={() => setIsPress(!isPress)} >
                  <MaterialIcons name="check-box" size={24} color="black" />
                  <View style={{flexDirection : 'row', alignItems : 'center'}}>
                      <Text style={styles.clicked}>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)} </Text>
                      <View style={{flexGrow : 0.8}}></View>
                      <View style={{flexDirection : 'column', width : '50%', flexWrap : 'wrap'}}>
                        {Object.keys(props.item.qty).map((key) => (
                            <Text style={styles.clicked}>{(props.item.qty[key]).toFixed(2)} {key.length > 4 ? key.substring(0,4) : key}</Text>
                            ))}
                      </View>

                  </View>
              </Pressable> 
            :
              <Pressable style={styles.box} onPress={() => setIsPress(!isPress)} >
                  <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
                  <View style={{flexDirection : 'row', alignItems : 'center'}}>
                      <Text style={styles.unclicked}>{props.item.name.charAt(0).toUpperCase() + props.item.name.slice(1)}</Text>
                      <View style={{flexGrow : 0.8}}></View>
                      <View style={{flexDirection : 'row', width : '50%', flexWrap : 'wrap'}}>
                        {Object.keys(props.item.qty).map((key) => (
                            <Text key={key.toString()} style={styles.unclicked}>{(props.item.qty[key]).toFixed(2)} {key.length > 4 ? key.substring(0,4) : key}</Text>
                            ))}
                      </View>

                        
                  </View>
            </Pressable>  
            }
            <View style={{margin : 8}}></View>
              
          </View>
         
      )
  }

export default function ToBuy(props){  

    return(
        <SafeAreaView style={styles.card} >
            <FlatList 
                data={props.ingredients}
                keyExtractor={item => item.index}
                renderItem={( {item} ) => (
                    <ToBuyItem item={item}/>
                )
                }/>
        </SafeAreaView>
     
    )
}

const styles = StyleSheet.create({
    card : {
        width : '100%',
        paddingHorizontal : 16, 
        paddingBottom : 8,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#ffffff',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
    },
      container : {
          margin : 8,
          flexDirection : 'row',
          justifyContent : 'flex-start'
      },
      unclicked : {
        color : '#3b3b3b',
        fontSize : 14,
        marginHorizontal : 16,
        fontFamily : 'ExoMedium',
        width : '45%'
      },
      clicked : {
        color : '#3b3b3b',
        fontSize : 14,
        fontFamily : 'ExoMedium',
        marginHorizontal : 16,
        textDecorationLine : 'line-through',
        width : '45%'
      },
      box : {
          padding : 8,
          flexDirection : 'row',
          justifyContent : 'flex-start',
          alignItems : 'center',
          borderColor : '#cfcfcf',
          borderBottomWidth : 0.5
      },
  });