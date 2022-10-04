import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Splash } from '../screens';
import AuthStack from './AuthStack';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="splash"
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="authStack" component={AuthStack} />
        <Stack.Screen name="appStack" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
