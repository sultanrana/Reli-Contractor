import React, { useState } from 'react';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, Dimensions, SafeAreaView } from 'react-native';
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
import { windowWidth } from '../../Constants/Constants';

const Tabs = createMaterialTopTabNavigator()

const Projects = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.CommonScreenStyles,{backgroundColor:AppColors.Background}]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      <Tabs.Navigator
        pageMargin={2}
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: windowWidth / 3 },
          tabBarActiveTintColor: AppColors.Primary,
          tabBarInactiveTintColor: '#979797',
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppColors.Background
          },
          tabBarIndicatorStyle: {
            backgroundColor: AppColors.Primary,
          },
          tabBarLabelStyle: {
            textTransform: 'none'
          }
        }}>
        <Tabs.Screen name={References.ActiveProjects} component={ActiveProjects} />
        <Tabs.Screen name={References.AvailableProjects} component={AvailableProjects} />
        <Tabs.Screen name={References.CompletedProjects} component={CompletedProjects} />
      </Tabs.Navigator>

    </View>
  );

}

export default Projects;
