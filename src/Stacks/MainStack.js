import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { References } from '../Constants/References';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';
import ProjectDetails from '../Screens/Dashboard/ProjectDetails';
import Location from '../Screens/Dashboard/Location';
import Email from '../Screens/Dashboard/Email';
import NewNumber from '../Screens/Dashboard/NewNumber';
import NewPassword from '../Screens/Dashboard/NewPassword';

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

                <Stack.Screen
                    name={References.Location}
                    component={Location} />

                <Stack.Screen
                    name={References.Email}
                    component={Email} />

                <Stack.Screen
                    name={References.NewNumber}
                    component={NewNumber} />

                <Stack.Screen
                    name={References.NewPassword}
                    component={NewPassword} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;