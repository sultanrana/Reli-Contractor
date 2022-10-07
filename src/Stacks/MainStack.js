import React, { useEffect } from 'react'
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack'
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { References } from '../Constants/References';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';
import ProjectDetails from '../Screens/Dashboard/ProjectDetails';

const Stack = createStackNavigator()

const MainStack = () => {

    const currentScheme = useColorScheme()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    // gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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

                <Stack.Screen
                    name={References.ProjectDetails}
                    component={ProjectDetails} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;