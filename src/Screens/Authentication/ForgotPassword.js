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

const LoginSecondary = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)

  const onSubmit = () => {
    if (email === '') {
      SimpleToast.show('Email cannot be empty');
      return;
    } else {
      navigation.navigate(References.VerifyOTP, {
        email: email
      });
    }
  }
  const styles = StyleSheet.create({
    emailTextView: {
      height: 40,
      borderRadius: 50,
      backgroundColor: '#FDECDF',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5,
      marginBottom: 20,
      alignSelf: 'center',
      padding: 8,
      paddingHorizontal: 16,


    },
    emailText: {
      textAlign: 'center',
      color: Colors(scheme).Primary,
      fontFamily: Fonts.SemiBold,
      fontSize: 14,
    },
  });

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.HorizontalStyle]}>
        <Text style={[AppStyles.AuthScreenTitle]}>
          Forgot Password
        </Text>

        <InputField
          title="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email"
        />
        <View style={{ marginVertical: 10 }} />
        <ContainedButton
          onPress={onSubmit}
          label="Continue"
        />
      </View>
    </SafeAreaView>
  );

}

export default LoginSecondary;
