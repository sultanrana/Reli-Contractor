import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, Dimensions, SafeAreaView } from 'react-native';
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
import { windowWidth } from '../../Constants/Constants';

const Tabs = createMaterialTopTabNavigator()

const Notifications = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  return (
    <View style={[AppStyles.CommonScreenStyles,{ backgroundColor: AppColors.Background }]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      <Tabs.Navigator
       pageMargin={2}
        screenOptions={{
          tabBarItemStyle: { width: windowWidth / 2 },
          tabBarScrollEnabled:true,
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
        <Tabs.Screen name={References.UnReadNotifications} component={Unread} />
        <Tabs.Screen name={References.ReadNotifications} component={Read} />

      </Tabs.Navigator>

    </View>
  );

}

export default Notifications;
