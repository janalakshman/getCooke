import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FilterChips from '../components/FilterChips'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionList } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../components/LoadingScreen'

const DATA = [
  {
    title: "Meal type",
    data: ["Breakfast", "Sides", "Main course", "Drinks", "Desserts"],
    index : 1,
  },
  {
    title: "Cuisine",
    data: ["Indian" , "American", "Chinese", "European"],
    index : 2,
  },
  {
    title: "Cooking appliances",
    data: ["Mixer", "Blender", "Stovetop", "Oven", "Food Processor"],
    index : 3,
  },
];

const Item = ({ title }) => {
  return(
    <View>
      <FilterChips name={title}/>
    </View>)
};

export default function FilterModal( props ) {
 

    return (
      <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  props.setModalVisible(!props.modalVisible);
                }}
              >
  
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                      <View style={styles.header}>
                        <Text style={styles.heading}>Add filters</Text>
                        <AntDesign name="closecircle" size={24} color="#3b3b3b" style={{margin : 16, marginTop : 32}}/>
                      </View>
                    </Pressable>

                  {DATA.map(tag => {
                    <ScrollView>
                      <Text style={styles.subtitle}>{tag.title}</Text>
                      <FlatList 
                            data={tag.data}
                            renderItem={({ data }) => <Item title={data}/>}
                            keyExtractor={data => data.index}
                            horizontal={true}
                            />
                    </ScrollView>
                  })}
                                                
                  </View>
                </View>
              </Modal>
                  
      </View>
          
    );
  }
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
    },
    modalView: {
      backgroundColor: "#fff",
      alignItems: "flex-start",
      justifyContent : 'flex-start',
      width : '100%',
      height : '100%',
      position : 'absolute',
      bottom : 0,
    },
    text : {
      fontSize : 19,
      color : '#3b3b3b',
      margin : 16,
      fontFamily : 'Poppins_500Medium'
  },
  heading : {
    color : '#3b3b3b',
    fontSize : 21,
    margin : 16,
    marginTop : 32,
    flexGrow : 1,
    fontFamily : 'Poppins_600SemiBold'
  },
  header : {
      backgroundColor : '#fff5e6',
      flexDirection : 'row',
      width : '100%',
      alignItems : 'center'
  },
  });
  