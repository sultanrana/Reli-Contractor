import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList, SafeAreaView } from 'react-native';
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


const ThankyouForSignup = ({ navigation, route }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  const onRefresh = () => {

  }

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles,]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 12 }}>





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





        <View style={{ position: 'absolute', bottom: 50, width:'100%', alignSelf:'center' }}>
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
    </SafeAreaView >
  );

}

export default ThankyouForSignup;
