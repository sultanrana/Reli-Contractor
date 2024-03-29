import React, { useState } from 'react';
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
import { EMAIL_REG } from '../../Constants/Constants';
import { dynamicVerticalSize, getFontSize } from '../../Helpers/Resposive';


const ForgotPassword = ({ navigation, route }) => {

  const [inputs, setInputs] = useState({
    email: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const scheme = useColorScheme()
  const AppColors = Colors(scheme)
  const AppStyles = GetStyles(scheme)

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }))
  }

  const handleError = (errorMsg, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMsg }))
  }

  const forgotPassword = () => {
    let valid = true
    Keyboard.dismiss()
    if (!inputs.email) {
      handleError('*Please enter your email address to reset your password', 'email')
      valid = false
    } else if (EMAIL_REG.test(inputs.email) == false) {
      handleError('*Please enter a valid Email address', 'email')
      valid = false
    }

    if (valid) {
      setIsLoading(true)
      handleForgotPassword(inputs?.email).then(async (data) => {
        if (data?.code === 200) {
          setTimeout(() => {
            navigation.navigate(References.VerifyOTP, { email: inputs.email })
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
    <View
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
      <LogoOver navigation={navigation} shouldShowBack={true} border={false} />
      <View style={[AppStyles.CommonScreenStyles, AppStyles.HorizontalStyle,]}>
        <KeyboardAwareScrollView contentContainerStyle={{ height: '100%' }} showsVerticalScrollIndicator={false} >
          <Text allowFontScaling={false} style={[AppStyles.AuthScreenTitle]}>
            Forgot Password
          </Text>

          <InputField
            title="Email"
            value={inputs.email}
            onChangeText={(val) => {
              handleOnChange(val, 'email')
            }}
            error={errors.email}
            onFocus={() => {
              handleError(null, 'email')
            }}
            placeholder="Your Email"
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            returnKeyType={'done'}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
          />
          <ContainedButton
            onPress={forgotPassword}
            label="Continue"
            loading={isLoading}
          />
          <View style={{ width: '100%', position: 'absolute', bottom: dynamicVerticalSize(69), alignSelf: 'center' }}>

            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
              navigation.navigate(References.ContactUs)
            }}>
              <Text allowFontScaling={false} style={{ color: AppColors.Primary, fontFamily: Fonts.Regular, fontSize: getFontSize(18), fontWeight: '500' }}>
                Contact Support
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

      </View>

    </View>
  );

}

export default ForgotPassword;
