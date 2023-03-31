import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { FlatList, TextInput, View, Image, StyleSheet, TouchableOpacity, useColorScheme, Dimensions, SafeAreaView, Platform, KeyboardAvoidingView, Pressable } from 'react-native';
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
import { windowHeight, windowWidth } from '../../Constants/Constants';
import { useSelector } from 'react-redux';
import Chat from '../ProjectDetails/Chat';
import { vs, s } from 'react-native-size-matters';
import { Icons } from '../../Assets/Images/Index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tabs = createMaterialTopTabNavigator()

const ProjectDetails = ({ navigation }) => {
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)
  const insets = useSafeAreaInsets()

  const { token, userData } = useSelector(({ Index }) => Index)

  const { height, width } = Dimensions.get('window');
  const isIPhone8 = height === 667 && width === 375;

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: AppColors.Background,
    },
    content: {
      flex: 1,
      paddingHorizontal: s(2)
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      marginBottom: Platform.select({ ios: 0, android: 10 }),
    },
    input: {
      flex: 1,
      height: 40,
      marginRight: 10,
    },
    button: {
      backgroundColor: '#2196F3',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    flatListView: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 16,
      alignSelf: "center",
      paddingTop: 5,
      paddingBottom: 70
    },
    msgImg: {
      height: (windowWidth * 40) / 100,
      width: (windowWidth * 40) / 100,

    },
    bottomContainer: {
      width: '100%',
      height: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: AppColors.White,
      shadowColor: AppColors.BlackGreyish,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.16,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      shadowRadius: 6,
      paddingVertical: 14,
      paddingHorizontal: 18,
    },
    mainTitle: {
      fontFamily: Fonts.SemiBold,
      fontSize: FontSize.xlarge,
      color: AppColors.TextTitle,
    },
    send: {
      paddingVertical: 10,
      height: '100%',
      width: '15%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    sendIcon: {
      height: 20,
      width: 20
    }

  })

  return (
    <View style={[AppStyles.Screen, AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack bgWhite />

      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={(Platform.OS === 'ios' && isIPhone8) ? 0 : Platform.OS === 'ios' ? -vs(7) : 0}
      >
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
      </KeyboardAvoidingView>

    </View>
  );

}

export default ProjectDetails;
