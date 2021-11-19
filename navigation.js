import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text } from 'react-native'
import AddNewPostScreen from './screens/AddNewPostScreen'
import HomeScreen from './screens/HomeScreen'

const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false
}

const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AddNewPostScreen" component={AddNewPostScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default SignedInStack
