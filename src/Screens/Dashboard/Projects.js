import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ActiveProjects from '../Projects/ActiveProjects'
import AvailableProjects from '../Projects/AvailableProjects'
import CompletedProjects from '../Projects/CompletedProjects'

const Tabs = createMaterialTopTabNavigator()

const Projects = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const DATA = [
    {
      title: "Today",
      data: [{
        title: "2x Sliding Glass Doors",
        subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
        subtitle2: "Aug 22 , Aug 23, or Sep 1"
      },
      {
        title: "2x Sliding Glass Doors",
        subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
        subtitle2: "Aug 22 , Aug 23, or Sep 1"
      },
      {
        title: "2x Sliding Glass Doors",
        subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
        subtitle2: "Aug 22 , Aug 23, or Sep 1"
      }]
    },

    {
      title: "Wednesday, April 26",
      data: [{
        title: "2x Sliding Glass Doors",
        subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
        subtitle2: "Aug 22 , Aug 23, or Sep 1"
      },
      {
        title: "2x Sliding Glass Doors",
        subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
        subtitle2: "Aug 22 , Aug 23, or Sep 1"
      },
      {
        title: "2x Sliding Glass Doors",
        subtitle1: "2900 Bristol St, Costa Mesa, CA 92626",
        subtitle2: "Aug 22 , Aug 23, or Sep 1"
      }]
    },
    
  ];

  return (
    <View style={[AppStyles.Screen, AppStyles.DashboardScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite/>

      <Tabs.Navigator pageMargin={2} screenOptions={{
                tabBarActiveTintColor: AppColors.Primary,
                tabBarIndicatorContainerStyle: {
                    backgroundColor: AppColors.Background
                },
                tabBarIndicatorStyle:{
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
