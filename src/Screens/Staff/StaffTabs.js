import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import Colors, { colors } from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import Edit from './Edit';
import Schedule from './Schedule';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tabs = createMaterialTopTabNavigator()

const StaffTabs = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles]}>
      
      <LogoOver navigation={navigation} shouldShowBack={true} bgWhite/>
      
      <Tabs.Navigator pageMargin={2} screenOptions={{
                tabBarActiveTintColor: AppColors.Primary,
                tabBarIndicatorContainerStyle: {
                    backgroundColor: AppColors.Background
                },
                tabBarIndicatorStyle:{
                    backgroundColor: AppColors.Primary, 
                },
                tabBarLabelStyle: {
                  textTransform: 'none'
                }
            }}>
                <Tabs.Screen name={References.ScheduleStaff} component={Schedule} />
                <Tabs.Screen name={References.EditStaff} component={Edit} />
                
            </Tabs.Navigator>

      
    </View>
  );

}

export default StaffTabs;
