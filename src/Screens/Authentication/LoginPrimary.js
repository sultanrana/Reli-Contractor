import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import { FontSize } from '../../Theme/FontSize';
import { LayoutStyles } from '../../Theme/Layout';
import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';

const LoginPrimary = ({ navigation }) => {
  const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const [email, setEmail] = useState('');
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)

  const onSubmit = () => {
    if (email === '') {
      SimpleToast.show('Email cannot be empty');
      return;
    } else if (EMAIL_REG.test(email) == false) {
      SimpleToast.show('Invalid email')
    } else {
      navigation.navigate(References.LoginSecondary, {
        email: email
      });
    }
  }

  return (
    <View style={[AppStyles.Screen, AppStyles.AuthScreens]}>
      <LogoOver navigation={navigation} shouldShowBack={false} />
      <Text style={[AppStyles.AuthScreenTitle]}>
        Contractor Sign In
      </Text>
      <View style={{
        padding: 8
      }}>
        <InputField
          title="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="yourname@email.com"
          keyboardType='email-address'
        />
        <View style={{ marginVertical: 10 }} />
        <ContainedButton
          onPress={onSubmit}
          label="Continue"
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(References.SignupPrimary)} style={{ alignSelf: 'center' }}>
          <Text style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.SemiBold }}>
            Need an account?
            <Text style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );

}

export default LoginPrimary;
