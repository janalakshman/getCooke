import React ,{ useState }from 'react';
import { StyleSheet, Text, View, Modal, Pressable, FlatList, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FilterChips from './FilterChips'
import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionList } from 'react-native';
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import LoadingScreen from '../LoadingScreen'

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
    <View style={{flexDirection : 'row', flexWrap : 'wrap'}}>
      <FilterChips name={title}/>
    </View>)
};

export default function FilterModal( props ) {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular
  });

  
  if (!fontsLoaded) {
    return (<LoadingScreen />);
  }

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

                  <ScrollView style={{width : '100%'}}>
                  {DATA.map(tag => {
                    <Text style={styles.subtitle}>{tag.title}</Text>
                  })}
                  <SectionList
                        sections={DATA}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                          <Text style={styles.text}>{title}</Text>
                        )}
                      />
                  </ScrollView>
                                                
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
      fontWeight : '500',
      margin : 16,
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
  