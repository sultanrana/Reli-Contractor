import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import { References } from '../../Constants/References'

import Account from '../../Screens/Dashboard/Account'

const Stack = createStackNavigator()
const AccountStack = ({navigation, route}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection:'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} 
        initialRouteName={References.Account}>
            <Stack.Screen name={References.Account} component={Account} />
        </Stack.Navigator>
    )
}

export default AccountStack;
