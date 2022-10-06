import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LogoOver from '../../Components/LogoOver';
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import ActiveProjects from '../Projects/ActiveProjects'
import AvailableProjects from '../Projects/AvailableProjects'
import CompletedProjects from '../Projects/CompletedProjects'

const Tabs = createMaterialTopTabNavigator()

const Projects = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.Screen, AppStyles.DashboardScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      <Tabs.Navigator
       pageMargin={2}
        screenOptions={{
          tabBarActiveTintColor: AppColors.Primary,
          tabBarInactiveTintColor:'#979797',
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppColors.Background
          },
          tabBarIndicatorStyle: {
            backgroundColor: AppColors.Primary,

          },
        }}>
        <Tabs.Screen name='Active' component={ActiveProjects} />
        <Tabs.Screen name='Available' component={AvailableProjects} />
        <Tabs.Screen name='Completed' component={CompletedProjects} />

      </Tabs.Navigator>

    </View>
  );

}

export default Projects;
