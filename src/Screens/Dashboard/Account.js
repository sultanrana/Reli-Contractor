import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';
import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, Dimensions, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import About from '../Profile/About';
import Notifications from '../Profile/Notifications';
import Transactions from '../Profile/Transactions';
import ContainedButton from '../../Components/ContainedButton'
import LogoOver from '../../Components/LogoOver';
import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';

const Tabs = createMaterialTopTabNavigator()
const screenWidth = Dimensions.get('window').width

const Account = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles, { backgroundColor: AppColors.Background }]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite />

      <Tabs.Navigator pageMargin={2}
        screenOptions={{
          tabBarItemStyle: { width: screenWidth / 3 },
          tabBarScrollEnabled: true,
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
        <Tabs.Screen name={References.About} component={About} />
        <Tabs.Screen name={References.Notification} component={Notifications} />
        <Tabs.Screen name={References.Transaction} component={Transactions} />

      </Tabs.Navigator>

    </SafeAreaView>
  );

}

export default Account;
