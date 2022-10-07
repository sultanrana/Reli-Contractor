import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
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
const screenWidth = Dimensions.get('window').width
const Projects = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.Screen, AppStyles.DashboardScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      <Tabs.Navigator
        // initialLayout={
        //   {
        //     width: Dimensions.get('window').width
        //   }}

        pageMargin={2}
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: screenWidth / 3.15 },
          tabBarActiveTintColor: AppColors.Primary,
          tabBarInactiveTintColor: '#979797',
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppColors.Background
          },
          tabBarIndicatorStyle: {
            backgroundColor: AppColors.Primary,

          },
        }}>
        <Tabs.Screen name={References.ActiveProjects} component={ActiveProjects} />
        <Tabs.Screen name={References.AvailableProjects} component={AvailableProjects} />
        <Tabs.Screen name={References.CompletedProjects} component={CompletedProjects} />
      </Tabs.Navigator>

    </View>
  );

}

export default Projects;
