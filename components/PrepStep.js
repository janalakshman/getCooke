import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function PrepStep(props) {

  let count = 0;
    return(
     
                  <View style={{paddingBottom : 80, backgroundColor : '#fffafa'}}>
                    {props.steps ? 
                      <View >
                          {props.steps.map(step => 
                            <View key={step.id.toString()} style={styles.container}>
                              <Text style={styles.title}>{++count}</Text>
            
                              <View style={{paddingLeft : 8, paddingRight : 8}}>
                                <Text style={styles.text}>{step.step}</Text>
                                {step.image ? 
                                    <Image source={{uri : step.image}} alt="prep" style={styles.image} /> : <View/>

                                }
                              </View>

                            </View>
                            )}
                      </View>: 
                      <View style={{paddingBottom : 32}}></View>}
                </View> 
            
    )
}
  
  const styles = StyleSheet.create({
    text : {
      color : '#3b3b3b',
      fontSize : 17,
      fontFamily : 'ExoRegular',
      margin : 16,
      },
    title : {
        color : '#a13e00',
        fontSize : 17,
        marginHorizontal : 16,
        marginVertical : 6,
        fontFamily : 'ExoSemiBold',
    },
    container: {
        margin : 16,
        paddingRight : 16,
        backgroundColor : '#fff',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        flexDirection : 'row',
        alignItems : 'center'
        // borderWidth : 1,
        // borderColor : '#cfcfcf'
        // elevation : 3,
        // shadowRadius : 3,
        // shadowOpacity : 0.5,
        // shadowColor : 'rgba(0, 0, 0, 0.25)',
        // shadowOffset : {width : 0, height : 4},
    },
    image : {
      width : '100%',
      height : 350,
      borderRadius : 20,
      borderTopLeftRadius : 0
  },
  });