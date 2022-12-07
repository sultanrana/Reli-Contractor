import React, { useEffect, useState } from 'react';
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
import { handleResendOTP, handleVerifyOTP } from '../../API/Config';
import { setAuthToken, setUserData } from '../../Redux/Actions';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOTP = ({ navigation, route }) => {

  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const scheme = useColorScheme()
  const AppStyles = GetStyles(scheme)
  const MAX_CODE_LENGTH = 6;

  const { email } = route?.params || ''

  useEffect(() => {
    timerFunc()

    return () => (
      timerFunc()
    )
  }, [])

  const timerFunc = () => {
    setTimer(60);
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && (
          clearInterval(interval)
        )
        return lastTimerCount - 1;

      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => {
      clearInterval(interval)
    }
  };

  const verifyOTP = () => {
    if (code.length === 0) {
      SimpleToast.show('Please enter your verification code to reset your password')
    } else {
      setIsLoading(true)
      handleVerifyOTP(email, code).then(async (data) => {

        if (data?.code === 200) {
          SimpleToast.show('OTP verified successfully')
          setCode('')
          await AsyncStorage.setItem('token', '' + data?.data?.token).then(() => {
            dispatch(setUserData(data?.data?.userData))
            dispatch(setAuthToken(data?.data?.token))
            setTimeout(() => {
              navigation.navigate(References.ResetPassword, {
                email: email,
                code: code
              });
            }, 350);
          })
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  const resendOTP = () => {
    timerFunc()
    setCode('')
    handleResendOTP(email).then(async (data) => {
      SimpleToast.show('Check your gmail for a verification code')
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsLoading(false)
    })
  }




  return (
    <SafeAreaView
      pointerEvents={isLoading ? 'none' : 'auto'}
      style={[AppStyles.CommonScreenStyles]}>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Text allowFontScaling={false} style={{
            fontSize: FontSize.medium,
            fontFamily: Fonts.Light,
            color: Colors(scheme).Grey
          }}>
            {'Check your email for a verification code'}

          </Text>
          {
            timer > 0 ?
              <Text allowFontScaling={false} style={{
                fontSize: FontSize.medium,
                fontFamily: Fonts.Medium,
                color: Colors(scheme).Primary
              }}>
                {timer}
              </Text>
              :
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={resendOTP}
              >
                <Text allowFontScaling={false} style={{
                  fontSize: FontSize.medium,
                  fontFamily: Fonts.Medium,
                  color: Colors(scheme).Primary
                }}>
                  {'Resend'}

                </Text>
              </TouchableOpacity>
          }
        </View>
        <View style={{ marginVertical: 10 }} />
        <ContainedButton
          onPress={verifyOTP}
          label="Continue"
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );

}

export default VerifyOTP;
