import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForgotPassword, Login, Signup, Thankyou } from '../screens';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'login'}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen name="thankyou" component={Thankyou} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthStack;
