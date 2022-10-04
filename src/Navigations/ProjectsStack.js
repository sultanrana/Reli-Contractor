import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Projects } from '../screens';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const ProjectStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={'projects'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="projects" component={Projects} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default ProjectStack;
