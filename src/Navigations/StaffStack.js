import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Staff } from '../screens';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const StaffStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={'staff'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="staff" component={Staff} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default StaffStack;
