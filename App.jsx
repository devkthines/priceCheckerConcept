/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect, useState} from 'react';
// import type {PropsWithChildren} from 'react';
import {  StyleSheet} from 'react-native';
import SelectionScreen from './screens/selectionScreen.tsx';
import ScanningScreen from './screens/scanningScreen.tsx'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
function App(){

 

  return (
    <NavigationContainer>
  <Stack.Navigator initialRouteName="Selection">
    <Stack.Screen name="Selection" component={SelectionScreen} />
    <Stack.Screen name="ScanningScreen" component={ScanningScreen} />
  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 300,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default App;
