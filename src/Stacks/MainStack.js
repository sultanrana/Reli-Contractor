import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { useColorScheme,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { References } from '../Constants/References';
import Splash from '../Screens/Splash';
import AuthStack from './AuthStack';
import DashboardStack from './DashboardStack';
import ProjectDetails from '../Screens/Dashboard/ProjectDetails';
import Location from '../Screens/Dashboard/Location';
import AccountDetails from '../Screens/Dashboard/AccountDetails';
import NewNumber from '../Screens/Dashboard/NewNumber';
import NewPassword from '../Screens/Dashboard/NewPassword';
import ContactUs from '../Screens/Dashboard/ContactUs';
import Colors from '../Theme/Colors';

const Stack = createStackNavigator()

const MainStack = () => {

    const scheme = useColorScheme()
    const AppColors = Colors(scheme)
    return (
        <NavigationContainer>
            {/* <StatusBar barStyle='light-content' translucent backgroundColor={AppColors.Background} /> */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
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
                    name={References.AccountDetails}
                    component={AccountDetails} />

                <Stack.Screen
                    name={References.NewNumber}
                    component={NewNumber} />

                <Stack.Screen
                    name={References.NewPassword}
                    component={NewPassword} />

                <Stack.Screen
                    name={References.ContactUs}
                    component={ContactUs} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;