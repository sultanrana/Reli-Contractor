import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import { References } from '../Constants/References'

import LoginPrimary from '../Screens/Authentication/LoginPrimary'
import LoginSecondary from '../Screens/Authentication/LoginSecondary'
import ForgotPassword from '../Screens/Authentication/ForgotPassword'
import SignupPrimary from '../Screens/Authentication/SignupPrimary'
import SignupSecondary from '../Screens/Authentication/SignupSecondary'
import SignupTertiary from '../Screens/Authentication/SignupTertiary'
import ResetPassword from '../Screens/Authentication/ResetPassword'
import VerifyOTP from '../Screens/Authentication/VerifyOTP'
import ThankyouForSignup from '../Screens/Authentication/ThankyouForSignup'

const Stack = createStackNavigator()
const AuthStack = ({navigation, route}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection:'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            
            
        }} 
        initialRouteName={References.Login}>
            <Stack.Screen name={References.LoginPrimary} component={LoginPrimary} />
            <Stack.Screen name={References.LoginSecondary} component={LoginSecondary} />

            <Stack.Screen name={References.SignupPrimary} component={SignupPrimary} />
            <Stack.Screen name={References.SignupSecondary} component={SignupSecondary} />
            <Stack.Screen name={References.SignupTertiary} component={SignupTertiary} />

            <Stack.Screen name={References.ForgotPassword} component={ForgotPassword} />
            <Stack.Screen name={References.VerifyOTP} component={VerifyOTP} />
            <Stack.Screen name={References.ResetPassword} component={ResetPassword} />

            <Stack.Screen name={References.InfoSubmitted} component={ThankyouForSignup} />
        </Stack.Navigator>
    )
}

export default AuthStack;
