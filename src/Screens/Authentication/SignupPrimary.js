import React, { useRef, useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Dimensions, Keyboard } from 'react-native';
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
import { handleEmailCheck } from '../../API/Config';

const screenHeight = Dimensions.get('window').height

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
const SignupPrimary = ({ navigation }) => {

  const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const fNameRef = useRef()
  const lNameRef = useRef()
  const emailRef = useRef()
  const passRef = useRef()

  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const AppColors = Colors(scheme)

  const onSubmit = () => {
    if (firstname === '') {
      SimpleToast.show(`Please provide your first name`);
      return;
    }
    if (lastname === '') {
      SimpleToast.show(`Please provide your last name`);
      return;
    }
    if (email === '') {
      SimpleToast.show(`Please provide your email`);
      return;
    }
    if (EMAIL_REG.test(email) == false) {
      SimpleToast.show('*Please check your email and try again')
      return;
    }
    if (password === '') {
      SimpleToast.show(`Please provide your password`);
      return;
    }
    if (PASSWORD_REGEX.test(password) == false) {
      SimpleToast.show('*Please check your password\nPassword should contain minimum 6 characters, 1 UPPERCASE, 1 lowercase, and 1 number')
      return;
    } 
    if (password.length < 6) {
      SimpleToast.show('Password should be at least 6 characters');
      return
    } else {
      Keyboard.dismiss()
      setIsLoading(true)

      handleEmailCheck(email).then((res)=> {
        if (res) {
          setTimeout(() => {
            navigation.navigate(References.SignupSecondary, {
              email: email,
              password: password,
              firstname: firstname,
              lastname: lastname
            });
          }, 250);
            
        }
      }).finally(()=> {
        setIsLoading(false)
      })

      
    }
  }

  return (
    <SafeAreaView style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle]}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        // keyboardShouldPersistTaps={'always'}
        >
          <>
            <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
              Sign Up
            </Text>

            <InputField
              fieldRef={fNameRef}
              title="First Name"
              value={firstname}
              onChangeText={setFirstname}
              placeholder="First Name"
              keyboardType='default'
              maxLength={16}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                lNameRef.current.focus()
              }}
            />
            <View style={{ marginVertical: 8 }} />

            <InputField
              fieldRef={lNameRef}
              title="Last Name"
              value={lastname}
              onChangeText={setLastname}
              placeholder="Last Name"
              keyboardType='default'
              maxLength={16}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                emailRef.current.focus()
              }}
            />

            <View style={{ marginVertical: 8 }} />

            <InputField
              fieldRef={emailRef}
              title="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="yourname@email.com"
              keyboardType='email-address'
              autoCapitalize={'none'}
              returnKeyType={'next'}
              onSubmitEditing={() => {
                passRef.current.focus()
              }}
            />
            <View style={{ marginVertical: 8 }} />

            <InputField
              fieldRef={passRef}
              title="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              password={isPassVisible ? false : true}
              isRightIcon
              rightIcon={(isPassVisible) ? Icons.ShowPassword : Icons.HidePassword}
              rightIconOnPress={() => { setIsPassVisible(!isPassVisible) }}
              returnKeyType={'done'}
              onSubmitEditing={() => {
                Keyboard.dismiss()
              }}
            />

            <View style={{ width: '100%', marginTop: 70, alignSelf: 'center' }}>

              <ContainedButton
                onPress={onSubmit}
                label="Continue"
                loading={isLoading}
              />

              <TouchableOpacity onPress={() => navigation.navigate(References.LoginPrimary)} style={{ alignSelf: 'center' }}>
                <Text allowFontScaling={false} style={{ marginTop: 30, color: Colors(scheme).Text, fontFamily: Fonts.Light }}>
                  Already have an account?
                  <Text allowFontScaling={false} style={{ color: Colors(scheme).Primary, fontFamily: Fonts.Medium }}> Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );

}

export default SignupPrimary;
