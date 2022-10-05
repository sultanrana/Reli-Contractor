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
import Schedule from '../Staff/Schedule';
import Edit from '../Staff/Edit';

const Tabs = createMaterialTopTabNavigator()
const Staff = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  return (
    <View style={[AppStyles.Screen, AppStyles.DashboardScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} bgWhite/>
      
      {/* <Tabs.Navigator pageMargin={2} screenOptions={{
                tabBarActiveTintColor: AppColors.Primary,
                tabBarIndicatorContainerStyle: {
                    backgroundColor: AppColors.Background
                },
                tabBarIndicatorStyle:{
                    backgroundColor: AppColors.Primary,
                    
                },
            }}>
                <Tabs.Screen name='Schedule' component={Schedule} />
                <Tabs.Screen name='Edit' component={Edit} />
                
            </Tabs.Navigator> */}
      
    </View>
  );

}

export default Staff;
