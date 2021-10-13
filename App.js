import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootStackScreen from './app/screens/AuthStackNavigator';
import ProfileScreen from './app/screens/ProfileScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Stack.Navigator> */}
    </NavigationContainer>
    );
}
