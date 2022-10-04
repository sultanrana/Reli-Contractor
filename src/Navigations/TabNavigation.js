import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, SafeAreaView } from 'react-native';
import AccountStack from './AccountStack';
import HomeStack from './HomeStack';
import NoticesStack from './NoticesStack';
import ProjectStack from './ProjectsStack';
import StaffStack from './StaffStack';
import { account, home, notification, projects, staff } from '../theme/Icons';
import { ThemeConstants } from '../theme';
import { Header } from '../components';

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          // headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: ThemeConstants.Colors.primary,
          header: ({ navigation, route, options }) => {
            return <Header />;
          },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={home} style={{ tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={projects} style={{ tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Staff"
          component={StaffStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={staff} style={{ tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Notices"
          component={NoticesStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={notification} style={{ tintColor: color }} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Image source={account} style={{ tintColor: color }} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default TabNavigation;
