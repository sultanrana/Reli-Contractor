import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeBaseProvider } from 'native-base';


const ThankyouForSignup = ({ navigation, route }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  const onRefresh = () => {

  }

  return (
    <View style={[AppStyles.Screen, AppStyles.AuthScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />

      <>
        <View style={{
          padding: 8,
          flex: 1
        }}>

          <View style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}>

            <Text style={{
              color: AppColors.Primary,
              fontSize: FontSize.xxxlarge + 2,
              fontFamily: Fonts.Bold,
              textAlign: 'center',
              textAlignVertical: 'center'
            }}>{'Thank you!'}</Text>

            <Text style={{
              color: AppColors.TextTitle,
              fontSize: FontSize.xxlarge,
              fontFamily: Fonts.SemiBold,
              textAlign: 'center',
              textAlignVertical: 'center'
            }}>{'We will be getting back to you...'}</Text>

          </View>


          <View style={{ flex: 1 }}>
            <ContainedButton
              onPress={onRefresh}
              label="Refresh"
            />
            <TouchableOpacity onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: References.AuthenticationStack }],
              })
            }} style={{ alignSelf: 'center' }}>
              <Text style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                <Text style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}>Sign Out</Text>
              </Text>
            </TouchableOpacity>
          </View>



        </View>

      </>
    </View >
  );

}

export default ThankyouForSignup;
