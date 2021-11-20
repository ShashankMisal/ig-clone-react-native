import { LogBox } from 'react-native';
import React from 'react';
import AuthNavigation from './AuthNavigation';
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  return (
    <AuthNavigation />
  );
}
