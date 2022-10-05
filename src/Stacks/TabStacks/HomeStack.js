import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import { References } from '../../Constants/References'

import Home from '../../Screens/Dashboard/Home'

const Stack = createStackNavigator()
const HomeStack = ({navigation, route}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection:'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} 
        initialRouteName={References.Home}>
            <Stack.Screen name={References.Home} component={Home} />
        </Stack.Navigator>
    )
}

export default HomeStack;
