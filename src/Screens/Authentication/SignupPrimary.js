import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
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
import { Icons } from '../../Assets/Images/Index';

const SignupPrimary = ({ navigation }) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const onSubmit = () => {
    if (firstname === '') {
      SimpleToast.show('First Name cannot be empty');
      return;
    }
    if (lastname === '') {
      SimpleToast.show('Last Name cannot be empty');
      return;
    }
    if (email === '') {
      SimpleToast.show('Email cannot be empty');
      return;
    }
    if (password === '') {
      SimpleToast.show('Password cannot be empty');
      return;
    } else {
      navigation.navigate(References.SignupSecondary, {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
      });
    }
  }

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.HorizontalStyle]}>
        <Text style={[AppStyles.AuthScreenTitle]}>
          Sign Up
        </Text>
        <KeyboardAwareScrollView>
          <>


            <InputField
              title="First Name"
              value={firstname}
              onChangeText={setFirstname}
              placeholder="First Name"
              keyboardType='default'
              maxLength={16}
            />
            <View style={{ marginVertical: 8 }} />

            <InputField
              title="Last Name"
              value={lastname}
              onChangeText={setLastname}
              placeholder="Last Name"
              keyboardType='default'
              maxLength={16}
            />

            <View style={{ marginVertical: 8 }} />

            <InputField
              title="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="yourname@email.com"
              keyboardType='email-address'
            />
            <View style={{ marginVertical: 8 }} />

            <InputField
              title="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              password={isPassVisible ? false : true}
              isRightIcon
              rightIcon={(isPassVisible) ? Icons.ShowPassword : Icons.HidePassword}
              rightIconOnPress={() => { setIsPassVisible(!isPassVisible) }} />

            <View style={{ marginVertical: 12 }} />
            <ContainedButton
              onPress={onSubmit}
              label="Continue"
            />

            <TouchableOpacity onPress={() => navigation.navigate(References.LoginPrimary)} style={{ alignSelf: 'center', marginBottom: 8 }}>
              <Text style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                Already have an account?
                <Text style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
              </Text>
            </TouchableOpacity>
          </>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );

}

export default SignupPrimary;
