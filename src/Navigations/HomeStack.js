import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={'home'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default HomeStack;
