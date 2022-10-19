import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
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
    <View style={[AppStyles.Screen, AppStyles.AuthScreens]}>
      <LogoOver navigation={navigation} />
      <Text style={[AppStyles.AuthScreenTitle]}>
        Enter Verification Code
      </Text>
      <View style={{
        padding: 8
      }}>
        
        <InputField
          title="Verification Code"
          value={code}
          onChangeText={setCode}
          placeholder="Enter your verification code here"
          maxLength={MAX_CODE_LENGTH}
        />
        <View style={{ marginVertical: 2 }} />
        <Text style={{
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
    </View>
  );

}

export default VerifyOTP;