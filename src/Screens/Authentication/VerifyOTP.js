import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { FontSize } from '../../Theme/FontSize';

const VerifyOTP = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const MAX_CODE_LENGTH = 4;

  const { email } = route?.params

  const onSubmit = () => {
    if (code === '') {
      SimpleToast.show('Code cannot be empty');
      return;
    } else {
      navigation.navigate(References.ResetPassword, {
        email: email,
        code: code
      });
    }
  }


  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle,]}>
        <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
          Enter Verification Code
        </Text>


        <InputField
          title="Verification Code"
          value={code}
          onChangeText={setCode}
          placeholder="Enter your verification code here"
          maxLength={MAX_CODE_LENGTH}
        />
        <View style={{ marginVertical: 2 }} />
        <Text allowFontScaling={false} style={{
          fontSize: FontSize.medium,
          fontFamily: Fonts.Light,
          color: Colors(scheme).Grey
        }}>
          {'Check your email for a verification code'}

        </Text>
        <View style={{ marginVertical: 10 }} />
        <ContainedButton
          onPress={onSubmit}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  );

}

export default VerifyOTP;
