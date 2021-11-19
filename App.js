import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignedInStack from './navigation';
import AddNewPostScreen from './screens/AddNewPostScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <SignedInStack />
  );
}
