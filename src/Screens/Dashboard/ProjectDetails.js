import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

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
import Overview from '../ProjectDetails/Overview'
import Service from '../ProjectDetails/Service'
import Assignment from '../ProjectDetails/Assignment'
import Finances from '../ProjectDetails/Finances'
import { windowWidth } from '../../Constants/Constants';
import { useSelector } from 'react-redux';
import Chat from '../ProjectDetails/Chat';

const Tabs = createMaterialTopTabNavigator()

const ProjectDetails = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const { token, userData } = useSelector(({ Index }) => Index)

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack bgWhite />

      <Tabs.Navigator
        pageMargin={2}
        // style={{
        //   position: 'absolute',
        //   top: 150,
        //   left: 0,
        //   right: 0,
        //   zIndex: 1,
        // }}
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: windowWidth / 3.15 },
          tabBarActiveTintColor: AppColors.Primary,
          tabBarInactiveTintColor: '#979797',
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppColors.Background
          },
          tabBarIndicatorStyle: {
            backgroundColor: AppColors.Primary,
          },
          tabBarLabelStyle: {
            textTransform: 'none',
            // zIndex:9999

          }
        }}>
        <Tabs.Screen name='Overview' component={Overview} />
        <Tabs.Screen name='Message' component={Chat} />
        <Tabs.Screen name='Service' component={Service} />
        {
          (userData?.accountType == 'admin_contractor') &&
          <Tabs.Screen name='Assignment' component={Assignment} />
        }
        <Tabs.Screen name='Finances' component={Finances} />

      </Tabs.Navigator>

    </View>
  );

}

export default ProjectDetails;
