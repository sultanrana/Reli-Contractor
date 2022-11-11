import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import { References } from '../../Constants/References'

import Notifications from '../../Screens/Dashboard/Notifications'

const Stack = createStackNavigator()
const NotificationsStack = ({navigation, route}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection:'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} 
        initialRouteName={References.Notifications}>
            <Stack.Screen name={References.Notifications} component={Notifications} />
        </Stack.Navigator>
    )
}

export default NotificationsStack;
