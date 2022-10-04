import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notices } from '../screens';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const NoticesStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={'notices'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="notices" component={Notices} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default NoticesStack;
