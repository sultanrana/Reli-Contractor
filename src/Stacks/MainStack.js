import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { References } from '../Constants/References';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
import { useColorScheme } from 'react-native';
import DashboardStack from './DashboardStack';

const Stack = createStackNavigator()

const MainStack = () => {

    const currentScheme = useColorScheme()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }} initialRouteName={References.Splash}>

                <Stack.Screen
                    name={References.Splash}
                    component={Splash} />

                <Stack.Screen
                    name={References.AuthenticationStack}
                    component={AuthStack} />

                <Stack.Screen
                    name={References.DashboardStack}
                    component={DashboardStack} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;