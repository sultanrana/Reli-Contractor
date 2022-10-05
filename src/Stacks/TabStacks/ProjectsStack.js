import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { StatusBar } from 'react-native'

import { References } from '../../Constants/References'

import Projects from '../../Screens/Dashboard/Projects'

const Stack = createStackNavigator()
const ProjectsStack = ({navigation, route}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection:'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} 
        initialRouteName={References.Projects}>
            <Stack.Screen name={References.Projects} component={Projects} />
        </Stack.Navigator>
    )
}

export default ProjectsStack;
