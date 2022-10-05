import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import { References } from '../../Constants/References'

import Staff from '../../Screens/Dashboard/Staff'

const Stack = createStackNavigator()
const StaffStack = ({navigation, route}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection:'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} 
        initialRouteName={References.Staff}>
            <Stack.Screen name={References.Staff} component={Staff} />
        </Stack.Navigator>
    )
}

export default StaffStack;
