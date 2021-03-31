import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarCardIcon from '../assets/calendarCardIcon.png';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular} from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

export default function Header(props){
    let [fontsLoaded] = useFonts({
        Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
      });
    
      if (!fontsLoaded) {
        return (<LoadingScreen />);
      }

    const navigation = useNavigation(); 

    return(
            <View style={styles.lunchcard}>
                
            <Pressable onPressIn ={() => navigation.navigate('RecipeDetail')}>
            <View>
                <Text style={styles.text}>Paneer Butter Masala</Text>  
            </View>
            </Pressable>   


            <View style={{flexDirection : 'row', marginVertical : 4}}>
                <View style={{flexDirection : 'row', justify : 'row', alignItems : 'center', marginRight : 32 }}>
                    <MaterialIcons name="nights-stay" style={styles.icon} />
                    <Text style={styles.smalltext}>Overnight prep</Text> 
                </View>
            
                <View style={{flexDirection : 'row', justify : 'row', alignItems : 'center'}}>
                    <MaterialIcons name="access-time" style={styles.icon} />
                    <Text style={styles.smalltext}>7:30 PM</Text>
                </View>
            </View>
 
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    breakfastcard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fbfbb6',
        padding : 16,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    lunchcard : {
        flexDirection : 'column',
        width : '88%',
        padding : 16, 
        margin : 8,
        borderRadius : 4,
        alignSelf : 'center',
        backgroundColor : '#b6d2fb',
        flexGrow : 1,
        borderTopLeftRadius : 0,
        borderRadius : 20,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    brunchcard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#e5f9d2',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    snackscard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#edb6fb',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
    dinnercard : {
        marginLeft : '10%',
        flexDirection : 'row',
        width : '90%',
        backgroundColor : '#fbb6b6',
        padding : 8,
        margin : 8,
        borderTopLeftRadius : 8,
        borderBottomLeftRadius : 8,
        elevation : 3,
        shadowRadius : 2,
        shadowOpacity : 0.5,
        shadowColor : 'rgba(0, 0, 0, 0.25)',
        shadowOffset : {width : 0, height : 4},
    },
  imageIcon : {
      height : 16,
      width : 21.5,
  },
  icon : {
      fontSize : 16,
      color : '#3b3b3b',
  },
  text : {
      fontSize : 17,
      color : '#3b3b3b',
      fontFamily : 'Poppins_500Medium'
  },
  smalltext : {
      fontSize : 14,
      color : '#3b3b3b',
      margin : 4,
      fontFamily : 'Poppins_400Regular'
  },
  });