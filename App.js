import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
}

// function Login({ setAut }) {
//   const [PIN, setPIN] = React.useState('123');

//   async function auth(PIN){
//     // do api stuff ...
//     await store('PIN', PIN)
//     console.log(PIN)
//     console.log(await get('PIN'))
//   }
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <TextInput
//         value={PIN}
//         onChangeText={setPIN}
//         placeholder='PIN'
//         keyboardType='number-pad'
//         style={styles.intInput}
//       />
//       <Button title='Login' onPress={async () => auth()}/>
//     </View>
//   );
// }

function Home() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
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
  },
  intInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  }
});
