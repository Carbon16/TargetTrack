import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, Pressable, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'

Drawer = createDrawerNavigator()

async function store(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

async function get(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {};
};

const users = [
  {title: 'LG Skingley'},
  {title: 'KS Kousetta'},
  {title: 'GI Williams'},
  {title: 'OJ Scott'},
  {title: 'T MR'},
  {title: 'LI Hughes'},
  {title: 'I Matson'},
  {title: 'J Leung'},
  {title: 'R Darwish'},
  {title: 'Whitley B'},
  {title: 'Z Moir'},
  {title: 'J Williams'},
  {title: 'H Hamlyn'},
  {title: 'B Whitley'},
  {title: 'A Patel'},
  {title: 'F Cheung'},
  {title: 'C MR'},
  {title: 'A Jallot'}
]

function Home() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

function Score({navigation}) {
  return (
    <SafeAreaView >
      <FlatList
        data={users}
        style={{flexGrow: 1}}
        renderItem={({item}) => <Pressable onPress={() => navigation.navigate('Entry', {name: item.title})} style={styles.item}><Text>{item.title}</Text></Pressable>}>
      </FlatList>
    </SafeAreaView>
  );
}

function Entry({route}) {
  const {name} = route.params;
  const [score, setScore] = useState('')
  const [V, setV] = useState('')
  const [selectedName, setSelectedName] = useState('Self');
  const [distance, setDistance] = useState('600')
  const [toCount, settoCount] = useState('10')
  const [A, setA] = useState('NULL')
  const [B, setB] = useState('NULL')

  async function dispatch(){
    let response;
    if (A == 'NULL' || B == 'NULL'){
      response = await fetch(`http://172.20.10.4:8080/add/${name}/${score}/${V}/${selectedName}/${distance}/${toCount}`);
    } else {
      response = await fetch(`http://172.20.10.4:8080/add/${name}/${score}/${V}/${selectedName}/${distance}/${toCount}/${A}/${B}`);
    }
  
    if (response.status === 201) {
      Alert.alert('Success', 'Data submitted successfully'); // Show success alert
      navigation.navigate('Score'); // Navigate to Entry screen
    } else {
      Alert.alert('Error', 'Something went wrong'); // Show error alert
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={{fontSize: 15}}>Name: {name}</Text>
      <TextInput style={styles.Input} onChangeText={setScore} keyboardType='numeric' placeholder="Score"></TextInput>
      <TextInput style={styles.Input} onChangeText={setV} keyboardType='numeric' placeholder="Vs"></TextInput>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>Coach</Text>
      <Picker 
        selectedValue={selectedName}
        onValueChange={(itemValue, itemIndex) => setSelectedName(itemValue)}
        style={{height: 150}}
        itemStyle={{height: 150}}
      >
        <Picker.Item style={styles.pickerItem} label="Self" value="Self" />
        <Picker.Item style={styles.pickerItem} label="LG Skingley" value="LG Skingley" />
        <Picker.Item style={styles.pickerItem} label="KS Kousetta" value="KS Kousetta" />
        <Picker.Item style={styles.pickerItem} label="T MR" value="T MR" />
        <Picker.Item style={styles.pickerItem} label="Andrew" value="Andrew" />
        <Picker.Item style={styles.pickerItem} label="GI Williams" value="GI Williams" />
        <Picker.Item style={styles.pickerItem} label="OJ Scott" value="OJ Scott" />
        <Picker.Item style={styles.pickerItem} label="LI Hughes" value="LI Hughes" />
        <Picker.Item style={styles.pickerItem} label="I Matson" value="I Matson" />
        <Picker.Item style={styles.pickerItem} label="J Leung" value="J Leung" />
        <Picker.Item style={styles.pickerItem} label="R Darwish" value="R Darwish" />
        <Picker.Item style={styles.pickerItem} label="Whitley B" value="Whitley B" />
        <Picker.Item style={styles.pickerItem} label="Z Moir" value="Z Moir" />
        <Picker.Item style={styles.pickerItem} label="J Williams" value="J Williams" />
        <Picker.Item style={styles.pickerItem} label="H Hamlyn" value="H Hamlyn" />
        <Picker.Item style={styles.pickerItem} label="B Whitley" value="B Whitley" />
        <Picker.Item style={styles.pickerItem} label="A Patel" value="A Patel" />
        <Picker.Item style={styles.pickerItem} label="F Cheung" value="F Cheung" />
        <Picker.Item style={styles.pickerItem} label="C MR" value="C MR" />
      </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>Distance</Text>
      <Picker
        selectedValue={distance}
        onValueChange={(itemValue, itemIndex) => setDistance(itemValue)}
        style={{height: 150}}
        itemStyle={{height: 150}}
      >
        <Picker.Item style={styles.pickerItem} label="200" value="200" />
        <Picker.Item style={styles.pickerItem} label="300" value="300" />
        <Picker.Item style={styles.pickerItem} label="500" value="500" />
        <Picker.Item style={styles.pickerItem} label="600" value="600" />
        <Picker.Item style={styles.pickerItem} label="900" value="900" />
        <Picker.Item style={styles.pickerItem} label="1000" value="1000" />
      </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>To Count</Text>
      <Picker
        selectedValue={toCount}
        onValueChange={(itemValue, itemIndex) => settoCount(itemValue)}
        style={{height: 150}}
        itemStyle={{height: 150}}
      >
        <Picker.Item style={styles.pickerItem} label="7" value="7" />
        <Picker.Item style={styles.pickerItem} label="10" value="10" />
        <Picker.Item style={styles.pickerItem} label="15" value="15" />
      </Picker>
      </View>
      <View style={styles.pickerContainer}> 
        <Text style={styles.pickerText}>First sighter (A)</Text> 
      <Picker
        selectedValue={A}
        onValueChange={(itemValue, itemIndex) => setA(itemValue)}
        style={{height: 150}}
        itemStyle={{height: 150}}

      >
        <Picker.Item style={styles.pickerItem} label="?" value="NULL" />
        <Picker.Item style={styles.pickerItem} label="V" value="V" />
        <Picker.Item style={styles.pickerItem} label="5" value="5" />
        <Picker.Item style={styles.pickerItem} label="4" value="4" />
        <Picker.Item style={styles.pickerItem} label="3" value="3" />
        <Picker.Item style={styles.pickerItem} label="2" value="2" />
        <Picker.Item style={styles.pickerItem} label="1" value="1" />
        <Picker.Item style={styles.pickerItem} label="0" value="0" />
      </Picker>
      </View>
      <View style={styles.pickerContainer}> 
        <Text style={styles.pickerText}>Second sighter (B)</Text>
      <Picker 
        selectedValue={B}
        onValueChange={(itemValue, itemIndex) => setB(itemValue)}
        style={{height: 150}}
        itemStyle={{height: 150}}
      >
        <Picker.Item style={styles.pickerItem} label="?" value="NULL" />
        <Picker.Item style={styles.pickerItem} label="V" value="V" />
        <Picker.Item style={styles.pickerItem} label="5" value="5" />
        <Picker.Item style={styles.pickerItem} label="4" value="4" />
        <Picker.Item style={styles.pickerItem} label="3" value="3" />
        <Picker.Item style={styles.pickerItem} label="2" value="2" />
        <Picker.Item style={styles.pickerItem} label="1" value="1" />
        <Picker.Item style={styles.pickerItem} label="0" value="0" />
      </Picker>
      </View>
      <Button title="Submit" onPress={dispatch}></Button>
      </ScrollView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Score" component={Score} />
        <Drawer.Screen name="Entry" component={Entry} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  intInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'lightgray',
    fontFamily: 'Arial',
    fontSize: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    },
    Input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 20,
      padding: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    pickerText: {
      marginBottom: 10,
    },
    pickerItem: {
      padding: 10,
      fontSize: 18,
    }
});