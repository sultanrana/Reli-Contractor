import React, { useState } from 'react';
import SimpleToast from 'react-native-simple-toast';

import { Text, View, Image, StyleSheet, TouchableOpacity, useColorScheme, SafeAreaView, Dimensions } from 'react-native';
import ContainedButton from '../../Components/ContainedButton'
import InputField from '../../Components/InputField'
import LogoOver from '../../Components/LogoOver';

import Colors from '../../Theme/Colors';
import { References } from '../../Constants/References';
import Fonts from '../../Assets/Fonts/Index';
import { GetStyles } from '../../Theme/AppStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard } from 'react-native';
import { handleForgotPassword } from '../../API/Config';

const screenHeight = Dimensions.get('window').height


const LoginSecondary = ({ navigation, route }) => {

  const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scheme = useColorScheme()
  const AppColors = Colors(scheme)
  const AppStyles = GetStyles(scheme)

  const forgotPassword = () => {
    if (email === '') {
      SimpleToast.show(`Email cann't be empty`);
      return;
    } if (EMAIL_REG.test(email) == false) {
      SimpleToast.show('Invalid email')
      return;
    } else {
      setIsLoading(true)
      handleForgotPassword(email).then(async (data) => {
        if(data?.code === 200){
          SimpleToast.show('Pleas check your email')
          setTimeout(() => {
            navigation.navigate(References.VerifyOTP, { email: email })
          }, 350);
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
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
      color: AppColors.Primary,
      fontFamily: Fonts.SemiBold,
      fontSize: 14,
    },
  });

  return (
    <SafeAreaView
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle,]}>
        <KeyboardAwareScrollView contentContainerStyle={{ height: '100%' }} showsVerticalScrollIndicator={false} >
          <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
            Forgot Password
          </Text>

          <InputField
            title="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Your Email"
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
          <View style={{ marginVertical: 10 }} />
          <ContainedButton
            onPress={forgotPassword}
            label="Continue"
            loading={isLoading}
          />
          <View style={{ width: '100%', position: 'absolute', bottom: 50, alignSelf: 'center' }}>

            <TouchableOpacity style={{ alignSelf: 'center' }}>
              <Text allowFontScaling={false} style={{ color: AppColors.Primary, fontFamily: Fonts.Regular }}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

      </View>

    </SafeAreaView>
  );

}

export default LoginSecondary;
