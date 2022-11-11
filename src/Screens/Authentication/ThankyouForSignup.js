import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, FlatList, SafeAreaView, Dimensions } from 'react-native';
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

const screenHeight = Dimensions.get('window').height

const ThankyouForSignup = ({ navigation, route }) => {

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)


  const onRefresh = () => {

  }

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles,]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />

      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle, { justifyContent: 'center' }]}>
        <KeyboardAwareScrollView contentContainerStyle={{ height: '100%', justifyContent:'center'}} showsVerticalScrollIndicator={false} >


        <Text allowFontScaling={false} style={{
          color: AppColors.Primary,
          fontSize: FontSize.xxxlarge + 2,
          fontFamily: Fonts.Bold,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}>{'Thank you!'}</Text>

        <Text allowFontScaling={false} style={{
          color: AppColors.TextTitle,
          fontSize: FontSize.xxlarge,
          fontFamily: Fonts.SemiBold,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}>{'We will be getting back to you...'}</Text>





        <View style={{ position: 'absolute', bottom: 40, width: '100%', alignSelf: 'center' }}>
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
            <Text allowFontScaling={false} style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
              <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}>Sign Out</Text>
            </Text>
          </TouchableOpacity>
        </View>


        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView >
  );

}

export default ThankyouForSignup;
