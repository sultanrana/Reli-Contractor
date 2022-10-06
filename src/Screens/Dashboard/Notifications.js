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
import Unread from '../Notifications/Unread';
import Read from '../Notifications/Read';

const Tabs = createMaterialTopTabNavigator()
const Notifications = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  return (
    <View style={[AppStyles.Screen, AppStyles.DashboardScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      <Tabs.Navigator pageMargin={2}
        screenOptions={{
          tabBarActiveTintColor: AppColors.Primary,
          tabBarInactiveTintColor: '#979797',
          tabBarIndicatorContainerStyle: {
            backgroundColor: AppColors.Background
          },
          tabBarIndicatorStyle: {
            backgroundColor: AppColors.Primary,

          },
        }}>
        <Tabs.Screen name='Unread' component={Unread} />
        <Tabs.Screen name='Read' component={Read} />

      </Tabs.Navigator>

    </View>
  );

}

export default Notifications;
